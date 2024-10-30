import React from 'react';
import { Box, Dialog, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

import { Button } from '~/components/ui';

import { ModalContent, ModalFooter, ModalTitle } from '../DeleteProjectModal';

interface UploadConfirmationModalProps {
  isOpen: boolean;
  errorMessage: string;
  onClose: () => void;
  onConfirmUpload: () => void;
}

export const UploadConfirmationModal: React.FC<
  UploadConfirmationModalProps
  // eslint-disable-next-line react/function-component-definition
> = ({ isOpen, onClose, onConfirmUpload, errorMessage }) => {
  return (
    <Dialog fullWidth maxWidth='xs' onClose={onClose} open={isOpen}>
      <ModalTitle onClose={onClose}>
        <Box>
          <Typography variant='h4'>Import Translation</Typography>
        </Box>
        {errorMessage && (
          <Box display='flex' alignItems='center' color='error.main' mt={2}>
            <ErrorIcon />{' '}
            <strong>
              There was an issue in uploading your JSON file: {errorMessage}
            </strong>
          </Box>
        )}
      </ModalTitle>
      <ModalContent>
        <Typography variant='body2'>
          You now have the option to import a translation JSON file to the
          editor. The "Translation Json" export file needs to be used NOT the
          "Segment Timings Json file". Please make sure you read the
          instructions below and follow these steps properly.
          <br />
          <br />
          <ol>
            <li>Download the JSON file in the translation editor.</li>
            <li>
              Open the file locally on your computer and update ONLY the "text"
              field in the JSON file.
            </li>
            <li>
              Do not add any new segments or adjust the "start/end" time field.
            </li>
          </ol>
          <br />
          NOTE: Use the imported translation JSON file with your edits this file
          will OVERWRITE the current translation in the editor.
        </Typography>
      </ModalContent>

      <ModalFooter>
        <Box display='flex' flexDirection='column' gap='10px' width='100%'>
          <Button
            color='secondary'
            variant='contained'
            onClick={onConfirmUpload}
          >
            Yes, I am using the JSON
          </Button>

          <Button color='secondary' variant='outlined' onClick={onClose}>
            No, go back and download the JSON
          </Button>
        </Box>
      </ModalFooter>
    </Dialog>
  );
};
