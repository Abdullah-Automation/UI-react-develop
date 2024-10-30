import React from 'react';
import { styled } from '@mui/material/styles';

import { useDebug } from '~/context';

export const WordSpan = (props: any) => {
  const { contentState, entityKey, retainAudio, children, onWordClick } = props;
  const entity = contentState.getEntity(entityKey);
  const { startTime, endTime } = entity.getData();
  const isDebugMode = useDebug();

  const handleClick = () => {
    onWordClick(startTime);
  };

  const handleDoubleClick = () => {
    // onWordDoubleClick(startTime);
  };

  return (
    <Word
      retainaudio={retainAudio ? 'true' : 'false'}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      title={
        isDebugMode
          ? `Start Time: ${startTime}, End Time: ${endTime}, Retain Audio: ${retainAudio}`
          : ''
      }
    >
      {children}
    </Word>
  );
}

const Word = styled('span')<{ retainaudio: string }>(
  ({ retainaudio = 'false' }) => ({
    cursor: 'text',
    backgroundColor: retainaudio === 'true' ? '#F9F2FF' : 'inherit',
    '&:hover': {
      backgroundColor: 'rgba(69, 70, 79, 0.12)',
    },
  })
);
