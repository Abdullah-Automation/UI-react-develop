import { AxiosInstance } from 'axios';

import { translationUrl } from '~/config';
import { ISegment } from '~/api';

import { axios } from '../axiosInstance';

import {
  IRegenerateTranslation,
  ITranslateContent,
  ITranslation,
  IUpdateTranslation,
} from './TranslationSchema';

class Translation {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createTranslation = async (param: ITranslation): Promise<any> =>
    this.requestInstance.post(translationUrl.CREATE_TRANSLATION, param);

  updateTranslation = async (
    translationId: string,
    param: IUpdateTranslation
  ): Promise<any> =>
    this.requestInstance.patch(
      translationUrl.UPDATE_TRANSLATION(translationId),
      param
    );

  bulkUpdateTranslationSegments = async (
    translationId: string,
    param: any[]
  ): Promise<any> =>
    this.requestInstance.post(
      translationUrl.BULK_UPDATE_TRANSlATION_SEGMENTS(translationId),
      param
    );

  editTranslationSegment = async (
    translationId: string,
    param: ISegment[]
  ): Promise<any> =>
    this.requestInstance.post(
      translationUrl.EDIT_TRANSLATION_SEGMENT(translationId),
      param
    );

  processTranslationSRT = async (translationId: string): Promise<any> =>
    this.requestInstance.post(
      translationUrl.PROCESS_TRANSLATION_SRT(translationId)
    );

  processTranslationSegments = async (translationId: string): Promise<any> =>
    this.requestInstance.post(
      translationUrl.PROCESS_TRANSLATION_SEGMENTS(translationId)
    );

  uploadTranslationSegments = async (
    translationId: string,
    file: File // Change the type of the param to File
  ): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data

    // Use the form data as the body of the POST request
    return this.requestInstance.post(
      translationUrl.UPLOAD_TRANSlATION_SEGMENTS(translationId),
      formData,
      {
        headers: {
          // Inform the server about the multipart form data
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };

  regenerateTranslation = async (param: IRegenerateTranslation): Promise<any> =>
    this.requestInstance.post(translationUrl.REGENERATE_TRANSlATION(), param);

  translateContent = async (param: ITranslateContent): Promise<any> =>
    this.requestInstance.post(translationUrl.TRANSLATE_CONTENT(), param);

  getTranslations = async (param: string): Promise<any> =>
    this.requestInstance.get(translationUrl.GET_TRANSLATIONS(param));

  getTranslationById = async (translationId: string): Promise<any> =>
    this.requestInstance.get(translationUrl.GET_TRANSLATION(translationId));
}

export const TranslationApi = new Translation(axios);
