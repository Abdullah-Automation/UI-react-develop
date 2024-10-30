import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ProjectsApi, CollaborationsApi } from '~/api';
import { Button } from '~/components/ui';
import { useToast } from '~/context';

interface DialogTitleProps {
  children?: React.ReactNode;
  isLargeSpacing?: boolean;
  onClose?: () => void;
}

export const ModalTitle = (props: DialogTitleProps) => {
  const { children, onClose, isLargeSpacing = false, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 3, pb: isLargeSpacing ? 3 : 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          color='neutral'
          sx={{
            position: 'absolute',
            right: isLargeSpacing ? 20 : 10,
            top: 22,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface IDeleteProjectModalProps {
  open: boolean;
  type: string;
  deleteProjectName: string;
  deleteProjectId: string;
  onClose: () => void;
  onDelete: (type: string) => void;
}

export const DeleteProjectModal = ({
  open,
  type,
  deleteProjectName,
  deleteProjectId,
  onClose,
  onDelete,
}: IDeleteProjectModalProps) => {
  const { showSuccessToast, showErrorToast } = useToast();

  const { mutate: deleteProject, isLoading: loading } = useMutation(
    () => ProjectsApi.updateProject(deleteProjectId, { isDeleted: true }),
    {
      onSuccess: () => {
        showSuccessToast('Project deleted successfully!');
        onDelete(type);
      },
      onError: (e: any) => {
        showErrorToast(
          e.response.data.message ||
            'Something went wrong to delete the project. Please try again.'
        );
        onDelete(type);
      },
    }
  );

  const { mutate: deleteSharedProject, isLoading } = useMutation(
    async () =>
      CollaborationsApi.deleteSharedProject({
        projectId: deleteProjectId,
      }),
    {
      onSuccess: () => {
        showSuccessToast('Project deleted successfully!');
        onDelete(type);
      },
      onError: (e: any) => {
        showErrorToast(
          e.response.data.message ||
            'Something went wrong to delete the project. Please try again.'
        );
        onDelete(type);
      },
    }
  );

  const handleDelete = () => {
    if (type === 'shared') {
      deleteSharedProject();
    } else {
      deleteProject();
    }
  };

  return (
    <Dialog fullWidth maxWidth='xs' onClose={() => {}} open={open}>
      <ModalTitle>
        <HeaderWrapper onClick={() => {}}>
          <Typography variant='h4' color='#1B1B1F'>
            Delete Project
          </Typography>
        </HeaderWrapper>
      </ModalTitle>
      <ModalContent>
        <Box>
          <Typography
            variant='body2'
            color='#45464F'
          >{`Are you sure you want to delete "${deleteProjectName}" ?`}</Typography>
        </Box>
      </ModalContent>
      <ModalFooter>
        <Button variant='text' color='error' onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant='text'
          color='error'
          loading={isLoading || loading}
          sx={{ width: '74px' }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </ModalFooter>
    </Dialog>
  );
};

export const HeaderWrapper = styled(Box)`
  display: flex;
  align-items: center;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`;

export const ModalContent = styled(DialogContent)`
  padding: 16px 24px;
  border-bottom: 1px solid #cac4d0;
`;

export const ModalFooter = styled(DialogActions)<{
  justifycontent?: string;
  divider?: string;
}>(({ justifycontent = 'flex-end', divider = 'false' }) => ({
  padding: '24px',
  justifyContent: justifycontent,
  borderTop: divider === 'true' ? '1px solid #CAC4D0' : '0',
}));
