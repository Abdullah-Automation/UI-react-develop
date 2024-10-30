import { AxiosInstance } from 'axios';

import { collaborationsUrl } from '~/config';

import { axios } from '../axiosInstance';

import {
  ICollaboration,
  ICollaborationRole,
  IGenerateSharingLink,
  ICollaborations,
  IUpdateCollaboration,
} from './CollaborationsSchema';

class Collaborations {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createCollaboration = async (param: ICollaboration): Promise<any> =>
    this.requestInstance.post(
      collaborationsUrl.CREATE_USER_COLLABORATIONS,
      param
    );

  updateCollaboration = async (
    collaborationId: string,
    param: IUpdateCollaboration
  ): Promise<any> =>
    this.requestInstance.patch(
      collaborationsUrl.UPDATE_COLLABORATION(collaborationId),
      param
    );

  generateSharingLink = async (param: IGenerateSharingLink): Promise<any> =>
    this.requestInstance.post(collaborationsUrl.GENERATE_SHARING_LINK, param);

  deleteSharedProject = async (param: { projectId: string }): Promise<any> =>
    this.requestInstance.delete(collaborationsUrl.DELETE_SHARED_PROJECT, {
      data: param,
    });

  getCollaborations = async (queryKeys: ICollaborations): Promise<any> =>
    this.requestInstance.get(collaborationsUrl.GET_COLLABORATIONS, {
      params: queryKeys,
    });

  getCollaborationRoles = async (): Promise<ICollaborationRole[]> =>
    this.requestInstance.get(collaborationsUrl.GET_COLLABORATION_ROLES);
}

export const CollaborationsApi = new Collaborations(axios);
