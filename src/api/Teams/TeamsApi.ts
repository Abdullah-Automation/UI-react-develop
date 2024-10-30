import { AxiosInstance } from 'axios';

import { teamsUrl } from '~/config';

import { axios } from '../axiosInstance';

import { ITeam } from './TeamsSchema';

class Teams {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createTeam = async (param: ITeam): Promise<any> =>
    this.requestInstance.post(teamsUrl.CREATE_TEAM, param);

  updateTeam = async (teamId: string, param: ITeam): Promise<any> =>
    this.requestInstance.patch(teamsUrl.UPDATE_TEAM(teamId), param);

  deleteTeam = async (teamId: string): Promise<any> =>
    this.requestInstance.delete(teamsUrl.DELETE_TEAM(teamId));

  getTeams = async (): Promise<any> =>
    this.requestInstance.get(teamsUrl.GET_TEAMS);

  getTeamById = async (teamId: string): Promise<any> =>
    this.requestInstance.get(teamsUrl.GET_TEAM(teamId));
}

export const TeamsApi = new Teams(axios);
