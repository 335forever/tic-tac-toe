'use client'

import React, { useState, useEffect, FormEvent} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { generateRandomSelection } from '@/app/lib/utils';
import { Request } from '@/app/lib/definitions';


interface LoginFormProps {
    className?: string;
    sendRequest: ({action,data}: Request) => void;
  }

export function LoginForm( { className, sendRequest}: LoginFormProps) {
    
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
    };

    return (
        <div className="flex flex-col gap-1 bg-pink-100 mx-auto shadow-xl p-2 px-4 border-4 border-green-300 w-[400px]">
            <div className="flex justify-between border-b-4 border-b-black w-full">
                <h1 className="text-2xl font-bold mr-2">Quick start <i className="text-4xl text-pink-500">easy</i></h1>
            </div>
            
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="name">Your Name:<input className="block  w-full" type="text" id="name" name="name" required onChange={(event)=>{setPlayerNameInput(event.target.value)}}/></label>
                
                <label>Select Avatar:</label>
                <div className="grid grid-cols-3 justify-items-center gap-4 w-2/3 mx-auto">
                    {
                        avatarImgIndex.map((index) => {
                            return (
                                <Image
                                    key={index}
                                    src={"/asset/avatar-icon/"+ index + ".png"}
                                    alt=""
                                    width="60"
                                    height="60"
                                    className={ clsx('bg-white rounded-xl',
                                                    {'border-4 border-orange-400' : index == selectedImgIndex})
                                    }
                                    onClick={() => setSelectedImgIndex(index)}
                                    draggable="false"
                                />
                            );
                        })
                    }
                </div>

                <button className="w-1/2 h-8 mx-auto mt-3 bg-red-200" type="submit">Let's Go</button>
            </form>
        </div>
    );
}