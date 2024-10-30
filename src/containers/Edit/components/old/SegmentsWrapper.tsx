import _ from 'lodash';
import AutoSizer from 'react-virtualized-auto-sizer';

import { SegmentList } from './SegmentList';

interface ISegmentsWrapper {
  segments: any[];
  transcriptionSegments: any[];
  editorRefs: any;
  cursor: any;
  type: string;
  transId: string;
  projectId: string;
  scrollable: boolean;
  handleEditUpdate: any;
  handleEditSegment: any;
  handleWordClick: any;
}

export const SegmentsWrapper = ({
  segments,
  transcriptionSegments,
  editorRefs,
  cursor,
  type,
  transId,
  projectId,
  scrollable,
  handleEditUpdate,
  handleEditSegment,
  handleWordClick,
}: ISegmentsWrapper) => {
  const segmentData = {
    transcriptionSegments,
    editorRefs,
    segments,
    cursor,
    type,
    transId,
    projectId,
    scrollable,
    handleEditUpdate,
    handleEditSegment,
    handleWordClick,
  };

  return (
    <AutoSizer>
      {({ height, width }: { height: number; width: number }) => (
        <SegmentList width={width} height={height} segmentData={segmentData} />
      )}
    </AutoSizer>
  );
};
