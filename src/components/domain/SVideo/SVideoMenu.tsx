import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import CheckIcon from '@mui/icons-material/Check';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { useTranslate } from '~/context';
import { useLocalStorage } from '~/utils/hooks';
import { PROJECT_ACCESSED_LANGUAGE } from '~/config';

interface ISVideoMenuProps {
  options: any[];
}

export const SVideoMenu = ({ options = [] }: ISVideoMenuProps) => {
  const router = useRouter();
  const { projectId } = router.query;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {
    targetAccent,
    setTargetAccent,
    targetVoice,
    setTargetVoice,
    dubItems,
    setShowSettings,
  } = useTranslate();
  const [projectLangList, setProjectLangList] = useLocalStorage(
    PROJECT_ACCESSED_LANGUAGE,
    []
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Clean localStorage value
  const initProjectHistory = () => {
    const filterIndex = projectLangList?.findIndex(
      (projectLang: any) => projectLang.projectId === projectId
    );

    if (filterIndex !== -1) {
      projectLangList[filterIndex].dialect = '';
      projectLangList[filterIndex].voice = '';
      setProjectLangList(projectLangList);
    }
  };

  const handleChangeAccent = (code: string, voice: string) => {
    initProjectHistory();

    setAnchorEl(null);
    setTargetAccent(code);
    setTargetVoice(voice);
  };

  const dubLabel = (lang: string) =>
    options.filter(option => option.code === lang)[0].label;

  return (
    <Box>
      <IconButton color='dark' onClick={handleClick}>
        <SettingsOutlinedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#1B1B1F',
          },
        }}
        PaperProps={{
          style: {
            width: '240px',
          },
        }}
      >
        {dubItems.map((option: any) => (
          <MenuItem
            key={option.id}
            onClick={() =>
              handleChangeAccent(option.language, option.voiceMatchingMode)
            }
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
            >
              <Box>
                <Typography
                  color='#FFFFFF'
                  variant='subtitle2'
                  textTransform='capitalize'
                  sx={{ display: 'block' }}
                >
                  {`${dubLabel(option.language)};`}
                </Typography>
                <Typography
                  color='#FFFFFF'
                  variant='subtitle2'
                  textTransform='capitalize'
                >
                  {option.voiceMatchingMode === 'native'
                    ? 'Native speaker'
                    : option.voiceMatchingMode === 'source'
                    ? 'Original speaker'
                    : 'Multiple voices'}
                </Typography>
              </Box>

              {option.language === targetAccent &&
                option.voiceMatchingMode === targetVoice && (
                  <CheckIcon sx={{ color: '#FFFFFF', fontSize: '18px' }} />
                )}
            </Box>
          </MenuItem>
        ))}
        <Divider sx={{ borderColor: '#E0E1EC' }} />
        <MenuItem onClick={() => setShowSettings(true)}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='100%'
          >
            <Typography
              color='#FFFFFF'
              variant='subtitle2'
              textTransform='capitalize'
            >
              Change settings
            </Typography>
            <EastIcon sx={{ color: '#FFFFFF', fontSize: '18px' }} />
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}
