import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import {
  CollaborationsApi,
  ICopyUrlParams,
  ITranslation,
  ProjectsApi,
  TranslationApi,
} from '~/api';
import { STATUS_VALUES, Status } from '~/config';

import { useAuth } from './auth';
import { useTranslate } from './translate';
import { useToast } from './toast';
import { useRoles } from './useRoles';

interface Collaboration {
  collaboration: string;
  createdAt: string;
  id: string;
  inviteeEmail: string;
  inviter: string;
  project: string;
  role: string;
  status: string;
  updatedAt: string;
}

interface ProjectState {
  projectId: string;
  projectName: string;
  mediaCategory: string;
  projectOwner: any;
  contentId: string;
  content?: any;
  translations?: any;
  transcription?: any;
  translationVariants?: any;
  translationId: string;
  isDub: boolean | 'progress';
  isDubUpdated: boolean;
  dubId: string;
  status: string;
  isEdit: boolean;
  translation: any;
  translationUpdatedAt: string;
  contentFileUUID: string;
  transcriptionId: string;
  transcriptionLanguge: string;
  targetAccent: string;
  isTranscriptionUpdated: boolean;
  collaboration?: Collaboration;
  customizedVoiceMatchingSpeakers: any[];
  id: string;
  owner?: {
    id?: string;
  };
}

interface UseProjectReturn {
  project: ProjectState;
  isReadOnly: boolean;
  isProjectLoading: boolean;
  isOwner?: boolean;
  refetchProject: () => void;
  createTranslation: (data: ITranslation) => void;
}

export const useProject = (): UseProjectReturn => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { projectId, usp, token, uid, rid } = router.query;
  const { targetLang, isTranslated, setIsTranslated, setIsEditable } =
    useTranslate();
  const { showInfoToast, showErrorToast } = useToast();
  const { roles } = useRoles();

  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [enabledProjectAPI, setEnabledProjectAPI] = useState<boolean>(false);
  const [enabledRoleAPI, setEnabledRoleAPI] = useState<boolean>(false);

  const [project, setProject] = useState<ProjectState>({
    projectId: projectId as string,
    projectName: '',
    projectOwner: undefined,
    translations: [],
    contentId: '',
    mediaCategory: '',
    translationId: '',
    isDub: false,
    isDubUpdated: true,
    dubId: '',
    status: '',
    translation: {},
    translationUpdatedAt: '',
    contentFileUUID: '',
    isEdit: false,
    transcriptionId: '',
    transcriptionLanguge: '',
    targetAccent: '',
    isTranscriptionUpdated: false,
    customizedVoiceMatchingSpeakers: [],
    id: '',
  });

  const {
    data,
    refetch: refetchProject,
    isLoading: isProjectLoading,
  } = useQuery(
    [`getProjectBy`, projectId],
    () => {
      if (projectId) {
        return ProjectsApi.getProjectById(
          projectId as string,
          { usp, token, uid, rid } as ICopyUrlParams
        );
      }
      return null;
    },
    {
      enabled: enabledProjectAPI,
      cacheTime: 0,
      refetchInterval: 10000, // Call this API per 10 sec
    }
  );

  const { mutate: createTranslation } = useMutation(
    (data: ITranslation) => TranslationApi.createTranslation(data),
    {
      onSuccess: () => {
        setIsTranslated('progress');
        showInfoToast(
          'Generating translation... You can leave the page and check the translation status on dashboard.'
        );
      },
      onError: (error: any) => {
        setIsTranslated(false);
        if (error?.response?.data?.message === 'No permission') {
          showErrorToast(
            `You don't have edit permission. Please contact the project owner for access.`
          );
        } else {
          showErrorToast('Generating translation error!');
        }
      },
    }
  );

  const { data: collaborationData } = useQuery(
    [`getProjectCollaborations`, projectId],
    () => {
      return CollaborationsApi.getCollaborations({
        projectId: projectId as string,
        direction: 'all',
      });
    },
    {
      enabled: enabledRoleAPI,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (projectId) {
      setEnabledProjectAPI(true);
      setEnabledRoleAPI(true);
    } else {
      setEnabledProjectAPI(false);
      setEnabledRoleAPI(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    if (isTranslated === 'progress') {
      setEnabledProjectAPI(true);
    }
  }, [isTranslated]);

  useEffect(() => {
    const foundCollab = collaborationData?.find(
      (collab: any) => collab.inviteeEmail === currentUser?.email
    );
    const foundRealRole = foundCollab?.role.permissions.find(
      (permission: any) => permission === 'read'
    );
    if (!foundRealRole) {
      setIsReadOnly(false);
    } else {
      setIsReadOnly(true);
    }

    setEnabledRoleAPI(false);
  }, [collaborationData, currentUser?.email]);

  useEffect(() => {
    setIsEditable(
      !project?.collaboration ||
        roles.find(roles => roles.id === project?.collaboration?.role)?.name !==
          'viewer' ||
        project?.owner?.id === currentUser?.id
    );
  }, [
    project?.collaboration,
    roles,
    project?.owner?.id,
    currentUser?.id,
    setIsEditable,
  ]);

  useEffect(() => {
    if (data) {
      const translation = data?.translations?.find(
        (translation: any) => translation.language === targetLang
      );

      let isTranslated: boolean | 'progress' = false;

      if (STATUS_VALUES.includes(translation?.status)) {
        isTranslated = 'progress';
        setEnabledProjectAPI(true);
      } else if (translation?.status === Status.Complete) {
        isTranslated = true;
        setEnabledProjectAPI(false);
      } else {
        setEnabledProjectAPI(false);
      }

      setIsTranslated(isTranslated);

      setProject(prev => ({
        ...prev,
        ...data,
        projectName: data.name,
        projectOwner: data.owner,
        mediaCategory: data.content.media.category,
        translations: data.translations,
        contentId: data.content?.id,
        translationId: translation?.id,
        transcriptionId: data?.transcription?.id,
        contentFileUUID: data.content?.fileUuid,
        translationUpdatedAt: translation?.updatedAt || '',
        customizedVoiceMatchingSpeakers:
          data?.transcription?.customizedVoiceMatchingSpeakers || [],
        transcriptionLanguge: data?.transcriptionVariants.find(
          (variant: any) => variant.code === data?.transcription?.language
        )?.label,
        translation,
      }));
    }
  }, [data, targetLang]);

  return {
    project,
    isReadOnly,
    isProjectLoading,
    refetchProject,
    createTranslation,
  };
};
