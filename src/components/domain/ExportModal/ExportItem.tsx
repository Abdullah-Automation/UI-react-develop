import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { SvgImage } from '~/components/ui';

import { IExport } from './ExportModal';

interface IExportItem extends IExport {
  detectAndHHandleExportText: (exportURL: string, title: string) => void;
}

export const ExportItem = ({
  title,
  desc,
  icon,
  exportURL,
  detectAndHHandleExportText,
}: IExportItem) => {
  return (
    <Wrapper
      my={1.25}
      onClick={() => detectAndHHandleExportText(exportURL, title)}
    >
      <Box display='flex'>
        <SvgImage name={icon} />
        <Box display='flex' flexDirection='column' ml='22px'>
          <Typography variant='body2' color='#000000'>
            {title}
          </Typography>
          <Typography variant='caption' color='#8C8E99'>
            {desc}
          </Typography>
        </Box>
      </Box>

      <SvgImage name='ExportIcon' />
    </Wrapper>
  );
}

const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px 10px;
  border: 1px solid #efedf5;
  border-radius: 5px;
  background: #ffffff;
  &:hover {
    cursor: pointer;
    background: rgba(62, 86, 246, 0.08);
  }
`;
