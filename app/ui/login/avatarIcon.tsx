import clsx from 'clsx';
import Image from 'next/image';

interface AvatarIconProps {
    index : string;
    selectedIndex : string;
    setSelectedIndex : (index : string) => void;
}

export function AvatarIcon({index, selectedIndex , setSelectedIndex} : AvatarIconProps) {
    return (
        <div className={clsx('bg-white rounded-xl p-2 border-4', {'border-4 border-orange-400' : index == selectedIndex})}>
            <Image
                src={"/asset/avatar-icon/"+ index + ".png"}
                alt=""
                width="80"
                height="80"
                className=""
                onClick={() => setSelectedIndex(index)}
                draggable="false"
            />
        </div>
    )
}