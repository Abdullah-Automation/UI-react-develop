import { AxiosInstance } from 'axios';

import { voicesUrl } from '~/config';

import { axios } from '../axiosInstance';
import { IQueryKeyProps } from '../Projects';

import { IVoice } from './VoicesSchema';

class Voices {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  getVoices = async ({ queryKey }: IQueryKeyProps): Promise<any> =>
    this.requestInstance.get(voicesUrl.CREATE_VOICE, {
      params: queryKey[1],
    });

  createVoice = async (param: IVoice): Promise<any> =>
    this.requestInstance.post(voicesUrl.CREATE_VOICE, param);

  getVoiceById = async (voiceId: string, queryKeys: any): Promise<any> =>
    this.requestInstance.get(voicesUrl.GET_VOICE(voiceId), {
      params: queryKeys,
    });

  updateVoice = async (voiceId: string, param: IVoice): Promise<any> =>
    this.requestInstance.patch(voicesUrl.GET_VOICE(voiceId), param);

  deleteVoice = async (voiceId: string): Promise<any> =>
    this.requestInstance.delete(voicesUrl.GET_VOICE(voiceId));
}

export const VoicesApi = new Voices(axios);
