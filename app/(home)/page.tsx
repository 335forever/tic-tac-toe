'use client'

import {useEffect, useState} from 'react'
import {LoginForm} from '@/app/ui/login/loginForm';
import {DashBoard} from '@/app/ui/dashboard/dashboard';
import {Finding} from '@/app/ui/finding/finding';
import {Notification} from '@/app/ui/notification';
import {State, PlayerInfor, Message} from '@/app/lib/definitions';
import { useWebSocket } from '@/app/lib/utils';

export default function Page() {
  const [state, setState] = useState<State>({now: 'login'});
  const [content, setContent] = useState<React.ReactNode>();

  const { isConnected, message, sendRequest } = useWebSocket('ws://localhost:8080');
  
  const [yourInfor, setYourInfor] = useState<PlayerInfor>({id:'',name:'', avatar:'',starNum:0});
  const [onlineNum, setOnlineNum] = useState<number>(0)

  useEffect(() => {
    if (message) console.log('Server send:', message)
    // Cap nhat so luong nguoi dang online
    if (message && message.type == 'online_num') {
      setOnlineNum(message.data.num || 0);
    }
    // Nhan thong tin dang nhap tu server
    if (message && message.type == 'assign') {
      
      const inforFromServer : PlayerInfor = {
        id : message.data.id || '',
        name : message.data.playerName || 'Your Name',
        avatar : message.data.playerAvatar || '01',
        starNum : message.data.starNum || 100,
      }
      
      setYourInfor(inforFromServer);
      setState({now:'dashboard'});
    }
      
    
  }, [message]);


  // Chuyen trang thai
  useEffect(() => {
    if (state.now == 'login')  
      setContent(
        <LoginForm 
          sendRequest={sendRequest}
        />
      );
    
    if (state.now == 'dashboard') 
      setContent(
        <DashBoard 
          yourInfor={yourInfor}
          setState={setState}
        />
      );
    if (state.now == 'finding')
      setContent(
        <Finding
          setState={setState}
        />
      );
  }, [state]);

  return (
    <>
      {content}

      {isConnected ? <div className="flex justify-center items-center fixed bottom-0 right-0 w-40 h-10 bg-green-300 gap-1"><span>{onlineNum}</span>player online</div> : <div className="flex justify-center items-center fixed bottom-0 right-0 w-40 h-10 bg-green-300 gap-1">Server not ready</div>}
      
    </>
  );
}
