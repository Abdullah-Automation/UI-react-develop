export interface ITransaction {
  userOperation: string;
  user: string;
  team: string;
  project: string;
  content: string;
  transcription: string;
  translation: string;
  dub: string;
  executionDuration: number;
  message: string;
  start: string;
  end: string;
}
