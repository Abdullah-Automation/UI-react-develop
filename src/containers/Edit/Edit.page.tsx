import React from 'react';
import { Box } from '@mui/material';

import { Page, Spinner } from '~/components/ui';
import { useProject } from '~/context';

import { TranscriptAndTranslationEditor } from './components';

export const EditPage = () => {
  const { isProjectLoading } = useProject();
  return (
    <Page isPrivate isEditPage>
      {isProjectLoading ? (
        <LoadingSpinner />
      ) : (
        <Box display='flex' height='calc(100vh - 48px)'>
          <TranscriptAndTranslationEditor />
        </Box>
      )}
    </Page>
  );
};

export const LoadingSpinner = () => (
  <Box
    height='calc(100vh - 170px)'
    display='flex'
    alignItems='center'
    justifyContent='center'
  >
    <Spinner
      spinnerWrapperProps={{
        style: { margin: '25px 0 0', height: '53px' },
      }}
    />
  </Box>
);

EditPage.displayName = 'Edit Page';
