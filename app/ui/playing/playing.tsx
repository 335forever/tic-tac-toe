'use client'

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { Request, PlayerInfor, State, MatchStatus } from '@/app/lib/definitions';
import { Charactor } from '@/app/ui/playing/charactor';
import { Table } from '@/app/ui/playing/table';


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
        <div className="fixed flex top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full items-center justify-center">
            {/* <Charactor
                playerInfor={yourInfor}
                situation="me"
                animation={yourInfor.id == matchStatus.turn}
            />
            <Charactor
                playerInfor={enemyInfor}
                situation="enemy"
                animation={enemyInfor.id == matchStatus.turn}
            /> */}
            <Table
                matchStatus={matchStatus}
            />
        </div>
    );
}