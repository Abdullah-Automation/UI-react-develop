export interface ICollaboration {
  projectId: string;
  inviteeEmail: string;
  collaborationRoleId: string;
}

export interface IUpdateCollaboration {
  collaborationRoleId: string;
  status: string;
  resend: boolean;
}

export interface ICollaborationRole {
  id: string;
  name: string;
}

export interface IGenerateSharingLink {
  projectId: string;
}

export interface IDeleteSharedProject {
  projectId: string;
}

export interface ICollaborations {
  projectId: string;
  direction: string;
}
