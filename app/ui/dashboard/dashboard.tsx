'use client'

import React, { useState, useEffect, FormEvent} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import {PlayerInfor, State} from '@/app/lib/definitions';


interface DashBoardProps {
    className?: string;
    yourInfor: PlayerInfor;
    setState: ({now}: State) => void;
}

export function DashBoard({className, yourInfor, setState} : DashBoardProps) {
   
    return (
        <div className="flex mx-auto w-screen max-w-screen-sm border-4 border-red-400">
            <div className="flex flex-col items-center w-1/2 bg-pink-300 border-r-4  border-r-green-300">
                <p className="text-4xl font-bold mt-2">{yourInfor.name}</p>
                <Image 
                    className="w-3/4 border-4 border-green-600 rounded-lg bg-white mt-2"
                    src={"/asset/avatar-icon/" + yourInfor.avatar + ".png"}
                    width="120"     
                    height="120" 
                    alt="Your Avatar"/>
                <div className="flex items-center">
                    <p className="text-3xl font-bold">{yourInfor.starNum}</p>
                    <Image src="/asset/star.png" width="60" height="60" alt="Star Icon"/>
                </div>

                <div className="flex justify-center gap-3">
                    <button className="bg-blue-300 p-2 rounded-lg items-end" onClick={()=>setState({now:'login'})}>Sign again</button>
                    <button className="bg-green-300 p-2 rounded-lg items-end" onClick={()=>setState({now:'finding'})}>Find match now</button>
                </div>

            </div>
            
            <div className="flex flex-col items-center w-1/2 bg-blue-100">
                <p className="text-4xl font-bold my-2">Best player today</p>
                <div className="flex w-5/6 justify-between items-center bg-red-300 pl-2 mb-2 rounded-lg">
                    <p className="text-xl">Player 1</p>
                    <div className="flex flex-row justify-between items-center">
                        <span className="">10000</span>
                        <Image src="/asset/star.png" width="60" height="60" alt="Star Icon"/>
                    </div>
                </div>
                <div className="flex w-5/6 justify-between items-center bg-red-300 pl-2 mb-2 rounded-lg">
                    <p className="text-xl">Player 1</p>
                    <div className="flex flex-row justify-between items-center">
                        <span className="">10000</span>
                        <Image src="/asset/star.png" width="60" height="60" alt="Star Icon"/>
                    </div>
                </div>
                <div className="flex w-5/6 justify-between items-center bg-red-300 pl-2 mb-2 rounded-lg">
                    <p className="text-xl">Player 1</p>
                    <div className="flex flex-row justify-between items-center">
                        <span className="">10000</span>
                        <Image src="/asset/star.png" width="60" height="60" alt="Star Icon"/>
                    </div>
                </div>
                <div className="flex w-5/6 justify-between items-center bg-red-300 pl-2 mb-2 rounded-lg">
                    <p className="text-xl">Player 1</p>
                    <div className="flex flex-row justify-between items-center">
                        <span className="">10000</span>
                        <Image src="/asset/star.png" width="60" height="60" alt="Star Icon"/>
                    </div>
                </div>
                <div className="flex w-5/6 justify-between items-center bg-red-300 pl-2 mb-2 rounded-lg">
                    <p className="text-xl">Player 1</p>
                    <div className="flex flex-row justify-between items-center">
                        <span className="">10000</span>
                        <Image src="/asset/star.png" width="60" height="60" alt="Star Icon"/>
                    </div>
                </div>     
            </div>
        </div>
    );
}