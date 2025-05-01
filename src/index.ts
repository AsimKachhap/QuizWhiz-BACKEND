import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);

//EXPRESS ROUTE
app.get("/api/", (req, res) => {
  res.send("Hello from Express Server");
});

const wss = new WebSocketServer({ server: httpServer });

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
