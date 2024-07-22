'use client'

import React, { useEffect, FormEvent, useRef} from 'react';
import clsx from 'clsx';
import { Request, PlayerInfor } from '@/app/lib/definitions';
import { Overlay } from '@/app/ui/overlay';
import { useWebSocket } from '@/app/lib/hooks/useWebSocket';
import { useInfor } from '@/app/lib/hooks/useInfor';
import { Selection } from '@/app/ui/login/selection';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    
    const selectedImgIndexRef = useRef('');
    const playerNameInputRef = useRef<HTMLInputElement>(null);

    const { sendRequest, message } = useWebSocket();
    const { setYourInfor } = useInfor();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
        const request : Request = {
            action : 'login',
            data : {
                playerName: playerNameInputRef.current?.value || '',
                playerAvatar: selectedImgIndexRef.current
            }
        }
        
        sendRequest(request);
    };

    useEffect(()=> {
        if (message.type == 'assign' && message.data.id && message.data.playerName && message.data.playerAvatar &&  message.data.starNum) {
            const yourInforFromServer : PlayerInfor = {
                id : message.data.id,
                name : message.data.playerName,
                avatar : message.data.playerAvatar,
                starNum : message.data.starNum
            }
            setYourInfor(yourInforFromServer);
            router.replace('/tic-tac-toe/dashboard');
        }
    },[message])
    
    return (
        <>
            <Overlay/>
            <div className="flex flex-col gap-1 bg-pink-100 m-auto shadow-xl p-2 px-4 w-[600px] z-10">
                <div className="flex justify-between border-b-4 border-b-black mb-5">
                    <h1 className="text-3xl font-bold mr-2">Quick start <i className="text-5xl text-pink-500">easy</i></h1>
                </div>
                
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="mb-5" htmlFor="name">Your Name:<input className="ml-4" type="text" id="name" name="name" required ref={playerNameInputRef}/></label>
                    
                    <label>Select Avatar:</label>
                    <Selection selectedImgIndexRef={selectedImgIndexRef}/>

                    <button className="w-1/2 h-8 mx-auto mt-3 bg-red-200" type="submit">Let's Go</button>
                </form>
            </div>
        </>
    );
}