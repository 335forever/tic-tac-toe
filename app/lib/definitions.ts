export type State = 'login' | 'dashboard' | 'finding' | 'result' | 'playing' | 'loading';

export interface PlayerInfor {
  id?: string | undefined;
  name?: string | undefined;
  avatar?: string | undefined;
  starNum?: number | undefined;
};

export type Message = {
  id : string;
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

type tick = 'X' | 'O';

export type MatchStatus = {
  matchId?: string | undefined;
  tableSize?: Size | undefined;
  nextTurn?: string | undefined;
  nextMark?: tick | undefined;
  moved?: Move[] | undefined ;
  winner?: string | undefined;
}