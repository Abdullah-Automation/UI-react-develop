import React, { useEffect, useMemo, useState, forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import _ from 'lodash';

import { IWordDetail } from '~/api';
import { useTranslate } from '~/context';
import {
  LIMIT_SPEED_UP_TRANSCRIPTION_COUNT,
  MIN_SPEED_UP_PERCENTAGE,
} from '~/config';
import {
  duration,
  getPercentageBetweenGaps,
  isValideSpeedUpLanguage,
} from '~/utils/helpers';

import { Speaker } from './Speaker';
import { SpeedWarn } from './SpeedWarn';

interface ISegment {
  id: string;
  isScroll: boolean;
  editorRef: any;
  height?: number;
  isCursor?: any;
  type: string;
  speaker: string;
  startTime: number;
  endTime: number;
  content: string;
  transcriptionSegment: string;
  transId: string;
  projectId: string;
  wordIndexToTrackHighlight: number;
  wordDetails: IWordDetail[];
  segments: any[];
  retainAudio: boolean;
  onUpdate: (id: string, value: any, isSpeaker: boolean) => void;
  onWordClick: (word: any) => void;
  onOverflowHeight: () => void;
  onEdit: (segment: any, preId: string, upId: string, newSegment?: any) => void;
  onScroll: () => void;
}

export const Segment = forwardRef(
  (
    {
      id,
      editorRef,
      type,
      speaker,
      startTime,
      endTime,
      transId,
      content,
      transcriptionSegment,
      retainAudio = false,
      onUpdate,
    }: ISegment,
    // @ts-ignore
    ref
  ) => {
    const { isEdit, isTranslated, isDub, targetLang } = useTranslate();

    const [anchorSpeaker, setAnchorSpeaker] = useState<null | HTMLElement>(
      null
    );
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorSpeaker);
    const [currentSpeaker, setCurrentSpeaker] = useState<string>(speaker);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    useEffect(() => {
      setCurrentSpeaker(speaker);
    }, [speaker]);

    const handleSpeakerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (type === 'Transcription') {
        setAnchorSpeaker(event.currentTarget);
        window.analytics.track(`Speaker click ${event.currentTarget}`, {});
      }
    };

    const handleSpeakerClose = () => {
      setAnchorSpeaker(null);
      window.analytics.track(`Handle speaker close`, {});
    };

    const handleSelectSpeaker = (speaker: string) => {
      setCurrentSpeaker(speaker);
      onUpdate(id, speaker, true);
      window.analytics.track(`Speaker change`, { speaker, segmentId: id });

      if (speaker === 'Retain audio') {
        window.analytics.track(`User Retaining audio`, {
          speaker,
          segmentId: id,
        });
      }
    };

    const handleRightClick = (e: any) => {
      e.preventDefault();
      setAnchorEl(e.currentTarget);

      window.analytics.track(`Segment backspace on right click`, {
        segmentId: id,
      });
      setShowMenu(true);
    };

    const SegmentEditor = useMemo(() => {
      return (
        <Box onContextMenu={handleRightClick}>
          <Typography color='#000' variant='body2'>
            {content}
          </Typography>
        </Box>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, isEdit, isTranslated, isDub, editorRef, anchorEl, showMenu]);

    return (
      <Box py='4px' px={3}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box display='flex' alignItems='center' gap={1}>
            <Typography
              color='#909094'
              variant='body2'
              sx={{ cursor: 'pointer' }}
              onClick={handleSpeakerClick}
            >
              {retainAudio ? 'Retain audio' : currentSpeaker}
            </Typography>
            {type === 'Translation' &&
              !retainAudio &&
              currentSpeaker !== 'Retain audio' &&
              isValideSpeedUpLanguage(targetLang) &&
              getPercentageBetweenGaps(
                transcriptionSegment.length,
                content.length
              ) > MIN_SPEED_UP_PERCENTAGE &&
              transcriptionSegment.length >
                LIMIT_SPEED_UP_TRANSCRIPTION_COUNT && (
                <SpeedWarn
                  percentage={getPercentageBetweenGaps(
                    transcriptionSegment.length,
                    content.length
                  )}
                  transcriptionLength={transcriptionSegment.length}
                  translationLength={content.length}
                />
              )}
          </Box>

          {open && isEdit === type && (
            <Speaker
              transId={transId}
              type={type}
              retainAudio={retainAudio}
              currentSpeaker={currentSpeaker}
              anchorSpeaker={anchorSpeaker}
              handleSpeakerClose={handleSpeakerClose}
              handleSelectSpeaker={handleSelectSpeaker}
            />
          )}

          <Box display='flex' alignItems='center' gap={1}>
            <Typography style={{ color: '#909094' }} variant='caption'>
              {`${duration(Number(startTime))} - ${duration(Number(endTime))}`}
            </Typography>
            {/* {type === 'Translation' && (
              <LightTooltip
                placement='bottom-start'
                title='Match end time to the original'
              >
                <ExpandIcon
                  sx={{
                    cursor: 'pointer',
                    fontSize: 16,
                    color: '#909094',
                    transform: 'rotate(90deg)',
                  }}
                  onClick={handleMatchEndTime}
                />
              </LightTooltip>
            )} */}
          </Box>
        </Box>
        <Box>{SegmentEditor}</Box>
      </Box>
    );
  }
);
