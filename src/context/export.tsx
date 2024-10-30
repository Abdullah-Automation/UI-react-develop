import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

import { MediaApi, TranscriptionApi, TranslationApi } from '~/api';

interface IExportContextProps {
  translationURL: string;
  timingsURL: string;
  textURL: string;
  srtURL: string;
  dubTextURL: string;
  dubSrtURL: string;
  dubAudioURL: string;
  dubSpeakerOnlyAudioURL: string;
  dubVideoURL: string;
  dubVideoAudioOnlyURL: string;
  transcriptURL: string;
  setTranscriptURL: (value: string) => void;
  setTranslationURL: (value: string) => void;
  setTimingsURL: (value: string) => void;
  setTextURL: (value: string) => void;
  setSrtURL: (value: string) => void;
  setDubTextURL: (value: string) => void;
  setDubSrtURL: (value: string) => void;
  setDubAudioURL: (value: string) => void;
  setDubSpeakerOnlyAudioURL: (value: string) => void;
  setDubVideoURL: (value: string) => void;
  setDubVideoAudioOnlyURL: (value: string) => void;
  getExportURL: (id: string) => Promise<string>;
  processTranscriptSRT: (transcriptonId: string) => Promise<string>;
  processTranslationSRT: (translationId: string) => Promise<string>;
  saveTranscript: (transcriptId: string) => Promise<string>;
  saveTranslation: (translationId: string) => Promise<string>;
}

export const ExportContext = createContext<IExportContextProps>({
  translationURL: '',
  timingsURL: '',
  textURL: '',
  srtURL: '',
  dubTextURL: '',
  dubSrtURL: '',
  dubAudioURL: '',
  dubSpeakerOnlyAudioURL: '',
  dubVideoURL: '',
  dubVideoAudioOnlyURL: '',
  transcriptURL: '',
  // @ts-ignore
  setTranscriptURL: (value: string) => {},
  // @ts-ignore
  setTranslationURL: (value: string) => {},
  // @ts-ignore
  setTimingsURL: (value: string) => {},
  // @ts-ignore
  setTextURL: (value: string) => {},
  // @ts-ignore
  setSrtURL: (value: string) => {},
  // @ts-ignore
  setDubTextURL: (value: string) => {},
  // @ts-ignore
  setDubSrtURL: (value: string) => {},
  // @ts-ignore
  setDubAudioURL: (value: string) => {},
  // @ts-ignore
  setDubSpeakerOnlyAudioURL: (value: string) => {},
  // @ts-ignore
  setDubVideoURL: (value: string) => {},
  // @ts-ignore
  setDubVideoAudioOnlyURL: (value: string) => {},
  // @ts-ignore
  getExportURL(id: string): Promise<string> {
    throw new Error('Function not implemented.');
  },
  // @ts-ignore
  processTranscriptSRT(transcriptionId: string): Promise<string> {
    throw new Error('Function not implemented.');
  },
  // @ts-ignore
  processTranslationSRT(translationId: string): Promise<string> {
    throw new Error('Function not implemented.');
  },
  // @ts-ignore
  saveTranscript(transcriptId: string): Promise<string> {
    throw new Error('Function not implemented.');
  },
  // @ts-ignore
  saveTranslation(translationId: string): Promise<string> {
    throw new Error('Function not implemented.');
  },
});

interface IExportProviderProps {
  children: ReactNode;
}

export const ExportProvider: React.FC<IExportProviderProps> = ({
  children,
}) => {
  const [transcriptURL, setTranscriptURL] = useState<string>('');
  const [timingsURL, setTimingsURL] = useState<string>('');
  const [translationURL, setTranslationURL] = useState<string>('');
  const [textURL, setTextURL] = useState<string>('');
  const [srtURL, setSrtURL] = useState<string>('');
  const [dubTextURL, setDubTextURL] = useState<string>('');
  const [dubSrtURL, setDubSrtURL] = useState<string>('');
  const [dubAudioURL, setDubAudioURL] = useState<string>('');
  const [dubSpeakerOnlyAudioURL, setDubSpeakerOnlyAudioURL] =
    useState<string>('');
  const [dubVideoURL, setDubVideoURL] = useState<string>('');
  const [dubVideoAudioOnlyURL, setDubVideoAudioOnlyURL] = useState<string>('');

  const router = useRouter();
  const { projectId, voiceoverId } = router.query;

  const getExportURL = async (id: string): Promise<string> => {
    try {
      const data = await MediaApi.getMediaPresigned({
        mediaId: id,
        projectId: (voiceoverId as string) || (projectId as string),
      });

      return data;
    } catch (e) {
      return '';
    }
  };

  const processTranscriptSRT = async (
    transcriptonId: string
  ): Promise<string> => {
    try {
      const data = await TranscriptionApi.processTranscriptSRT(transcriptonId);

      return data;
    } catch (e) {
      return '';
    }
  };

  const saveTranscript = async (transcriptonId: string): Promise<string> => {
    try {
      const data = await TranscriptionApi.processTranscriptSegments(
        transcriptonId
      );

      return data;
    } catch (e) {
      return '';
    }
  };

  const saveTranslation = async (translationId: string): Promise<string> => {
    try {
      const data = await TranslationApi.processTranslationSegments(
        translationId
      );

      return data;
    } catch (e) {
      return '';
    }
  };

  const processTranslationSRT = async (
    translationId: string
  ): Promise<string> => {
    try {
      const data = await TranslationApi.processTranslationSRT(translationId);

      return data;
    } catch (e) {
      return '';
    }
  };

  return (
    <ExportContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        textURL,
        srtURL,
        dubTextURL,
        dubSrtURL,
        dubAudioURL,
        dubSpeakerOnlyAudioURL,
        dubVideoURL,
        dubVideoAudioOnlyURL,
        translationURL,
        timingsURL,
        transcriptURL,
        setTranscriptURL,
        setTranslationURL,
        setTimingsURL,
        setTextURL,
        setSrtURL,
        setDubTextURL,
        setDubSrtURL,
        setDubAudioURL,
        setDubSpeakerOnlyAudioURL,
        setDubVideoURL,
        setDubVideoAudioOnlyURL,
        getExportURL,
        processTranscriptSRT,
        processTranslationSRT,
        saveTranscript,
        saveTranslation,
      }}
    >
      {children}
    </ExportContext.Provider>
  );
};

export const useExport = (): IExportContextProps => useContext(ExportContext);
