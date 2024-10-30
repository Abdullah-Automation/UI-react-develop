import { useEffect, useRef, useState } from 'react';
import _, { throttle } from 'lodash';
import { Box } from '@mui/material';

import { Segment } from './Segment';

interface ISegmentRow {
  index: number;
  data: any;
  style: any;
}

export const SegmentRow = ({ index, data, style }: ISegmentRow) => {
  const rowRef: any = useRef({});

  const {
    segmentData,
    setRowHeight,
    updateRowHeight,
    isScroll,
    handleScrollDisable,
  } = data;

  const {
    editorRefs,
    cursor,
    type,
    segments,
    transcriptionSegments,
    transId,
    projectId,
    handleEditUpdate,
    handleEditSegment,
    handleWordClick,
  } = segmentData;

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [listHeight, setListHeight] = useState<boolean>(false);

  const handleResize = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 300);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    if (rowRef.current) {
      setRowHeight(index, rowRef.current.clientHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, rowRef]);

  useEffect(() => {
    if (rowRef.current) {
      setTimeout(() => {
        updateRowHeight(index, rowRef.current?.clientHeight);
      }, 10);
    }
  }, [segments[index].content, windowSize, listHeight]);

  const updateOverflowwedHeight = () => {
    setListHeight(!listHeight);
  };

  return (
    <Box style={style}>
      <Box ref={rowRef}>
        <Segment
          key={segments[index].id + index}
          id={segments[index].id}
          editorRef={editorRefs[index]}
          isScroll={isScroll}
          onScroll={handleScrollDisable}
          height={
            rowRef.current?.clientHeight ? rowRef.current.clientHeight - 28 : 0
          }
          isCursor={index === cursor.segmentIndex ? cursor.cursorIndex : false}
          type={type}
          transId={transId}
          projectId={projectId}
          wordIndexToTrackHighlight={segments[index]?.wordIndexToTrackHighlight}
          speaker={segments[index].speaker}
          startTime={segments[index].startTime}
          endTime={segments[index].endTime}
          content={segments[index].content}
          transcriptionSegment={transcriptionSegments[index]?.content || ''}
          wordDetails={segments[index].wordDetails}
          retainAudio={segments[index]?.retainAudio || false}
          segments={segments}
          onUpdate={handleEditUpdate}
          onEdit={handleEditSegment}
          onWordClick={handleWordClick}
          onOverflowHeight={updateOverflowwedHeight}
        />
      </Box>
    </Box>
  );
};
