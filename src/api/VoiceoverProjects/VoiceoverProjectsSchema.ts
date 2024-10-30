export interface IVoiceoverProject {
  textToSpeech?: string;
  name?: string;
  lastAccessed?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

export interface IVoiceoverWithTextToSpeech {
  name?: string;
  isDeleted?: boolean;
  generateOnSave?: boolean;
  voiceoverProjectType?: string;
  textToSpeech?: {
    id?: string;
    medias?: any[];
    status?: string;
    language?: string;
    voice?: string;
    text?: string;
  };
}
