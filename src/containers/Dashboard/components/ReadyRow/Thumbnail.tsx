import { Box } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

import { SvgImage } from '~/components/ui';

import { Audio } from '../ProjectTable/Style';

interface IThumbnail {
  project: any;
}

export const Thumbnail = ({ project }: IThumbnail) => {
  return (
    <Box width={55} height={32} position='relative' display='flex'>
      {project.thumbnail !== ' ' ? (
        <img
          src={`data:image/png;base64,${project.thumbnail}`}
          width={55}
          height={32}
          style={{ borderRadius: '5px' }}
          alt='Thumbnamil'
        />
      ) : project.type.includes('video') ? (
        <Audio>
          <VideocamIcon sx={{ color: '#8C8E99' }} />
        </Audio>
      ) : (
        <Audio>
          <SvgImage name='HeadphonesIcon' />
        </Audio>
      )}
    </Box>
  );
}
