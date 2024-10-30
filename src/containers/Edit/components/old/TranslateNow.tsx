import { useRouter } from 'next/router';
import { styled } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { useTranslate, useToast, useProject } from '~/context';
import { TranslationApi, ITranslation } from '~/api';
import { Button } from '~/components/ui';
import { SegmentLoader, WarnMsgModal } from '~/components/domain';

interface ITranslateNow {
  canEdit?: boolean;
  translationVariants?: any[];
}

export const TranslateNow = ({
  canEdit,
  translationVariants = [],
}: ITranslateNow) => {
  const router = useRouter();
  const { projectId } = router.query;
  const { showInfoToast, showErrorToast } = useToast();
  const { isTranslated, isEdit, targetLang, setIsTranslated } = useTranslate();
  const { project } = useProject();
  const { translationId } = project;

  const [loading, setLoading] = useState<boolean>(false);
  const [showWarnModal, setShowWarnModal] = useState<boolean>(false);

  const { mutate: createTranslation } = useMutation(
    (data: ITranslation) => TranslationApi.createTranslation(data),
    {
      onSuccess: () => {
        setLoading(false);
        setIsTranslated('progress');
        showInfoToast('Generating translation...');
      },
      onError: () => {
        setLoading(false);
        setIsTranslated(false);
        showErrorToast('Generating translation error!');
      },
    }
  );

  const handleWarnTranslate = () => {
    setShowWarnModal(true);
  };

  const handleBackTranscription = () => {
    setShowWarnModal(false);
  };

  const handleTranslate = () => {
    setShowWarnModal(false);
    setLoading(true);
    const translation = {
      project: projectId as string,
      language: targetLang,
      status: 'SUBMITTED',
    };
    createTranslation(translation);
    window.analytics.track(`Translate`, { translation });
  };

  const isTranslationLang = useMemo(() => {
    return (
      translationVariants.filter(lang => lang.code === targetLang).length > 0
    );
  }, [translationVariants, targetLang]);

  return (
    <Wrapper alignItems={isTranslated === false ? 'center' : 'flex-start'}>
      {isTranslated === false ? (
        <Box textAlign='center' sx={{ maxWidth: '340px' }}>
          <Typography color='#5D5E66' variant='body2' align='center' mb={2}>
            Make sure you review any errors and select the target language
            before starting the translation
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            loading={loading}
            disabled={
              isEdit !== '' ||
              (!canEdit && !!translationId) ||
              targetLang === 'none' ||
              !isTranslationLang
            }
            sx={{ width: '91px' }}
            onClick={handleWarnTranslate}
          >
            Translate
          </Button>
        </Box>
      ) : (
        <Box width='100%' height='100%'>
          {[0, 0].map((_item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <SegmentLoader key={idx} />
          ))}
        </Box>
      )}
      {showWarnModal && (
        <WarnMsgModal
          open={showWarnModal}
          onContinue={handleTranslate}
          onBack={handleBackTranscription}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});
