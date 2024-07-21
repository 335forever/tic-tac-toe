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
  console.log('Render Page')
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
      const {matchId, tableSize, nextTurn , nextMark , moved} = {...message.data.matchStatus}

      const {id, name, avatar, starNum} = {...message.data.enemyInfor}
      
      if (matchId && tableSize && nextTurn && nextMark && moved && id && name && avatar && starNum) {
        const newMatchStatus : MatchStatus = {matchId, tableSize, nextTurn , nextMark , moved};
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
      if (1) setContent(
        <Playing
          setState={setState}
          sendRequest={sendRequest}
          yourInfor={yourInfor || {name:'',id:'0',avatar:'01',starNum:100}}
          enemyInfor={enemyInfor || {name:'',id:'1',avatar:'02',starNum:100}}
          matchStatus={matchStatus || {tableSize:{m:5,n:5},matchId:'1',nextMark:'X',nextTurn:'1',moved:[{playerId:'1',position:{x:2,y:2},mark:'X'},{playerId:'1',position:{x:1,y:2},mark:'O'}]}}
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
