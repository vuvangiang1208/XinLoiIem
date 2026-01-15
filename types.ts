
export interface LetterContent {
  greeting: string;
  body: string[];
  closing: string;
  signature: string;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  DISPLAYING = 'DISPLAYING',
  ERROR = 'ERROR'
}
