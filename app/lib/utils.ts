import { useEffect, useState, useRef } from 'react';
import { Message, Request } from '@/app/lib/definitions';

export const useWebSocket = (url: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState<Message>();
    const webSocket = useRef<WebSocket | null>(null);

    useEffect(() => {
        webSocket.current = new WebSocket(url);

        webSocket.current.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        webSocket.current.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        };

        webSocket.current.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            const formatedMessage : Message = {
                type : parsedMessage.type,
                data : parsedMessage.data
            }
            setMessage(formatedMessage);
        };

        webSocket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup khi component unmount
        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, [url]);

    const sendRequest = (request: Request) => {
        if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
            webSocket.current.send(JSON.stringify(request));
        } else {
            console.error('WebSocket is not open. Cannot send request.');
        }
    };

    return { isConnected, message, sendRequest };
};

export const generateRandomSelection = ():string[] => {
    let selection = [];
    
    for (let i = 1; i <= 50; i++) {
        selection.push(i < 10 ? `0${i}` : `${i}`);
    }
    
    for (let i = selection.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selection[i], selection[j]] = [selection[j], selection[i]];
    }
  
    return selection.slice(0, 9);
}