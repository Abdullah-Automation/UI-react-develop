import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  Typography,
  SvgIcon,
  SelectChangeEvent,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

import { sortLanguage } from '~/utils/helpers';
import { useTranscribe, useVariants } from '~/context';
import { Select, Button } from '~/components/ui';

import {
  HeaderWrapper,
  ModalContent,
  ModalFooter,
} from '../DeleteProjectModal';

interface ISelectSourceLangModalProps {
  onContinue: () => void;
  handleClose: () => void;
}

export const SelectSourceLangModal = ({
  onContinue,
  handleClose,
}: ISelectSourceLangModalProps) => {
  const { setCurrentSourceLang } = useTranscribe();
  const { variants } = useVariants({});

  const [sourceLang, setSourceLang] = useState<string>('none');
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);

  const handleTargetChange = (e: SelectChangeEvent) => {
    if (sourceLang) {
      setShowErrorMsg(false);
    }
    setSourceLang(e.target.value);
  };

  const handleContinue = () => {
    if (sourceLang === 'none') {
      setShowErrorMsg(true);
    } else {
      setCurrentSourceLang(sourceLang);
      onContinue();
    }
  };

  const handleModal = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      onClose={() => {}}
      onClick={handleModal}
      open
      sx={{
        width: 390,
        margin: 'auto',
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, pb: 3 }}>
        <HeaderWrapper onClick={handleClose}>
          <Typography variant='h4' color='#1B1B1F'>
            Select Source Language
          </Typography>
        </HeaderWrapper>
      </DialogTitle>
      <ModalContent>
        <Box mb={3}>
          <Select
            options={sortLanguage(variants, 'label').map(language => ({
              name: language.label,
              value: language.code,
            }))}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 226,
                },
              },
            }}
            disableUnderline
            variant='filled'
            value={sourceLang}
            onChange={(e: any) => handleTargetChange(e)}
            label={(value?: string) =>
              variants.filter(lang => lang.code === value)[0]?.label ||
              'Select Source Language'
            }
            labelIcon={
              <SvgIcon sx={{ fontSize: 18 }}>
                <LanguageIcon sx={{ color: '#45464F' }} />
              </SvgIcon>
            }
          />
          {showErrorMsg && (
            <Box mt={1}>
              <Typography variant='caption' color='#C4441C'>
                Please select a source language to continue.{' '}
              </Typography>
            </Box>
          )}
        </Box>
      </ModalContent>
      <ModalFooter divider='true'>
        <Button variant='text' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='contained' color='secondary' onClick={handleContinue}>
          Continue
        </Button>
      </ModalFooter>
    </Dialog>
  );
};
