'use client'

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { Request, PlayerInfor, State, MatchStatus, Position} from '@/app/lib/definitions';
import TableCell from '@/app/ui/playing/tableCell';

interface TableProps {
    className?: string;
    playerInfor?: PlayerInfor;
    situation?: 'me' | 'enemy';
    animation?: boolean;
    matchStatus: MatchStatus;
}

export function Table({matchStatus, situation, playerInfor, animation} : TableProps) {
    const moved = new Map<string,string>() ;
    matchStatus.moved.forEach((move)=>{
        const position = move.position.x + '_' + move.position.y;
        moved.set(position,move.mark);
    });

    const createTable = (m : number, n : number) => {
        const table = [];
        for (let i = 0; i < m; i++) {
            const row = [];
            for (let j = 0; j < n; j++) {
                const position = i + '_' + j;
                const mark = moved.get(position) || 'none';
                const cell = (
                    <TableCell
                      key={position}
                      src={src}
                    />
                  );
                row.push(cell);
            }
            const rowELement = <div key={i}
                className="flex flex-row justify-center items-center">{row}</div>
            table.push(rowELement);
        }

        return table;
    };
    
    return ( 
        <div className="flex flex-col justify-center items-center border-4 border-orange-400 rounded-md">
            {createTable(matchStatus.tableSize.m, matchStatus.tableSize.n)}
        </div>
    );
}

