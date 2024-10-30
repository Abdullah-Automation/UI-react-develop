import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, styled } from '@mui/material';
import { NextPage } from 'next';

import { Page } from '~/components/ui';
import { useVoiceover } from '~/context';

import { VoiceEditing, VoicePlay, VoiceSetting } from './components';

// eslint-disable-next-line react/function-component-definition
export const EmbeddedVoiceoverDetail: NextPage = () => {
  const router = useRouter();
  const { voiceoverId } = router.query;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { voiceOver } = useVoiceover();

  const handleEditing = (editing: boolean) => {
    window.analytics.track(`Voiceover Editing`, {
      voiceOverId: voiceoverId,
    });

    setIsEditing(editing);
  };

  return (
    <Page isEditPage>
      <Wrapper>
        <Box
          flex={1}
          sx={{
            borderRight: '1px solid #E0E1EC',
          }}
        >
          <VoicePlay id={voiceOver?.textToSpeech?.medias[0]?.id || ''} />
          <VoiceEditing
            id={voiceOver?.textToSpeech?.id || ''}
            textToSpeechSegments={
              voiceOver?.textToSpeech?.textToSpeechSegments || []
            }
            isEditing={isEditing}
            onEdit={handleEditing}
          />
        </Box>
        <VoiceSetting
          id={voiceOver?.textToSpeech?.id || ''}
          isEditing={isEditing}
        />
      </Wrapper>
    </Page>
  );
};

const Wrapper = styled(Box)({
  display: 'flex',
  background: '#FFFFFF',
  height: 'calc(100vh - 48px - 24px)',
  border: '1px solid #E0E1EC',
  borderRadius: '4px',
});

EmbeddedVoiceoverDetail.displayName = 'EmbeddedVoiceoverDetailPage Page';
