import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';

import { Text } from '../Text';
import { Button } from '../Button';
import { SelectedMenu } from '../SelectMenu';
import { IconButton } from '../IconButton';

const SpeakerModal = () => {
  const [open, setOpen] = useState(false);
  const [selectValue1] = useState('');
  const [selectValue2] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSelectChange1 = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setSelectValue1(event.target.value);
  // };

  // const handleSelectChange2 = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setSelectValue2(event.target.value);
  // };

  const isButtonDisabled =
    selectValue1 === 'Select' || selectValue2 === 'Select';

  return (
    <Box>
      <Button
        color='neutral'
        variant='text'
        startIcon={<AddIcon />}
        size='small'
        onClick={handleClickOpen}
      >
        Add dub
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text variant='h5' color='black'>
                Set speaker voices
              </Text>
              <IconButton
                color='neutral'
                icon={<Close />}
                onClick={handleClose}
              />
            </Box>
            <Text variant='body2' color='black'>
              Set up the dialect and voice for your speakers across the file.
              You can also click here to customize the setting for each
              individual speaker.
            </Text>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Box ml='16px'>
                  <Text
                    variant='subtitle1'
                    color='rgba(144, 144, 148, 1)'
                    sx={{ marginLeft: '16px' }}
                  >
                    Dialect
                  </Text>
                </Box>
                <Box
                  sx={{
                    width: '240px',
                  }}
                >
                  <SelectedMenu
                    options={[
                      'Select',
                      'Spanish – Latin American',
                      'Spanish – Castilian',
                    ]}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Box ml='16px'>
                  <Text
                    variant='subtitle1'
                    color='rgba(144, 144, 148, 1)'
                    sx={{ marginLeft: '16px' }}
                  >
                    Voice
                  </Text>
                </Box>
                <Box
                  sx={{
                    width: '240px',
                  }}
                >
                  <SelectedMenu
                    options={['Select', 'Original Speaker', 'Native Speaker']}
                  />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'space-between',
                display: 'inline-flex',
                flexDirection: 'column',
              }}
            >
              <Button
                color='secondary'
                onClick={handleClose}
                disabled={isButtonDisabled}
              >
                Generate
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SpeakerModal;
