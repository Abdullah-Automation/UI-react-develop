export interface ITranslation {
  project: string;
  language: string;
  status: string;
}

export interface ITranslationProject {
  projectId: string;
}

export interface IUpdateTranslation {
  language: string;
  transcription: string;
  content: string;
}

export interface IRegenerateTranslation {
  transcriptionId: string;
  translationId: string;
}

export interface ITranslateContent {
  content: string;
}
