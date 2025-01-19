import { io } from 'socket.io-client';

class SocketService {
  private static instance: SocketService;
  private socket: any;

  private constructor() {
    this.socket = io(process.env.URL, {
      // Reconnection beállítások ha szükséges
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}

export default SocketService;