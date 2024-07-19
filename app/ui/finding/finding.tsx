'use client'

import clsx from 'clsx';
import Image from 'next/image';
import {State} from '@/app/lib/definitions';
import {Overlay} from '@/app/ui/overlay';

interface FindingProps {
    className?: string;
    setState: ({now}: State) => void;
}

export function Finding({className, setState} : FindingProps) {
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
                />
                <button className="absolute top-3/4 bg-blue-200 p-2 rounded-lg" onClick={()=>setState({now:'dashboard'})}>Stop Finding</button>
            </div>
        </>
    );
}