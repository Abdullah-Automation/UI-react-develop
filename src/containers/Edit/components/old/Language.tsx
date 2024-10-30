import { useEffect, useState, createRef, useCallback } from 'react';
import { Box, styled } from '@mui/material';
import _ from 'lodash';

import { useTranslate } from '~/context';
import { findNewSegmentIndex, findClosestWordIndex } from '~/utils/helpers';

import { TranslatingVideo } from './TranslatingVideo';
import { SegmentHeader } from './SegmentHeader';
import { TranslateNow } from './TranslateNow';
import { SegmentsWrapper } from './SegmentsWrapper';
import { LoadingVideo } from './LoadingVideo';

interface ILanguage {
  isReadOnly: boolean;
  isTranslationLoading?: boolean;
  mediaCategory: string;
  type: string;
  mediaId: string;
  transId: string;
  projectId: string;
  segments: [];
  canEdit?: boolean;
  speakers: [];
  translationVariants?: any[];
  audioToggle?: boolean;
  handleBackgroundAudioToggle?: () => void;
  refetchTranslation: () => void;
}

export const Language = ({
  type = 'Transcription',
  isReadOnly,
  mediaCategory,
  mediaId,
  transId,
  projectId,
  segments,
  canEdit,
  audioToggle,
  translationVariants = [],
  handleBackgroundAudioToggle,
  refetchTranslation,
}: ILanguage) => {
  const { isTranslated, isEdit } = useTranslate();

  const [editorRefs, setEditorRefs] = useState<any[]>([]);
  const [editSegments, setEditSegments] = useState<any[]>([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number>(-1);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [videoSeekTime, setVideoSeekTime] = useState(0);
  const [editorRefsInitialized, setEditorRefsInitialized] =
    useState<boolean>(false);
  const [scrollable, setScrollable] = useState<boolean>(true);
  // @ts-ignore
  const [cursor, setCursor] = useState<any>({
    segmentIndex: null,
    cursorIndex: null,
  });

  const createEditorRefs = (length: number) =>
    Array(length)
      .fill(null)
      .map(() => createRef());

  useEffect(() => {
    setEditSegments(_.cloneDeep(segments));
    if (segments.length > 0) {
      setEditorRefs(createEditorRefs(segments.length));
    }
  }, [segments]);

  useEffect(() => {
    if (editorRefs.length > 0) {
      setEditorRefsInitialized(true);
    }
  }, [editorRefs]);

  const handleEditSegment = useCallback(
    (
      // @ts-ignore
      oldSegment: any,
      // @ts-ignore
      preSegmentId: string,
      // @ts-ignore
      upSegmentId: string,
      // @ts-ignore
      newSegment?: any
    ) => {},
    []
  );

  const handleEditUpdate = useCallback(
    // @ts-ignore
    (id: string, text: any, isSpeaker: boolean) => {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editSegments]
  );

  const handleWordClick = (startTime: any) => {
    setVideoSeekTime(startTime);
  };

  const clearHighlightsFromAllEditors = () => {
    if (editSegments.length === 0) return;
    editSegments.forEach(segment => {
      segment.wordIndexToTrackClick = undefined;
      segment.wordIndexToTrackHighlight = undefined;
    });
    setEditSegments(_.cloneDeep(editSegments));
  };

  const handleTimeClickWrapper = (
    currentTime: number,
    updatedSegments: any[],
    isScroll: boolean
  ) => {
    clearHighlightsFromAllEditors();
    if (currentTime) {
      handleTimeUpdate(currentTime, updatedSegments, isScroll);
    }
  };

  const handleTimeUpdate = (
    currentTime: number,
    updatedSegments: any[],
    isScroll: boolean
  ) => {
    if (!updatedSegments[0]?.wordDetails?.length) return;

    const newSegmentIndex = findNewSegmentIndex(currentTime, updatedSegments);
    if (newSegmentIndex === -1) return;

    const wordIndex = findClosestWordIndex(
      currentTime,
      updatedSegments[newSegmentIndex].wordDetails
    );

    if (
      newSegmentIndex === currentSegmentIndex &&
      wordIndex === currentWordIndex
    ) {
      return;
    }

    setCurrentSegmentIndex(newSegmentIndex);
    setCurrentWordIndex(wordIndex);

    updatedSegments[newSegmentIndex].wordIndexToTrackHighlight = wordIndex;
    setEditSegments(_.cloneDeep(updatedSegments));

    if (isEdit === type) {
      setScrollable(isScroll);
    } else {
      setScrollable(true);
    }
  };

  return (
    <Wrapper type={type}>
      {type !== 'Transcription' || editorRefsInitialized ? (
        <TranslatingVideo
          key={mediaId}
          mediaCategory={mediaCategory}
          isReadOnly={isReadOnly}
          canEdit={canEdit}
          mediaId={mediaId}
          type={type}
          audioToggle={audioToggle}
          seekTime={videoSeekTime}
          editSegments={editSegments}
          handleBackgroundAudioToggle={handleBackgroundAudioToggle}
          handleTrackerClickP={handleTimeClickWrapper}
        />
      ) : (
        <LoadingVideo mediaCategory={mediaCategory} />
      )}
      <SWrapper mediacategory={mediaCategory} isedit={isEdit} type={type}>
        <SegmentHeader
          isReadOnly={isReadOnly}
          type={type}
          canEdit={canEdit}
          mediaId={mediaId}
          transId={transId}
          segments={editSegments}
          originSegments={segments}
          translationVariants={translationVariants}
          refetchTranslation={refetchTranslation}
        />
        <Content>
          {editSegments.length > 0 ? (
            type !== 'Transcription' &&
            isTranslated === 'progress' &&
            isReadOnly === false ? (
              <TranslateNow
                canEdit={canEdit}
                translationVariants={translationVariants}
              />
            ) : (
              // @ts-ignore
              <SegmentsWrapper
                segments={_.cloneDeep(editSegments)}
                editorRefs={editorRefs}
                cursor={cursor}
                type={type}
                transId={transId}
                projectId={projectId}
                scrollable={scrollable}
                handleEditUpdate={handleEditUpdate}
                handleEditSegment={handleEditSegment}
                handleWordClick={handleWordClick}
              />
            )
          ) : (
            <TranslateNow
              canEdit={canEdit}
              translationVariants={translationVariants}
            />
          )}
        </Content>
      </SWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ type: string }>(({ type = 'Transcription' }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  border: '1px solid #E0E1EC',
  borderRight: type === 'Transcription' ? '0px' : '1px solid #E0E1EC',
  overflow: 'hidden',
  flex: 1,
  position: 'relative',
  borderTopLeftRadius: type === 'Transcription' ? '4px' : '0',
  borderBottomLeftRadius: type === 'Transcription' ? '4px' : '0',
  borderTopRightRadius: type === 'Transcription' ? '0' : '4px',
  borderBottomRightRadius: type === 'Transcription' ? '0' : '4px',
}));

const SWrapper = styled(Box)<{
  mediacategory: string;
  isedit: string;
  type: string;
}>(({ mediacategory = 'video', isedit = '', type = 'Transcription' }) => ({
  height:
    mediacategory === 'audio'
      ? 'calc(100vh - 48px - 186px - 24px - 7px)'
      : 'calc(100vh - 48px - 294px - 24px - 7px)',
  borderBottomLeftRadius: type === 'Transcription' ? '4px' : '0',
  borderBottomRightRadius: type === 'Transcription' ? '0' : '4px',
  display: 'flex',
  flexDirection: 'column',
  border:
    isedit === type
      ? type === 'Transcription'
        ? '2px solid #3A4ADE'
        : '2px solid #832AD0'
      : '2px solid #fff',
}));

const Content = styled(Box)(() => ({
  marginRight: '2px',
  height: '100%',
}));
