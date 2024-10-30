import React, { useState } from 'react';
import { Box } from '@mui/material';

import { SegmentTextArea } from './SegmentTextArea';
import { SegmentTool } from './Utility';

interface ISegmentRow {
  index: number;
  segment: any;
  editedSegments: any[];
  bEditedSegments: any[];
  project: any;
  transcription: any;
  setActiveSegmentInfo: any;
  activeSegmentInfo: any;
  textAreaARefs: any;
  textAreaBRefs: any;
  handleChange: (
    index: number,
    text: string,
    locked: boolean,
    segmentType: string
  ) => void;
  handleLockChange: (index: number, text: string, locked: boolean) => void;
  handleKeyPress: (
    index: number,
    event: any,
    segmentType: string,
    keyType?: string
  ) => Promise<void>;
  handleRefresh: () => void;
  handleAddSegment: (index: number, segmentType: string) => void;
  handleMergeSegment: (index: number, segmentType: string) => void;
  handleDeleteSegment: (index: number, segmentType: string) => void;
}

const SegmentRow = ({
  index,
  segment,
  editedSegments,
  bEditedSegments,
  project,
  transcription,
  setActiveSegmentInfo,
  activeSegmentInfo,
  textAreaARefs,
  textAreaBRefs,
  handleChange,
  handleLockChange,
  handleKeyPress,
  handleRefresh,
  handleAddSegment,
  handleMergeSegment,
  handleDeleteSegment,
}: ISegmentRow) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Box
      key={segment.id || index}
      display='flex'
      position='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SegmentTextArea
        index={index}
        segmentType='transcription'
        segment={segment}
        projectId={project.id}
        ref={textAreaARefs.current[index]}
        setActiveSegmentInfo={setActiveSegmentInfo}
        activeSegmentInfo={activeSegmentInfo}
        transcriptionSegment={
          transcription?.transcriptionSegments
            ? transcription?.transcriptionSegments[index]?.content
            : ''
        }
        handleChange={handleChange}
        handleLockChange={handleLockChange}
        handleKeyPress={handleKeyPress}
        handleRefresh={handleRefresh}
      />
      <SegmentTextArea
        key={segment.id || index}
        index={index}
        segmentType='translation'
        projectId={project.id}
        segment={bEditedSegments[index]}
        transcriptionSegment={editedSegments[index]?.content || ''}
        ref={textAreaBRefs.current[index]}
        setActiveSegmentInfo={setActiveSegmentInfo}
        activeSegmentInfo={activeSegmentInfo}
        handleChange={handleChange}
        handleLockChange={handleLockChange}
        handleKeyPress={handleKeyPress}
        handleRefresh={handleRefresh}
      />
      {isHovered && (
        <SegmentTool
          index={index}
          onAddSegment={handleAddSegment}
          onMergeSegment={handleMergeSegment}
          onDeleteSegment={handleDeleteSegment}
        />
      )}
    </Box>
  );
};

export default SegmentRow;
