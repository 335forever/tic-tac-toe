'use client'

import '@/app/ui/global.css';
import { HeaderImg } from '@/app/ui/headerImg';
import { WebSocketProvider, useWebSocket } from '@/app/lib/hooks/useWebSocket';
import React, { useState, useEffect } from 'react';
import { Request } from '@/app/lib/definitions';


interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayoutContent: React.FC<RootLayoutProps> = ({ children }) => {
  const [onlineNum, setOnlineNum] = useState<number | undefined>(0);
  const { isConnected , message, sendRequest } = useWebSocket();

  useEffect(() => {
    if (message && message.type == 'online_num') setOnlineNum(message.data.num);
  }, [message]);

  return (
    <main className="h-screen flex flex-col">
      <HeaderImg className="fixed w-[800px] max-w-full left-1/2 transform -translate-x-1/2" />
      {children}
      {isConnected ? <div className="flex justify-center items-center fixed bottom-0 right-0 w-40 h-10 bg-green-300 gap-1"><span>{onlineNum}</span>player online</div> : <div className="flex justify-center items-center fixed bottom-0 right-0 w-40 h-10 bg-orange-300 gap-1">Server not ready</div>}
      </main>
  );
};

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Tic Tac Toe</title>
          <link href="https://fonts.googleapis.com/css2?family=Baloo+2&display=swap" rel="stylesheet"/>
      </head>
      <body className="my-bg">
        <WebSocketProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </WebSocketProvider>
      </body>
    </html>
  );
}
