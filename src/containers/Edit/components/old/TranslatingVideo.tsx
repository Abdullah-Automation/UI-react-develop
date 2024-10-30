import React, { useEffect, useState, useMemo, useRef } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Typography, SelectChangeEvent } from '@mui/material';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import { useQuery, useMutation } from '@tanstack/react-query';

import { DubApi, IDub, IRegenDub, MediaApi, TranslationApi } from '~/api';
import {
  useProject,
  useTranslate,
  useAuth,
  useCurrentUserBalance,
  useToast,
  useDebug,
} from '~/context';
import { Button, SVideo, SvgImage } from '~/components/ui';
import { trackDub, trackRegenerateDub } from '~/utils/helpers';
import {
  CustomToast,
  PaddleCheckoutOverlay,
  SpeakerVoiceModal,
} from '~/components/domain';
import { Select } from '~/components/ui/Select/Select';
import { useCreditsHelper } from '~/utils/helpers/creditPurchase';
import { ConfirmCreditsModal } from '~/components/domain/ConfirmCreditsModal';
import { PROJECT_ACCESSED_LANGUAGE, VOICES, paddleProductId } from '~/config';
import { useLocalStorage } from '~/utils/hooks';

import { DebugDub } from './Debug';
import { DubTooltip } from './DubTooltip';
import { VideoWrapper, EmptyVideo } from './LoadingVideo';

interface IProps {
  mediaId: string;
  type: string;
  seekTime: number;
  isReadOnly: boolean;
  canEdit?: boolean;
  mediaCategory: string;
  audioToggle?: boolean;
  editSegments: any[];
  handleTrackerClickP: (
    time: number,
    segments: any[],
    scrollable: boolean
  ) => void;
  handleBackgroundAudioToggle?: () => void;
}

interface IRegenDubData {
  contentId: string;
  translationId: string;
  dubId: string;
}

export const TranslatingVideo = ({
  mediaId,
  type,
  seekTime,
  isReadOnly,
  canEdit,
  mediaCategory,
  editSegments = [],
  audioToggle,
  handleBackgroundAudioToggle,
  handleTrackerClickP,
}: IProps) => {
  const {
    isDub,
    isTranslated,
    isEdit,
    dubStatus,
    dubId,
    isDubUpdated,
    targetLang,
    targetAccent,
    langAccents,
    dubItems,
    dubUpdatedAt,
    showDubError,
    targetVoice,
    showSettings,
    setIsDubUpdated,
    setDubUpdatedAt,
    setDubStatus,
    setDubId,
    setIsDub,
    setTargetAccent,
    setTargetVoice,
    setShowSettings,
  } = useTranslate();
  const { project } = useProject();
  const { contentId, contentFileUUID, translationId } = project;
  const { showInfoToast, showErrorToast } = useToast();
  const { hasEnoughCredits, getCreditBalance } = useCreditsHelper();
  const { currentUser } = useAuth();
  const { currentUserBalance } = useCurrentUserBalance();

  const router = useRouter();
  const { projectId } = router.query;
  const createDubDataRef = useRef<IDub | null>(null);
  const regenerateDubDataRef = useRef<IRegenDubData | null>(null);

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showConfirmCreditsModal, setShowConfirmCreditsModal] = useState(false);
  const [showtoast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSpeakerVoiceModal, setShowSpeakerVoiceModal] =
    useState<boolean>(false);
  const [userCreditBalanceInfo, setUserCreditBalanceInfo] =
    useState<any>(undefined);

  const [projectLangList, setProjectLangList] = useLocalStorage(
    PROJECT_ACCESSED_LANGUAGE,
    []
  );

  const { data: videoURL } = useQuery(
    [`getMediaPresigned${projectId}-${type}-${targetLang}`, targetLang],
    () => {
      return MediaApi.getMediaPresigned({
        mediaId,
        projectId: projectId as string,
      });
    },
    {
      enabled: mediaId !== '',
    }
  );

  const { mutate: createDub } = useMutation(
    (data: IDub) => DubApi.createDub(data),
    {
      onSuccess: () => {
        (async () => {
          trackDub({
            projectId: project.projectId,
            projectName: project.projectName,
            fileUUID: project?.content?.fileUuid,
            type: targetVoice,
          });
          setIsDub('progress');
          setShowToast(true);
          setLoading(false);
          await getCreditBalance(currentUser.id);
        })();
      },
      onError: (error: any) => {
        showErrorToast(`Error ocurred and dub generation failed.`);
        setLoading(false);
        // TODO: we can only get 403 instead of whole error message.
        if (
          error?.message === 'Request failed with status code 403' &&
          !isReadOnly
        ) {
          setShowToast(false);
          setShowPurchaseModal(true);
        }
      },
    }
  );

  const { mutate: regenerateDub } = useMutation(
    (data: IRegenDub) => DubApi.regenerateDub(data),
    {
      onSuccess: () => {
        trackRegenerateDub({
          projectId: project.projectId,
          projectName: project.projectName,
          fileUUID: project?.content?.fileUuid,
        });
        setIsDub('progress');
        setLoading(true);
      },
      onError: (error: any) => {
        showErrorToast(`Regenerating Dub went wrong.`);
        setLoading(false);
        // TODO: we can only get 403 instead of whole error message.
        if (
          error?.message === 'Request failed with status code 403' &&
          !isReadOnly
        ) {
          setShowToast(false);
          setShowPurchaseModal(true);
        }
      },
    }
  );

  useEffect(() => {
    if (!isDubUpdated) {
      setShowToast(true);
    }
  }, [isDubUpdated]);

  useEffect(() => {
    if (isDub === 'progress' && type === 'Translation' && showtoast) {
      showInfoToast('Generating Dub...');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDub, type, showtoast]);

  const handleDub = async () => {
    try {
      if (currentDubLabel === 'Go to Dub') {
        setShowSettings(false);
      } else {
        regenerateDubDataRef.current = null;
        if (translationId !== '' && contentId !== '') {
          setLoading(true);
          const userCreditBalanceResponse = await hasEnoughCredits(
            project.content.contentDuration
          );
          setUserCreditBalanceInfo(userCreditBalanceResponse);
          const createDubData = {
            contentId,
            language: targetAccent,
            translationId,
            status: 'SUBMITTED',
            voiceMatchingMode: targetVoice,
          };
          // @ts-ignore
          createDubDataRef.current = createDubData;
          if (userCreditBalanceResponse.hasEnoughCredits) {
            setLoading(false);
            setShowConfirmCreditsModal(true);
            window.analytics.track(`Paddle modal open`, {});
          } else {
            setShowConfirmCreditsModal(false);
            // else show purchase modal
            setShowToast(false);
            setShowPurchaseModal(true);
            setLoading(false);
            window.analytics.track(`Purchase modal open`, {});
          }
        }
      }
    } catch (e) {
      showErrorToast('Credits or something went wrong.');
    }
  };

  const updateDub = async () => {
    try {
      createDubDataRef.current = null;
      setLoading(true);
      const translation = await TranslationApi.getTranslationById(
        translationId
      );

      const currentDub = targetAccent
        ? translation.dub.find(
            (item: IDub) =>
              item?.language === targetAccent &&
              item?.voiceMatchingMode === targetVoice
          )
        : translation.dub[0];

      if (translation) {
        setLoading(true);
        const userCreditBalanceResponse = await hasEnoughCredits(
          project.content.contentDuration
        );
        setUserCreditBalanceInfo(userCreditBalanceResponse);
        setDubUpdatedAt(currentDub.updatedAt);
        setDubStatus(currentDub.status);
        setTargetVoice(currentDub.voiceMatchingMode);
        setDubId(currentDub.id);

        const regenerateDubData = {
          contentId,
          translationId,
          dubId: currentDub.id,
        };
        regenerateDubDataRef.current = regenerateDubData;
        callRunDub();
      }
    } catch (e) {
      showErrorToast('Updating Dub went wrong.');
      setLoading(false);
    }
  };

  const handleCloseSpeakerVoice = () => {
    setShowSpeakerVoiceModal(false);
  };

  const handlePurchaseModalClose = () => {
    setShowPurchaseModal(false);
    setShowConfirmCreditsModal(false);
    window.analytics.track(`Purchase modal close`, {});
  };

  function callRunDub() {
    if (createDubDataRef.current) {
      createDub(createDubDataRef.current);
    } else if (regenerateDubDataRef.current) {
      // @ts-ignore
      regenerateDub(regenerateDubDataRef.current);
    }
  }

  const handlePurchaseModalSuccess = () => {
    // Perform any necessary actions after successfully purchasing credits
    setShowPurchaseModal(false);
    setShowConfirmCreditsModal(false);
    window.analytics.track(`Purchase modal success`, {});
    // Retry the createDub mutation or handle the logic accordingly
    callRunDub();
    // wait for webhook to finish
  };

  const handleConfirmCreditsModalSuccess = () => {
    // Perform any necessary actions after successfully purchasing credits
    window.analytics.track(`Confirm credits modal open success`, {});
    setShowPurchaseModal(false);
    setShowConfirmCreditsModal(false);
    // Retry the createDub mutation or handle the logic accordingly
    callRunDub();
  };

  const handleConfirmCreditsModalClose = () => {
    setShowPurchaseModal(false);
    setShowConfirmCreditsModal(false);
    window.analytics.track(`Confirm credits modal close`, {});
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTrackerClick = (currentTime: number, scrollable: boolean) => {
    if (currentTime) {
      // @ts-ignore
      handleTrackerClickP(currentTime, editSegments, scrollable);
    }
  };

  // Clean localStorage value
  const initProjectHistory = () => {
    const filterIndex = projectLangList?.findIndex(
      (projectLang: any) => projectLang.projectId === projectId
    );

    if (filterIndex !== -1) {
      projectLangList[filterIndex].language = targetLang;
      projectLangList[filterIndex].dialect = '';
      projectLangList[filterIndex].voice = '';
      setProjectLangList(projectLangList);
    }
  };

  const handleVoiceChange = (e: any) => {
    initProjectHistory();
    setTargetVoice(e.target.value);
    setShowSettings(true);
  };

  const handleTargetChange = (e: SelectChangeEvent) => {
    initProjectHistory();
    setTargetAccent(e.target.value);
    setShowSettings(true);
    window.analytics.track(`On change accent`, { value: e.target.value });
  };

  const handleCustomize = () => {
    setShowSpeakerVoiceModal(true);
  };

  const getVoiceLabel = (value?: string) => {
    const currentLabel = VOICES.filter(accent => accent.code === value)[0]
      ?.label;

    if (currentLabel) {
      if (value === 'customized') {
        return 'Multiple voices';
      }

      return currentLabel;
    }

    return 'Select Target Voice';
  };

  const currentDubLabel = useMemo(() => {
    const dubIndex = dubItems.findIndex(
      item =>
        item.language === targetAccent && item.voiceMatchingMode === targetVoice
    );
    if (dubIndex > -1) {
      setShowSettings(false);
      return `Go to Dub`;
    }

    return `Generate Dub`;
  }, [dubItems, targetAccent, targetVoice]);

  const voiceItems = useMemo(() => {
    if (langAccents.length > 0) {
      const nativeMatchingEnabled = langAccents.filter(
        accent => accent?.code === targetAccent
      )[0]?.nativeMatchingEnabled;

      if (nativeMatchingEnabled === false) {
        setTargetVoice('source');
      }

      return nativeMatchingEnabled
        ? VOICES
        : VOICES.filter(voice => voice.code === 'source');
    }

    return VOICES;
  }, [langAccents, targetAccent]);

  const videoPlayer = useMemo(() => {
    // @ts-ignore
    return (
      <SVideo
        key={videoURL}
        type={mediaCategory}
        seekTime={seekTime}
        mediaUrl={videoURL || ''}
        // @ts-ignore
        audioToggleOn={audioToggle}
        // @ts-ignore
        isMultiAccents={type !== 'Transcription'}
        options={langAccents}
        handleTrackerClickP={handleTrackerClick}
        handleBackgroundAudioToggle={handleBackgroundAudioToggle}
      />
    );
  }, [
    videoURL,
    type,
    langAccents,
    mediaCategory,
    seekTime,
    audioToggle,
    handleTrackerClick,
    handleBackgroundAudioToggle,
  ]);
  const isDebugMode = useDebug();

  const formattedDate = dubUpdatedAt
    ? new Date(dubUpdatedAt).toLocaleString()
    : '';

  return (
    <VideoWrapper
      className='video'
      isaudio={mediaCategory === 'audio' ? 'true' : 'false'}
    >
      {videoURL &&
      mediaId !== '' &&
      ((isDub === true && type !== 'Transcription' && !showSettings) ||
        type === 'Transcription') ? (
        <Box position='relative'>
          {isDubUpdated === false && type !== 'Transcription' && showtoast && (
            <Box position='absolute' width='100%' top={0} left={0} zIndex={9}>
              <CustomToast
                message='The translation has been changed. Make sure you also update the dub.'
                type='Dismiss'
                loading={loading}
                onUpdate={updateDub}
                onClose={() => {
                  setIsDubUpdated(true);
                  setShowToast(false);
                }}
              />
            </Box>
          )}
          {mediaCategory === 'audio' && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#EFF0F4',
                p: '37px',
                mb: 1,
              }}
            >
              <HeadphonesOutlinedIcon
                sx={{ color: '#c5c7cb', fontSize: '40px' }}
              />
            </Box>
          )}
          {videoPlayer}
          {isDebugMode && type !== 'Transcription' && (
            <DebugDub
              dubId={dubId}
              formattedDate={formattedDate}
              contentFileUUID={contentFileUUID}
              dubStatus={dubStatus}
              targetAccent={targetAccent}
              targetVoice={targetVoice}
            />
          )}
        </Box>
      ) : (
        <EmptyVideo>
          {isDebugMode && (
            <DebugDub
              dubId={dubId}
              formattedDate={formattedDate}
              contentFileUUID={contentFileUUID}
              dubStatus={dubStatus}
              targetAccent={targetAccent}
              targetVoice={targetVoice}
            />
          )}
          {isTranslated === true ? (
            <DubWrapper>
              {isDub === 'progress' && type !== 'Transcription' ? (
                <Box>
                  <BeatLoader color='#E0E1EC' />
                </Box>
              ) : (
                <Box
                  width='280px'
                  display='flex'
                  flexDirection='column'
                  gap={1}
                >
                  {showDubError && (
                    <Typography
                      variant='caption'
                      color='#C4441C'
                      fontWeight={400}
                    >
                      Our team will manually fix this dub for you. <br /> Please
                      come back and check the status later.
                    </Typography>
                  )}
                  <Select
                    disabled={langAccents.length === 1}
                    value={targetAccent}
                    sx={{
                      flex: 1,
                      padding: '5px 0',
                    }}
                    onChange={(e: any) => handleTargetChange(e)}
                    options={langAccents.map(acc => ({
                      name: acc.label,
                      value: acc.code,
                    }))}
                    labelIcon={
                      <Typography
                        variant='caption'
                        color='#909094'
                        ml={0.5}
                        mr={1}
                      >
                        Dialect
                      </Typography>
                    }
                    label={value =>
                      langAccents.filter(accent => accent.code === value)[0]
                        ?.label || 'Select Target Accent'
                    }
                  />
                  <Box position='relative' width='100%'>
                    <Select
                      fullWidth
                      disabled={voiceItems.length === 1}
                      value={targetVoice}
                      sx={{
                        flex: 1,
                        padding: '5px 0',
                      }}
                      onChange={(e: any) => handleVoiceChange(e)}
                      options={voiceItems.map(acc => ({
                        name: acc.label,
                        value: acc.code,
                        hasDivider: acc?.hasDivider,
                        icon: acc?.icon,
                        onClick: acc?.icon ? handleCustomize : null,
                      }))}
                      labelIcon={
                        <Typography
                          variant='caption'
                          color='#909094'
                          ml={0.5}
                          mr={2}
                        >
                          Voice
                        </Typography>
                      }
                      label={value => getVoiceLabel(value)}
                    />
                    <DubTooltip showOriginalTooltip={langAccents.length > 1} />
                  </Box>

                  <Button
                    fullWidth
                    size='small'
                    variant='contained'
                    color='secondary'
                    disabled={
                      isEdit !== '' ||
                      !canEdit ||
                      showDubError ||
                      targetAccent === '' ||
                      targetVoice === ''
                    }
                    loading={loading}
                    sx={{
                      '&:disabled': {
                        background: '#e4e4e4',
                        color: '#989899',
                        opacity: 1,
                      },
                    }}
                    onClick={handleDub}
                  >
                    {currentDubLabel}
                  </Button>
                </Box>
              )}
            </DubWrapper>
          ) : (
            <SvgImage name='DarkVideoIcon' />
          )}
        </EmptyVideo>
      )}
      {showPurchaseModal && (
        <PaddleCheckoutOverlay
          productId={paddleProductId.toString()}
          creditRequired={userCreditBalanceInfo?.consumeCredits || 0}
          creditRemaining={currentUserBalance || 0}
          handleClose={handlePurchaseModalClose}
          successCallback={handlePurchaseModalSuccess}
        />
      )}
      {showConfirmCreditsModal && (
        <ConfirmCreditsModal
          creditRequired={userCreditBalanceInfo?.consumeCredits || 0}
          creditRemaining={currentUserBalance || 0}
          handleClose={handleConfirmCreditsModalClose}
          successCallback={handleConfirmCreditsModalSuccess}
        />
      )}
      {showSpeakerVoiceModal && (
        <SpeakerVoiceModal
          open={showSpeakerVoiceModal}
          onBack={handleCloseSpeakerVoice}
        />
      )}
    </VideoWrapper>
  );
};

const DubWrapper = styled(Box)({
  width: '354px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative', // Add this line
});
