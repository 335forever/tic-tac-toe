'use client'

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { Request, PlayerInfor, State, MatchStatus } from '@/app/lib/definitions';
import { Charactor } from '@/app/ui/playing/charactor';


interface PlayingProps {
    className?: string;
    yourInfor: PlayerInfor;
    enemyInfor: PlayerInfor;
    matchStatus: MatchStatus;
    sendRequest: ({action,data}: Request) => void;
    setState: (state: State) => void;
}

export function Playing( { className, yourInfor, enemyInfor, matchStatus, sendRequest, setState}: PlayingProps) {
    

    return (
        <div className="fixed flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-500 p-4">
            <Charactor
                playerInfor={yourInfor}
                situation="me"
                animation={yourInfor.id == matchStatus.turn}
            />
            <Charactor
                playerInfor={enemyInfor}
                situation="enemy"
                animation={enemyInfor.id == matchStatus.turn}
            />
        </div>
    );
}