import { AxiosInstance } from 'axios';

import { dubUrl} from "~/config";

import { axios } from '../axiosInstance';

import { IUpdateDub, IDub, IRegenerateDub } from './DubSchema';


class Dub {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createDub = async (param: IDub): Promise<any> =>
    this.requestInstance.post(dubUrl.CREATE_DUB, param);

  updateDub = async (dubId: string, param: IUpdateDub): Promise<any> =>
    this.requestInstance.patch(dubUrl.UPDATE_DUB(dubId), param);

  regenerateDub = async (
    param: IRegenerateDub
  ): Promise<any> =>
    this.requestInstance.post(
      dubUrl.REGENERATE_DUB(),
      param
    );

  getDubs = async (): Promise<any> => this.requestInstance.get(dubUrl.GET_DUBS);

  getDubById = async (dubId: string): Promise<any> =>
    this.requestInstance.get(dubUrl.GET_DUB(dubId));
}

export const DubApi = new Dub(axios);
