import express from "express";
import http from "http";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { UserManager } from "./managers/UserManager";
import { register } from "module";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET;
const HEARTBEAT_INTERVAL = 1000 * 10; // 10 seconds
const HEARTBEAT_VALUE = "1";

const httpServer = http.createServer(app);

//INITIALIZING UserManaer
const userManager = new UserManager();

//EXPRESS ROUTE
app.get("/", (req, res) => {
  res.send("Hello from Express Server");
});

// API endpoints to implement

/****** AUTHENTICATION ******/
/* 
POST/api/auth/register
POST/api/auth/login
*/

/****** QUIZ MANAGEMENT *****/
/* 
  POST/api/quizzes
  GET/api/quizzes/:id
*/

/****** QUESTION MANAGEMENT ******/
/*
  POST/api/quizzes/:id/questions
  GET/api/quizzess/:id/questions/:id
*/

/****** RESULT MANAGEMENT ******/
/* 
  POST/api/quizzes/:id/results
  GET/api/quizzess/:id/leaderboard
*/

const wss = new WebSocketServer({ noServer: true });

//AUTHORIZE ON UPGRADE

httpServer.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const token = url.searchParams.get("token");
  console.log(token);

  if (!token || !JWT_SECRET) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n ");
    socket.destroy();
    return;
  }

  try {
    wss.handleUpgrade(req, socket, head, (ws) => {
      userManager.addUser(token, ws);
      console.log(userManager.getUsers());
      wss.emit("connection", ws, req);
    });
  } catch (error) {
    socket.write("401 Forbidden \r\n\r\n");
    socket.destroy();
  }
});

const ping = (ws: WebSocket) => {
  ws.send(HEARTBEAT_VALUE); // Expects a string but I want to send a number
};

wss.on("connection", (ws) => {
  ws.on("error", (error) => {
    console.log(error);
  });

  ws.on("message", (data: any) => {
    const message = JSON.parse(data);
    console.log(message);
  });

  ws.send("Hello from Backend");
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
