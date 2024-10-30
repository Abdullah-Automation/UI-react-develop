import _ from 'lodash';

import { IWordDetail } from '~/api';

import { duration } from './duration';

export interface IDetail extends IWordDetail {
  offSetTime?: number;
  isNew?: boolean;
}

export const updateOffsetonMerge = (wordDetails: IDetail[]) => {
  const newDetails: IDetail[] = [];
  wordDetails.forEach((detail, index) => {
    const offSet = newDetails[index - 1]?.endOffset || 0;
    const value = detail.endOffset - detail.startOffset;

    newDetails.push({
      ...detail,
      startOffset: index > 0 ? offSet + 1 : 0,
      endOffset: index > 0 ? offSet + 1 + value : value,
    });
  });

  return newDetails;
};

export const fillWordsTime = (
  wordDetails: IDetail[],
  startTime: number,
  endTime: number
) => {
  try {
    const updatedWordDetails: IDetail[] = [];
    if (wordDetails.length > 0) {
      wordDetails.forEach((detail, index) => {
        if (detail?.isNew || detail?.offSetTime !== undefined) {
          // consider word is added at the first of sentence
          if (index === 0) {
            if (
              detail?.offSetTime &&
              detail.startTime >= startTime &&
              detail.endTime <= endTime &&
              detail?.endTime <= (wordDetails[index + 1]?.startTime || 0) &&
              wordDetails[index + 1]?.offSetTime === undefined
            ) {
              const currentDetail = {
                word: detail.word,
                startOffset: detail.startOffset,
                endOffset: detail.endOffset,
                startTime: detail.startTime,
                endTime: detail.endTime,
              };
              updatedWordDetails.push(currentDetail);
            } else {
              const indexWithTime = wordDetails.findIndex(
                detail => detail.startTime !== 0 && detail.endTime !== 0
              );

              if (indexWithTime > 0) {
                let charTime =
                  ((wordDetails[indexWithTime]?.endTime || 0) -
                    (wordDetails[indexWithTime]?.startTime || 0)) /
                  ((wordDetails[indexWithTime]?.endOffset || 0) -
                    (wordDetails[indexWithTime]?.startOffset || 0));

                if (
                  (wordDetails[indexWithTime]?.startTime || 0) - startTime >
                  0.2
                ) {
                  charTime =
                    ((wordDetails[indexWithTime]?.startTime || 0) - startTime) /
                    (wordDetails[indexWithTime]?.startOffset || 0);
                }

                if (
                  (wordDetails[indexWithTime]?.startTime || 0) === startTime
                ) {
                  charTime =
                    ((wordDetails[indexWithTime]?.endTime || 0) - startTime) /
                    (wordDetails[indexWithTime]?.endOffset || 0);
                }

                // wordDetails[indexWithTime]?.confidence !== 0 &&
                if (
                  !wordDetails[indexWithTime]?.isNew &&
                  wordDetails[indexWithTime]?.offSetTime === undefined
                ) {
                  charTime =
                    ((wordDetails[indexWithTime]?.startTime || 0) - startTime) /
                    (wordDetails[indexWithTime]?.startOffset || 0);
                }

                const detailEndTime =
                  startTime +
                  charTime *
                    ((detail?.endOffset || 0) - (detail?.startOffset || 0));

                const currentDetail = {
                  word: detail.word,
                  startOffset: detail.startOffset,
                  endOffset: detail.endOffset,
                  startTime,
                  endTime: detailEndTime,
                };

                updatedWordDetails.push(currentDetail);
              } else {
                // console.log('---Can make small time---');
                const interval =
                  (endTime - startTime) /
                  (wordDetails[wordDetails.length - 1]?.endOffset || 0);

                const detailEndTime =
                  startTime +
                  interval * (detail.endOffset - detail.startOffset);

                const currentDetail = {
                  word: detail.word,
                  startOffset: detail.startOffset,
                  endOffset: detail.endOffset,
                  startTime,
                  endTime: detailEndTime,
                };
                updatedWordDetails.push(currentDetail);
              }
            }
          } else {
            let charTime =
              ((updatedWordDetails[index - 1]?.endTime || 0) -
                (updatedWordDetails[index - 1]?.startTime || 0)) /
              ((updatedWordDetails[index - 1]?.endOffset || 0) -
                (updatedWordDetails[index - 1]?.startOffset || 0));

            const indexWithTime = wordDetails.findIndex(
              (detail, curIndex) =>
                detail.startTime !== 0 &&
                detail.endTime !== 0 &&
                detail.offSetTime === undefined &&
                curIndex > index
            );

            if (indexWithTime !== -1) {
              charTime =
                ((wordDetails[indexWithTime]?.startTime || 0) -
                  (updatedWordDetails[index - 1]?.endTime || 0)) /
                ((wordDetails[indexWithTime]?.startOffset || 0 + 1) -
                  detail.startOffset);
            }

            let detailStartTime =
              (updatedWordDetails[index - 1]?.endTime || 0) + charTime;

            let detailEndTime =
              (updatedWordDetails[index - 1]?.endTime || 0) +
              charTime *
                ((detail?.endOffset || 0) - (detail?.startOffset || 0) + 1);

            // This is for using correct time and to keep timestamp.
            if ((detail?.offSetTime || 0) > 0) {
              const detailOffsetEndTime =
                (updatedWordDetails[index - 1]?.endTime || 0) +
                (detail?.offSetTime || 0);

              if (indexWithTime !== -1) {
                if (
                  (wordDetails[indexWithTime]?.startTime || 0) >=
                  detailOffsetEndTime
                ) {
                  detailStartTime = updatedWordDetails[index - 1]?.endTime || 0;
                  detailEndTime = detailOffsetEndTime;
                }
              }

              if (
                detail?.startTime >=
                  (updatedWordDetails[index - 1]?.endTime || 0) &&
                detail?.endTime <=
                  (wordDetails[index + 1]?.startTime || endTime) &&
                detail?.endTime <= endTime
              ) {
                detailStartTime = detail?.startTime;
                detailEndTime = detail?.endTime;
              }
            }

            let currentDetail = {
              word: detail.word,
              startOffset: detail.startOffset,
              endOffset: detail.endOffset,
              startTime: detailStartTime,
              endTime: detailEndTime,
            };

            // wordDetails[index + 1]?.confidence !== 0 &&
            if (
              !wordDetails[indexWithTime]?.isNew &&
              wordDetails[index + 1]?.offSetTime === undefined
            ) {
              const validatedDetail = validateEndTimeAndGetNewValue(
                {
                  ...currentDetail,
                  startTime: updatedWordDetails[index - 1]?.endTime || 0,
                },
                wordDetails[index + 1]
              );
              currentDetail = validatedDetail;
            }

            updatedWordDetails.push(currentDetail);
          }
        } else {
          updatedWordDetails.push(detail);
        }
      });

      return updatedWordDetails;
    }

    return [];
  } catch (e) {
    console.log('----fillWordsTime error---', e);

    return [];
  }
};

export const fillOverLappingTimes = (
  currentSegment: any,
  segments: any[],
  currentIndex: number
) => {
  try {
    const oldSegment = segments[currentIndex];
    let isChangedStartIndex: any = null;
    const newWordDetails: IWordDetail[] = [];
    currentSegment.wordDetails.forEach((detail: any, index: number) => {
      if (detail?.word !== oldSegment.wordDetails[index]?.word) {
        if (isChangedStartIndex === null) {
          isChangedStartIndex = index;
        }

        if (isChangedStartIndex !== null) {
          const changeStartTime =
            oldSegment.wordDetails[isChangedStartIndex - 1]?.endTime || 0;
          const changeEndTime = oldSegment?.endTime;

          let lastWordIndex = 0;
          if (index > 0) {
            lastWordIndex =
              currentSegment.wordDetails[isChangedStartIndex - 1]?.endOffset ||
              0;
          }
          const wordLength = currentSegment.content.length;
          const interval =
            (changeEndTime - changeStartTime) / (wordLength - lastWordIndex);

          newWordDetails.push({
            word: detail?.word,
            startOffset: detail?.startOffset,
            endOffset: detail?.endOffset,
            startTime: newWordDetails[index - 1]?.endTime || 0,
            endTime:
              (newWordDetails[index - 1]?.endTime || 0) +
              interval *
                ((detail?.endOffset || 0) - (detail?.startOffset || 0)),
          });
        }
      } else {
        newWordDetails.push({ ...oldSegment.wordDetails[index] });
      }
    });

    if (currentSegment?.startTime !== oldSegment.startTime) {
      console.log('---start time difference---old---', oldSegment?.startTime);
    }

    if (
      (newWordDetails[newWordDetails.length - 1]?.endTime || 0) >
      oldSegment.endTime
    ) {
      console.log('---end time overlap---old---', oldSegment?.endTime);
    }

    return {
      id: currentSegment?.id,
      speaker: currentSegment?.speaker,
      startTime: currentSegment?.startTime,
      content: currentSegment?.content,
      endTime: oldSegment?.endTime,
      wordDetails: newWordDetails,
    };
  } catch (e) {
    console.log('----fillOverLappingTimes----', e);
    return currentSegment;
  }
};

export const getNewWordDetails = (
  content: string,
  wordDetails: IDetail[],
  startTime: number,
  endTime: number
) => {
  try {
    // Split words with spacing
    const newWords = content.split(' ').filter(word => word !== '');

    const originWords = wordDetails
      ? wordDetails.map(detail => detail.word)
      : [];

    let newWordDetails = newWords.map((word: string, index: number) => {
      // Keep origin word times if anything hasn't changed
      if (word.toLowerCase() === wordDetails[index]?.word.toLowerCase()) {
        const oldWords = _.cloneDeep(originWords).splice(0, index);
        const words = _.cloneDeep(newWords).splice(0, index);

        if (
          oldWords.filter(
            oldWord => oldWord.toLowerCase() === word.toLowerCase()
          ).length ===
          words.filter(newWord => newWord.toLowerCase() === word.toLowerCase())
            .length
        ) {
          return { ...wordDetails[index], word };
        }
      }

      const wordDetailIndex = originWords.findIndex(
        originWord => word.toLowerCase() === originWord?.toLowerCase()
      );
      if (wordDetailIndex !== -1) {
        return {
          word,
          startOffset: 0,
          endOffset: word.length,
          startTime: wordDetails[wordDetailIndex]?.startTime || 0,
          endTime: wordDetails[wordDetailIndex]?.endTime || 0,
          offSetTime:
            (wordDetails[wordDetailIndex]?.endTime || 0) -
            (wordDetails[wordDetailIndex]?.startTime || 0),
        };
      }
      return {
        word,
        startOffset: 0,
        endOffset: word.length,
        startTime: 0,
        endTime: 0,
        isNew: true,
      };
    });

    newWordDetails = fillWordsTime(
      // @ts-ignore
      updateOffsetonMerge(_.cloneDeep(newWordDetails)),
      startTime,
      endTime
    );

    return newWordDetails;
  } catch (e) {
    console.log('---getNewWordDetails error----', e);

    return wordDetails;
  }
};

export const findNewSegmentIndex = (currentTime: number, editSegments: any) =>
  editSegments.findIndex(
    (segment: any) =>
      currentTime >= segment.startTime.toFixed(4) &&
      currentTime < segment.endTime.toFixed(4)
  );

export const findClosestWordIndex = (currentTime: number, wordDetails: any) =>
  wordDetails.reduce(
    (closestIndex: number, word: any, index: number, words: any) => {
      const currentWordTimeDiff = Math.abs(word.startTime - currentTime);
      const closestWordTimeDiff = Math.abs(
        words[closestIndex].startTime - currentTime
      );

      return currentWordTimeDiff < closestWordTimeDiff ? index : closestIndex;
    },
    0 // Initial value for closestIndex
  );

export function findWordIndexByTime(words: any, startTime: any) {
  let closestWordDistance = Infinity;
  let closestWordIndex = -1;
  let cursorPosition = -1;

  words.forEach((word: any, wordIndex: number) => {
    const distance = Math.abs(word.startTime - startTime);
    if (distance < closestWordDistance) {
      closestWordDistance = distance;
      closestWordIndex = wordIndex;
    }
  });

  if (closestWordIndex !== -1) {
    const wordsBefore = words
      .slice(0, closestWordIndex)
      .map((w: any) => w.word);
    cursorPosition = wordsBefore.join(' ').length + wordsBefore.length; // Adding the length of the words and the spaces between them
  }

  return cursorPosition;
}

export function validateSegments(segments: any[]) {
  try {
    let isValid = true;

    segments.forEach((currentItem, index) => {
      if (
        currentItem.startTime < currentItem.endTime &&
        currentItem.startTime >= (segments[index - 1]?.endTime || 0) &&
        currentItem.endTime >=
          currentItem.wordDetails[currentItem.wordDetails.length - 1].endTime
      ) {
        currentItem.wordDetails.forEach(
          (wordDetail: any, wordIndex: number) => {
            if (
              (wordDetail.startTime < wordDetail.endTime &&
                wordDetail.startTime >=
                  (currentItem.wordDetails[wordIndex - 1]?.endTime || 0)) ===
              false
            ) {
              isValid = false;
            }
          }
        );
      } else {
        isValid = false;
      }
    });

    return {
      isValid,
    };
  } catch (e) {
    return { isValid: false };
  }
}

export const validateEndTimeAndGetNewValue = (
  currentDetail: any,
  nextDetail: any
) => {
  try {
    if (currentDetail?.endTime > nextDetail?.startTime) {
      if (nextDetail.startTime > currentDetail.startTime) {
        const interval =
          (nextDetail.startTime - currentDetail.startTime) /
          (currentDetail.endOffset - currentDetail.startOffset);

        return {
          ...currentDetail,
          startTime: currentDetail.startTime,
          endTime:
            currentDetail.startTime +
            interval * (currentDetail.endOffset - currentDetail.startOffset),
        };
      }

      if (nextDetail.startTime === currentDetail.startTime) {
        const interval =
          (nextDetail.endTime - nextDetail.startTime) /
          (nextDetail.endOffset - currentDetail.startOffset);

        return {
          ...currentDetail,
          startTime: currentDetail.startTime,
          endTime:
            currentDetail.startTime +
            interval * (currentDetail.endOffset - currentDetail.startOffset),
        };
      }

      return currentDetail;
    }

    return currentDetail;
  } catch (e) {
    console.log('----validateEndTimeAndGetNewValue error---', e);

    return currentDetail;
  }
};

export const manageOverLappingTimes = (
  currentSegment: any,
  segments: any[],
  currentIndex: number
) => {
  try {
    const updatedSegment = _.cloneDeepWith(currentSegment);
    if (
      currentSegment.wordDetails[currentSegment.wordDetails.length - 1]
        ?.endTime <=
      (segments[currentIndex + 1]?.startTime || currentSegment.endTime)
    ) {
      updatedSegment.endTime =
        segments[currentIndex + 1]?.startTime || currentSegment.endTime;
    } else {
      const startGapTime =
        currentSegment.wordDetails[0].startTime -
        (segments[currentIndex - 1]?.endTime || currentSegment.startTime);

      const endGapTime =
        (segments[currentIndex + 1]?.startTime || currentSegment.endTime) -
        currentSegment.wordDetails[currentSegment.wordDetails.length - 1]
          .endTime;
      const lastGapTime =
        currentSegment.wordDetails[currentSegment.wordDetails.length - 1]
          .endTime - currentSegment.endTime;

      if (endGapTime > 0 && startGapTime > endGapTime) {
        const wordDetails = currentSegment.wordDetails.map((detail: any) => {
          return {
            ...detail,
            startTime: detail.startTime - endGapTime,
            endTime: detail.endTime - endGapTime,
          };
        });

        updatedSegment.startTime = wordDetails[0].startTime;
        updatedSegment.wordDetails = wordDetails;
      } else if (startGapTime > lastGapTime) {
        const wordDetails = currentSegment.wordDetails.map((detail: any) => {
          return {
            ...detail,
            startTime: detail.startTime - lastGapTime,
            endTime: detail.endTime - lastGapTime,
          };
        });

        updatedSegment.startTime = wordDetails[0].startTime;
        updatedSegment.wordDetails = wordDetails;
      } else if (startGapTime + endGapTime > lastGapTime) {
        updatedSegment.startTime =
          segments[currentIndex - 1]?.endTime || currentSegment.startTime;
        updatedSegment.endTime =
          segments[currentIndex + 1]?.startTime || currentSegment.endTime;

        const wordDetails: any[] = [];
        currentSegment.wordDetails.forEach((detail: any, index: number) => {
          wordDetails.push({
            ...detail,
            startTime:
              index === 0
                ? segments[currentIndex - 1]?.endTime ||
                  currentSegment.startTime
                : wordDetails[index - 1].endTime +
                  (detail.startTime -
                    currentSegment.wordDetails[index - 1].endTime),
            endTime:
              (index === 0
                ? segments[currentIndex - 1]?.endTime ||
                  currentSegment.startTime
                : wordDetails[index - 1].endTime +
                  (detail.startTime -
                    currentSegment.wordDetails[index - 1].endTime)) +
              (detail.endTime - detail.startTime),
          });
        });

        updatedSegment.wordDetails = wordDetails;
      } else {
        updatedSegment.startTime =
          segments[currentIndex - 1]?.endTime || currentSegment.startTime;
        updatedSegment.endTime =
          segments[currentIndex + 1]?.startTime || currentSegment.endTime;

        const charTime =
          ((segments[currentIndex + 1]?.startTime || currentSegment.endTime) -
            (segments[currentIndex - 1]?.endTime || currentSegment.startTime)) /
          (currentSegment.wordDetails[currentSegment.wordDetails.length - 1]
            .endOffset -
            currentSegment.wordDetails[0].startOffset);

        const wordDetails: any[] = [];
        currentSegment.wordDetails.forEach((detail: any, index: number) => {
          let detailEndTime = 0;
          if (index === currentSegment.wordDetails.length - 1) {
            detailEndTime = updatedSegment.endTime;
          } else {
            detailEndTime =
              (index === 0
                ? segments[currentIndex - 1]?.endTime ||
                  currentSegment.startTime
                : wordDetails[index - 1].endTime + charTime) +
              (detail.endOffset - detail.startOffset) * charTime;
          }

          wordDetails.push({
            ...detail,
            startTime:
              index === 0
                ? segments[currentIndex - 1]?.endTime ||
                  currentSegment.startTime
                : wordDetails[index - 1].endTime + charTime,
            endTime: detailEndTime,
          });
        });

        updatedSegment.wordDetails = wordDetails;
      }
    }

    return updatedSegment;
  } catch (e) {
    return currentSegment;
  }
};

export const validateEmptyContent = (segments: any[]) => {
  try {
    let isValid: boolean = true;
    let message: string = '';

    segments.forEach(segment => {
      if (segment.content.trim() === '') {
        isValid = false;
        message = `Segment at ${duration(
          Number(segment.startTime)
        )} is empty. Empty Segments are not allowed`;
      }
    });

    if (!isValid) {
      return message;
    }

    return true;
  } catch (e) {
    return 'Something is wrong';
  }
};

export const splitWord = (wordDetails: any[], focusOffset: number) => {
  const updatedDetails: any[] = [];
  const enterWordIndex = wordDetails.findIndex(
    word =>
      (word?.startOffset || 0) < focusOffset &&
      focusOffset < (word.endOffset || 0)
  );

  wordDetails.forEach((wordDetail, index) => {
    if (enterWordIndex === index) {
      const charTime =
        (wordDetail.endTime - wordDetail.startTime) /
        (wordDetail.endOffset - wordDetail.startOffset);
      updatedDetails.push({
        endOffset: focusOffset,
        endTime:
          wordDetail.startTime +
          charTime * (focusOffset - wordDetail.startOffset),
        startOffset: wordDetail.startOffset,
        startTime: wordDetail.startTime,
        word: _.cloneDeep(wordDetail.word).substring(
          0,
          focusOffset - wordDetail.startOffset
        ),
      });

      updatedDetails.push({
        endOffset: wordDetail.endOffset + 1,
        endTime: wordDetail.endTime,
        startOffset: focusOffset + 1,
        startTime:
          wordDetail.startTime +
          charTime * (focusOffset - wordDetail.startOffset),
        word: wordDetail.word.substring(focusOffset - wordDetail.startOffset),
      });
    } else {
      updatedDetails.push(wordDetail);
    }
  });

  return updatedDetails;
};

export const getSegmentToSave = (segment: any, type: string) => {
  let commonProperties;

  if (type === 'transcription') {
    if (segment.id.includes('create')) {
      const { wordDetails, transcription, validated, id, ...rest } = segment;
      commonProperties = rest;
    } else {
      const { wordDetails, transcription, validated, ...rest } = segment;
      commonProperties = rest;
    }
  } else if (type === 'translation') {
    if (segment.id.includes('create')) {
      const {
        wordDetails,
        translation,
        createdAt,
        updatedAt,
        previousEndTime,
        loading,
        id,
        ...rest
      } = segment;
      commonProperties = rest;
    } else {
      const {
        wordDetails,
        translation,
        createdAt,
        updatedAt,
        previousEndTime,
        loading,
        ...rest
      } = segment;
      commonProperties = rest;
    }
  }

  commonProperties.editOperationType = segment.id.includes('create')
    ? 'create'
    : 'update';

  return [commonProperties];
};

export const checkValidSegment = (segment: any, segments: any[]) => {
  const flags: any[] = [];
  const findIndex = segments.findIndex(s => s.id === segment.id);
  segments.forEach((otherSeg, i) => {
    if (otherSeg.id === segment.id) {
      if (segment.startTime >= segment.endTime) {
        flags.push('start');
        flags.push('end');
      } else {
        return;
      }
    }
    if (otherSeg.endTime > segment.startTime && i < findIndex) {
      flags.push('start');
    }
    if (otherSeg.endTime > segment.endTime && i < findIndex) {
      flags.push('end');
    }
    if (otherSeg.startTime > segment.startTime && i < findIndex) {
      flags.push('start');
    }
    if (otherSeg.startTime > segment.endTime && i < findIndex) {
      flags.push('end');
    }
    if (segment.endTime > otherSeg.startTime && i > findIndex) {
      flags.push('end');
    }
    if (segment.endTime > otherSeg.endTime && i > findIndex) {
      flags.push('end');
    }
    if (segment.startTime > otherSeg.startTime && i > findIndex) {
      flags.push('start');
    }
    if (segment.startTime > otherSeg.endTime && i > findIndex) {
      flags.push('start');
    }
  });

  // @ts-ignore
  return [...new Set(flags)];
};

export const checkValidation = (validation: any) => {
  const isValidIndex = Object.keys(validation).findIndex(id => {
    if (validation[id] && validation[id].length > 0) {
      return true;
    }
    return false;
  });

  return isValidIndex === -1;
};
