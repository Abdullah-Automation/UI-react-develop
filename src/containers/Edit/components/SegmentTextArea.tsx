import React, { forwardRef, memo, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import _ from 'lodash';

import {
  useDebug,
  useSegment,
  useTranslate,
  useTranslations,
  useVideoPlayerContext,
} from '~/context';
import { SegmentLoader } from '~/components/domain';
import { LanguageVariants } from '~/config';
import { MediaApi } from '~/api';

import { SegmentSetting } from './SegmentSetting';
import { LoadingSegment, SegmentLock } from './SegmentLock';
import {
  Editor,
  Overlay,
  EditorWrapper,
  TranslationPlayback,
  SegmentTextAreaWrapper,
} from './Utility';
import { SegmentTime } from './SegmentTime';

interface ISegmentTextArea {
  index: number;
  segment: any;
  projectId: string;
  transcriptionSegment: string;
  segmentType: string;
  activeSegmentInfo: any;
  handleKeyPress: (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
    segmentType: string,
    keyType?: string
  ) => Promise<void>;
  handleChange: (
    index: number,
    text: string,
    locked: boolean,
    segmentType: string
  ) => void;
  handleLockChange: (index: number, text: string, locked: boolean) => void;
  setActiveSegmentInfo: (info: any) => void;
  handleRefresh: (info: any) => void;
}

const SegmentTextAreaInner = forwardRef<HTMLTextAreaElement, ISegmentTextArea>(
  (
    {
      index,
      segment,
      projectId,
      segmentType,
      activeSegmentInfo,
      transcriptionSegment,
      handleChange,
      handleLockChange,
      handleKeyPress,
      setActiveSegmentInfo,
      handleRefresh,
    },
    textAreaRef
  ) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [calculatedRows, setCalculatedRows] = useState(1);
    const [isScrollbar, setIsScrollbar] = useState<string>('true');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string>('');
    const [segmentDubUrl, setSegmentDubUrl] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const segmentWrapper = document.querySelector('.segment-wrapper');
    const editWrapper = document.querySelector('.edit-wrapper');
    const {
      startTime,
      content,
      endTime,
      locked = false,
      id,
      loading = false,
      fileNameToDubs,
    } = segment ?? {};

    const {
      isTranslated,
      isDub,
      isEditable,
      targetLang,
      transcriptionLang,
      targetAccent,
      targetVoice,
    } = useTranslate();
    const { trackedInfo, handleTrackSegment } = useVideoPlayerContext();
    const { enabledTranslationsAPI } = useTranslations();
    const isDebugMode = useDebug();
    const {
      validation: allValidations,
      debouncedSaveSegmentTextTranslation,
      translationSegments,
    } = useSegment();
    const validation = allValidations[id];

    useEffect(() => {
      // Assuming dubKey is already defined somewhere in your code
      const dubKey = `${targetAccent}-${targetVoice}`; // Construct the key for accessing fileNameToDubs
      let url;

      if (fileNameToDubs)
        url = fileNameToDubs[dubKey] ? fileNameToDubs[dubKey] : '';

      setSegmentDubUrl(url);
    }, [fileNameToDubs, targetAccent, targetVoice]);

    useEffect(() => {
      if (segmentType === 'translation') {
        setIsLoading(!!loading && content === '');
      }
    }, [content, loading, segmentType]);

    useEffect(() => {
      if (
        (editWrapper?.clientHeight || 0) < (segmentWrapper?.scrollHeight || 0)
      ) {
        setIsScrollbar('true');
      } else {
        setIsScrollbar('false');
      }
    }, [editWrapper?.clientHeight, segmentWrapper?.scrollHeight]);

    // When user clicks on Video, the corresponding segments are activated
    useEffect(() => {
      if (
        startTime <= trackedInfo.trackedTime &&
        trackedInfo.trackedTime < endTime &&
        activeSegmentInfo.activeIndex !== index &&
        trackedInfo.type === 'video'
      ) {
        setActiveSegmentInfo((prevInfo: any) => {
          if (prevInfo.activeIndex !== index) {
            return {
              ...prevInfo,
              activeIndex: index,
            };
          }
          return prevInfo;
        });
      }
    }, [
      trackedInfo,
      index,
      activeSegmentInfo,
      startTime,
      endTime,
      setActiveSegmentInfo,
    ]);

    useEffect(() => {
      const setRows = () => {
        // @ts-ignore
        const textArea = textAreaRef?.current;

        if (textArea) {
          const { width } = textArea.getBoundingClientRect();
          const letterWidth =
            LanguageVariants.filter(
              (variant: any) =>
                variant.code ===
                (segmentType === 'transcription'
                  ? transcriptionLang
                  : targetLang)
            )[0]?.letterWidth || 380 / 50;

          const rowsForEachLine = content
            .split('\n')
            .map(
              (line: any) => Math.ceil(line.length / (width / letterWidth)) || 1
            );

          const totalRows = rowsForEachLine.reduce(
            (acc: any, curr: any) => acc + curr,
            0
          );

          setCalculatedRows(totalRows || 1);
        }
      };

      setRows();

      window.addEventListener('resize', setRows);

      return () => {
        window.removeEventListener('resize', setRows);
      };
    }, [textAreaRef, content, segmentType, transcriptionLang, targetLang]);

    const getExportURL = async (fileName: string): Promise<string> => {
      try {
        const data = await MediaApi.getMediaPresigned({
          uri: fileName,
          projectId,
        });

        return data;
      } catch (e) {
        return '';
      }
    };

    const handleAudioEnded = () => {
      setIsPlaying(false);
      setAudioUrl('');
    };

    const handlePlayClick = async () => {
      if (!audioUrl) {
        try {
          const url = await getExportURL(segmentDubUrl);
          setAudioUrl(url);
        } catch (error) {
          console.error('Error fetching audio URL:', error);
        }
      }
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setAudioUrl('');
    };

    const handleTextChange = (text: string, isLocked: boolean) => {
      handleChange(index, text, isLocked, segmentType);
      if (segmentType === 'translation') {
        const dubKey = `${targetAccent}-${targetVoice}`; // Construct the key for accessing fileNameToDubs
        if (fileNameToDubs) fileNameToDubs[dubKey] = '';
        setSegmentDubUrl('');
      }
    };

    const handleTextLockChange = (text: string) => {
      handleLockChange(index, text, false);
    };

    const handleEditorClick = () => {
      setActiveSegmentInfo({
        segmentType,
        activeIndex: index,
      });

      handleTrackSegment({
        trackedTime: startTime,
        type: 'segment',
        endTrackedTIme: endTime,
      });
    };

    const handleBlur = () => {
      if (
        segmentType === 'translation' &&
        translationSegments[index].content === segment.content &&
        translationSegments[index].locked !== segment.locked
      ) {
        debouncedSaveSegmentTextTranslation(
          index,
          content,
          segment.locked,
          true
        );
      }
    };

    return (
      <SegmentTextAreaWrapper
        isloading={isLoading ? 'true' : 'false'}
        isborder={segmentType === 'transcription' ? 'true' : 'false'}
        isscrollbar={isScrollbar}
        className='segment-editor'
      >
        {isLoading ? (
          <LoadingSegment />
        ) : content === undefined && targetLang !== 'none' ? (
          <Box width='100%' height='100%'>
            <SegmentLoader />
          </Box>
        ) : (
          <>
            {segmentType === 'transcription' && (
              <Typography color='#909094' variant='overline'>
                {index + 1}
              </Typography>
            )}
            {segmentType === 'translation' && (
              <TranslationPlayback
                isDub={isDub}
                segment={segment}
                isPlaying={isPlaying}
                segmentDubUrl={segmentDubUrl}
                handlePause={handlePause}
                handlePlayClick={handlePlayClick}
                handleRefresh={handleRefresh}
              />
            )}
            {audioUrl && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <audio ref={audioRef} autoPlay onEnded={handleAudioEnded}>
                <source src={audioUrl} type='audio/wav' />
              </audio>
            )}
            <SegmentSetting
              segment={segment}
              transcriptionSegment={transcriptionSegment}
              type={segmentType}
              index={index}
            />
            <EditorWrapper>
              {isDebugMode && (
                <Typography color='#909094' variant='caption'>
                  ${segment.id} - ${segment.index} - lock: $
                  {segment.locked?.toString()}
                </Typography>
              )}
              <SegmentTime
                index={index}
                segmentType={segmentType}
                validated={validation}
                startTime={startTime}
                endTime={endTime}
              />
              <Box position='relative'>
                <Editor
                  ref={textAreaRef}
                  rows={calculatedRows}
                  value={content}
                  disabled={!id || !isEditable}
                  data-cy={id}
                  style={{
                    backgroundColor:
                      activeSegmentInfo.activeIndex === index
                        ? '#F9F2FF'
                        : '#fff',
                  }}
                  onChange={e =>
                    handleTextChange(
                      e.target.value,
                      segmentType === 'translation'
                    )
                  }
                  onKeyDown={(e: any) => {
                    if (
                      e.target.selectionStart === 0 &&
                      segmentType === 'transcription'
                    ) {
                      handleKeyPress(index, e, segmentType, 'keydown');
                    }
                  }}
                  onKeyUp={(e: any) => handleKeyPress(index, e, segmentType)}
                  onClick={handleEditorClick}
                  onBlur={handleBlur}
                />
                {(!id || !isEditable) && (
                  <Overlay isbackground='false' onClick={handleEditorClick} />
                )}
              </Box>
            </EditorWrapper>
            {segmentType === 'translation' && (locked === true || loading) && (
              <SegmentLock
                type={locked === true ? 'lock' : 'loading'}
                content={content}
                onTextLockChange={handleTextLockChange}
              />
            )}
          </>
        )}

        {(isTranslated === 'progress' ||
          isDub === 'progress' ||
          enabledTranslationsAPI) && <Overlay />}
      </SegmentTextAreaWrapper>
    );
  }
);

SegmentTextAreaInner.displayName = 'SegmentTextAreaInner';

export const SegmentTextArea = memo(SegmentTextAreaInner);
