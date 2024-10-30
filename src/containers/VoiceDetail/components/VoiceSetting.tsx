import React, { useEffect } from 'react';
import { Box, Typography, SvgIcon, SelectChangeEvent } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import LanguageIcon from '@mui/icons-material/Language';

import { Button, Select } from '~/components/ui';
import { useVariants, useVoiceover } from '~/context';

interface IVoiceSetting {
  id: string;
  isEditing: boolean;
}

export const VoiceSetting = ({ isEditing }: IVoiceSetting) => {
  const { variants, voices } = useVariants({});
  const { voice, setVoice, sourceLang, setSourceLang, generating, onGenerate } =
    useVoiceover();

  useEffect(() => {
    if (voices.length > 0 && voice === 'none') {
      setVoice(voices[0].id);
    }
  }, [voice, voices, setVoice]);

  useEffect(() => {
    if (variants.length > 0) {
      // @ts-ignore
      setSourceLang(variants[0].code);
    }
  }, [variants, setSourceLang]);

  const handleVoiceChange = (e: SelectChangeEvent) => {
    setVoice(e.target.value);
  };

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setSourceLang(e.target.value);
  };

  const handleGenerate = () => {
    onGenerate(voice, sourceLang);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      p={3}
    >
      <Box display='flex' flexDirection='column' gap={3}>
        <Box>
          <Typography variant='h6' color='#1B1B1F' sx={{ mb: 1 }}>
            Voice
          </Typography>
          <Select
            color='primary'
            value={voice}
            style={{
              width: '240px',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 240,
                },
              },
            }}
            onChange={(e: any) => handleVoiceChange(e)}
            options={voices.map(curVoicec => ({
              name: curVoicec.name,
              value: curVoicec.id,
            }))}
            labelIcon={
              <SvgIcon sx={{ fontSize: 18, color: '#45464F' }}>
                <KeyboardVoiceIcon />
              </SvgIcon>
            }
            label={value =>
              voices.filter(curVoice => curVoice?.id === value)[0]?.name ||
              'Select Target Voice'
            }
          />
        </Box>
        <Box>
          <Typography variant='h6' color='#1B1B1F' sx={{ mb: 1 }}>
            Language
          </Typography>
          <Select
            value={sourceLang}
            onChange={(e: any) => handleLanguageChange(e)}
            style={{
              width: '240px',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 240,
                },
              },
            }}
            options={variants.map(language => ({
              name: language.label,
              value: language.code,
              disabled: language.code !== 'en',
            }))}
            labelIcon={
              <SvgIcon sx={{ fontSize: 18, color: '#45464F' }}>
                <LanguageIcon />
              </SvgIcon>
            }
            label={value =>
              variants.filter(lang => lang.code === value)[0]?.label ||
              'Select Target Language'
            }
          />
        </Box>
      </Box>
      <Button
        color='tertiary'
        loading={generating}
        disabled={isEditing}
        sx={{ width: '100%' }}
        onClick={handleGenerate}
      >
        Generate Voiceover
      </Button>
    </Box>
  );
};
