export interface IContent {
  owner: string;
  language: string;
  contentDuration: number;
  contentURI: string;
  contentType: string;
}

export interface IContents {
  owner: string;
  sortBy: string;
  limit: number;
  page: number;
}

export interface IUpdateContent {
  contentDuration: string;
  contentURI: string;
}
