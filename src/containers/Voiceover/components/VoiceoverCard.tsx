import { useEffect, useState } from 'react';
import { styled } from '@mui/styles';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import ShareIcon from '@mui/icons-material/Share';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { VoiceoverProjectsApi } from '~/api';
import { ShareProjectModal } from '~/components/domain';
import { useAuth } from '~/context';

interface IVoiceoverCard {
  id: string;
  textToSpeech: string;
  variant?: string;
  title: string;
  desc: string;
  status: string;
  showSetting?: boolean;
  onClick: (id: string, variant: string) => void;
  onCreateProject?: (voice: string) => void;
  refetchVoiceoverProjects: () => void;
}

export const VoiceoverCard = ({
  id,
  textToSpeech,
  variant = 'primary',
  title,
  desc,
  status,
  showSetting = true,
  onClick,
  onCreateProject,
  refetchVoiceoverProjects,
}: IVoiceoverCard) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openShareProjectModal, setOpenShareProjectModal] =
    useState<boolean>(false);
  const open = Boolean(anchorEl);
  const [name, setName] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<boolean>(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setName(title);
  }, [title]);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlVoiceSetting = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleEditName = async (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
    setIsEdit(true);
  };

  const handleNameChange = (e: any) => {
    e.stopPropagation();
    setName(e.target.value);

    if (e.target.value === '') {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  };

  const handleRenameSave = async (e: any) => {
    e.stopPropagation();
    if (e.key === 'Enter' && name !== '') {
      window.analytics.track(`Voiceover Rename Save`, { voiceOverId: id });

      setIsEdit(false);
      if (variant === 'primary' && name !== title) {
        await VoiceoverProjectsApi.updateVoiceoverProject(id, {
          name,
          isDeleted: false,
          generateOnSave: false,
          textToSpeech: {
            id: textToSpeech,
          },
        });
        // refetchVoiceoverProjects();
      }
    }
  };

  const handleDeleteProject = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      e.stopPropagation();
      setAnchorEl(null);
      window.analytics.track(`Voiceover Delete`, { voiceOverId: id });

      if (variant === 'primary') {
        await VoiceoverProjectsApi.updateVoiceoverProject(id, {
          isDeleted: true,
          generateOnSave: false,
          textToSpeech: {
            id: textToSpeech,
          },
        });
        refetchVoiceoverProjects();
      }
    } catch (e) {
      console.log('---Delete Error---', e);
    }
  };

  const handleCreateProject = async (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
    if (onCreateProject) {
      onCreateProject(id);
    }
  };

  // const handleShareProject = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.stopPropagation();
  //   setAnchorEl(null);
  //   setOpenShareProjectModal(true);
  // };

  return (
    <>
      <Wrapper onClick={() => onClick(id, variant)}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent={
            variant === 'primary' ? 'space-between' : 'flex-start'
          }
          gap={2}
        >
          {variant === 'secondary' && (
            <PlayCircleIcon sx={{ fontSize: '24px', color: '#45464F' }} />
          )}
          {isEdit ? (
            <TextField
              fullWidth
              variant='standard'
              value={name}
              inputProps={{
                style: { fontSize: 20, fontWeight: 500 },
              }}
              sx={{
                '& .MuiInput-root:after': {
                  borderBottom: validationError
                    ? '2px solid red !important'
                    : 'inherit',
                },
              }}
              onClick={e => e.stopPropagation()}
              onChange={handleNameChange}
              onKeyDown={handleRenameSave}
            />
          ) : (
            <NameTypo fontSize='20px' fontWeight={500}>
              {name}
            </NameTypo>
          )}
          {variant === 'primary' && (
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#2CBAAD80',
              }}
            >
              <Typography variant='h6' color='#1B1B1F'>
                {currentUser?.firstName.charAt(0) || ''}
              </Typography>
            </Avatar>
          )}
        </Box>

        <Box pt={2} pb={2.5}>
          <Typography variant='subtitle2' color='#45464F'>
            {desc}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <BtnStatus title={status}>{status.replace('_', ' ')}</BtnStatus>

          <IconButton
            sx={{ height: '24px', width: '24px' }}
            onClick={handlVoiceSetting}
          >
            <MoreVertOutlinedIcon sx={{ fontSize: 24, color: '#45464F' }} />
          </IconButton>
          <Menu
            id={`voice-menu-${id}`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            PaperProps={{
              sx: {
                width: '240px',
              },
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            {/* <MenuItem
              onClick={e => handleShareProject(e)}
              title='Share Project'
              selected={false}
            >
              <ShareIcon sx={{ color: '#1B1B1F', fontSize: 18 }} />
              <Typography
                variant='subtitle2'
                color='#1B1B1F'
                margin='0 0 0 16px'
              >
                Share
              </Typography>
            </MenuItem> */}

            {showSetting && (
              <MenuItem onClick={e => handleEditName(e)} title='Rename Project'>
                <DriveFileRenameOutlineRoundedIcon
                  sx={{ color: '#1B1B1F', fontSize: 18 }}
                />
                <Typography
                  variant='subtitle2'
                  color='#1B1B1F'
                  margin='0 0 0 16px'
                >
                  Rename
                </Typography>
              </MenuItem>
            )}
            {showSetting && (
              <MenuItem
                onClick={e => handleDeleteProject(e)}
                title='Delete Project'
              >
                <DeleteOutlineIcon sx={{ color: '#C4441C', fontSize: 18 }} />
                <Typography
                  variant='subtitle2'
                  color='#C4441C'
                  margin='0 0 0 16px'
                >
                  Delete Project
                </Typography>
              </MenuItem>
            )}

            {!showSetting && (
              <MenuItem
                onClick={e => handleCreateProject(e)}
                title='Rename Project'
              >
                <AddIcon sx={{ color: '#1B1B1F', fontSize: 18 }} />
                <Typography
                  variant='subtitle2'
                  color='#1B1B1F'
                  margin='0 0 0 16px'
                >
                  Create a project
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Wrapper>

      {openShareProjectModal && (
        <ShareProjectModal
          open={openShareProjectModal}
          projectName={title}
          projectId={id}
          handleClose={() => setOpenShareProjectModal(false)}
        />
      )}
    </>
  );
}

const BtnStatus = styled(Box)<{ title?: string }>(
  ({ title = 'SUBMITTED' }) => ({
    textTransform: 'capitalize',
    padding: '6px 10px 6px 10px',
    fontSize: '12px',
    fontWeight: 500,
    borderRadius: '4px',
    background:
      title === 'SUBMITTED'
        ? '#1B1B1F14'
        : title === 'COMPLETED'
        ? '#2CBAAD14'
        : '#3A4ADE1F',
    color:
      title === 'SUBMITTED'
        ? '#1B1B1F'
        : title === 'COMPLETED'
        ? '#2CBAAD'
        : '#3A4ADE',
  })
);

const Wrapper = styled(Box)({
  width: '420px',
  boxSizing: 'border-box',
  position: 'relative',
  border: '1px solid #C4C5D0',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: '16px 24px',
});

const NameTypo = styled(Typography)({
  color: '#1B1B1F',
  padding: '8px 0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
