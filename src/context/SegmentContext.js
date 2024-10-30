import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import _, { debounce } from 'lodash'; // or any other debounce implementation
import * as Sentry from '@sentry/react';

import { TranscriptionApi, TranslationApi } from '~/api';
import {
  useTranslate,
  useProject,
  useVideoPlayerContext,
  useToast,
} from '~/context';
import APIQueue from '~/utils/helpers/APIQueue';
import { getSegmentToSave, checkValidSegment } from '~/utils/helpers';

const SegmentContext = createContext();

export const SegmentProvider = ({ children }) => {
  const { isProjectLoading, project, mediaCategory, isReadOnly, isOwner } =
    useProject();
  const apiQueue = new APIQueue();
  const {
    translationId,
    isDub,
    setIsDubUpdated,
    targetLang,
    targetAccent,
    targetVoice,
  } = useTranslate();
  const { handleTrackSegment } = useVideoPlayerContext();
  const [invalidTime, setInvalidTime] = useState([]);
  const [validation, setValidation] = useState({});

  const [pendingEdits, setPendingEdits] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [transcriptionSegments, setTranscriptionSegmentsState] = useState([]);
  const [translationSegments, setTranslationSegmentsState] = useState([]);
  const [activeSegmentInfo, setActiveSegmentInfo] = useState({
    activeIndex: null,
    segmentType: '',
  }); // Added state for activeIndex
  // Assuming 'hasUnsavedChanges' is the state that triggers autosave when true
  const languageMapDeepl = {
    es_la: 'es',
    es_es: 'es',
    pt_br: 'pt',
    pt_pt: 'pt',
  };
  const { showErrorToast } = useToast();

  useEffect(() => {
    const zeroLengthSegments = transcriptionSegments.filter(
      segment => segment.startTime === segment.endTime
    );
    if (zeroLengthSegments.length > 0) {
      Sentry.withScope(scope => {
        scope.setExtra(
          'text',
          JSON.stringify({
            zeroLengthSegments,
          })
        );
        Sentry.captureException(
          `The saving of zero length segments happened. ${JSON.stringify(
            zeroLengthSegments
          )}`
        );
      });
    }
  }, [transcriptionSegments]); // Depend on transcriptionSegments to re-run the effect when it changes

  // Method to update active segment info with a lock check for translation segments
  const updateActiveSegmentInfoIfUnlocked = useCallback(
    ({ segmentType, activeIndex }) => {
      if (
        translationSegments &&
        translationSegments.length > 0 &&
        translationSegments[activeIndex]?.locked === false
      ) {
        console.error(
          'Cannot update active segment info because the translation segment is locked.'
        );
        // Optionally, handle the locked state here (e.g., show a notification)
      } else {
        setActiveSegmentInfo({ segmentType, activeIndex });
      }
    },
    [translationSegments]
  );
  const getDeepLLanguageCode = code => languageMapDeepl[code] || code;

  const setTranscriptionSegments = input => {
    setTranscriptionSegmentsState(prevSegments => {
      // Determine whether input is a function or an array
      const newSegments =
        typeof input === 'function' ? input(prevSegments) : input;

      // Ensure newSegments is an array before proceeding
      if (!Array.isArray(newSegments)) {
        console.error(
          'setTranscriptionSegments received non-array input:',
          newSegments
        );
        return prevSegments; // Return previous state if not an array
      }

      // Add an index to each item in the new segments array
      return newSegments.map((item, index) => ({ ...item, index }));
    });
  };

  const setTranslationSegments = input => {
    setTranslationSegmentsState(prevSegments => {
      // Determine whether input is a function or an array
      const newSegments =
        typeof input === 'function' ? input(prevSegments) : input;

      // Ensure newSegments is an array before proceeding
      if (!Array.isArray(newSegments)) {
        console.error(
          'setTranslationSegments received non-array input:',
          newSegments
        );
        return prevSegments; // Return previous state if not an array
      }

      // Add an index to each item in the new segments array
      return newSegments.map((item, index) => ({ ...item, index }));
    });
  };

  const addTranscriptionSegments = useCallback(
    (
      transcriptionSegments,
      index,
      cursorPosition,
      text,
      setTranscriptionSegments,
      apiQueue,
      project,
      setDates
    ) => {
      const currentSegment = transcriptionSegments[index];
      const timePerChar =
        (currentSegment.endTime - currentSegment.startTime) /
        currentSegment.content.length;
      let newStartTime = parseFloat(
        (currentSegment.startTime + timePerChar * cursorPosition).toFixed(2)
      );
      if (!Number.isFinite(newStartTime)) {
        newStartTime = currentSegment.endTime;
      }

      if (!setDates && newStartTime > currentSegment.endTime) {
        newStartTime = currentSegment.endTime;
      }

      // Skip this validation if setDates is true

      if (!setDates && currentSegment.endTime === newStartTime) {
        showErrorToast(
          'The start and end time cannot be the same. No new segment has been added.'
        );
        Sentry.withScope(scope => {
          scope.setExtra('text', JSON.stringify({ currentSegment }));
          Sentry.captureException(
            `The saving of zero length segments happened. ${JSON.stringify(
              currentSegment
            )}`
          );
        });

        return {
          currentSegment: -1,
          newStartTime: -1,
          updatedTranscriptionSegments: undefined,
          newTranscriptionSegment: undefined,
        };
      }

      const updatedTranscriptionSegments = [...transcriptionSegments];

      let startTime;
      let endTime;
      if (setDates) {
        // Assuming the segments have startTime and endTime properties
        startTime = currentSegment.endTime;
        const nextSegment = transcriptionSegments[index + 1];
        endTime = nextSegment ? nextSegment.startTime : startTime;
      }
      const { wordDetails, transcription, ...restOfCurrentSegmentNoWD } =
        currentSegment;
      const updatedSegment = {
        ...restOfCurrentSegmentNoWD,
        content: text
          .substring(0, cursorPosition)
          .replace(/(\r\n|\n|\r)/gm, ''),
        endTime: newStartTime,
        ...(setDates && { endTime: startTime }),
      };

      const { id, ...restOfCurrentSegment } = restOfCurrentSegmentNoWD;

      const newTranscriptionSegment = {
        ...restOfCurrentSegment,
        startTime: newStartTime,
        endTime: currentSegment.endTime,
        index: index + 1,
        content: text.substring(cursorPosition).replace(/(\r\n|\n|\r)/gm, ''),
        ...(setDates && { startTime, endTime }),
      };
      updatedTranscriptionSegments[index] = updatedSegment;
      updatedTranscriptionSegments.splice(
        index + 1,
        0,
        newTranscriptionSegment
      );
      setTranscriptionSegments(updatedTranscriptionSegments);
      handleTrackSegment({
        trackedTime: newStartTime,
        type: 'segment',
        endTrackedTime: currentSegment.endTime,
      });

      if (newTranscriptionSegment.content.split(' ').join('').length > 0) {
        apiQueue.enqueue(async () => {
          updatedSegment.editOperationType = 'update';
          newTranscriptionSegment.editOperationType = 'create';
          const segmentsToSave = [updatedSegment, newTranscriptionSegment];
          const apiResult = await TranscriptionApi.editTranscriptionSegment(
            project?.transcriptionId,
            segmentsToSave
          );
          const newTranscriptionSegmentWithId = apiResult.createdSegments[0];

          setTranscriptionSegments(prevTranscriptionSegments => {
            const updatedSegments = [...prevTranscriptionSegments];
            updatedSegments[index + 1] = {
              ...updatedSegments[index + 1],
              id: newTranscriptionSegmentWithId.id,
            };
            return updatedSegments;
          });
        });
      } else {
        setTranscriptionSegments(prevTranscriptionSegments => {
          const updatedSegments = [...prevTranscriptionSegments];
          updatedSegments[index + 1] = {
            ...updatedSegments[index + 1],
            id: `create-${
              Object.keys(validation).filter(id => id.includes('create')).length
            }`,
          };
          return updatedSegments;
        });

        setValidation(prevValidation => ({
          ...prevValidation,
          [`create-${
            Object.keys(validation).filter(id => id.includes('create')).length
          }`]: ['start', 'end'],
        }));
      }

      return {
        currentSegment,
        newStartTime,
        updatedTranscriptionSegments,
        newTranscriptionSegment,
      };
    },
    [handleTrackSegment, showErrorToast]
  );

  const callTranslateAPIOnMerge = async (
    updatedTranscriptionSegments,
    index,
    setTranslationSegments
  ) => {
    try {
      const lang = getDeepLLanguageCode(targetLang);
      const mergedContent = updatedTranscriptionSegments[index - 1].content;

      const translationResult = await TranslationApi.translateContent({
        content: mergedContent,
        index: index - 1,
        targetLanguage: lang, // replace 'es' with the actual target language
      });

      // Update the translation segment with the actual translated content
      setTranslationSegments(prevSegments => {
        const newSegments = [...prevSegments];
        newSegments[index - 1] = {
          ...newSegments[index - 1],
          content: translationResult.translations[0]?.text,
          index: index - 1,
        };
        return newSegments;
      });

      return translationResult.translations[0]?.text;
    } catch (error) {
      console.error('Error translating merged segment:', error);

      return null;
    }
  };

  const onSegmentsSave = useCallback(
    async (segments, type) => {
      if (type === 'transcription') {
        setTranscriptionSegments(segments);
        const contentForAPI = segments.map(item => {
          const { ...rest } = item;
          return rest;
        });
        // @ts-ignore
        const res = await TranscriptionApi.updateAllTranscriptSegments(
          project?.transcriptionId,
          contentForAPI
        );
      } else if (type === 'translation') {
        setTranslationSegments(segments);

        await TranslationApi.bulkUpdateTranslationSegments(
          project?.translationId,
          segments
        );
      }
    },
    [project?.transcriptionId, project?.translationId]
  );

  const addNewSegment = useCallback(
    async (index, text, cursorPosition, setDates) => {
      if (typeof text !== 'string' || typeof cursorPosition !== 'number') {
        console.error('Invalid segment data');
        return;
      }
      if (translationSegments && translationSegments.length > 0) {
        if (translationSegments[index]?.locked === true) {
          return;
        }
      }
      const {
        currentSegment,
        newStartTime,
        updatedTranscriptionSegments,
        newTranscriptionSegment,
      } = addTranscriptionSegments(
        transcriptionSegments,
        index,
        cursorPosition,
        text,
        setTranscriptionSegments,
        apiQueue,
        project,
        setDates
      );

      if (newStartTime === -1) return; // invalid times
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

      // Wait for 1 second before continuing
      await delay(2000);

      // Ensure newStartTime and currentSegment.endTime are not creating a zero-length segment
      let effectiveNewStartTime =
        currentSegment.endTime === newStartTime
          ? currentSegment.endTime + 0.001
          : newStartTime;

      if (!Number.isFinite(effectiveNewStartTime)) {
        effectiveNewStartTime = currentSegment.endTime;
      }

      let newEndTime;
      if (setDates && index + 1 < transcriptionSegments.length) {
        newEndTime = transcriptionSegments[index + 1].startTime;
      } else {
        newEndTime = newTranscriptionSegment.endTime;
      }

      let updatedTranslationSegments;
      if (translationSegments && translationSegments.length > 0) {
        updatedTranslationSegments = [...translationSegments];
        // Adjust the existing segment
        updatedTranslationSegments[index] = {
          ...updatedTranslationSegments[index],
          endTime: newStartTime, // Adjust endTime to match the new start time of the split segment
          content: text.substring(0, cursorPosition), // Update content if necessary
        };

        if (!Number.isFinite(effectiveNewStartTime)) {
          effectiveNewStartTime = currentSegment.endTime;
        }

        if (effectiveNewStartTime > currentSegment.endTime) {
          effectiveNewStartTime = currentSegment.endTime;
        }

        let newTranslationSegment = {
          ...translationSegments[index],
          startTime: effectiveNewStartTime, // Adjusted to use effectiveNewStartTime
          endTime: newEndTime,
          content: '',
          index: index + 1,
          loading: true,
        };

        if (newTranscriptionSegment.content.split(' ').join('').length === 0) {
          newTranslationSegment = {
            ...newTranslationSegment,
            id: `create-translation-${
              Object.keys(validation).filter(id => id.includes('create')).length
            }`,
          };
        }

        updatedTranslationSegments.splice(index + 1, 0, newTranslationSegment);
        setTranslationSegments(updatedTranslationSegments); // Just set the updatedTranslationSegments here
      }

      setActiveSegmentInfo(preInfo => ({ ...preInfo, activeIndex: index + 1 }));

      if (
        translationSegments &&
        translationSegments.length > 0 &&
        newTranscriptionSegment.content.split(' ').join('').length > 0
      ) {
        const existingSegmentContent =
          updatedTranscriptionSegments[index].content;
        const newSegmentContent = newTranscriptionSegment.content;

        let existingTranslationContent;
        let newTranslationContent;

        const updatedTranslationSegmentsAfterTranslate = [
          ...updatedTranslationSegments,
        ];
        const segmentToUpdate = updatedTranslationSegmentsAfterTranslate[index];
        segmentToUpdate.wordDetails = undefined;
        segmentToUpdate.translation = undefined;
        segmentToUpdate.sourceContent = existingSegmentContent;
        segmentToUpdate.editOperationType = 'update';

        const segmentToAdd =
          updatedTranslationSegmentsAfterTranslate[index + 1];
        segmentToAdd.id = undefined;
        segmentToAdd.wordDetails = undefined;
        segmentToAdd.translation = undefined;
        segmentToAdd.sourceContent = newSegmentContent;
        segmentToAdd.editOperationType = 'create';

        const segmentsToSave = [segmentToAdd, segmentToUpdate];

        const segmentsToSaveWithoutCreatedAt = segmentsToSave.map(
          ({ createdAt, updatedAt, loading, ...rest }) => rest
        );

        apiQueue.enqueue(async () => {
          try {
            const apiResult = await TranslationApi.editTranslationSegment(
              project?.translationId,
              segmentsToSaveWithoutCreatedAt
            );

            // Process API result to update state
            if (
              apiResult.createdSegments.length > 0 &&
              apiResult.updatedSegments.length > 0
            ) {
              // Immediately update local or context state here
              setIsDubUpdated(false);
              setTranslationSegments(prevSegments => {
                return prevSegments.map((segment, segIndex) => {
                  if (segIndex === index) {
                    // Update modified segment
                    return {
                      ...segment,
                      ...apiResult.updatedSegments[0],
                      loading: false,
                    };
                  }
                  if (segIndex === index + 1) {
                    // Update newly added segment
                    return {
                      ...segment,
                      ...apiResult.createdSegments[0],
                      loading: false,
                    };
                  }

                  return segment;
                });
              });
              // eslint-disable-next-line no-promise-executor-return
            }
          } catch (error) {
            console.error('Failed to update translation segments:', error);
          }
        });
      } else {
        console.log('----empty translation----');
      }
    },
    [
      addTranscriptionSegments,
      apiQueue,
      project,
      validation,
      setIsDubUpdated,
      transcriptionSegments,
      translationSegments,
    ]
  );

  const mergeSegment = useCallback(
    async (index, newText) => {
      if (index < 1 || index >= transcriptionSegments.length) {
        console.error('Invalid index for merging');
        return;
      }
      if (translationSegments && translationSegments.length > 0) {
        if (translationSegments[index]?.locked) {
          return;
        }
        if (translationSegments[index - 1]?.locked) {
          return;
        }
      }
      const updatedTranscriptionSegments = [...transcriptionSegments];

      // Merge transcription segment content and endTime
      updatedTranscriptionSegments[index - 1].content += ` ${newText}`;
      updatedTranscriptionSegments[index - 1].endTime =
        updatedTranscriptionSegments[index].endTime;

      const updatedSegment = updatedTranscriptionSegments[index - 1];
      updatedSegment.wordDetails = undefined;
      updatedSegment.transcription = undefined;
      updatedSegment.editOperationType = 'update';

      const deleteSegment = updatedTranscriptionSegments[index];
      deleteSegment.wordDetails = undefined;
      deleteSegment.transcription = undefined;
      deleteSegment.editOperationType = 'delete';
      // Remove the transcription segment that is being merged
      updatedTranscriptionSegments.splice(index, 1);
      // Set the state optimistically
      setTranscriptionSegments(updatedTranscriptionSegments);

      apiQueue.enqueue(async () => {
        // Replace with your actual API call logic
        const segmentsToSave = [updatedSegment, deleteSegment];
        const apiResult = await TranscriptionApi.editTranscriptionSegment(
          project?.transcriptionId,
          segmentsToSave
        );
      });

      if (translationSegments && translationSegments.length > 0) {
        const updatedTranslationSegments = [...translationSegments];
        // Merge translation segment content (temporarily, before API call)
        updatedTranslationSegments[
          index - 1
        ].content += ` ${updatedTranslationSegments[index]?.content}`;
        updatedTranslationSegments[index - 1].loading = true;

        const updatedTranslationSegment = updatedTranslationSegments[index - 1];
        const deletedTranslationSegment = updatedTranslationSegments[index];
        // Remove the translation segment that is being merged
        updatedTranslationSegments.splice(index, 1);
        setTranslationSegments(updatedTranslationSegments);

        apiQueue.enqueue(async () => {
          // Replace with your actual API call logic
          updatedTranslationSegment.sourceContent = updatedSegment.content;
          updatedTranslationSegment.endTime = deletedTranslationSegment.endTime;
          updatedTranslationSegment.wordDetails = undefined;
          updatedTranslationSegment.translation = undefined;
          updatedTranslationSegment.editOperationType = 'update';
          deletedTranslationSegment.wordDetails = undefined;
          deletedTranslationSegment.translation = undefined;
          deletedTranslationSegment.editOperationType = 'delete';
          const segmentsToSaveTranslation = [
            updatedTranslationSegment,
            deletedTranslationSegment,
          ];

          const segmentsToSaveWithoutCreatedAt = segmentsToSaveTranslation.map(
            ({ createdAt, updatedAt, loading, ...rest }) => rest
          );
          // Now, segmentsToSaveWithoutCreatedAt will have all the properties of the original segments except 'createdAt'

          const apiResult = await TranslationApi.editTranslationSegment(
            project?.translationId,
            segmentsToSaveWithoutCreatedAt
          );

          const updatedTranslationSegmentWithId = apiResult.updatedSegments[0];
          updatedTranslationSegmentWithId.index = index;
          updatedTranslationSegments[index - 1] =
            updatedTranslationSegmentWithId;

          setIsDubUpdated(false);
          setTranslationSegments(updatedTranslationSegments);
        });
      }
    },
    [
      apiQueue,
      project?.transcriptionId,
      project?.translationId,
      setIsDubUpdated,
      transcriptionSegments,
      translationSegments,
    ]
  );

  const deleteSegment = useCallback(
    async index => {
      if (index < 0 || index >= transcriptionSegments.length) {
        console.error('Invalid index for merging');
        return;
      }
      if (translationSegments && translationSegments.length > 0) {
        if (translationSegments[index]?.locked) {
          return;
        }
        if (translationSegments[index - 1]?.locked) {
          return;
        }
      }
      const updatedTranscriptionSegments = [...transcriptionSegments];
      const deleteSegment = updatedTranscriptionSegments[index];
      deleteSegment.wordDetails = undefined;
      deleteSegment.transcription = undefined;
      deleteSegment.editOperationType = 'delete';
      updatedTranscriptionSegments.splice(index, 1);
      setTranscriptionSegments(updatedTranscriptionSegments);

      if (!deleteSegment.id.includes('create')) {
        apiQueue.enqueue(() => {
          TranscriptionApi.editTranscriptionSegment(project?.transcriptionId, [
            deleteSegment,
          ]);
        });
      }

      if (translationSegments && translationSegments.length > 0) {
        const updatedTranslationSegments = [...translationSegments];
        const deletedTranslationSegment = updatedTranslationSegments[index];
        updatedTranslationSegments.splice(index, 1);
        setTranslationSegments(updatedTranslationSegments);

        if (!deletedTranslationSegment.id.includes('create')) {
          apiQueue.enqueue(() => {
            deletedTranslationSegment.wordDetails = undefined;
            deletedTranslationSegment.translation = undefined;
            deletedTranslationSegment.editOperationType = 'delete';
            const segmentsToSaveTranslation = [deletedTranslationSegment];
            const segmentsToSaveWithoutCreatedAt =
              segmentsToSaveTranslation.map(
                ({ createdAt, updatedAt, loading, ...rest }) => rest
              );
            // Now, segmentsToSaveWithoutCreatedAt will have all the properties of the original segments except 'createdAt'
            TranslationApi.editTranslationSegment(
              project?.translationId,
              segmentsToSaveWithoutCreatedAt
            );

            setIsDubUpdated(false);
          });
        }
      }
    },
    [
      apiQueue,
      project?.transcriptionId,
      project?.translationId,
      transcriptionSegments,
      translationSegments,
      setIsDubUpdated,
    ]
  );

  const saveSegmentTextTranscription = async (index, newText) => {
    // Update the transcription segment content
    const currentTranscriptionSegment = transcriptionSegments[index];
    currentTranscriptionSegment.content = newText;

    // Enqueue the save operation for the transcription
    apiQueue.enqueue(async () => {
      const apiResultTranscription =
        await TranscriptionApi.editTranscriptionSegment(
          project?.transcriptionId,
          getSegmentToSave(currentTranscriptionSegment, 'transcription')
        );

      if (currentTranscriptionSegment.id.includes('create')) {
        setTranscriptionSegments(prevSegments => {
          const segments = [...prevSegments];
          segments[index].id = apiResultTranscription.createdSegments[0].id;
          return [...segments];
        });
      }
    });

    // Directly call translateContent without enqueuing in apiQueue
    if (translationSegments && translationSegments.length > index) {
      try {
        const currentSegment = translationSegments[index];
        if (currentSegment.locked !== undefined && currentSegment.locked) {
          return;
        }

        // Prepare the translation segment with the new translation
        const updatedTranslationSegment = {
          ...translationSegments[index],
          sourceContent: newText,
        };

        // Enqueue the save operation for the translation
        apiQueue.enqueue(async () => {
          const apiResultTranslation =
            await TranslationApi.editTranslationSegment(
              project?.translationId,
              getSegmentToSave(updatedTranslationSegment, 'translation')
            );

          // Update the local state with the new translation content if needed
          // This part is optional and depends on how your state management is setup
          setIsDubUpdated(false);
          const dubKey = `${targetAccent}-${targetVoice}`;
          console.log('dubKey::', dubKey);
          setTranslationSegments(prevSegments =>
            prevSegments.map((segment, idx) =>
              idx === index
                ? updatedTranslationSegment.id.includes('create')
                  ? {
                      ...segment,
                      id: apiResultTranslation.createdSegments[0]?.id,
                      content: apiResultTranslation.createdSegments[0]?.content,
                      locked: apiResultTranslation.createdSegments[0]?.locked,
                      // Update fileName based on the fileNameToDubs entry for the given dubKey
                      fileName:
                        apiResultTranslation.createdSegments[0]
                          ?.fileNameToDubs?.[dubKey] || segment.fileName, // Fallback to existing fileName if not found
                      fileNameToDubs:
                        apiResultTranslation.createdSegments[0]?.fileNameToDubs,
                      loading: false,
                    }
                  : {
                      ...segment,
                      content: apiResultTranslation.updatedSegments[0]?.content,
                      locked: apiResultTranslation.updatedSegments[0]?.locked,
                      fileName:
                        apiResultTranslation.updatedSegments[0]
                          ?.fileNameToDubs?.[dubKey] || segment.fileName, // Fallback to existing fileName if not found
                      // Optionally, update fileNameToDubs as well if necessary
                      fileNameToDubs:
                        apiResultTranslation.updatedSegments[0]?.fileNameToDubs,
                      loading: false,
                    }
                : segment
            )
          );
        });
      } catch (error) {
        console.error(`Error translating segment at index ${index}:`, error);
      }
    }
  };

  const saveTranscriptionSegmentSpeaker = useCallback(
    (transcriptionSegments, index, speaker) => {
      const currentSegment = transcriptionSegments[index];
      const updatedTranscriptionSegments = [...transcriptionSegments];
      const { wordDetails, transcription, ...restOfCurrentSegmentNoWD } =
        currentSegment;
      restOfCurrentSegmentNoWD.editOperationType = 'update';
      restOfCurrentSegmentNoWD.speaker = speaker;

      const segmentsToSave = [restOfCurrentSegmentNoWD];

      apiQueue.enqueue(async () => {
        // Replace with your actual API call logic
        const apiResult = await TranscriptionApi.editTranscriptionSegment(
          project?.transcriptionId,
          segmentsToSave
        );
        setIsDubUpdated(false);
      });
    },
    [apiQueue, project?.transcriptionId, setIsDubUpdated]
  );

  const saveTranslationSegmentSpeaker = useCallback(
    (translationSegments, index, speaker) => {
      const currentSegment = translationSegments[index];
      const newTranslationSegments = [...translationSegments];
      const {
        wordDetails,
        translation,
        previousEndTime,
        createdAt,
        updatedAt,
        ...restOfCurrentSegmentNoWD
      } = currentSegment;
      restOfCurrentSegmentNoWD.editOperationType = 'update';

      if (speaker === 'Retain audio') {
        restOfCurrentSegmentNoWD.retainAudio = true;
      } else {
        restOfCurrentSegmentNoWD.retainAudio = false;
      }

      restOfCurrentSegmentNoWD.speaker = speaker;
      const segmentsToSave = [restOfCurrentSegmentNoWD];

      apiQueue.enqueue(async () => {
        // Replace with your actual API call logic
        const apiResult = await TranslationApi.editTranslationSegment(
          project?.translationId,
          segmentsToSave
        );
      });
      newTranslationSegments[index] = restOfCurrentSegmentNoWD;
      setTranslationSegments(newTranslationSegments);
    },
    [apiQueue, project?.translationId]
  );

  const saveSegmentSpeaker = useCallback(
    async (index, speaker) => {
      // Enqueue the save operation
      saveTranscriptionSegmentSpeaker(transcriptionSegments, index, speaker);
      if (translationSegments && translationSegments.length > 0) {
        saveTranslationSegmentSpeaker(translationSegments, index, speaker);
      }
    },
    [
      saveTranscriptionSegmentSpeaker,
      saveTranslationSegmentSpeaker,
      transcriptionSegments,
      translationSegments,
    ]
  );

  const saveSegmentTextTranslation = async (
    index,
    newText,
    locked,
    override
  ) => {
    if (!translationSegments || translationSegments.length <= 0) {
      return;
    }
    console.log(`${translationSegments[index]?.locked} | ${override}`);

    // Enqueue the save operation
    const currentSegment = translationSegments[index];
    currentSegment.content = newText;
    const updatedTranscriptionSegments = [...translationSegments];
    const {
      wordDetails,
      translation,
      previousEndTime,
      updatedAt,
      createdAt,
      loading,
      ...restOfCurrentSegmentNoWD
    } = currentSegment;
    restOfCurrentSegmentNoWD.editOperationType = 'update';

    if (locked !== undefined) {
      restOfCurrentSegmentNoWD.locked = locked;
    } else {
      restOfCurrentSegmentNoWD.locked = true;
    }
    if (restOfCurrentSegmentNoWD.locked === false) {
      const transcriptionSegment = transcriptionSegments[index];
      restOfCurrentSegmentNoWD.sourceContent = transcriptionSegment.content;
    }
    const segmentsToSave = [restOfCurrentSegmentNoWD];

    apiQueue.enqueue(async () => {
      const apiResult = await TranslationApi.editTranslationSegment(
        project?.translationId,
        segmentsToSave
      );

      setIsDubUpdated(false);

      if (override) {
        setTranslationSegments(prevSegments =>
          prevSegments.map((segment, segIndex) =>
            segIndex === index
              ? {
                  ...segment,
                  ...apiResult.updatedSegments[0],
                  loading: false,
                }
              : segment
          )
        );
      }
    });
  };

  const validateSegmentTime = useCallback(
    (index, startTime, endTime, validated) => {
      setTranscriptionSegments(prevSegments => {
        const currentTranscriptionSegment = prevSegments[index];
        currentTranscriptionSegment.startTime = startTime;
        currentTranscriptionSegment.endTime = endTime;
        currentTranscriptionSegment.validated = validated;
        const updatedTranscriptionSegments = [...prevSegments];
        updatedTranscriptionSegments[index] = currentTranscriptionSegment;

        setValidation(prev => {
          const newValidation = { ...prev };
          updatedTranscriptionSegments.forEach((s, i, array) => {
            newValidation[s.id] = checkValidSegment(s, array);
          });
          const validatedSegmentIds = Object.keys(prev).filter(id => {
            if (
              prev[id] &&
              prev[id].length > 0 &&
              newValidation[id].length === 0
            ) {
              return true;
            }
            return false;
          });
          const translationIndexes = [];
          if (validatedSegmentIds.length > 0) {
            validatedSegmentIds.forEach(id => {
              const i = updatedTranscriptionSegments.findIndex(
                seg => seg.id === id
              );
              if (i > -1) translationIndexes.push(i);
            });
            try {
              const transcriptionSegmentsToUpdate =
                updatedTranscriptionSegments.filter(seg =>
                  validatedSegmentIds.includes(seg.id)
                );
              Promise.all(
                transcriptionSegmentsToUpdate.map(segment => {
                  return TranscriptionApi.editTranscriptionSegment(
                    project?.transcriptionId,
                    getSegmentToSave(segment, 'transcription')
                  );
                })
              );
            } catch (e) {
              console.log('---updateSegmentTime Error---', e);
            }
          }

          if (newValidation[currentTranscriptionSegment.id].length === 0) {
            TranscriptionApi.editTranscriptionSegment(
              project?.transcriptionId,
              getSegmentToSave(currentTranscriptionSegment, 'transcription')
            );
          }

          setTranslationSegments(prevTranslations => {
            let currentTranslationSegment;
            if (prevTranslations && prevTranslations.length > 0) {
              currentTranslationSegment = prevTranslations[index];
              currentTranslationSegment.startTime = startTime;
              currentTranslationSegment.endTime = endTime;
              if (newValidation[currentTranscriptionSegment.id].length === 0) {
                currentTranslationSegment.fileNameToDubs = {
                  ...currentTranslationSegment?.fileNameToDubs,
                  [`${targetAccent}-${targetVoice}`]: '',
                };
              }
              const updatedTranslationSegments = [...prevTranslations];
              updatedTranslationSegments[index] = currentTranslationSegment;
              if (validatedSegmentIds.length > 0) {
                try {
                  const translationSegmentsToUpdate =
                    updatedTranslationSegments.filter((_, idx) =>
                      translationIndexes.includes(idx)
                    );
                  Promise.all(
                    translationSegmentsToUpdate.map(segment => {
                      return TranslationApi.editTranslationSegment(
                        project?.translationId,
                        getSegmentToSave(segment, 'translation')
                      );
                    })
                  );
                } catch (e) {
                  console.log('---updateSegmentTime Error---', e);
                }
              }

              if (newValidation[currentTranscriptionSegment.id].length === 0) {
                TranslationApi.editTranslationSegment(
                  project?.translationId,
                  getSegmentToSave(currentTranslationSegment, 'translation')
                );
              }

              return updatedTranslationSegments;
            }
            return prevTranslations;
          });
          return newValidation;
        });
        return [...updatedTranscriptionSegments];
      });
    },
    [project?.transcriptionId, project?.translationId]
  );

  // Debounced version of the save function
  const debouncedSaveSegmentTextTranscription = debounce(
    saveSegmentTextTranscription,
    1000
  );

  const debouncedSaveSegmentTextTranslation = debounce(
    saveSegmentTextTranslation,
    1000
  );

  const flushSaveSegmentTextTranscription = useCallback(() => {
    debouncedSaveSegmentTextTranscription.flush();
  }, [debouncedSaveSegmentTextTranscription]);

  const flushSaveSegmentTextTranslation = useCallback(() => {
    debouncedSaveSegmentTextTranslation.flush();
  }, [debouncedSaveSegmentTextTranslation]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = useMemo(
    () => ({
      transcriptionSegments,
      translationSegments,
      activeSegmentInfo,
      validation,
      debouncedSaveSegmentTextTranscription,
      debouncedSaveSegmentTextTranslation,
      setTranscriptionSegments,
      setTranslationSegments,
      addNewSegment,
      mergeSegment,
      deleteSegment,
      onSegmentsSave,
      setActiveSegmentInfo,
      setHasUnsavedChanges,
      flushSaveSegmentTextTranscription,
      flushSaveSegmentTextTranslation,
      saveSegmentSpeaker,
      updateActiveSegmentInfoIfUnlocked,
      validateSegmentTime,
      setValidation,
    }),
    [
      activeSegmentInfo,
      validation,
      transcriptionSegments,
      translationSegments,
      debouncedSaveSegmentTextTranscription,
      debouncedSaveSegmentTextTranslation,
      addNewSegment,
      deleteSegment,
      flushSaveSegmentTextTranscription,
      flushSaveSegmentTextTranslation,
      mergeSegment,
      onSegmentsSave,
      saveSegmentSpeaker,
      updateActiveSegmentInfoIfUnlocked,
      validateSegmentTime,
      setValidation,
    ]
  );

  return (
    <SegmentContext.Provider value={contextValue}>
      {children}
    </SegmentContext.Provider>
  );
};

export const useSegment = () => useContext(SegmentContext);
