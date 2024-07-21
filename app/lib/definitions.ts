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

export type Size = {
  m : number;
  n : number;
}

export type Position = {
  x : number;
  y : number;
}

export type Move = {
  playerId : string;
  position : Position;
  mark : 'X' | 'O';
}

export type MatchStatus = {
  matchId : string;
  tableSize : Size;
  nextTurn : string;
  nextMark : 'X' | 'O';
  moved : Move[];
}