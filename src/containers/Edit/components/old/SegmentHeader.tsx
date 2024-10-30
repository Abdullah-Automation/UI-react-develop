import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  IconButton,
  Typography,
  SvgIcon,
  SelectChangeEvent,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import PostIcon from '@mui/icons-material/PostAdd';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import * as Sentry from '@sentry/react';

import { TranscriptionApi, TranslationApi } from '~/api';
import {
  sortLanguage,
  trackRegenerateTranslate,
  trackTranscriptionEdit,
  trackTranslationEdit,
} from '~/utils/helpers';
import {
  useTranslate,
  useToast,
  useProject,
  useTranscription,
  useDebug,
} from '~/context';
import {
  CustomToast,
  ExportModal,
  WarnMsgModal,
  UploadConfirmationModal,
} from '~/components/domain';
import { Select, LightTooltip } from '~/components/ui';
import { useLocalStorage } from '~/utils/hooks';
import { PROJECT_ACCESSED_LANGUAGE } from '~/config';

import { EditTool } from './EditTool';

interface ISegmentHeader {
  isReadOnly: boolean;
  type: string;
  mediaId: string;
  transId: string;
  canEdit?: boolean;
  segments: any[];
  originSegments: any[];
  translationVariants?: any[];
  refetchTranslation: () => void;
}

export const SegmentHeader = ({
  isReadOnly,
  type = 'Transcription',
  transId,
  segments,
  canEdit,
  originSegments,
  translationVariants = [],
  refetchTranslation,
}: ISegmentHeader) => {
  const router = useRouter();
  const { projectId } = router.query;

  const { showInfoToast, showErrorToast } = useToast();
  const { project } = useProject();
  const { translationId, translationUpdatedAt } = project;

  const {
    isEdit,
    isEdited,
    isDub,
    isTranslated,
    isTranscriptionUpdated,
    targetLang,
    setIsDubUpdated,
    setIsTranscriptionUpdated,
    setIsEdit,
    setTargetLang,
    setTargetVoice,
    setDubUpdatedAt,
    setIsTranslated,
  } = useTranslate();
  const { refetchTranscription, transcription } = useTranscription({
    transcriptionId: transId,
  });

  const btnExportRef = useRef(null);
  const btnEditRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isExport, setIsExport] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showWarnModal, setShowWarnModal] = useState<boolean>(false);
  const [showTranslationToast, setShowTranslationToast] =
    useState<boolean>(false);
  const [projectLangList, setProjectLangList] = useLocalStorage(
    PROJECT_ACCESSED_LANGUAGE,
    []
  );

  useEffect(() => {
    setIsEdit('');
  }, [setIsEdit]);

  useEffect(() => {
    if (
      isTranslated === true &&
      type !== 'Transcription' &&
      isTranscriptionUpdated
    ) {
      setShowTranslationToast(true);
    } else {
      setShowTranslationToast(false);
    }
  }, [isTranslated, type, isTranscriptionUpdated]);

  useEffect(() => {
    const saveTimer = setInterval(() => {
      if (type === isEdit) {
        handleEditSave(true);
      }
    }, 120000); // 2 minutes in milliseconds

    return () => {
      clearInterval(saveTimer);
    };
  }, [type, isEdit, segments]);

  const handleExport = () => {
    setIsExport(true);
    // @ts-ignore
    btnExportRef?.current?.blur();
  };

  const closeUploadModal = () => setIsUploadModalOpen(false);

  useEffect(() => {
    if (showFileInput && fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.click();
    }
  }, [showFileInput]);

  const handleConfirmUpload = () => {
    setShowFileInput(true); // Enable file input
  };

  const handleFileSelection = async (event: any) => {
    setShowFileInput(false); // Disable file input after selection

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
      // Handle the response data as needed
      closeUploadModal(); // Close the modal after processing
    } catch (error: any) {
      console.error('File upload failed', error);
      setErrorMessage(error.response?.data?.message);
      // Optionally handle error UI here
    } finally {
      // Reset the file input
      event.target.value = null;
    }
  };

  const updateTranslation = async () => {
    try {
      // save the translation edits to db using translation id
      setLoading(true);
      await TranslationApi.regenerateTranslation({
        translationId,
        transcriptionId: transId,
      });

      showInfoToast('Updating translation...');
      setIsTranslated('progress');
      setIsTranscriptionUpdated(false);
      setLoading(false);
      setShowTranslationToast(false);

      trackRegenerateTranslate({ translationId, transcriptionId: transId });
    } catch (e) {
      showErrorToast(`Updating the Translation went wrong!`);
      refetchTranslation();
      setLoading(false);
    }
  };

  const handleSegmentEdit = async (content: any[], autoSave: boolean) => {
    try {
      if (type === 'Transcription') {
        if (!autoSave) {
          setLoading(true);
        }

        const contentForAPI = content.map(item => {
          const {
            wordIndexToTrackHighlight,
            wordIndexToTrackClick,
            cursorLocation,
            ...rest
          } = item;
          return rest;
        });
        // @ts-ignore
        const res = await TranscriptionApi.updateAllTranscriptSegments(
          transId,
          contentForAPI
        );

        if (!autoSave) {
          if (isTranslated === true) {
            setIsTranscriptionUpdated(true);
          }

          trackTranscriptionEdit({ transcriptionId: transId });
          setLoading(false);
          refetchTranscription();
        }
      } else {
        if (!autoSave) {
          setLoading(true);
        }
        // save the translation edits to db using translation id
        const contentForAPI = content.map(
          ({
            translation,
            speaker,
            createdAt,
            updatedAt,
            cursorLocation,
            wordIndexToTrackHighlight,
            wordIndexToTrackClick,
            pauseFillingRate,
            dubStartTime,
            dubEndTime,
            speedupFactor,
            textLengthRatio,
            wordsPerMin,
            ...rest
          }) => {
            return rest;
          }
        );
        if (translationId !== '') {
          await TranslationApi.bulkUpdateTranslationSegments(
            translationId,
            contentForAPI
          );

          if (!autoSave) {
            setIsDubUpdated(false);
            trackTranslationEdit({ translationId });
          }
        }

        if (!autoSave) {
          setLoading(false);
          if (refetchTranslation) {
            refetchTranslation();
          }
        }
      }
    } catch (e: any) {
      refetchTranslation();

      showErrorToast(
        `The saving of ${
          type === 'Transcription' ? 'Transcription' : targetLang
        } editing went wrong!`
      );

      Sentry.withScope(scope => {
        scope.setExtra(
          'text',
          JSON.stringify({
            error: e?.response?.data?.message || e,
            targetLang,
            translationId,
            transcriptionId: transId,
          })
        );
        Sentry.captureException(
          `The saving of ${
            type === 'Transcription' ? 'Transcription' : targetLang
          } editing went wrong!`
        );
      });

      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (isEdited && type === 'Transcription') {
      if (showWarnModal) {
        setIsEdit(type);
        setShowWarnModal(false);
      } else {
        setShowWarnModal(true);
      }
    } else {
      setIsEdit(type);
    }
  };

  const handleEditCancel = () => {
    setIsEdit('');
  };

  const handleBack = () => {
    setShowWarnModal(false);
  };

  const handleEditSave = (autoSave: boolean = false) => {
    if (!autoSave) {
      setIsEdit('');
    }

    if (
      JSON.stringify(
        segments.map(
          segment => (segment?.speaker || '') + (segment?.content || '')
        )
      ) !==
      JSON.stringify(
        originSegments.map(segment => `${segment?.speaker}${segment?.content}`)
      )
    ) {
      handleSegmentEdit(segments, autoSave);
    }
  };

  const handleDismiss = () => {
    setShowTranslationToast(false);
    setIsTranscriptionUpdated(false);
  };

  const handleTargetChange = (e: SelectChangeEvent) => {
    setTargetLang(e.target.value);
    setTargetVoice('source');
    setDubUpdatedAt('');

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

  const isDisabledEdit = useCallback(
    (role = 'edit') => {
      if (isEdit !== '') {
        if (type === isEdit && role === 'edit') {
          return false;
        }
        return true;
      }

      if (type !== 'Transcription') {
        if (isTranslated === false || showTranslationToast) {
          return true;
        }
      }

      if (type === 'Transcription' && showTranslationToast) {
        return true;
      }

      if (
        isTranslated === 'progress' ||
        isDub === 'progress' ||
        (isEdit !== '' && isEdit !== type)
      ) {
        return true;
      }

      return false;
    },
    [type, isTranslated, isEdit, isDub, showTranslationToast]
  );

  const isDebugMode = useDebug();
  const formattedDate = new Date(transcription?.updatedAt).toLocaleString();
  const formattedDateTranslate = new Date(
    translationUpdatedAt
  ).toLocaleString();

  // @ts-ignore
  return (
    <Box position='relative'>
      {isTranslated === true &&
        type !== 'Transcription' &&
        isTranscriptionUpdated &&
        !isReadOnly &&
        showTranslationToast && (
          <Box
            position='absolute'
            top='0'
            marginX='-2px'
            marginTop='-2px'
            left='0'
            width='calc(100% + 4px)'
            zIndex={9}
          >
            <CustomToast
              message='The transcription has changed. Do you want to update the translation?'
              loading={loading}
              type='Dismiss'
              onUpdate={updateTranslation}
              onClose={handleDismiss}
            />
          </Box>
        )}
      <Box
        position='relative'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        height='52px'
        p='0px 12px 0px 20px'
      >
        {type === 'Transcription' ? (
          <Box display='flex' height={32} alignItems='center' marginLeft='3px'>
            <LanguageIcon sx={{ color: '#45464F', fontSize: 18 }} />
            <Typography
              color='#45464F'
              fontWeight='500'
              variant='body2'
              sx={{ ml: 1 }}
            >
              {project.transcriptionLanguge}
            </Typography>
            {isDebugMode && (
              <Typography
                color='black'
                fontWeight='bold'
                variant='body2'
                sx={{
                  ml: 1,
                  backgroundColor: 'white',
                  padding: '10px',
                  borderRadius: '5px', // Rounded corners for the background box
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Optional: a slight shadow to give the box some depth
                }}
              >
                Updated Date: {formattedDate}
              </Typography>
            )}
          </Box>
        ) : (
          <>
            <Select
              disableUnderline
              disabled={type === isEdit}
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
              label={(value?: string) =>
                translationVariants.filter(lang => lang.code === value)[0]
                  ?.label || 'Select target language'
              }
              labelIcon={
                <SvgIcon sx={{ fontSize: 18 }}>
                  <LanguageIcon sx={{ color: '#45464F' }} />
                </SvgIcon>
              }
            />
            {isDebugMode && (
              <Typography
                color='black'
                fontWeight='bold'
                variant='body2'
                sx={{
                  ml: 1,
                  backgroundColor: 'white',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid black', // Added a border for clarity
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                Updated Date: {formattedDateTranslate}
              </Typography>
            )}
          </>
        )}
        <Box display='flex' alignItems='center' gap='4px' p='0px 12px 0px 20px'>
          <LightTooltip placement='bottom' title='Edit'>
            <span>
              <IconButton
                ref={btnEditRef}
                color={type === 'Transcription' ? 'primary' : 'secondary'}
                disabled={isDisabledEdit('edit') || !canEdit}
                sx={{
                  background: isEdit
                    ? type === 'Transcription'
                      ? 'rgba(58, 74, 222, 0.12)'
                      : 'rgba(131, 42, 208, 0.12)'
                    : '',
                }}
                onClick={handleEdit}
              >
                <EditIcon
                  color={type === 'Transcription' ? 'primary' : 'secondary'}
                />
              </IconButton>
            </span>
          </LightTooltip>
          {/* New Upload Button */}
          {type === 'Translation' && (
            <LightTooltip placement='bottom' title='Import Translation'>
              <span>
                <IconButton
                  color='primary'
                  disabled={isDisabledEdit('export') || !canEdit}
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
                      } // Reset the input value on click
                    />
                  )}
                  <PostIcon color='secondary' />
                </IconButton>
              </span>
            </LightTooltip>
          )}
          <LightTooltip placement='bottom' title='Download'>
            <span>
              <IconButton
                ref={btnExportRef}
                color={type === 'Transcription' ? 'primary' : 'secondary'}
                disabled={isDisabledEdit('export')}
                onClick={handleExport}
              >
                <SaveAltIcon
                  color={type === 'Transcription' ? 'primary' : 'secondary'}
                />
              </IconButton>
            </span>
          </LightTooltip>
        </Box>
        {isExport && (
          <ExportModal
            open={isExport}
            type={type}
            handleClose={() => setIsExport(false)}
          />
        )}
        {(isEdit === type || loading) && showTranslationToast === false && (
          <EditTool
            type={type}
            loading={loading}
            onCancel={handleEditCancel}
            onSave={handleEditSave}
          />
        )}
        {showWarnModal && (
          <WarnMsgModal
            open={showWarnModal}
            type='Transcription'
            onContinue={handleEdit}
            onBack={handleBack}
          />
        )}
        {isUploadModalOpen && (
          <UploadConfirmationModal
            errorMessage={errorMessage}
            isOpen={isUploadModalOpen}
            onClose={closeUploadModal}
            onConfirmUpload={handleConfirmUpload}
          />
        )}
      </Box>
    </Box>
  );
};
