'use client'

import clsx from 'clsx';
import Image from 'next/image';
import {State, Request} from '@/app/lib/definitions';
import {Overlay} from '@/app/ui/overlay';

interface FindingProps {
    className?: string;
    setState: (state: State) => void;
    sendRequest: ({action,data}: Request) => void;
}

export function Finding({className, setState, sendRequest} : FindingProps) {
    const handleExitFindAction = () => {
        setState('dashboard');

        const request : Request = {
            action : 'exit_find',
            data : {}
        }

        sendRequest(request);
    }
    
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
                    unoptimized
                />
                <button className="absolute top-3/4 bg-blue-200 p-2 rounded-lg" onClick={handleExitFindAction}>Stop Finding</button>
            </div>
        </>
    );
}