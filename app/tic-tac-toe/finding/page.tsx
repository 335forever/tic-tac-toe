'use client'

import clsx from 'clsx';
import Image from 'next/image';
import {State, Request, PlayerInfor, MatchStatus} from '@/app/lib/definitions';
import {Overlay} from '@/app/ui/overlay';
import { useWebSocket } from '@/app/lib/hooks/useWebSocket';
import { useInfor } from '@/app/lib/hooks/useInfor';
import { useRouter } from 'next/navigation';
import React, { useEffect, FormEvent, useRef} from 'react';


export default function Page() {
    const { message, sendRequest } = useWebSocket();
    const { setEnemyInfor, setMatchStatus } = useInfor();

    const router = useRouter();

    const handleExitFindAction = () => {
        const request : Request = {
            action : 'exit_find',
            data : {}
        }

        sendRequest(request);
        router.replace('/tic-tac-toe/dashboard');
    }

    useEffect(()=>{
        if (message.type == 'match_start') {
            const enemyInfor : PlayerInfor = {
                ...message.data.enemyInfor
            }
            setEnemyInfor(enemyInfor);
            console.log(enemyInfor);

            const matchStatus : MatchStatus = {
                ...message.data.matchStatus
            }
            setMatchStatus(matchStatus);
            console.log(matchStatus);


            router.push('/tic-tac-toe/playing');
        }
    },[message]);
    
    return (
        <>
            <Overlay/>
            <div className="fixed flex justify-center items-center w-60 h-60 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                <Image
                    className="scale-150"
                    src="/asset/search.gif" 
                    alt="Searching" 
                    width="600" 
                    height="600"
                    unoptimized
                />
                <button className="absolute top-3/4 bg-blue-200 p-2 rounded-lg" onClick={handleExitFindAction}>Stop Finding</button>
            </div>
        </>
    );
}