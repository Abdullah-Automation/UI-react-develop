import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { TranslationApi } from '~/api';
import { STATUS_VALUES, Status } from '~/config';

import { useTranslate } from './translate';
import { Translation } from './useTranslation';

interface UseTranslationsReturn {
  enabledTranslationsAPI: boolean;
  translations: any[];
}

export const useTranslations = (): UseTranslationsReturn => {
  const router = useRouter();
  const { projectId } = router.query;
  const { isTranslated, targetLang, isDub, setIsEdited } = useTranslate();

  const [enabledTranslationsAPI, setEnabledTranslationsAPI] =
    useState<boolean>(true);

  const { data: translations } = useQuery<Translation[], Error>(
    [`getTranslationsBy_${projectId}`, projectId],
    () => {
      return TranslationApi.getTranslations(projectId as string);
    },
    {
      enabled: enabledTranslationsAPI && !!projectId,
      cacheTime: 0,
      refetchInterval: 10000, // Call this API per 10 sec
    }
  );

  useEffect(() => {
    setEnabledTranslationsAPI(true);
  }, [targetLang]);

  useEffect(() => {
    if (isTranslated === 'progress' || isDub === 'progress') {
      setEnabledTranslationsAPI(true);
    }
  }, [isTranslated, isDub]);

  useEffect(() => {
    if (translations) {
      if (translations.length === 0) {
        setIsEdited(false);
        setEnabledTranslationsAPI(false);
      } else {
        const isCompleteAPI = translations.findIndex(
          translation =>
            STATUS_VALUES.includes(translation.status as Status) ||
            translation.dub.findIndex(dub =>
              STATUS_VALUES.includes(dub.status as Status)
            ) !== -1
        );

        if (isCompleteAPI === -1) {
          setEnabledTranslationsAPI(false);
        }

        const isEditedIndex = translations.findIndex(
          translation => translation.isEdited === true
        );

        if (isEditedIndex === -1) {
          setIsEdited(false);
        } else {
          setIsEdited(true);
        }
      }
    }
  }, [translations]);

  return {
    enabledTranslationsAPI,
    translations: translations || [],
  };
};
