import { Menu, MenuItem, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface IProjectMenu {
  open: boolean;
  anchorEl: null | HTMLElement;
  projectId: string;
  ownerId: string;
  currentUserId: string;
  lastRow?: boolean;
  handleClose: () => void;
  handleShareProject: (e: any) => void;
  handleDeleteProject: (e: any) => void;
  handleDeleteSharedProject: (e: any) => void;
  handleEditName: (e: any) => void;
}

export const ProjectMenu = ({
  open,
  anchorEl,
  projectId,
  ownerId,
  currentUserId,
  lastRow,
  handleClose,
  handleShareProject,
  handleDeleteProject,
  handleDeleteSharedProject,
  handleEditName,
}: IProjectMenu) => {
  return (
    <Menu
      id={`long-menu-${projectId}`}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '240px',
        },
      }}
      anchorOrigin={{
        vertical: lastRow ? 'top' : 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: lastRow ? 'bottom' : 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem
        onClick={e => handleShareProject(e)}
        title='Share Project'
        selected={false}
      >
        <ShareIcon sx={{ color: '#1B1B1F', fontSize: 18 }} />
        <Typography variant='body2' color='#1B1B1F' margin='0 0 0 16px'>
          Share
        </Typography>
      </MenuItem>
      {ownerId === currentUserId && (
        <MenuItem onClick={e => handleEditName(e)} title='Rename Project'>
          <DriveFileRenameOutlineRoundedIcon
            sx={{ color: '#1B1B1F', fontSize: 18 }}
          />
          <Typography variant='body2' color='#1B1B1F' margin='0 0 0 16px'>
            Rename
          </Typography>
        </MenuItem>
      )}
      {ownerId === currentUserId && (
        <MenuItem onClick={e => handleDeleteProject(e)} title='Delete Project'>
          <DeleteOutlineIcon sx={{ color: '#C4441C', fontSize: 18 }} />
          <Typography variant='body2' color='#C4441C' margin='0 0 0 16px'>
            Delete Project
          </Typography>
        </MenuItem>
      )}
      {ownerId !== currentUserId && (
        <MenuItem onClick={e => handleDeleteSharedProject(e)}>
          <DeleteOutlineIcon sx={{ color: '#C4441C', fontSize: 18 }} />
          <Typography variant='body2' color='#C4441C' margin='0 0 0 16px'>
            Delete Project For Me
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );
};
