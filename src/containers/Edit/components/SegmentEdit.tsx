import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import {
  useProject,
  useToast,
  useTranscription,
  useTranslate,
  useTranslation,
  useTranslations,
} from '~/context';
import { useSegment } from '~/context/SegmentContext';
import { DubApi, IDub, IRegenDub } from '~/api';
import { trackRegenerateDub } from '~/utils/helpers';

import SegmentRow from './SegmentRow';

interface ISegmentEdit {
  transcriptionSegments: any[];
  translationSegments: any[];
}

export const SegmentEdit = ({
  transcriptionSegments,
  translationSegments,
}: ISegmentEdit) => {
  const [editedSegments, setEditedSegments] = useState<any[]>([]);
  const [bEditedSegments, setBEditedSegments] = useState<any[]>([]);
  const textAreaARefs = useRef<Array<React.RefObject<HTMLTextAreaElement>>>([]);
  const textAreaBRefs = useRef<Array<React.RefObject<HTMLTextAreaElement>>>([]);

  const { project } = useProject();
  const { transcription } = useTranscription({
    transcriptionId: project?.transcriptionId || '',
  });
  const {
    addNewSegment,
    activeSegmentInfo,
    setActiveSegmentInfo,
    updateActiveSegmentInfoIfUnlocked,
    mergeSegment,
    deleteSegment,
    setHasUnsavedChanges,
    debouncedSaveSegmentTextTranscription,
    debouncedSaveSegmentTextTranslation,
    flushSaveSegmentTextTranslation,
    flushSaveSegmentTextTranscription,
  } = useSegment();
  const { showErrorToast } = useToast();
  const { contentId, translationId, mediaCategory } = project;
  const { targetVoice, targetAccent, setIsDub } = useTranslate();
  const { enabledTranslationsAPI } = useTranslations();
  const { translation } = useTranslation({
    translationId,
    mediaCategory,
    enabledTranslationsAPI,
  });

  const { mutate: reGenerateDub } = useMutation(
    (data: IRegenDub) => DubApi.regenerateDub(data),
    {
      onSuccess: () => {
        trackRegenerateDub({
          projectId: project.projectId,
          projectName: project.projectName,
          fileUUID: project?.content?.fileUuid,
        });
        setIsDub('progress');
      },
      onError: () => {
        showErrorToast(`Regenerating Dub went wrong.`);
      },
    }
  );

  const handleRefresh = async () => {
    const currentDub = translation.dub.find(
      (item: IDub) =>
        item?.language === targetAccent &&
        item?.voiceMatchingMode === targetVoice
    );
    try {
      // Call the dub API
      reGenerateDub({
        contentId,
        translationId,
        dubId: currentDub.id,
        segmentLevel: true,
      });
      // Handle the response from the dub API
    } catch (error) {
      console.error('Error calling dub API:', error);
    }
  };

  useEffect(() => {
    return () => {
      // This will be called when the component is unmounted
      flushSaveSegmentTextTranscription();
      flushSaveSegmentTextTranslation();
    };
  }, [flushSaveSegmentTextTranscription, flushSaveSegmentTextTranslation]);

  useEffect(() => {
    setEditedSegments([...transcriptionSegments]);
    textAreaARefs.current = transcriptionSegments.map(
      (_, i) =>
        textAreaARefs.current[i] ?? React.createRef<HTMLTextAreaElement>()
    );
  }, [transcriptionSegments]);

  useEffect(() => {
    setBEditedSegments([...translationSegments]);
    textAreaBRefs.current = translationSegments.map(
      (_, i) =>
        textAreaBRefs.current[i] ?? React.createRef<HTMLTextAreaElement>()
    );
  }, [translationSegments]);

  // Function to handle the Add Segment action
  const handleAddSegment = async (index: number, segmentType: string) => {
    // Cursor is at the end of the content, add a new segment
    await addNewSegment(
      index,
      editedSegments[index].content,
      editedSegments[index].content.length,
      true
    );

    updateActiveSegmentInfoIfUnlocked({
      segmentType,
      activeIndex: index + 1,
    });

    setTimeout(() => {
      handleCursor(index + 1, 0, segmentType);
    }, 1000);
  };

  const handleDeleteSegment = async (index: number, segmentType: string) => {
    const previousSegmentLength = editedSegments[index].content.length;

    deleteSegment(index);
    // Focus the merged segment
    setActiveSegmentInfo({
      segmentType,
      activeIndex: index,
    });
    // Use setTimeout to wait for the state update and component re-render
    setTimeout(() => {
      handleCursor(index - 1, previousSegmentLength + 1, segmentType);
    }, 0);
  };

  // Function to handle the Merge Segment action
  const handleMergeSegment = async (index: number, segmentType: string) => {
    const currentSegmentLength = editedSegments[index].content.length;
    const newText = editedSegments[index + 1]?.content || '';
    mergeSegment(index + 1, newText);
    setActiveSegmentInfo({
      segmentType,
      activeIndex: index,
    });
    setTimeout(() => {
      handleCursor(index, currentSegmentLength + 1, segmentType);
    }, 0);
  };

  const handleCursor = (
    index: number,
    cursorPosition: number,
    segmentType: string
  ) => {
    const textArea =
      segmentType === 'transcription'
        ? textAreaARefs.current[index]?.current
        : textAreaBRefs.current[index]?.current;
    if (textArea) {
      textArea.focus();
      textArea.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleChange = async (
    index: number,
    text: string,
    locked: boolean,
    segmentType: string
  ) => {
    if (segmentType === 'transcription') {
      if (
        editedSegments[index].content.split('\n').length ===
        text.split('\n').length - 1
      ) {
        // Disable updating text API call since that action is done on handleKeyPress.
        console.log('pressing enter');
      } else {
        await debouncedSaveSegmentTextTranscription(index, text);
      }

      setEditedSegments(
        editedSegments.map((segment, segIndex) =>
          segIndex === index
            ? {
                ...segment,
                content: text,
                locked,
              }
            : segment
        )
      );

      if (
        !bEditedSegments[index]?.locked ||
        bEditedSegments[index]?.locked === false
      ) {
        setBEditedSegments(
          bEditedSegments.map((segment, segIndex) =>
            segIndex === index ? { ...segment, loading: true } : segment
          )
        );
      }
    } else {
      const dubKey = `${targetAccent}-${targetVoice}`;

      setBEditedSegments(
        bEditedSegments.map((segment, segIndex) =>
          segIndex === index
            ? {
                ...segment,
                content: text,
                locked,
                fileNameToDubs: { ...segment.fileNameToDubs, [dubKey]: '' }, // Set fileNameToDubs for dubKey to ''
              }
            : segment
        )
      );

      await debouncedSaveSegmentTextTranslation(index, text, true);
    }
  };

  const handleLockChange = async (
    index: number,
    text: string,
    locked: boolean
  ) => {
    setBEditedSegments(
      bEditedSegments.map((segment, segIndex) =>
        segIndex === index
          ? { ...segment, content: text, locked, loading: true }
          : segment
      )
    );
    await debouncedSaveSegmentTextTranslation(
      index,
      bEditedSegments[index].content,
      false,
      true
    );
  };

  const handleKeyPress = async (
    index: number,
    event: any,
    segmentType: string,
    keyType?: string
  ) => {
    setHasUnsavedChanges(true);
    if (event.key === 'Enter' && segmentType === 'transcription') {
      event.preventDefault();
      const cursorPosition = event.target.selectionStart;
      const cleanContentNoReturns = editedSegments[index].content;
      const charactersBetweenCursorAndBeginning = cleanContentNoReturns
        .substring(0, cursorPosition)
        .trim();
      const charactersBetweenCursorAndEnd = cleanContentNoReturns
        .substring(cursorPosition)
        .trim();

      if (
        charactersBetweenCursorAndEnd !== '' &&
        charactersBetweenCursorAndBeginning !== '' &&
        cursorPosition !== cleanContentNoReturns.length &&
        cursorPosition !== 1
      ) {
        // Cursor is at the end of the content, add a new segment
        await addNewSegment(
          index,
          editedSegments[index].content,
          cursorPosition
        );

        updateActiveSegmentInfoIfUnlocked({
          segmentType,
          activeIndex: index + 1,
        });
      }

      setTimeout(() => {
        handleCursor(index + 1, 0, segmentType);
      }, 1000);

      return;
    }

    if (event.key === 'Backspace' && segmentType === 'transcription') {
      // Prevent default backspace behavior
      event.preventDefault();

      const currentSegmentContent = editedSegments[index].content;

      const isEntireTextSelected =
        event.target.selectionStart === 0 &&
        event.target.selectionEnd === currentSegmentContent.length &&
        currentSegmentContent.length !== 0;

      if (isEntireTextSelected) {
        // Clear out the segment content if the entire text is selected
        editedSegments[index].content = ''; // Clear the current segment content

        // Update the state to reflect the change
        setEditedSegments([...editedSegments]);

        // Refocus on the current segment after clearing it
        setActiveSegmentInfo({
          segmentType,
          activeIndex: index,
        });

        setTimeout(async () => {
          handleCursor(index, 0, segmentType);
        }, 0);
        await debouncedSaveSegmentTextTranscription(index, ' ');
      } else if (
        event.target.selectionStart === 0 &&
        index > 0 &&
        keyType === 'keydown'
      ) {
        // Handle merging with previous segment if not the entire text is selected
        const previousSegmentLength = editedSegments[index - 1].content.length;
        const newText = event.target.value;
        mergeSegment(index, newText);
        // Focus the merged segment
        setActiveSegmentInfo({
          segmentType,
          activeIndex: index - 1,
        });
        // Use setTimeout to wait for the state update and component re-render
        setTimeout(() => {
          handleCursor(index - 1, previousSegmentLength + 1, segmentType);
        }, 0);
      }
    }
  };

  return (
    <Box className='segment-wrapper' width='100%'>
      {editedSegments.map((segment, index) => (
        <SegmentRow
          key={segment.id || index}
          index={index}
          segment={segment}
          editedSegments={editedSegments}
          bEditedSegments={bEditedSegments}
          project={project}
          transcription={transcription}
          setActiveSegmentInfo={setActiveSegmentInfo}
          activeSegmentInfo={activeSegmentInfo}
          textAreaARefs={textAreaARefs}
          textAreaBRefs={textAreaBRefs}
          handleChange={handleChange}
          handleLockChange={handleLockChange}
          handleKeyPress={handleKeyPress}
          handleRefresh={handleRefresh}
          handleAddSegment={handleAddSegment}
          handleMergeSegment={handleMergeSegment}
          handleDeleteSegment={handleDeleteSegment}
        />
      ))}
    </Box>
  );
};
