export type State = {
  now: 'login' | 'dashboard' | 'finding' | 'result'
}

export interface PlayerInfor {
  id: string;
  name: string;
  avatar: string;
  starNum: number;
}

export type Message = {
  type : string;
  data : {
    num?: number;
    
    id?: string;
    playerName?: string;
    playerAvatar?: string;
    starNum?: number;
  }
}

export type Request = {
  action : string;
  data : {}
}