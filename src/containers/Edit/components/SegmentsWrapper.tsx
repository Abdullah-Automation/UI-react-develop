import React, { useEffect } from 'react';
import { Box, styled } from '@mui/material';

import {
  useProject,
  useTranscription,
  useTranslation,
  useTranslations,
} from '~/context';
import { useSegment } from '~/context/SegmentContext';
import { checkValidSegment } from '~/utils/helpers';

import { SegmentEdit } from './SegmentEdit';

export const SegmentsWrapper = () => {
  const {
    project: { mediaCategory, translationId, transcriptionId },
  } = useProject();
  const {
    transcription: { transcriptionSegments: aSegments },
  } = useTranscription({
    transcriptionId: transcriptionId || '',
  });

  const { enabledTranslationsAPI } = useTranslations();
  const {
    translation: { translationSegments: bSegments },
  } = useTranslation({
    translationId,
    mediaCategory,
    enabledTranslationsAPI,
  });

  const {
    transcriptionSegments,
    setTranscriptionSegments,
    translationSegments,
    setTranslationSegments,
    setValidation,
  } = useSegment();

  useEffect(() => {
    if (aSegments) {
      const indexedTranscript = aSegments?.map((item: any, index: number) => ({
        ...item,
        index,
      }));

      const newValidation: any[] = [];
      aSegments.forEach((s: any, _i: number, array: any[]) => {
        newValidation[s.id] = checkValidSegment(s, array);
      });
      setValidation(newValidation);

      setTranscriptionSegments(indexedTranscript);
    } else {
      setTranscriptionSegments([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aSegments]);

  useEffect(() => {
    if (bSegments) {
      const indexedTranslation = bSegments?.map((item: any, index: number) => ({
        ...item,
        index,
      }));

      setTranslationSegments(indexedTranslation);
    } else {
      setTranslationSegments([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bSegments]);

  return (
    <EditWrapper className='edit-wrapper'>
      <SegmentEdit
        key={`${transcriptionId}-${translationId}`}
        transcriptionSegments={transcriptionSegments || []}
        translationSegments={translationSegments || []}
      />
    </EditWrapper>
  );
};

const EditWrapper = styled(Box)<{ isborder?: string }>(
  ({ isborder = 'false' }) => ({
    flex: 1,
    position: 'relative',
    borderRight: isborder === 'true' ? '1px solid #C4C5D0' : 'none',
    height: 'calc(100vh - 97px)',
    overflow: 'auto',
  })
);
