import { AxiosInstance } from 'axios';

import { usersUrl } from '~/config';

import { axios } from '../axiosInstance';

import { ConversationSchema } from './ConversationsSchema';

class Conversations {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  getAllUsers = async (): Promise<ConversationSchema> =>
    this.requestInstance.get(usersUrl.GETALLUSERS);
}

export const ConversationsApi = new Conversations(axios);
