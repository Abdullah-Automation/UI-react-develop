import React from 'react';
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IProps {
  isDown: boolean;
  onClick: () => void;
}

export const ArrowDownBtn = ({ isDown, onClick }: IProps) => {
  return (
    <IconButton sx={{ width: 16, height: 16 }} onClick={onClick}>
      {isDown ? (
        <KeyboardArrowUpIcon sx={{ color: '#1B1B1F', fontSize: '16px' }} />
      ) : (
        <KeyboardArrowDownIcon sx={{ color: '#1B1B1F', fontSize: '16px' }} />
      )}
    </IconButton>
  );
}
