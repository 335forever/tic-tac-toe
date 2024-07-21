'use client'

import {useEffect, useState} from 'react'
import {LoginForm} from '@/app/ui/login/loginForm';
import {DashBoard} from '@/app/ui/dashboard/dashboard';
import {Finding} from '@/app/ui/finding/finding';
import {Playing} from '@/app/ui/playing/playing';
import {Loading} from '@/app/ui/loading';
import {State, PlayerInfor, MatchStatus } from '@/app/lib/definitions';
import { useWebSocket } from '@/app/lib/utils';

export default function Page() {
  const [state, setState] = useState<State>('login');
  const [content, setContent] = useState<React.ReactNode>();

  const { isConnected, message, sendRequest } = useWebSocket('ws://localhost:8080');
  
  const [yourInfor, setYourInfor] = useState<PlayerInfor>();
  const [enemyInfor, setEnemyInfor] = useState<PlayerInfor>();

  const [matchStatus, setMatchStatus] = useState<MatchStatus>();
  
  const [onlineNum, setOnlineNum] = useState<number>(0);


  // Nghe thong tin tu server
  useEffect(() => {
    if (message) console.log('Server send:', message.type);
    
    // Cap nhat so luong nguoi dang online
    if (message && message.type == 'online_num') {
      setOnlineNum(message.data.num || 0);
    };
    
    // Nhan thong tin dang nhap tu server
    if (message && message.type == 'assign') {
      
      const inforFromServer : PlayerInfor = {
        id : message.data.id || '',
        name : message.data.playerName || 'Your Name',
        avatar : message.data.playerAvatar || '01',
        starNum : message.data.starNum || 100,
      }
      
      setYourInfor(inforFromServer);
      setState('dashboard');
    };
    
    // Bat dau tran dau
    if (message && message.type == 'match_start') {
      const {matchId, turn , tableSize , move , tick} = {...message.data.matchStatus}

      const {id, name, avatar, starNum} = {...message.data.enemyInfor}
      
      if (matchId && turn && tableSize && move && tick && id && name && avatar && starNum) {
        const newMatchStatus : MatchStatus = {matchId, turn , tableSize , move , tick};
        setMatchStatus(newMatchStatus);
        
        const enemyInfor : PlayerInfor = {id, name, avatar, starNum};
        setEnemyInfor(enemyInfor);
        
        setState('playing');
      }
       
    };

    
  }, [message]);


  // Chuyen trang thai
  useEffect(() => {
    if (state == 'login')  
      setContent(
        <LoginForm 
          setState={setState}
          sendRequest={sendRequest}
        />
      );
    
    if (state == 'dashboard') {
      if (yourInfor) setContent(
        <DashBoard 
          yourInfor={yourInfor}
          setState={setState}
          sendRequest={sendRequest}
        />
      );
    }

    if (state == 'finding')
      setContent(
        <Finding
          setState={setState}
          sendRequest={sendRequest}
        />
      );
    if (state == 'playing') {
      if (yourInfor && enemyInfor && matchStatus) setContent(
        <Playing
          setState={setState}
          sendRequest={sendRequest}
          yourInfor={yourInfor}
          enemyInfor={enemyInfor}
          matchStatus={matchStatus}
        />
      );
    }
    if (state == 'loading')
        setContent(
          <Loading/>
      );
  }, [state]);

  return (
    <>
      {content}

      {isConnected ? <div className="flex justify-center items-center fixed bottom-0 right-0 w-40 h-10 bg-green-300 gap-1"><span>{onlineNum}</span>player online</div> : <div className="flex justify-center items-center fixed bottom-0 right-0 w-40 h-10 bg-green-300 gap-1">Server not ready</div>}
      
    </>
  );
}
