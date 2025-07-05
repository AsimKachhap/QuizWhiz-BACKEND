import { WebSocket } from "ws";

interface Users {
  name: string;
  socket: WebSocket;
}

export class UserManager {
  private users: Users[];
  constructor() {
    this.users = [];
  }

  addUser(name: string, socket: WebSocket) {
    this.users.push({ name, socket });
  }

  removeUser() {}

  getUsers() {
    return this.users;
  }
}
