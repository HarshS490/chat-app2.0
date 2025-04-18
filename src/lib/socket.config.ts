import {io,Socket} from "socket.io-client";
import Env from "./env";

let socket : Socket;

export enum Events {
  MESSAGE = "MESSAGE",
  CONNECT = "CONNECT",
  DISCONNECT = "disconnect",
  ERROR = "ERROR",
}


export const getSocket = ()=>{
  if(!socket){
    socket = io(Env.BACKEND_URL,{autoConnect:false});
  }

  return socket;
}