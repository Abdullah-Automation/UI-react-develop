import { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { TranslationApi } from '~/api';
import {
  LANGUAGE_ACCENTS,
  PROJECT_ACCESSED_LANGUAGE,
  SPANISH_ACCENTS,
  Status,
  STATUS_VALUES,
} from '~/config';
import { useLocalStorage } from '~/utils/hooks';

import { useTranslate } from './translate';
import { useToast } from './toast';
import { useExport } from './export';
import { useProject } from './useProject';
import { useTranscription } from './useTranscription';

export interface Translation {
  id: string;
  status: string;
  language: string;
  isDraft: boolean;
  dub: IDub[];
  translationSegments: any[];
  regionalAccents: any[];
  translationText: string;
  medias: Media[];
  isDubUpdated: boolean;
  isEdited: boolean;
}

export interface IDub {
  id: string;
  status: string;
  language: string;
  updatedAt: string;
  medias: Media[];
  isDubUpdated: boolean;
  voiceMatchingMode: string;
}

interface Media {
  category: string;
  uri: string;
  format: string;
  id: string;
}

interface UseTranslationProps {
  translationId: string;
  mediaCategory: string;
  enabledTranslationsAPI: boolean;
}

interface UseTranslationReturn {
  translation: any;
  isTranslationLoading: boolean;
  enabledDubAPI: boolean;
  refetchTranslation: () => void;
}

export const useTranslation = ({
  translationId,
  mediaCategory,
  enabledTranslationsAPI,
}: UseTranslationProps): UseTranslationReturn => {
  const router = useRouter();
  const { projectId } = router.query;
  const [enabledDubAPI, setEnabledDubAPI] = useState<boolean>(false);
  const [projectLangList] = useLocalStorage(PROJECT_ACCESSED_LANGUAGE, []);

  const {
    targetAccent,
    targetLang,
    isTranslated,
    targetVoice,
    isDub,
    langAccents,
    setTargetVoice,
    setIsDub,
    setDubUpdatedAt,
    setDubStatus,
    setIsTranslated,
    setIsDubUpdated,
    setDubId,
    setIsTranscriptionUpdated,
    setDubItems,
    setTargetAccent,
    setLangAccents,
    setTargetLang,
    setShowDubError,
    setMediaId,
    setMediaVocalsId,
  } = useTranslate();
  const { project } = useProject();
  const { refetchTranscription } = useTranscription({
    transcriptionId: project?.transcriptionId || '',
  });

  const {
    setTranslationURL,
    setTimingsURL,
    setDubTextURL,
    setDubVideoAudioOnlyURL,
    setDubAudioURL,
    setDubSpeakerOnlyAudioURL,
    setDubSrtURL,
    setDubVideoURL,
  } = useExport();
  const { showInfoToast } = useToast();

  const {
    data: translation,
    isLoading,
    fetchStatus,
    refetch: refetchTranslation,
  } = useQuery<Translation, Error>(
    [`getTranslationBy`, translationId],
    () => {
      return TranslationApi.getTranslationById(translationId);
    },
    {
      enabled: enabledDubAPI && !!translationId,
      cacheTime: 0,
      refetchInterval: 10000, // Call this API per 10 sec
    }
  );

  const isTranslationLoading = isLoading && fetchStatus !== 'idle';

  useEffect(() => {
    if (project?.translation?.status === Status.Complete) {
      setEnabledDubAPI(true);
    }

    if (translationId) {
      setEnabledDubAPI(true);
    } else {
      setEnabledDubAPI(false);
    }
  }, [project?.translation?.status, translationId]);

  useEffect(() => {
    if (isTranslated === 'progress' || isDub === 'progress') {
      setEnabledDubAPI(true);
    }
  }, [isTranslated, isDub]);

  useEffect(() => {
    if (enabledTranslationsAPI === false) {
      setEnabledDubAPI(false);
    }
  }, [enabledTranslationsAPI]);

  // Setting Language, Dialect, Voice from localStorage
  useEffect(() => {
    if (projectLangList.length > 0) {
      const currentLangIndex = projectLangList.findIndex(
        (lang: any) => lang.projectId === projectId
      );

      if (currentLangIndex !== -1) {
        const lang = projectLangList[currentLangIndex];
        setTargetLang(lang.language);
        setTargetAccent(lang?.dialect || '');
        setTargetVoice(lang?.voice || '');
      } else {
        setTargetLang('none');
      }
    }
  }, [
    projectLangList,
    projectId,
    setTargetLang,
    setTargetAccent,
    setTargetVoice,
  ]);

  useEffect(() => {
    if (langAccents.length > 0) {
      const nativeMatchingEnabled = langAccents.filter(
        accent => accent?.code === targetAccent
      )[0]?.nativeMatchingEnabled;

      if (nativeMatchingEnabled === false) {
        setTargetVoice('source');
      }
    }
  }, [langAccents, setTargetVoice, targetAccent]);

  useEffect(() => {
    if (
      translation &&
      translation?.status === Status.Complete &&
      translation?.language === targetLang
    ) {
      setLangAccents(translation?.regionalAccents);
      setIsTranscriptionUpdated(translation?.isDraft);

      // @ts-ignore
      setIsTranslated((preIsTranslated: any) => {
        if (
          preIsTranslated === 'progress' &&
          translation?.translationSegments.length > 0
        ) {
          showInfoToast('Your translation is now up to date.');
          refetchTranscription();
        }
        return true;
      });

      let dubVideoId = '';
      let dubAudioId = '';
      let dubVideoVocalsId = '';
      let dubAudioVocalsId = '';

      if (translation.dub.length > 0) {
        const dubItems = translation.dub.map((eachDub: any) => {
          return {
            voiceMatchingMode: eachDub.voiceMatchingMode,
            language: eachDub.language,
            id: eachDub.id,
            status: eachDub.status,
          };
        });
        setDubItems(dubItems);

        const currentDub =
          translation?.regionalAccents.findIndex(
            accent => accent.code === targetAccent
          ) !== -1
            ? translation.dub.find(
                item =>
                  item.language === targetAccent &&
                  item.voiceMatchingMode === targetVoice
              )
            : translation.dub.slice().sort(
                // @ts-ignore
                (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
              )[0];

        if (currentDub) {
          setTargetAccent(currentDub.language);
          setTargetVoice(currentDub.voiceMatchingMode);
          setDubUpdatedAt(currentDub.updatedAt);
          setDubStatus(currentDub.status);
          setDubId(currentDub.id);
          if (currentDub.status === Status.Complete) {
            setShowDubError(false);
            setEnabledDubAPI(false);
            // @ts-ignore
            setIsDub((preIsDub: any) => {
              if (preIsDub === 'progress') {
                showInfoToast('Your dub is now ready.');
              }
              return true;
            });
            setIsDubUpdated(
              'isDubUpdated' in currentDub
                ? currentDub.isDubUpdated
                : translation.isDubUpdated
            );
          } else if (currentDub.status === Status.Error) {
            setEnabledDubAPI(false);
            setShowDubError(true);
            setIsDub(false);
            // @ts-ignore
          } else if (STATUS_VALUES.includes(currentDub.status)) {
            setIsDub('progress');
            setEnabledDubAPI(true);
            setShowDubError(false);
          }

          if (currentDub.medias.length > 0) {
            dubVideoId =
              currentDub.medias.find(
                media =>
                  media.category === 'video' && !media.uri.includes('.vocals')
              )?.id || '';

            if (dubVideoId) {
              setDubVideoURL(dubVideoId);
            }

            dubVideoVocalsId =
              currentDub.medias.find(
                (media: any) =>
                  media.category === 'video' && media.uri.includes('.vocals')
              )?.id || '';

            if (dubVideoVocalsId) {
              // Get Dub Video URL
              setDubVideoAudioOnlyURL(dubVideoVocalsId);
            }

            dubAudioId =
              currentDub.medias.find(
                (media: any) =>
                  media.category === 'audio' &&
                  media.format === 'mp3' &&
                  !media.uri.includes('.vocals')
              )?.id || '';

            if (dubAudioId) {
              setDubAudioURL(dubAudioId);
            }

            dubAudioVocalsId =
              currentDub.medias.find(
                (media: any) =>
                  media.category === 'audio' &&
                  media.format === 'mp3' &&
                  media.uri.includes('.vocals')
              )?.id || '';

            if (dubAudioVocalsId) {
              // Get Dub Audio Vocals URL
              setDubSpeakerOnlyAudioURL(dubAudioVocalsId);
            }
          }
        } else {
          dubVideoId = '';
          dubAudioId = '';
          dubAudioVocalsId = '';
          dubVideoVocalsId = '';
          setEnabledDubAPI(false);
          setShowDubError(false);
          setIsDub(false);
          setDubId('');
        }
      } else {
        if (translation?.regionalAccents) {
          if (targetLang === 'es_la_prod') {
            if (
              !SPANISH_ACCENTS.includes(targetAccent) &&
              (LANGUAGE_ACCENTS.includes(targetAccent) || targetAccent === '')
            ) {
              setTargetAccent('es_la_prod');
            }
          } else {
            const exists = translation?.regionalAccents.some(
              item => item.code === targetAccent
            );
            setTargetAccent(
              targetAccent && exists
                ? targetAccent
                : translation?.regionalAccents[0].code
            );
          }
        }

        setEnabledDubAPI(false);
        setShowDubError(false);
        setIsDub(false);
        setDubItems([]);
        setDubId('');
      }

      setMediaId(mediaCategory === 'video' ? dubVideoId : dubAudioId);
      setMediaVocalsId(
        mediaCategory === 'video' ? dubVideoVocalsId : dubAudioVocalsId
      );
      setDubTextURL(translation.translationText);

      setDubSrtURL('HOLD');

      const translationIndex = translation.medias.findIndex(
        (media: any) =>
          (media.operationType === 'INPUT' ||
            media.operationType === 'OUTPUT') &&
          media.format === 'json'
      );
      if (translationIndex > -1) {
        setTranslationURL(translation?.medias[translationIndex]?.id || '');
      }
      const timingsIndex = translation.medias.findIndex(
        (media: any) =>
          media.operationType === 'OUTPUT' && media.format === 'json'
      );
      if (timingsIndex > -1) {
        setTimingsURL(translation?.medias[timingsIndex]?.id || '');
      }
    } else {
      setTranslationURL('');
      setTimingsURL('');
      setDubSrtURL('');
      setDubAudioURL('');
      setDubSpeakerOnlyAudioURL('');
      setDubVideoAudioOnlyURL('');
      setDubVideoURL('');
      setDubId('');
      setIsDub(false);
      setShowDubError(false);
    }
  }, [translation, targetLang, targetAccent, targetVoice, mediaCategory]);

  const updatedTranslation = useMemo(() => {
    return {
      ...translation,
      translationSegments: translation?.translationSegments.map(
        (item: any) => ({
          ...item,
          retainAudio: item?.retainAudio === true,
        })
      ),
    };
  }, [translation]);

  return {
    translation: updatedTranslation,
    isTranslationLoading,
    enabledDubAPI,
    refetchTranslation,
  };
};
