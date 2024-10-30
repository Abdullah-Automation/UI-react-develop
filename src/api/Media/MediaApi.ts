import { AxiosInstance } from 'axios';

import { mediaUrl } from '~/config';

import { axios } from '../axiosInstance';

import { IMediaPresigned } from './MediaSchema';

class Media {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  getMediaPresigned = async (param: IMediaPresigned): Promise<string> =>
    this.requestInstance.get(mediaUrl.GET_CONTENTS(param));
}

export const MediaApi = new Media(axios);
