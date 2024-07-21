'use client'

import React, { useState, useEffect, FormEvent} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { generateRandomSelection } from '@/app/lib/utils';
import { Request, State } from '@/app/lib/definitions';
import {Overlay} from '@/app/ui/overlay';

interface LoginFormProps {
    className?: string;
    setState: (state: State) => void;
    sendRequest: ({action,data}: Request) => void;
  }

export function LoginForm( { className,  setState, sendRequest}: LoginFormProps) {
    
    const [playerNameInput, setPlayerNameInput] = useState('');
    const [avatarImgIndex, setAvatarImgIndex] = useState<string[]>([]);
    const [selectedImgIndex, setSelectedImgIndex] = useState('');

    useEffect(() => {
        const initialAvatarImgIndex = generateRandomSelection();
        setAvatarImgIndex(initialAvatarImgIndex);
        
        setSelectedImgIndex(initialAvatarImgIndex[0]);
    }, []);


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
        const request : Request = {
            action : 'login',
            data : {
                playerName: playerNameInput,
                playerAvatar: selectedImgIndex
            }
        }
        
        sendRequest(request);
        
        setState('loading');
    };

    return (
        <>
            <Overlay/>
            <div className="flex flex-col gap-1 bg-pink-100 m-auto shadow-xl p-2 px-4 w-[600px] z-10">
                <div className="flex justify-between border-b-4 border-b-black mb-5">
                    <h1 className="text-3xl font-bold mr-2">Quick start <i className="text-5xl text-pink-500">easy</i></h1>
                </div>
                
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="mb-5" htmlFor="name">Your Name:<input className="ml-4" type="text" id="name" name="name" required onChange={(event)=>{setPlayerNameInput(event.target.value)}}/></label>
                    
                    <label>Select Avatar:</label>
                    <div className="grid grid-cols-3 justify-items-center gap-2 w-fit mx-auto">
                        {
                            avatarImgIndex.map((index) => {
                                return (
                                    <div className={clsx('bg-white rounded-xl p-2 border-4', {'border-4 border-orange-400' : index == selectedImgIndex})}>
                                        <Image
                                            key={index}
                                            src={"/asset/avatar-icon/"+ index + ".png"}
                                            alt=""
                                            width="80"
                                            height="80"
                                            className=""
                                            onClick={() => setSelectedImgIndex(index)}
                                            draggable="false"
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>

                    <button className="w-1/2 h-8 mx-auto mt-3 bg-red-200" type="submit">Let's Go</button>
                </form>
            </div>
        </>
    );
}