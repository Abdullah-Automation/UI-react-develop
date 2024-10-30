import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import { TranscriptionApi } from '~/api';
import { Status } from '~/config';

import { useSpeakers } from './speakers';
import { useExport } from './export';
import { useTranslate } from './translate';

interface UseTranscriptionProps {
  transcriptionId: string;
}

interface UseTranscriptionReturn {
  transcription: any;
  isTranscriptionLoading: boolean;
  refetchTranscription: () => void;
}

export const useTranscription = ({
  transcriptionId,
}: UseTranscriptionProps): UseTranscriptionReturn => {
  const { speakersCtx, setSpeakersCtx } = useSpeakers();
  const { setTextURL, setSrtURL, setTranscriptURL } = useExport();
  const { setTranscriptionLang } = useTranslate();
  const [enabledTranscriptionAPI, setEnabledTranscriptionAPI] =
    useState<boolean>(false);

  const {
    data: transcription,
    isLoading: isTranscriptionLoading,
    refetch: refetchTranscription,
  } = useQuery(
    [`getTranscriptionBy`, transcriptionId],
    () => {
      if (transcriptionId) {
        return TranscriptionApi.getTranscriptionById(transcriptionId);
      }
      return null;
    },
    {
      cacheTime: 0,
      enabled: enabledTranscriptionAPI,
    }
  );

  useEffect(() => {
    if (transcriptionId) {
      setEnabledTranscriptionAPI(true);
    } else {
      setEnabledTranscriptionAPI(false);
    }
  }, [transcriptionId]);

  useEffect(() => {
    if (!transcription || transcription.status !== Status.Complete) {
      return;
    }

    setEnabledTranscriptionAPI(false);
    const { speakers, medias, language } = transcription;
    setTranscriptionLang(language);

    let newSpeakers = [];
    if (!speakers.includes('Retain audio')) {
      newSpeakers = [...speakers, 'Retain audio'];
    } else {
      newSpeakers = [...speakers];
    }
    if (
      JSON.stringify(speakersCtx) !== JSON.stringify(newSpeakers) &&
      speakersCtx.length <= newSpeakers.length // When translation language is switched, transcription is not refetched so this will reset the updated speaker context with the old so added this logic
    ) {
      setSpeakersCtx(newSpeakers);
    }

    setTextURL(transcription.transcriptionText);

    setSrtURL('HOLD');

    const transcriptJsonMedia = medias.find(
      (media: any) => media.operationType === 'INPUT' && media.format === 'json'
    );

    if (transcriptJsonMedia) {
      setTranscriptURL(transcriptJsonMedia.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    transcription,
    // speakersCtx, TODO: don't includ this speakerCtx since it changed to old whenever user adds new. Plz keep in eye here for other issues
    setTextURL,
    setSrtURL,
    setTranscriptURL,
    setSpeakersCtx,
  ]);

  const updatedTranscription = useMemo(() => {
    return {
      ...transcription,
      transcriptionSegments: transcription?.transcriptionSegments.map(
        (item: any) => ({
          ...item,
          retainAudio: item?.retainAudio === true,
          wordDetails: item.wordDetails.map((detail: any) => {
            const { confidence, ...newDetail } = detail;
            return newDetail;
          }),
        })
      ),
    };
  }, [transcription]);

  return {
    transcription: updatedTranscription,
    isTranscriptionLoading,
    refetchTranscription,
  };
};
