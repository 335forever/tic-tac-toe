import { useWebSocket } from '@/app/lib/hooks/useWebSocket';
import React, { useEffect, useState } from 'react';

export function OnlineNum() {
    const { message, isConnected } = useWebSocket();
    const [ onlineNum, setOnlineNum ] = useState<number | undefined>(0);

    useEffect(() => {
        if (message.type == 'online_num') {
            setOnlineNum(message.data.num);
        }
    }, [message.id]);

    return (
        <>
            {isConnected ? <div className="flex justify-center items-center fixed bottom-0 right-0 w-40 h-10 bg-green-300 gap-1"><span>{onlineNum}</span>player online</div> : <div className="flex justify-center items-center fixed bottom-0 right-0 w-40 h-10 bg-orange-300 gap-1">Server not ready</div>}
        </>
    );
}