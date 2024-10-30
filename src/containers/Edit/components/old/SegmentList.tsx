import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { VariableSizeList as List } from 'react-window';
import { styled } from '@mui/material';

import { useTranslate } from '~/context';

import { SegmentRow } from './SegmentRow';

interface ISegmentList {
  width: number | undefined;
  height: number | undefined;
  segmentData: any;
}

export const SegmentList = ({ width, height, segmentData }: ISegmentList) => {
  const listRef: any = useRef({});
  const rowHeights: any = useRef({});
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const { isEdit } = useTranslate();

  useEffect(() => {
    const rowIndex = segmentData.segments.findIndex(
      (segment: { wordIndexToTrackHighlight: undefined }) =>
        segment.wordIndexToTrackHighlight !== undefined
    );

    if (rowIndex !== -1 && segmentData.scrollable) {
      listRef.current.scrollToItem(rowIndex, 'center');
    }
  }, [segmentData.scrollable, segmentData.segments]);

  const setRowHeight = (index: number, size: number) => {
    listRef?.current?.resetAfterIndex(0);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  };

  const updateRowHeight = (index: number, size: number) => {
    listRef?.current?.resetAfterIndex(index);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  };

  const getRowHeight = (index: number) => {
    return rowHeights.current[index] || 48;
  };

  const handleRender = () => {
    if (isEdit === segmentData.type) {
      setIsScroll(true);
    }
  };

  const handleScrollDisable = () => setIsScroll(false);

  return (
    <ListWrapper
      itemData={{
        segmentData,
        setRowHeight,
        updateRowHeight,
        isScroll,
        handleScrollDisable,
      }}
      height={height || 50}
      itemCount={segmentData.segments.length}
      itemSize={getRowHeight}
      ref={listRef}
      width={width || 0}
      onItemsRendered={handleRender}
      style={{
        overflowY: 'hidden',
      }}
    >
      {SegmentRow}
    </ListWrapper>
  );
}

const ListWrapper = styled(List)(() => ({
  scrollbarGutter: 'stable',
  '&:hover': {
    overflowY: 'auto !important',
  },
}));
