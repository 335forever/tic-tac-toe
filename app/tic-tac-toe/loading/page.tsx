'use client'

import clsx from 'clsx';
import Image from 'next/image';
import {Overlay} from '@/app/ui/overlay';

export default function Page() {
    return (
        <>
            <Overlay/>
            <div className="fixed flex justify-center items-center w-60 h-60 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                <Image
                    className="scale-150"
                    src="/asset/loading.gif" 
                    alt="Searching" 
                    width="600" 
                    height="600"
                />
            </div>
        </>
    );
}