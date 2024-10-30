import { AxiosInstance } from 'axios';

import { textToSpeechUrl } from '~/config';

import { axios } from '../axiosInstance';

import { ITextToSpeech } from './TextToSpeechSchema';

class TextToSpeech {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createTextToSpeech = async (param: ITextToSpeech): Promise<any> =>
    this.requestInstance.post(textToSpeechUrl.CREATE_TEXT_TO_SPEECH, param);

  getTextToSpeechById = async (
    textToSpeechesId: string,
    queryKeys?: any
  ): Promise<any> =>
    this.requestInstance.get(
      textToSpeechUrl.GET_TEXT_TO_SPEECH(textToSpeechesId),
      {
        params: queryKeys,
      }
    );

  updateTextToSpeech = async (
    textToSpeechesId: string,
    param: ITextToSpeech
  ): Promise<any> =>
    this.requestInstance.patch(
      textToSpeechUrl.GET_TEXT_TO_SPEECH(textToSpeechesId),
      param
    );

  deleteAndCreateTextToSpeech = async (
    textToSpeechesId: string,
    param: any[]
  ): Promise<any> =>
    this.requestInstance.post(
      textToSpeechUrl.DELETE_RECREATE_TEXT_TO_SPEECH(textToSpeechesId),
      param
    );

  generateTextToSpeech = async (
    texttospeecheId: string,
    id: string
  ): Promise<any> =>
    this.requestInstance.post(
      textToSpeechUrl.GENERATE_TEXT_TO_SPEECH(texttospeecheId, id),
      {},
      {
        responseType: 'arraybuffer',
      }
    );
}

export const TextToSpeechApi = new TextToSpeech(axios);
