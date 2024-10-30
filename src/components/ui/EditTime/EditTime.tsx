import { useEffect, useMemo, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { styled, Typography, Box } from '@mui/material';

import { duration, parseFormattedTime } from '~/utils/helpers';

import { LightTooltip } from '..';

interface IEditTime {
  variant: string;
  time: string;
  isValidated?: boolean | string;
  isDisabled: boolean;
  onUpdateTime: (time: number) => void;
}

export const EditTime = ({
  variant,
  time,
  isValidated = true,
  isDisabled,
  onUpdateTime,
}: IEditTime) => {
  const [editTime, setEditTime] = useState<string>(
    duration(Number(time), false)
  );

  useEffect(() => {
    setEditTime(duration(Number(time), false));
  }, [time]);

  const handleTimeChange = (values: any) => {
    if (values.value === '') {
      setEditTime('00:00:00.000');
    } else {
      setEditTime(values.value);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onUpdateTime(parseFormattedTime(editTime.padStart(9, '0')) / 1000);
    }
  };

  const handleBlur = () => {
    if (Number(editTime) / 1000 !== parseFloat(time)) {
      onUpdateTime(parseFormattedTime(editTime.padStart(9, '0')) / 1000);
    }
  };

  const TimeEditor = useMemo(() => {
    return (
      <Box>
        <FormattedTimeEditor
          variant={isValidated !== true ? 'error' : variant}
          format='##:##:##.###'
          value={editTime}
          disabled={isDisabled}
          onValueChange={handleTimeChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
        />
      </Box>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTime, isDisabled, isValidated, variant]);

  if (isValidated !== true) {
    return (
      <LightTooltip
        placement='top-start'
        title={
          <Typography variant='caption' color='#FFFFFF' fontWeight={400}>
            {isValidated}
          </Typography>
        }
      >
        {TimeEditor}
      </LightTooltip>
    );
  }

  return TimeEditor;
};

const FormattedTimeEditor = styled(PatternFormat)<{ variant: string }>(
  ({ variant }) => ({
    display: 'block',
    color:
      variant === 'primary'
        ? '#1B1B1F'
        : variant === 'error'
        ? '#C4441C'
        : '#909094',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    fontFamily: 'Inter, Arial, sans-serif, -apple-system',
    border: 'none',
    padding: 0,
    width: '80px',
    '&:focus-visible': {
      outline: 0,
      backgroundColor: '#F9F2FF',
      color: variant === 'error' ? '#C4441C' : '#1B1B1F',
    },
  })
);
