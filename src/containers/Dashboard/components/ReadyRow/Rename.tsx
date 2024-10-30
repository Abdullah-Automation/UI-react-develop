import { useRouter } from 'next/router';
import { Box, OutlinedInput, Typography } from '@mui/material';

import { ROUTES } from '~/config';

interface IRename {
  project: any;
  isRename: boolean;
  updatedName: string;
  onRename: (value: string) => void;
  onRenameSave: () => void;
}

export const Rename = ({
  project,
  isRename,
  updatedName,
  onRename,
  onRenameSave,
}: IRename) => {
  const router = useRouter();

  const handleEdit = (id: string, status: string) => {
    if (status === 'COMPLETE') {
      router.push(`${ROUTES.PROJECTS}/${id}`);
    }
  };

  const handleRename = (e: any) => {
    e.stopPropagation();
    onRename(e.target.value);
  };

  const handleRenameSave = (e: any) => {
    if (e.key === 'Enter') {
      onRenameSave();
    }
  };

  return (
    <Box ml={2} mr='10px'>
      {isRename ? (
        <Box>
          <OutlinedInput
            id='rename'
            placeholder='Enter the project name'
            onChange={handleRename}
            onKeyDown={e => handleRenameSave(e)}
            value={updatedName}
            fullWidth
          />
        </Box>
      ) : (
        <Box
          onClick={() => handleEdit(project.id, project?.transcription?.status)}
        >
          <Typography variant='h6' color='#45464F'>
            {project.name}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
