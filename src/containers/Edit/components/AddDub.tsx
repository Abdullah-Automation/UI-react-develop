import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { Button } from '~/components/ui';
import { PaddleCheckoutOverlay, SpeakerVoiceModal } from '~/components/domain';
import {
  useAuth,
  useCurrentUserBalance,
  useProject,
  useSegment,
  useToast,
  useTranscription,
  useTranslate,
  useTranslation,
  useTranslations,
} from '~/context';
import { paddleProductId } from '~/config';
import { IDub, DubApi, IRegenDub } from '~/api';
import { useCreditsHelper } from '~/utils/helpers/creditPurchase';
import { checkValidation, trackDub, trackRegenerateDub } from '~/utils/helpers';
import { ConfirmCreditsModal } from '~/components/domain/ConfirmCreditsModal';

interface IAddDub {
  type?: 'add' | 'update';
}

export const AddDub = ({ type = 'add' }: IAddDub) => {
  const [showSpeakerVoiceModal, setShowSpeakerVoiceModal] =
    useState<boolean>(false);

  const { project } = useProject();
  const { showInfoToast, showErrorToast } = useToast();
  const { contentId, translationId, mediaCategory } = project;
  const { hasEnoughCredits, getCreditBalance } = useCreditsHelper();
  const { currentUserBalance } = useCurrentUserBalance();
  const { currentUser } = useAuth();
  const { targetVoice, targetAccent, setIsDub, isEditable } = useTranslate();
  const { refetchTranscription } = useTranscription({
    transcriptionId: project?.transcriptionId || '',
  });
  const { enabledTranslationsAPI } = useTranslations();
  const { translation } = useTranslation({
    translationId,
    mediaCategory,
    enabledTranslationsAPI,
  });
  const { validation } = useSegment();

  const [userCreditBalanceInfo, setUserCreditBalanceInfo] =
    useState<any>(undefined);
  const [showConfirmCreditsModal, setShowConfirmCreditsModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

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
          showInfoToast(
            'Generating dub... You can leave the page and check the dub status on dashboard.'
          );
          refetchTranscription();
          await getCreditBalance(currentUser.id);
        })();
      },
      onError: (error: any) => {
        if (error?.response?.data?.message === 'No permission') {
          showErrorToast(
            `You don't have edit permission. Please contact the project owner for access.`
          );
        } else if (error?.response?.data?.code === 403) {
          showErrorToast(`Authorization Error. Please login again.`);
          setShowPurchaseModal(true);
        } else {
          showErrorToast(
            `Error ocurred and dub generation failed: ${error?.response?.data?.message}`
          );
        }
      },
    }
  );

  const { mutate: reGenerateDub } = useMutation(
    (data: IRegenDub) => DubApi.regenerateDub(data),
    {
      onSuccess: () => {
        trackRegenerateDub({
          projectId: project.projectId,
          projectName: project.projectName,
          fileUUID: project?.content?.fileUuid,
        });
        setIsDub('progress');
      },
      onError: () => {
        showErrorToast(`Regenerating Dub went wrong.`);
      },
    }
  );

  const handleBalance = async () => {
    const userCreditBalanceResponse = await hasEnoughCredits(
      project.content.contentDuration
    );
    setUserCreditBalanceInfo(userCreditBalanceResponse);

    if (userCreditBalanceResponse.hasEnoughCredits) {
      setShowConfirmCreditsModal(true);
      window.analytics.track(`Paddle modal open`, {});
    } else {
      setShowConfirmCreditsModal(false);
      setShowPurchaseModal(true);
      window.analytics.track(`Purchase modal open`, {});
    }

    window.analytics.track(`Multiple Voices Changed`, {
      transcriptionId: project.transcriptionId,
    });
  };

  const handlePurchaseModalSuccess = (type: string = 'Purchase modal') => {
    // Perform any necessary actions after successfully purchasing credits
    setShowPurchaseModal(false);
    setShowConfirmCreditsModal(false);
    window.analytics.track(`${type} success`, {});
    const currentDub = translation.dub.find(
      (item: IDub) =>
        item?.language === targetAccent &&
        item?.voiceMatchingMode === targetVoice
    );

    if (currentDub) {
      reGenerateDub({
        contentId,
        translationId,
        dubId: currentDub.id,
        segmentLevel: true,
      });
    } else {
      createDub({
        contentId,
        language: targetAccent,
        translationId,
        status: 'SUBMITTED',
        voiceMatchingMode: targetVoice,
      });
    }
  };

  const handlePurchaseModalClose = (type: string = 'Purchase modal') => {
    setShowPurchaseModal(false);
    setShowConfirmCreditsModal(false);
    window.analytics.track(`${type} close`, {});
  };

  const handleSpeakerVoice = (isDone: boolean = false) => {
    setShowSpeakerVoiceModal(!showSpeakerVoiceModal);

    if (isDone) {
      handleBalance();
    }
  };

  return (
    <Box>
      {type === 'add' ? (
        <Button
          startIcon={
            <AddIcon
              sx={{
                color:
                  !isEditable || !checkValidation(validation)
                    ? '#1B1B1F'
                    : '#fff',
              }}
            />
          }
          color='secondary'
          sx={{ mt: 4 }}
          disabled={!isEditable || !checkValidation(validation)}
          onClick={() => handleSpeakerVoice(false)}
        >
          Create
        </Button>
      ) : (
        <Button
          color='neutral'
          size='small'
          variant='text'
          startIcon={<AddIcon />}
          disabled={!isEditable || !checkValidation(validation)}
          onClick={() => handleSpeakerVoice(false)}
          sx={{ mr: '-10px' }}
        >
          Add Dub
        </Button>
      )}
      {showSpeakerVoiceModal && (
        <SpeakerVoiceModal
          open={showSpeakerVoiceModal}
          onBack={handleSpeakerVoice}
        />
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
          handleClose={handlePurchaseModalClose}
          successCallback={handlePurchaseModalSuccess}
        />
      )}
    </Box>
  );
};
