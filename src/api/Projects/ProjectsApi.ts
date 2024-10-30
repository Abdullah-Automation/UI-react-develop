import { AxiosInstance } from 'axios';

import { projectsUrl } from '~/config';

import { axios } from '../axiosInstance';

import {
  IProject,
  ITranscribe,
  IQueryKeyProps,
  ICopyUrlParams,
  IUpdateProject,
} from './ProjectsSchema';

class Projects {
  private requestInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.requestInstance = axiosInstance;
  }

  createProject = async (param: IProject): Promise<any> =>
    this.requestInstance.post(projectsUrl.CREATE_PROJECT, param);

  updateProject = async (
    projectId: string,
    param: IUpdateProject
  ): Promise<any> =>
    this.requestInstance.patch(projectsUrl.UPDATE_PROJECT(projectId), param);

  getProjects = async ({ queryKey }: IQueryKeyProps): Promise<any> => {
    return this.requestInstance.get(projectsUrl.GET_PROJECTS, {
      params: queryKey[1],
    });
  };

  getProjectById = async (
    projectId: string,
    queryKeys: ICopyUrlParams
  ): Promise<any> =>
    this.requestInstance.get(projectsUrl.GET_PROJECT(projectId), {
      params: queryKeys,
    });

  createProjectAndTranscribe = async (param: ITranscribe): Promise<any> =>
    this.requestInstance.post(projectsUrl.CREATE_PROJECT_AND_TRANSCRIBE, param);
}

export const ProjectsApi = new Projects(axios);
