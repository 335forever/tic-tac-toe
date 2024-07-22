'use client'

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Request, PlayerInfor, State, MatchStatus } from '@/app/lib/definitions';
import { Charactor } from '@/app/ui/playing/charactor';
import { Table } from '@/app/ui/playing/table';
import { useInfor } from '@/app/lib/hooks/useInfor';
import { useWebSocket } from '@/app/lib/hooks/useWebSocket';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { yourInfor, enemyInfor, matchStatus } = useInfor();
    const { message, sendRequest } = useWebSocket();

    const router = useRouter();
    
    useEffect(() => {
        if (message.type == 'enemy_quit') router.replace('/tic-tac-toe/dashboard');
    }, [message]);

    return (
        <div className="fixed flex top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full items-center justify-center">
            <Charactor
                playerInfor={yourInfor}
                situation="me"
                animation={yourInfor?.id == matchStatus?.nextTurn}
            />

            <Table
                matchStatus={matchStatus}
            />             
            
            <Charactor
                playerInfor={enemyInfor}
                situation="enemy"
                animation={enemyInfor?.id == matchStatus?.nextTurn}
            />
        </div>
    );
}