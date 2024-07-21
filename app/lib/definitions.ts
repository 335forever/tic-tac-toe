export type State = 'login' | 'dashboard' | 'finding' | 'result' | 'playing' | 'loading';

export interface PlayerInfor {
  id: string;
  name: string;
  avatar: string;
  starNum: number;
};

export type Message = {
  type : string;
  data : {
    num?: number;
    
    id?: string;
    playerName?: string;
    playerAvatar?: string;
    starNum?: number;

    enemyInfor?: PlayerInfor;
    matchStatus?: MatchStatus;
  }
};

export type Request = {
  action : string;
  data : {}
};

export type size = {
  m : number;
  n : number;
}

export type position = {
  x : number;
  y : number;
}

export type MatchStatus = {
  matchId : string;
  turn : string;
  tableSize : size;
  move : position[];
  tick : 'X' | 'O';
}