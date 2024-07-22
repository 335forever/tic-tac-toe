import React, { useState, useEffect, FormEvent, useRef, useMemo} from 'react';
import { AvatarIcon } from './avatarIcon';

interface SelectionProps {
    selectedImgIndexRef : React.MutableRefObject<string>;
}

export function Selection({selectedImgIndexRef} : SelectionProps) {
    const [indexList, setIndexList] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<string>('');

    useEffect(()=>{
        let selection = [];
    
        for (let i = 1; i <= 50; i++) {
            selection.push(i < 10 ? `0${i}` : `${i}`);
        }
        
        for (let i = selection.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [selection[i], selection[j]] = [selection[j], selection[i]];
        }
        
        setIndexList(selection.slice(0, 9));
        setSelectedIndex(selection[0]);
    },[]);

    useEffect(() => {
        selectedImgIndexRef.current = selectedIndex;
    }, [selectedIndex]);
    
    return (
        <div className="grid grid-cols-3 justify-items-center gap-2 w-fit mx-auto">
            {
                indexList.map(index => {
                    return (
                        <AvatarIcon key={index} index={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
                    )
                })
            }
        </div>
    )
}