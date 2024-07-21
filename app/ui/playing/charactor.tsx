'use client'

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { Request, PlayerInfor, State } from '@/app/lib/definitions';


interface CharactorProps {
    className?: string;
    playerInfor: PlayerInfor;
    situation: 'me' | 'enemy';
    animation: boolean;
}

export function Charactor({situation, playerInfor, animation} : CharactorProps) {
    return ( 
        <div className="flex flex-col justify-center items-center text-4xl font-bold gap-3 border-4 border-orange-500 p-4">
            <p className="text-center">{playerInfor.name}</p>
            <div className={clsx('charactor', situation, {'animate' : animation == true})}>
                <Image
                    className="w-[80%] h-[80%]"
                    src={"/asset/avatar-icon/"+ playerInfor.avatar + ".png"}
                    alt="Avatar Image"
                    width="60"
                    height="80"
                />
            </div>
            <p>{playerInfor.starNum}</p>
        </div>
    );
}

