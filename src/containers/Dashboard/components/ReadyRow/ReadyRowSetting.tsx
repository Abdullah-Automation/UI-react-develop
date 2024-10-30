import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface IReadyRow {
  name: string;
  handleCancel: (fileName: string) => void;
  onEditName: (projectName: string) => void;
}

export const ReadyRowSetting = ({ name, handleCancel, onEditName }: IReadyRow) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleFileSetting = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleEditName = (projectName: string) => {
    setAnchorEl(null);
    onEditName(projectName);
  };

  return (
    <Box>
      <IconButton
        title='More Uploaded Project Actions'
        aria-label='More Uploaded Project Actions'
        id={`long-button-${name}`}
        aria-haspopup='true'
        color='neutral'
        onClick={e => handleFileSetting(e)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`long-menu-${name}`}
        MenuListProps={{
          'aria-labelledby': `long-button-${name}`,
        }}
        sx={{ mt: '45px' }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem sx={{ width: '240px' }} onClick={() => handleEditName(name)}>
          <DriveFileRenameOutlineRoundedIcon sx={{ color: '#1B1B1F' }} />
          <Typography variant='subtitle2' color='#1B1B1F' margin='0 0 0 16px'>
            Rename
          </Typography>
        </MenuItem>
        <MenuItem sx={{ width: '240px' }} onClick={() => handleCancel(name)}>
          <DeleteOutlineIcon sx={{ color: '#C4441C' }} />
          <Typography variant='subtitle2' color='#C4441C' margin='0 0 0 16px'>
            Remove File
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
