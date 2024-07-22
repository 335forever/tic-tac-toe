'use client'

import React, { useState, useContext, createContext, ReactNode } from 'react';
import { PlayerInfor, MatchStatus } from '@/app/lib/definitions';


interface InforContextType {
    yourInfor : PlayerInfor | undefined;
    setYourInfor: (playerInfor : PlayerInfor) => void;
    
    enemyInfor : PlayerInfor | undefined;
    setEnemyInfor: (playerInfor : PlayerInfor) => void;

    matchStatus : MatchStatus | undefined;
    setMatchStatus: (matchStatus : MatchStatus) => void;
}

const InforContext = createContext<InforContextType | undefined>(undefined);

export const InforProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [yourInfor, setYourInfor] = useState<PlayerInfor>();
    const [enemyInfor, setEnemyInfor] = useState<PlayerInfor>();
    const [matchStatus, setMatchStatus] = useState<MatchStatus>();
  
    return (
        <InforContext.Provider value={{yourInfor, setYourInfor, enemyInfor, setEnemyInfor, matchStatus, setMatchStatus }}>
        {children}
        </InforContext.Provider>
    );
};

export const useInfor = (): InforContextType => {
  const context = useContext(InforContext);
  if (!context) {
    throw new Error('useInfor must be used within a InforProvider');
  }
  return context;
};
