import { QueryKey } from 'react-query';

export interface IProject {
  name: string;
  projectType: string;
  content: string;
}

export interface IUpdateProject {
  name?: string;
  isDeleted?: boolean;
  pronunciationWords?: string[];
}

export interface ITranscribe {
  fileUuid: string;
  fileKey: string;
  name: string;
  filenameToReturn: string;
  language: string;
  contentDuration: number;
  thumbnail: string;
}

export interface IProjectCollaborationRole {
  id: string;
  name: string;
  permissions: Array<string>;
}

export interface IProjectCollaborations {
  status: string;
  project: string;
  inviter: string;
  inviteeEmail: string;
  role: IProjectCollaborationRole;
  createdAt: string;
  updatedAt: number;
  id: string;
}

export interface IQueryKeyProps {
  queryKey: QueryKey;
}

export interface ICopyUrlParams {
  usp: string;
  token: string;
  uid: string;
  rid: string;
}

export interface ItranscriptionVariant {
  code: string;
  label: string;
}
