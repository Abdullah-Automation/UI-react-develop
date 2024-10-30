import { AxiosInstance } from 'axios';

import { uploadsUrl } from '~/config';

import { axios } from '../axiosInstance';

import {
  InitializeUploadSchema,
  IUpload,
  IPreSignedUrls,
  PartsSchema,
  IFinalizeUpload,
} from './UploadsSchema';

class Uploads {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  initializeMultiPartUpload = async (
    param: IUpload
  ): Promise<InitializeUploadSchema> =>
    this.requestInstance.post(uploadsUrl.INITIALIZE_MULTIPART_UPLOAD, param);

  getMultipartPreSignedUrls = async (
    param: IPreSignedUrls
  ): Promise<PartsSchema> =>
    this.requestInstance.post(uploadsUrl.GET_MULTIPART_PRESIGNED_URLS, param);

  finalizeMultipartUpload = async (param: IFinalizeUpload): Promise<any> =>
    this.requestInstance.post(uploadsUrl.FINALIZE_MULTIPART_UPLOAD, param);
}

export const UploadsApi = new Uploads(axios);
