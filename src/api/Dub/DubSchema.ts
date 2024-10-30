export interface IDub {
  contentId: string;
  translationId: string;
  status: string;
  language: string;
  voiceMatchingMode: string;
}

export interface IRegenDub {
  contentId: string;
  translationId: string;
  dubId: string;
  segmentLevel: boolean;
}

export interface IUpdateDub {
  audioURI: string;
  videoURI: string;
  audioEncoding: string;
  videoEncoding: string;
  audioDuration: number;
  videoDuration: number;
  status: string;
}

export interface IRegenerateDub {
  contentId: string;
  translationId: string;
  dubId: string;
}
