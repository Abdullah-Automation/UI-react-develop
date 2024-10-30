import { Box } from '@mui/material';

import { SvgImage } from '~/components/ui';

import { Audio, Transcription } from './Style';

interface IProjectRowThumbnail {
  project: any;
  onRedirect: () => void;
}

export const ProjectRowThumbnail = ({
  project,
  onRedirect,
}: IProjectRowThumbnail) => {
  return (
    <Box
      width={55}
      height={32}
      position='relative'
      display='flex'
      ml={1}
      onClick={onRedirect}
    >
      {project.content?.media.category === 'video' &&
      project.content?.media.thumbnail ? (
        <img
          src={`data:image/png;base64,${project.content.media.thumbnail}`}
          width={55}
          height={32}
          style={{ borderRadius: '4px' }}
          alt={project.name}
        />
      ) : (
        <Audio>
          <SvgImage name='HeadphonesIcon' />
        </Audio>
      )}
      {project?.transcription?.status === 'SUBMITTED' && <Transcription />}
    </Box>
  );
};
