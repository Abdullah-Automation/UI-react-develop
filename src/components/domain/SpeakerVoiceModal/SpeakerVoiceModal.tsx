import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import {
  Box,
  Dialog,
  IconButton,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { Button, Select } from '~/components/ui';
import { HeaderWrapper, ModalFooter, ModalTitle } from '~/components/domain';
import { useProject, useSpeakers, useToast, useTranslate } from '~/context';
import { ORIGIN_VOICES } from '~/config';
import { TranscriptionApi } from '~/api';

import { ModalContent } from '../DeleteProjectModal';

import { CustomVoice } from './CustomVoice';

interface ISpeakerVoiceModalProps {
  open: boolean;
  onBack: (isDone: boolean) => void;
}

export const SpeakerVoiceModal = ({
  open,
  onBack,
}: ISpeakerVoiceModalProps) => {
  const { showErrorToast } = useToast();
  const { project } = useProject();
  const { speakersCtx } = useSpeakers();
  const { langAccents, dubItems, setTargetVoice, setTargetAccent } =
    useTranslate();

  const [showCustomSetting, setShowCustomSetting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [newDialect, setNewDialect] = useState<string>('');
  const [newVoice, setNewVoice] = useState<string>('source');

  useEffect(() => {
    if (langAccents.length > 0) {
      setNewDialect(langAccents[0].code);
    }
  }, [langAccents]);

  useEffect(() => {
    setSpeakers(
      speakersCtx
        .filter(speaker => speaker !== 'Retain audio')
        .map(item => ({
          voiceMatchingMode: 'source',
          speaker: item,
        }))
    );
  }, [speakersCtx]);

  const handleVoiceChange = (e: any) => setNewVoice(e.target.value);

  const handleTargetChange = (e: SelectChangeEvent) =>
    setNewDialect(e.target.value);

  const handleGenerate = () => {
    if (showCustomSetting) {
      handleCustomSpeaker();
    }

    setTargetVoice(newVoice);
    setTargetAccent(newDialect);
    onBack(currentDubLabel !== 'Go to Dub');
  };

  const handleCustomSpeaker = async () => {
    try {
      setLoading(true);

      if (
        JSON.stringify(project?.customizedVoiceMatchingSpeakers) !==
        JSON.stringify(speakers)
      ) {
        await TranscriptionApi.updateCustomSpeakers(project.transcriptionId, {
          customizedVoiceMatchingSpeakers: speakers,
        });
      }

      setLoading(false);
    } catch (e) {
      showErrorToast('Saving is wrong. Please try again.');
      setLoading(false);
    }
  };

  const currentDubLabel = useMemo(() => {
    if (showCustomSetting) {
      let newVoiceMatchingMode = 'source';
      if (
        speakers.filter(speaker => speaker.voiceMatchingMode === 'native')
          .length === speakers.length
      ) {
        newVoiceMatchingMode = 'native';
      } else if (
        speakers.filter(speaker => speaker.voiceMatchingMode === 'source')
          .length === speakers.length
      ) {
        newVoiceMatchingMode = 'source';
      } else {
        newVoiceMatchingMode = 'customized';
      }
      setNewVoice(newVoiceMatchingMode);

      if (newVoiceMatchingMode === 'customized') {
        const dubIndex = dubItems.findIndex(
          item =>
            item.language === newDialect &&
            item.voiceMatchingMode === 'customized'
        );

        return dubIndex !== -1
          ? JSON.stringify(project?.customizedVoiceMatchingSpeakers) ===
            JSON.stringify(speakers)
            ? `Go to Dub`
            : `Update Dub`
          : `Generate Dub`;
      }
      const dubIndex = dubItems.findIndex(
        item =>
          item.language === newDialect &&
          item.voiceMatchingMode === newVoiceMatchingMode
      );

      return dubIndex > -1 ? `Go to Dub` : `Generate Dub`;
    }

    const dubIndex = dubItems.findIndex(
      item =>
        item.language === newDialect && item.voiceMatchingMode === newVoice
    );

    return dubIndex > -1 ? `Go to Dub` : `Generate Dub`;
  }, [
    dubItems,
    newDialect,
    newVoice,
    project?.customizedVoiceMatchingSpeakers,
    showCustomSetting,
    speakers,
  ]);

  const SpeakerVoices = useMemo(() => {
    const nativeMatchingEnabled = langAccents.filter(
      accent => accent?.code === newDialect
    )[0]?.nativeMatchingEnabled;

    return nativeMatchingEnabled ? ORIGIN_VOICES : [ORIGIN_VOICES[0]];
  }, [langAccents, newDialect]);

  return (
    <Dialog fullScreen={false} maxWidth='xs' open={open}>
      <ModalTitle isLargeSpacing onClose={() => onBack(false)}>
        <HeaderWrapper gap={1.5} onClick={() => {}}>
          {showCustomSetting && (
            <IconButton
              color='neutral'
              onClick={() => setShowCustomSetting(!showCustomSetting)}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          )}
          <Typography variant='h5' color='#1B1B1F'>
            {showCustomSetting ? 'Customize speaker voices' : 'Speaker setting'}
          </Typography>
        </HeaderWrapper>
      </ModalTitle>
      <ModalContent sx={{ pb: 3, overflowX: 'hidden' }}>
        <Box>
          <Typography variant='body2' color='#45464F' display='inline'>
            {showCustomSetting
              ? `Set up the dialect and customize the voice for each individual
                speaker across the file.`
              : `Set up the dialect and voice for your speakers across the file.
                You can also`}
            &nbsp;
          </Typography>
          <Typography
            variant='subtitle1'
            color='#832AD0'
            display='inline'
            sx={{ cursor: 'pointer' }}
            onClick={() => setShowCustomSetting(!showCustomSetting)}
          >
            {showCustomSetting ? `Go back` : `click here`} &nbsp;
          </Typography>
          <Typography variant='body2' color='#45464F' display='inline'>
            {showCustomSetting
              ? `to the previous page if you want a general setup.`
              : `to customize the setting for each individual speaker.`}
          </Typography>

          <Box display='grid' gridTemplateColumns='1fr 1fr' gap={1} mt={3}>
            <Box>
              <Typography variant='subtitle1' color='#909094' ml={1} mb='4px'>
                Dialect
              </Typography>
              <Select
                disableUnderline
                variant='filled'
                MenuProps={{
                  PaperProps: {
                    sx: {
                      width: 240,
                    },
                  },
                }}
                value={newDialect}
                sx={{
                  flex: 1,
                  padding: '5px 0',
                }}
                onChange={(e: any) => handleTargetChange(e)}
                options={langAccents.map((voice: any) => ({
                  name: voice.label,
                  value: voice.code,
                }))}
                label={value =>
                  langAccents.filter((accent: any) => accent.code === value)[0]
                    ?.label || 'Select Target Dialect'
                }
              />
            </Box>
            {!showCustomSetting && (
              <Box
                sx={{
                  width: '200px',
                }}
              >
                <Typography variant='subtitle1' color='#909094' ml={1} mb='4px'>
                  Voice
                </Typography>
                <Select
                  disableUnderline
                  variant='filled'
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        width: 240,
                      },
                    },
                  }}
                  value={newVoice}
                  sx={{
                    flex: 1,
                    padding: '5px 0',
                  }}
                  onChange={(e: any) => handleVoiceChange(e)}
                  options={SpeakerVoices.map((voice: any) => ({
                    name: voice.label,
                    value: voice.code,
                  }))}
                  label={value =>
                    SpeakerVoices.filter(
                      (accent: any) => accent.code === value
                    )[0]?.label || 'Select Target Voice'
                  }
                />
              </Box>
            )}
          </Box>
          {showCustomSetting && (
            <CustomVoice
              newDialect={newDialect}
              speakers={speakers}
              setSpeakers={setSpeakers}
            />
          )}
        </Box>
      </ModalContent>
      <ModalFooter>
        <Button
          color='secondary'
          sx={{ width: '100%' }}
          loading={loading}
          onClick={handleGenerate}
        >
          {currentDubLabel}
        </Button>
      </ModalFooter>
    </Dialog>
  );
};
