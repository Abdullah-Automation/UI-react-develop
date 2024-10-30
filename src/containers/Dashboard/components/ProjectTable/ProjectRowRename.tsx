import { makeStyles } from '@mui/styles';
import { Box, OutlinedInput, Typography } from '@mui/material';

import { getProjectDetails } from '~/utils/helpers';

const styles = makeStyles(() => ({
  root: {
    '& $notchedOutline': {
      border: 'none',
    },
    '&:hover $notchedOutline': {
      border: 'none',
    },
    '&$focused $notchedOutline': {
      border: 'none',
    },
  },
  focused: {},
  notchedOutline: {},
}));

interface IProjectRowRename {
  isRename: any;
  project: any;
  deleteProjectId: string;
  updatedName: string;
  onRename: (e: any) => void;
  onRenameSave: (e: any) => void;
  onRedirect: () => void;
}

export const ProjectRowRename = ({
  isRename,
  updatedName,
  deleteProjectId,
  project,
  onRename,
  onRenameSave,
  onRedirect,
}: IProjectRowRename) => {
  const classes = styles();

  return (
    <Box ml={2} mr='10px' style={{ width: 320 }}>
      {isRename && deleteProjectId === project.id ? (
        <Box onClick={e => e.stopPropagation()}>
          <OutlinedInput
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
            id='rename'
            color='secondary'
            classes={classes}
            sx={{ height: '36px' }}
            placeholder='Enter the project name'
            onChange={e => onRename(e)}
            onKeyDown={e => onRenameSave(e)}
            value={updatedName}
            fullWidth
          />
        </Box>
      ) : (
        <Box display='flex' alignItems='center' gap={1.5} onClick={onRedirect}>
          <Typography
            variant='h6'
            color='#45464F'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              wordBreak: 'break-word',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {project.name}
          </Typography>
          <Typography variant='h6' color='#909094'>
            {getProjectDetails(project).length}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
