import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  IconButton,
  Typography,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PostIcon from '@mui/icons-material/PostAdd';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useMutation } from '@tanstack/react-query';

import {
  useProject,
  useTranscribe,
  useTranscription,
  useTranslate,
  useTranslations,
  useTranslation,
  useToast,
} from '~/context';
import { Select, LightTooltip } from '~/components/ui';
import { sortLanguage, trackRegenerateDub } from '~/utils/helpers';
import { useLocalStorage } from '~/utils/hooks';
import { PROJECT_ACCESSED_LANGUAGE } from '~/config';
import { DubApi, IDub, IRegenDub, TranslationApi } from '~/api';
import { ExportModal, UploadConfirmationModal } from '~/components/domain';

interface ILanguageHeader {
  type?: string;
}

export const LanguageHeader = ({ type = 'Transcription' }: ILanguageHeader) => {
  const router = useRouter();
  const { projectId } = router.query;
  const { project, createTranslation } = useProject();
  const { translations, enabledTranslationsAPI } = useTranslations();
  const { contentId, translationId, mediaCategory } = project;
  const { showErrorToast } = useToast();
  const { refetchTranslation } = useTranslation({
    translationId: project.translationId,
    mediaCategory: project.mediaCategory,
    enabledTranslationsAPI,
  });
  const { translation } = useTranslation({
    translationId,
    mediaCategory,
    enabledTranslationsAPI,
  });

  const { showVideoSection } = useTranscribe();
  const { refetchTranscription } = useTranscription({
    transcriptionId: project?.transcriptionId || '',
  });
  const {
    targetLang,
    setTargetLang,
    setTargetVoice,
    isDub,
    setIsDub,
    targetVoice,
    targetAccent,
  } = useTranslate();
  const btnExportRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isExport, setIsExport] = useState<boolean>(false);
  const [showFileInput, setShowFileInput] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [projectLangList, setProjectLangList] = useLocalStorage(
    PROJECT_ACCESSED_LANGUAGE,
    []
  );
  const { translationVariants = [] } = project;

  useEffect(() => {
    if (showFileInput && fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.click(); // Trigger the file input click when it's shown
    }
  }, [showFileInput]);

  const handleExport = () => {
    setIsExport(true);
    // @ts-ignore
    btnExportRef?.current?.blur();
  };

  const handleFileSelection = async (event: any) => {
    setShowFileInput(false);

    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setErrorMessage('');

    try {
      await TranslationApi.uploadTranslationSegments(
        translationId, // Replace with the actual translation ID
        file
      );

      refetchTranslation();
      setIsUploadModalOpen(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message);
    } finally {
      event.target.value = null;
    }
  };

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

  const handleRefresh = async () => {
    const currentDub = translation.dub.find(
      (item: IDub) =>
        item?.language === targetAccent &&
        item?.voiceMatchingMode === targetVoice
    );
    try {
      // Call the dub API
      reGenerateDub({
        contentId,
        translationId,
        dubId: currentDub.id,
        segmentLevel: true,
      });
      // Handle the response from the dub API
    } catch (error) {
      console.error('Error calling dub API:', error);
    }
  };

  const handleTargetChange = (e: SelectChangeEvent) => {
    setTargetLang(e.target.value);
    setTargetVoice('source');

    const newTranslationIndex = translations.findIndex(
      translation => translation.language === e.target.value
    );

    if (newTranslationIndex === -1) {
      createTranslation({
        project: projectId as string,
        language: e.target.value,
        status: 'SUBMITTED',
      });
      refetchTranscription();
    }

    // Save Access Language into LocalStorage
    const filterIndex = projectLangList?.findIndex(
      (projectLang: any) => projectLang.projectId === projectId
    );
    if (filterIndex !== -1) {
      projectLangList[filterIndex] = { projectId, language: e.target.value };
    } else {
      projectLangList.push({ projectId, language: e.target.value });
    }
    setProjectLangList(projectLangList);

    window.analytics.track(`Change language to: ${e.target.value}`, {});
  };

  return (
    <Wrapper isfullscreen={showVideoSection ? 'true' : 'false'} type={type}>
      <Box display='flex' height={32} alignItems='center' marginLeft='3px'>
        {isDub && type === 'Translation' && (
          <IconButton onClick={() => handleRefresh()} size='small'>
            <RefreshIcon />
          </IconButton>
        )}
        <Typography color='#909094' fontWeight='500' variant='h6' mr={2.5}>
          {type === 'Transcription' ? `Original` : 'Target'}
        </Typography>

        {type === 'Transcription' ? (
          <Typography color='#1B1B1F' fontWeight='500' variant='h6'>
            {project.transcriptionLanguge}
          </Typography>
        ) : (
          <Select
            disableUnderline
            options={sortLanguage(translationVariants, 'label').map(
              language => ({
                name: language.label,
                value: language.code,
              })
            )}
            sx={{
              marginLeft: '-6px',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 240,
                },
              },
            }}
            variant='filled'
            value={translationVariants.length > 0 ? targetLang : ''}
            onChange={(e: any) => handleTargetChange(e)}
            placeholder='Select target language'
            label={(value?: string) =>
              translationVariants.filter((lang: any) => lang.code === value)[0]
                ?.label || 'Select target language'
            }
          />
        )}
      </Box>

      <Box display='flex' alignItems='center' gap='4px'>
        {type === 'Translation' && (
          <LightTooltip placement='bottom' title='Import Translation'>
            <span>
              <IconButton
                color='neutral'
                size='medium'
                onClick={() => {
                  setIsUploadModalOpen(true);
                  setErrorMessage(''); // Reset the error message when opening the modal
                }}
              >
                {showFileInput && (
                  <input
                    type='file'
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileSelection}
                    onClick={() =>
                      // @ts-ignore
                      fileInputRef.current &&
                      // @ts-ignore
                      (fileInputRef.current.value = '')
                    }
                  />
                )}
                <PostIcon />
              </IconButton>
            </span>
          </LightTooltip>
        )}

        <LightTooltip placement='bottom' title='Download'>
          <span>
            <IconButton
              ref={btnExportRef}
              onClick={handleExport}
              color='neutral'
              size='medium'
            >
              <SaveAltIcon />
            </IconButton>
          </span>
        </LightTooltip>
      </Box>
      {isUploadModalOpen && (
        <UploadConfirmationModal
          errorMessage={errorMessage}
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onConfirmUpload={() => setShowFileInput(true)}
        />
      )}
      {isExport && (
        <ExportModal
          open={isExport}
          type={type}
          handleClose={() => setIsExport(false)}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ isfullscreen?: string; type: string }>(
  ({ type }) => ({
    flex: 1,
    background: '#fff',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #E0E1EC',
    borderRight: type === 'Transcription' ? '1px solid #E0E1EC' : 'none',
    height: '48px',
    padding: '0px 12px 0px 20px',
  })
);
