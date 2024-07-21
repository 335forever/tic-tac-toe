'use client'

import React, { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { Request, Message } from '@/app/lib/definitions';


interface WebSocketContextType {
  message : Message | undefined;
  isConnected: boolean;
  sendRequest: (request: Request) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>();
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
        const parsedMessage = JSON.parse(event.data);
        const formatedMessage : Message = {
            type : parsedMessage.type,
            data : parsedMessage.data
        }
        setMessage(formatedMessage);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendRequest = (request: Request) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(request));
    } else {
        console.error('WebSocket is not open. Cannot send request.');
    }
};

  return (
    <WebSocketContext.Provider value={{message, isConnected,  sendRequest }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
