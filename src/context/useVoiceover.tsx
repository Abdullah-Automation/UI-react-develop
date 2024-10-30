import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { VoiceoverProjectsApi } from '~/api';
import { ITEMS_PER_PAGE } from '~/config';

import { useExport } from './export';

interface IVoiceoverContextProps {
  voiceoverProjects: any;
  isFetchingVoiceover: boolean;
  enabledVoiceoverProjectsAPI: boolean;
  audioSrc: string;
  voiceOver: any;
  voice: string;
  sourceLang: string;
  generating: boolean;
  showToast: boolean;
  refechVoiceover: () => void;
  setAudioSrc: (src: string) => void;
  refetchVoiceoverProjects: () => void;
  setGenerating: (value: boolean) => void;
  setSourceLang: (value: string) => void;
  setVoice: (value: string) => void;
  setShowToast: (value: boolean) => void;
  onGenerate: (voiceId: string, language: string) => void;
}

export const VoiceoverContext = createContext<IVoiceoverContextProps>({
  voiceoverProjects: [],
  isFetchingVoiceover: false,
  enabledVoiceoverProjectsAPI: false,
  audioSrc: '',
  voiceOver: {},
  voice: '',
  sourceLang: '',
  generating: false,
  showToast: false,
  refechVoiceover: () => {},
  // @ts-ignore
  setAudioSrc: (src: string) => {},
  // @ts-ignore
  setVoice: (value: string) => {},
  // @ts-ignore
  setSourceLang: (value: string) => {},
  // @ts-ignore
  setGenerating: (value: boolean) => {},
  // @ts-ignore
  setShowToast: (value: boolean) => {},
  // @ts-ignore
  onGenerate: (voiceId: string, language: string) => {},
  refetchVoiceoverProjects(): void {
    throw new Error('Function not implemented.');
  },
});

export const VoiceoverProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const router = useRouter();
  const { getExportURL } = useExport();
  const { voiceoverId } = router.query;

  const [audioSrc, setAudioSrc] = useState<string>('');
  const [voice, setVoice] = useState<string>('none');
  const [sourceLang, setSourceLang] = useState<string>('none');
  const [generating, setGenerating] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const [enabledVoiceoverProjectsAPI, setEnabledVoiceoverProjectsAPI] =
    useState<boolean>(true);

  const {
    data: voiceoverProjects,
    refetch: refetchVoiceoverProjects,
    isFetching: isFetchingVoiceover,
  } = useQuery(
    [
      'getVoiceoverProjects',
      {
        page: 1,
        limit: ITEMS_PER_PAGE,
      },
    ],
    VoiceoverProjectsApi.getVoiceoverProjects,
    {
      enabled: enabledVoiceoverProjectsAPI,
      refetchInterval: 10000,
    }
  );

  const { data: voiceOver, refetch: refechVoiceover } = useQuery(
    [`getVoiceoverBy${voiceoverId}`],
    () => {
      return VoiceoverProjectsApi.getVoiceoverProjectById(
        voiceoverId as string
      );
    },
    {
      enabled: !!voiceoverId,
    }
  );

  const onGenerate = async () => {
    try {
      window.analytics.track(`Voiceover Generate`, {
        voiceOverId: voiceoverId,
      });

      setGenerating(true);
      await VoiceoverProjectsApi.updateVoiceoverProject(voiceoverId as string, {
        name: voiceOver?.name,
        isDeleted: false,
        generateOnSave: true,
        textToSpeech: {
          language: sourceLang,
          voice,
          id: voiceOver?.textToSpeech?.id,
        },
      });

      refechVoiceover();
    } catch (e) {
      console.log('---CreateVoiceoverProject error---', e);
    }

    setGenerating(false);
  };

  const handleAudioURL = async (id: string) => {
    const audioURL = await getExportURL(id);
    setAudioSrc(audioURL);
  };

  useEffect(() => {
    if (voiceOver) {
      setShowToast(voiceOver?.textToSpeech?.isDraft || false);
      setAudioSrc('');

      if (voiceOver?.textToSpeech?.medias[0]?.id) {
        handleAudioURL(voiceOver?.textToSpeech?.medias[0]?.id);
      }

      if (voiceOver?.textToSpeech?.voice) {
        setVoice(voiceOver?.textToSpeech?.voice);
      } else {
        setVoice('none');
      }
    } else {
      setGenerating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceOver]);

  useEffect(() => {
    // Check whether it's need to call getProjects API again by checking the project status
    let isSubmitted = false;
    if (voiceoverProjects?.data.length > 0) {
      voiceoverProjects?.data.forEach((project: any) => {
        if (project?.textToSpeech?.status === 'GENERATING') {
          isSubmitted = true;
        }
      });

      if (isSubmitted) {
        setEnabledVoiceoverProjectsAPI(true);
      } else {
        setEnabledVoiceoverProjectsAPI(false);
      }
    } else {
      setEnabledVoiceoverProjectsAPI(false);
    }
  }, [voiceoverProjects?.data]);

  return (
    <VoiceoverContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        voiceoverProjects,
        isFetchingVoiceover,
        enabledVoiceoverProjectsAPI,
        audioSrc,
        voiceOver,
        voice,
        sourceLang,
        generating,
        showToast,
        setGenerating,
        onGenerate,
        setSourceLang,
        setAudioSrc,
        refechVoiceover,
        setVoice,
        setShowToast,
        refetchVoiceoverProjects,
      }}
    >
      {children}
    </VoiceoverContext.Provider>
  );
};

export const useVoiceover = (): IVoiceoverContextProps =>
  useContext(VoiceoverContext);
