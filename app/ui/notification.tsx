'use client'

import { useState, useEffect } from 'react';

export function Notification({ message }: { message: string }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed w-1/3 h-20 bg-blue-200 top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-green-500 rounded-lg flex flex-col justify-center items-center font-bold text-3xl">
            {message}
        </div>
    );
}
