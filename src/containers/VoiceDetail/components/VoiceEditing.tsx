import React, { useEffect, useState } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import _ from 'lodash';

import { EditTool } from '~/containers/Edit/components/old/EditTool';
import { TextToSpeechApi } from '~/api';
import { CustomToast } from '~/components/domain';
import { useToast, useVoiceover } from '~/context';
import { onlySpecialchars } from '~/utils/helpers';

import { VoiceSegment } from './VoiceSegment';

interface IVoiceEditing {
  id: string;
  textToSpeechSegments: any[];
  isEditing: boolean;
  onEdit: (editing: boolean) => void;
}

export const VoiceEditing = ({
  id,
  textToSpeechSegments = [],
  isEditing,
  onEdit,
}: IVoiceEditing) => {
  const { showErrorToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [speechSegments, setSpeechSegments] = useState<any>([]);

  const {
    generating,
    showToast,
    setShowToast,
    voice,
    sourceLang,
    onGenerate,
    audioSrc,
    setAudioSrc,
    refechVoiceover,
  } = useVoiceover();

  useEffect(() => {
    setSpeechSegments(_.cloneDeep(textToSpeechSegments));
  }, [textToSpeechSegments]);

  const handleEdit = () => {
    onEdit(true);
  };

  const handleEditSave = async () => {
    try {
      const validatedItems = speechSegments.filter(
        (segment: any) => onlySpecialchars(segment.content) === true
      );

      if (validatedItems.length === 0) {
        setLoading(true);
        await TextToSpeechApi.deleteAndCreateTextToSpeech(id, speechSegments);
        refechVoiceover();

        if (audioSrc !== '') {
          setShowToast(true);
        }

        onEdit(false);
        setLoading(false);
      } else {
        showErrorToast('Please enter valid text input.');
      }
    } catch (e) {
      console.log('Segment Edit Error', e);

      onEdit(false);
      setLoading(false);
    }
  };

  const handleSegment = (id: string, content: string) => {
    const tempContent = _.cloneDeep(speechSegments);
    const index = tempContent.findIndex((segment: any) => segment.id === id);
    tempContent[index].content = content;

    setSpeechSegments(_.cloneDeep(tempContent));
  };

  const handleUpdate = () => {
    setShowToast(false);
    setAudioSrc('');
    onGenerate(voice, sourceLang);
  };

  const handleDismiss = () => {
    setShowToast(false);
  };

  return (
    <Wrapper>
      {isEditing && (
        <EditTool type='Voiceover' loading={loading} onSave={handleEditSave} />
      )}
      <Box position='absolute' top={16} right={32}>
        <IconButton color='tertiary' disabled={generating} onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Box>
      {showToast && (
        <Box position='absolute' top='0' left='0' width='100%' zIndex={9}>
          <CustomToast
            variant='secondary'
            isCenter
            message='Your text has been changed. Please make sure you update the voiceover.'
            loading={loading}
            type='Dismiss'
            onUpdate={handleUpdate}
            onClose={handleDismiss}
          />
        </Box>
      )}
      <Box>
        {speechSegments.map((segment: any) => (
          <VoiceSegment
            key={segment.id}
            id={segment.id}
            isEditing={isEditing}
            data={segment}
            onSegmentChange={handleSegment}
          />
        ))}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled(Box)({
  position: 'relative',
  padding: '80px',
  boxSizing: 'border-box',
  borderBottom: '1px solid #E0E1EC',
  height: 'calc(100vh - 88px - 50px - 24px)',
});
