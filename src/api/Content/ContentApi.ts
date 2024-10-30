import { AxiosInstance } from 'axios';

import { contentUrl } from '~/config';

import { axios } from '../axiosInstance';

import { IContent, IContents, IUpdateContent } from './ContentSchema';

class Content {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createContent = async (param: IContent): Promise<any> =>
    this.requestInstance.post(contentUrl.CREATE_CONTENT, param);

  updateContent = async (
    contentId: string,
    param: IUpdateContent
  ): Promise<any> =>
    this.requestInstance.patch(contentUrl.UPDATE_CONTENT(contentId), param);

  getContents = async (param: IContents): Promise<any> =>
    this.requestInstance.get(contentUrl.GET_CONTENTS(param));

  getContentById = async (contentId: string): Promise<any> =>
    this.requestInstance.get(contentUrl.GET_CONTENT_BY_ID(contentId));
}

export const ContentApi = new Content(axios);
