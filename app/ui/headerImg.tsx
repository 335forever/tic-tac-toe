import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

export function HeaderImg( {className} : {className ?: string}) {
    return (
        <Image
            src="/asset/ttt.gif"
            width={1200}
            height={300}
            className={clsx(
                'block w-1/2 ' 
                + className
            )}
            alt="Header image"
            draggable="false"
            priority
        />
    );
}