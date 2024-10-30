import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { SelectSourceLangModal } from '~/components/domain/SelectSourceLangModal';
import { SvgImage } from '~/components/ui';
import { ALLOWED_AUDIO_FILE_TYPES, ALLOWED_VIDEO_FILE_TYPES } from '~/config';
import { validateFileDuration, validateFileSize } from '~/utils/helpers';
import { useToast } from '~/context';

interface IUploadSection {
  isManualUpload: boolean;
  handleFiles: (files: File[]) => void;
  handleManualUpload: (isManual: boolean) => void;
}

export const UploadSection = ({
  handleFiles,
  handleManualUpload,
  isManualUpload = false,
}: IUploadSection) => {
  const { showErrorToast } = useToast();
  const [showLangModal, setShowLangModal] = useState<boolean>(false);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'video/*': ALLOWED_VIDEO_FILE_TYPES,
      'audio/*': ALLOWED_AUDIO_FILE_TYPES,
    },
    onFileDialogCancel: () => {
      handleManualUpload(false);
    },
  });

  // @ts-ignore
  const { ref, ...rootProps } = getRootProps();

  useEffect(() => {
    const checkFileSizeAndDuration = async () => {
      if (acceptedFiles.length > 0) {
        const isSizeValidated = validateFileSize(acceptedFiles);
        const isDurationValidated = await validateFileDuration(acceptedFiles);

        if (!isSizeValidated) {
          showErrorToast('Error: File size should not exceed 1.5 GB.', 'right');
        }

        if (!isDurationValidated) {
          showErrorToast(
            'Error: File duration should not exceed 3 hours.',
            'right'
          );
        }

        if (isSizeValidated && isDurationValidated) {
          setShowLangModal(true);
        }
      }
    };

    checkFileSizeAndDuration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  useEffect(() => {
    if (isManualUpload) {
      if (ref?.current) {
        ref?.current.click();
      }
    }
  }, [isManualUpload, ref]);

  const handleFileSelect = () => {
    setShowLangModal(false);
    handleFiles(acceptedFiles);
  };

  const handleCloseSourceLangModal = () => {
    setShowLangModal(false);
    handleManualUpload(false);
  };

  return (
    <Wrapper
      {...getRootProps({
        isfocused: isFocused ? 'true' : 'false',
        isdragaccept: isDragAccept ? 'true' : 'false',
        isdragreject: isDragReject ? 'true' : 'false',
      })}
    >
      <input {...getInputProps()} />
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap={0.5}
        sx={{ padding: '40px 0' }}
      >
        <Box>
          <SvgImage name='FileIcon' width={21.33} height={21.33} />
          <Typography
            variant='subtitle1'
            sx={{ color: '#1B1B1F', display: 'block', mt: '10px' }}
          >
            Click to upload
          </Typography>
          <Typography variant='body2' sx={{ color: '#45464F' }}>
            or drag and drop a video/audio file to start
          </Typography>
          <Typography
            variant='subtitle1'
            fontWeight={400}
            sx={{ color: '#45464F' }}
          >
            (Max file size: 1.5 GB)
          </Typography>
        </Box>
      </Box>
      {showLangModal && (
        <SelectSourceLangModal
          onContinue={handleFileSelect}
          handleClose={handleCloseSourceLangModal}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{
  isfocused: string;
  isdragaccept: string;
  isdragreject: string;
  // @ts-ignore
}>(({ isfocused, isdragaccept, isdragreject }) => ({
  border: isdragreject === 'true' ? '1px dashed #C4441C' : '1px dashed #C4C5D0',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 16px',
  textAlign: 'center',
  marginTop: '89px',
  marginBottom: '40px',
  '&:hover': {
    cursor: 'pointer',
    background: 'rgba(196, 197, 208, 0.08)',
  },
}));
