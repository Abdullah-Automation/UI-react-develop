import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, SelectChangeEvent } from '@mui/material';

import { useTranslate } from '~/context';
import { Select } from '~/components/ui/Select/Select';
import { PROJECT_ACCESSED_LANGUAGE, Status } from '~/config';
import { useLocalStorage } from '~/utils/hooks';
import { getDynamicLanguageLabel, getVoiceLabel } from '~/utils/helpers';

import { AddDub } from './AddDub';

export const DubVariant = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [projectLangList, setProjectLangList] = useLocalStorage(
    PROJECT_ACCESSED_LANGUAGE,
    []
  );
  const {
    targetAccent,
    langAccents,
    targetVoice,
    targetLang,
    dubItems,
    setTargetVoice,
    setTargetAccent,
    setShowSettings,
  } = useTranslate();

  // Clean localStorage value
  const initProjectHistory = (accent?: string, voice?: string) => {
    const filterIndex = projectLangList?.findIndex(
      (projectLang: any) => projectLang.projectId === projectId
    );

    if (filterIndex !== -1) {
      projectLangList[filterIndex].language = targetLang;
      projectLangList[filterIndex].dialect = accent;
      projectLangList[filterIndex].voice = voice;
      setProjectLangList(projectLangList);
    }
  };

  const handleTargetChange = (e: SelectChangeEvent) => {
    const values = e.target.value.split('-');
    initProjectHistory(values[0], values[1]);
    // @ts-ignore
    setTargetAccent(values[0]);
    // @ts-ignore
    setTargetVoice(values[1]);

    setShowSettings(true);
    window.analytics.track(`On change accent`, { value: e.target.value });
  };

  const dubVariants = useMemo(() => {
    let variants: any[] = [];

    if (dubItems.length > 0) {
      variants = dubItems
        .filter(
          item =>
            item.status === Status.Complete || item.status === Status.Error
        )
        .map(item => ({
          label: `${getDynamicLanguageLabel(
            langAccents,
            item.language
          )}, ${getVoiceLabel(item.voiceMatchingMode)}`,
          value: `${item.language}-${item.voiceMatchingMode}`,
        }));
    }

    return variants;
  }, [dubItems, langAccents]);

  return (
    <Box width='100%' display='flex' flexDirection='column' mb={3}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant='h6' color='#1B1B1F'>
          Speaker Voice
        </Typography>
        <AddDub type='update' />
      </Box>
      <Select
        disableUnderline
        variant='filled'
        value={`${targetAccent}-${targetVoice}`}
        sx={{
          flex: 1,
          padding: '6px 4px',
          marginLeft: '-12px',
        }}
        onChange={(e: any) => handleTargetChange(e)}
        options={dubVariants.map(variant => ({
          name: variant.label,
          value: variant.value,
        }))}
        label={value =>
          dubVariants.filter(variant => variant.value === value)[0]?.label ||
          'Select Target Accent'
        }
      />
    </Box>
  );
};
