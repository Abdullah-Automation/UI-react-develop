import { useState } from 'react';
import { Box, Typography } from '@mui/material';

import { EditTime } from '~/components/ui';
import { useSegment } from '~/context';

interface ISegmentTime {
  index: number;
  startTime: string;
  endTime: string;
  segmentType: string;
  validated?: string[];
}

export const SegmentTime = ({
  index,
  validated,
  startTime,
  endTime,
  segmentType,
}: ISegmentTime) => {
  const [editable, setEditable] = useState<boolean>(false);
  const { validateSegmentTime } = useSegment();

  const handleMouseEnter = () => {
    if (segmentType === 'transcription') {
      setEditable(true);
    }
  };

  const handleMouseLeave = () => {
    setEditable(false);
  };

  const handleUpdateTime = (time: number, type: string) => {
    validateSegmentTime(
      index,
      type === 'startTime' ? time : Number(startTime),
      type === 'endTime' ? time : Number(endTime),
      null
    );
  };

  if (startTime === undefined && endTime === undefined) {
    return null;
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      gap={0.5}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <EditTime
        variant={editable ? 'primary' : 'secondary'}
        time={startTime}
        isValidated={
          validated?.includes('start')
            ? startTime > endTime
              ? 'The start time cannot exceed the end time.'
              : 'Please enter a valid time to avoid time overlap.'
            : true
        }
        isDisabled={segmentType !== 'transcription'}
        onUpdateTime={time => handleUpdateTime(time, 'startTime')}
      />
      <Typography color='#909094' variant='caption'>
        –
      </Typography>
      <EditTime
        variant={editable ? 'primary' : 'secondary'}
        time={endTime}
        isValidated={
          validated?.includes('end')
            ? startTime > endTime
              ? 'The start time cannot exceed the end time.'
              : 'Please enter a valid time to avoid time overlap.'
            : true
        }
        isDisabled={segmentType !== 'transcription'}
        onUpdateTime={time => handleUpdateTime(time, 'endTime')}
      />
    </Box>
  );
};
