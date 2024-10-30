import { AxiosInstance } from 'axios';

import { voiceoverProjectsUrl } from '~/config';

import { axios } from '../axiosInstance';
import { IQueryKeyProps } from '../Projects';

import {
  IVoiceoverProject,
  IVoiceoverWithTextToSpeech,
} from './VoiceoverProjectsSchema';

class VoiceoverProjects {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  getVoiceoverProjects = async ({ queryKey }: IQueryKeyProps): Promise<any> =>
    this.requestInstance.get(voiceoverProjectsUrl.CREATE_VOICEOVER_PROJECT, {
      params: queryKey[1],
    });

  createVoiceoverProject = async (param: IVoiceoverProject): Promise<any> =>
    this.requestInstance.post(
      voiceoverProjectsUrl.CREATE_VOICEOVER_PROJECT,
      param
    );

  createVoiceoverWithTextToSpeech = async (
    param: IVoiceoverWithTextToSpeech
  ): Promise<any> =>
    this.requestInstance.post(
      voiceoverProjectsUrl.CREATE_VOICEOVER_WITH_TEXTTOSPEECH,
      param
    );

  getVoiceoverProjectById = async (
    voiceoverProjectId: string,
    queryKeys?: any
  ): Promise<any> =>
    this.requestInstance.get(
      voiceoverProjectsUrl.GET_VOICEOVER_PROJECT(voiceoverProjectId),
      {
        params: queryKeys,
      }
    );

  updateVoiceoverProject = async (
    voiceoverProjectId: string,
    param: IVoiceoverWithTextToSpeech
  ): Promise<any> =>
    this.requestInstance.patch(
      voiceoverProjectsUrl.GET_VOICEOVER_PROJECT(voiceoverProjectId),
      param
    );

  deleteVoiceoverProject = async (voiceoverProjectId: string): Promise<any> =>
    this.requestInstance.delete(
      voiceoverProjectsUrl.GET_VOICEOVER_PROJECT(voiceoverProjectId)
    );
}

export const VoiceoverProjectsApi = new VoiceoverProjects(axios);
