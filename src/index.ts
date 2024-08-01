import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

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
