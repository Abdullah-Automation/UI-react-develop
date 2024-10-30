export interface ITranscription {
  language: string;
  content: string;
  baseContent: string;
  speakers: string[];
}

export interface IUpdateTranscription {
  language?: string;
  content?: string;
  speakers?: string[];
  ignoredPronunciationWords?: string[];
}

export interface ISegmentDelete {
  id: string;
}

export interface IWordDetail {
  word: string;
  startTime: number;
  endTime: number;
  startOffset: number;
  endOffset: number;
}

export interface ISegment {
  leadingSegmentId: string;
  trailingSegmentId: string;
  editOperationType?: String;
  speaker: string;
  content: string;
  startTime: number;
  endTime: number;
}

export interface IUpdateSegment extends ISegment {
  id: string;
}
