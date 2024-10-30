import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import BeatLoader from 'react-spinners/BeatLoader';

import { Button, SVideo } from '~/components/ui';
import { DubApi, IRegenDub, MediaApi } from '~/api';
import { useProject, useSegment, useToast, useTranslate } from '~/context';
import { checkValidation, trackRegenerateDub } from '~/utils/helpers';
import { Status } from '~/config';

import { DubVariant } from './DubVariant';
import { CreateFirstDub } from './CreateFirstDub';
import { AudioWrapper, ErrorSection, VideoWrapper } from './Utility';

interface IProps {
  type: string;
}

export const VideoPlayer = ({ type }: IProps) => {
  const {
    mediaId,
    mediaVocalsId,
    isDubUpdated,
    dubId,
    isDub,
    dubItems,
    isEditable,
    targetAccent,
    targetVoice,
    setIsDub,
  } = useTranslate();
  const {
    project: { projectName, mediaCategory, content, contentId, translationId },
  } = useProject();
  const { showInfoToast, showErrorToast } = useToast();
  const { validation } = useSegment();

  const router = useRouter();
  const { projectId } = router.query;
  const transcriptionMediaId = content?.convertedCompressedMedia
    ? content?.convertedCompressedMedia.id
    : content?.convertedMedia.id;
  const [loading, setLoading] = useState<boolean>(false);
  const [audioToggle, setAudioToggle] = useState(true);

  const { mutate: regenerateDub } = useMutation(
    (data: IRegenDub) => DubApi.regenerateDub(data),
    {
      onSuccess: () => {
        trackRegenerateDub({
          projectId,
          projectName,
          fileUUID: content?.fileUuid,
        });
        setIsDub('progress');
        showInfoToast(
          'Updating dub... You can leave the page and check the dub status on dashboard.'
        );
        setLoading(false);
      },
      onError: () => {
        showErrorToast(`Regenerating Dub went wrong.`);
        setLoading(false);
      },
    }
  );

  const isEnabledVideoURL = useMemo(() => {
    if (type === 'original' && transcriptionMediaId) {
      return true;
    }
    if (type === 'dub' && mediaId) {
      return true;
    }

    return false;
  }, [mediaId, transcriptionMediaId, type]);

  const { data: videoURL } = useQuery(
    [`getMediaPresigned`, mediaId, projectId],
    () => {
      return MediaApi.getMediaPresigned({
        mediaId:
          type === 'original'
            ? transcriptionMediaId
            : audioToggle
            ? mediaId
            : mediaVocalsId,
        projectId: projectId as string,
      });
    },
    {
      enabled: isEnabledVideoURL,
    }
  );

  const handleUpdateDub = async () => {
    console.log('mediaVocalsId', mediaVocalsId);
    try {
      let segmentLevel = true;
      if (!mediaVocalsId || mediaVocalsId === '') segmentLevel = false; // TODO temp stabilize regen until fixed!!
      setLoading(true);
      console.log('segmentLevel', segmentLevel);
      regenerateDub({
        contentId,
        translationId,
        dubId,
        segmentLevel,
      });
    } catch (e) {
      showErrorToast('Updating Dub went wrong.');
      setLoading(false);
    }
  };

  const dubStatus = useMemo(() => {
    return dubItems.filter(
      item =>
        item.voiceMatchingMode === targetVoice && item.language === targetAccent
    )[0]?.status;
  }, [dubItems, targetAccent, targetVoice]);

  const videoPlayer = useMemo(() => {
    return (
      <SVideo
        key={videoURL}
        type={mediaCategory}
        seekTime={0}
        mediaUrl={videoURL || ''}
        showToggle={type !== 'original'}
        audioToggleOn={audioToggle}
        handleBackgroundAudioToggle={() => setAudioToggle(v => !v)}
      />
    );
  }, [videoURL, mediaCategory, type, audioToggle]);

  return (
    <VideoWrapper isaudio={mediaCategory === 'audio' ? 'true' : 'false'}>
      {type === 'original' ? (
        videoURL && (
          <Box position='relative'>
            {mediaCategory === 'audio' && <AudioWrapper />}
            {videoPlayer}
          </Box>
        )
      ) : isDub === 'progress' ? (
        <Box
          height='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <BeatLoader color='#E0E1EC' />
        </Box>
      ) : dubItems.length === 0 && isDub === false ? (
        <CreateFirstDub />
      ) : (
        <>
          <Box>
            <DubVariant />
            {dubStatus === Status.Error ? (
              <ErrorSection mediaCategory={mediaCategory} />
            ) : (
              videoURL && (
                <Box position='relative'>
                  {mediaCategory === 'audio' && <AudioWrapper />}
                  {videoPlayer}
                  {!checkValidation(validation) && (
                    <ErrorSection
                      mediaCategory={mediaCategory}
                      isOverlap={!checkValidation(validation)}
                    />
                  )}
                </Box>
              )
            )}
          </Box>

          {type === 'dub' && (isDub === true || dubStatus === Status.Error) && (
            <Button
              fullWidth
              color='secondary'
              disabled={
                isDub === true
                  ? isDubUpdated || !isEditable || !checkValidation(validation)
                  : false
              }
              loading={loading}
              onClick={handleUpdateDub}
            >
              {dubStatus === Status.Error ? `Regenerate` : `Update dub`}
            </Button>
          )}
        </>
      )}
    </VideoWrapper>
  );
};
