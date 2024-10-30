import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ItranscriptionVariant, ProjectsApi, VoicesApi } from '~/api';
import { ITEMS_PER_PAGE, STATUS_VALUES } from '~/config';

interface IVariantContextProps {
  variants: ItranscriptionVariant[];
  voices: any[];
  speeds: any[];
  projects: any;
  isFetching: boolean;
  setEnabledProjectsAPI: (value: boolean) => void;
  refetchProjects: () => void;
  setVariants: (variants: ItranscriptionVariant[]) => void;
  setSpeeds: (voices: any[]) => void;
}

interface IUseVariants {
  currentPage?: number;
}

export const useVariants = ({
  currentPage = 1,
}: IUseVariants): IVariantContextProps => {
  const [variants, setVariants] = useState<ItranscriptionVariant[]>([]);
  const [enabledProjectsAPI, setEnabledProjectsAPI] = useState<boolean>(true);
  const [speeds, setSpeeds] = useState<string[]>([
    '0.5',
    '0.75',
    '1.0',
    '1.25',
    '1.5',
  ]);

  const { data: voices } = useQuery(
    [
      'getVoices',
      {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      },
    ],
    VoicesApi.getVoices
  );

  const {
    data: projects,
    refetch: refetchProjects,
    isFetching,
  } = useQuery(
    [
      'getProjects',
      {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      },
    ],
    ProjectsApi.getProjects,
    {
      enabled: enabledProjectsAPI,
      refetchInterval: 10000, // Call this API per 10 sec
    }
  );

  // Function to check if any project, translation, or dub is in submitted status
  const isSubmittedStatus = (project: any): boolean => {
    let isSubmitted = false;
    if (STATUS_VALUES.includes(project.transcription?.status)) {
      isSubmitted = true;
    }

    if (project.translations.length > 0) {
      if (
        project.translations.filter((item: any) =>
          STATUS_VALUES.includes(item.status)
        ).length > 0
      ) {
        isSubmitted = true;
      }

      if (
        project.translations.filter(
          (item: any) =>
            item.dub.filter((eachDub: any) =>
              STATUS_VALUES.includes(eachDub.status)
            ).length > 0
        ).length > 0
      ) {
        isSubmitted = true;
      }
    }
    return isSubmitted;
  };

  useEffect(() => {
    // Check whether it's need to call getProjects API again by checking the project status
    if (projects?.results.length > 0) {
      const isSubmitted = projects.results.some(isSubmittedStatus);
      setEnabledProjectsAPI(isSubmitted);
    } else {
      setEnabledProjectsAPI(false);
    }
  }, [projects?.results]);

  useEffect(() => {
    if (projects?.transcriptionVariants) {
      if (projects?.transcriptionVariants.length > 0) {
        setVariants(projects?.transcriptionVariants);
      }
    }
  }, [projects?.transcriptionVariants]);

  return {
    isFetching,
    voices: voices?.results || [],
    speeds,
    projects,
    variants,
    setVariants,
    setSpeeds,
    setEnabledProjectsAPI,
    refetchProjects,
  };
};
