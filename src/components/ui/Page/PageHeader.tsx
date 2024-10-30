import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Toolbar, Typography, IconButton } from '@mui/material';
import WestIcon from '@mui/icons-material/West';

import { ROUTES } from '~/config';
import { Button, CreditBalance, SvgImage } from '~/components/ui';
import {
  useCurrentUserBalance,
  useProject,
  useSegment,
  useSpeakers,
  useTranslate,
  useVideoPlayerContext,
  useVoiceover,
} from '~/context';
import { ShareProjectModal } from '~/components/domain';

import { Header } from './Style';
import { UserSetting } from './UserSetting';
import { PageMenu } from './PageMenu';

interface IPageHeader {
  isEditPage?: boolean;
}

export const PageHeader = ({ isEditPage }: IPageHeader) => {
  const router = useRouter();
  const { currentUserBalance } = useCurrentUserBalance();
  const { voiceOver } = useVoiceover();
  const { setIsTranslated, setIsDub, isEditable } = useTranslate();
  const { project } = useProject();
  const { handleTrackSegment } = useVideoPlayerContext();
  const { setTranslationSegments } = useSegment();
  const { setSpeakersCtx } = useSpeakers();

  const { projectId } = router.query;

  const [openShareProjectModal, setOpenShareProjectModal] =
    useState<boolean>(false);

  const handleBack = () => {
    setIsTranslated(false);
    setIsDub(false);
    handleTrackSegment({
      trackedTime: 0,
      type: 'segment',
      endTrackedTIme: 0,
    });
    setTranslationSegments([]);
    setSpeakersCtx([]);
    if (router.asPath.includes(ROUTES.VOICEOVER)) {
      router.push(ROUTES.VOICEOVER);
    } else {
      router.push(ROUTES.DASHBOARD);
    }
  };

  const handleShare = () => {
    setOpenShareProjectModal(true);
  };

  return (
    <Header iseditpage={isEditPage ? 'true' : 'false'} color='transparent'>
      <Toolbar
        sx={{
          height: '48px !important',
          minHeight: '48px !important',
        }}
        disableGutters
      >
        <IconButton
          color='neutral'
          sx={{ ml: isEditPage ? '-12px' : '0', width: 'auto', height: 'auto' }}
          onClick={handleBack}
        >
          {isEditPage ? (
            <WestIcon sx={{ color: '#45464F', fontSize: '16px' }} />
          ) : (
            <SvgImage name='LogoIcon' width={44.5} height={24} />
          )}
        </IconButton>
        {isEditPage ? (
          <Box display='flex' alignItems='center' gap='16px'>
            <Typography variant='h6' color='#1B1B1F' ml={1.5}>
              {projectId
                ? project.projectName
                : voiceOver?.name
                ? voiceOver?.name
                : ''}
            </Typography>
            {!isEditable && (
              <Typography variant='h6' fontWeight={400} color='#909094'>
                View only
              </Typography>
            )}
          </Box>
        ) : (
          <PageMenu />
        )}

        <Box sx={{ flexGrow: 1 }} />
        {isEditPage && projectId && (
          <Box display='flex' alignItems='center' gap={1.25}>
            <CreditBalance balance={currentUserBalance.toString()} />
            <Button
              size='small'
              color='secondary'
              variant='contained'
              onClick={handleShare}
            >
              Share
            </Button>
          </Box>
        )}
        <UserSetting isEditPage={isEditPage} />
      </Toolbar>
      {openShareProjectModal && (
        <ShareProjectModal
          open={openShareProjectModal}
          projectName={project.projectName}
          projectId={projectId as string}
          handleClose={() => setOpenShareProjectModal(false)}
        />
      )}
    </Header>
  );
};
