import React, { useContext, createContext, useEffect } from 'react';
import {
  SnackbarKey,
  SnackbarProvider,
  useSnackbar,
  MaterialDesignContent,
} from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, styled } from '@mui/material';

import { useProvideToast, UseProvideToastType } from '~/utils/hooks';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 3px 0px #0000004D, 0px 6px 10px 4px #00000026',
    borderRadius: '4px',
    paddingRight: 0,
    border: '1px solid #E0E1EC',
    color: '#1B1B1F',
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: '#1B1B1F',
    color: '#FFFFFF',
    boxShadow: '0px 2px 3px 0px #0000004D, 0px 6px 10px 4px #00000026',
    borderRadius: '4px',
    paddingRight: 0,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#C4441C',
    color: '#FFFFFF',
    boxShadow: '0px 2px 3px 0px #0000004D, 0px 6px 10px 4px #00000026',
    borderRadius: '4px',
  },
}));

const toastContext = createContext<UseProvideToastType>(
  {} as UseProvideToastType
);

export const useToast = (): UseProvideToastType => useContext(toastContext);

const CLOSE_CALL_DOWN = 6000;

interface IToastProviderInner {
  children: any;
}

const ToastProviderInner: React.FC<IToastProviderInner> = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const toastProvider = useProvideToast();
  const { toast } = toastProvider;

  const action = (key: SnackbarKey): JSX.Element => {
    setTimeout(() => {
      closeSnackbar(key);
    }, CLOSE_CALL_DOWN);

    return (
      <CloseIcon
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          right: '0px',
          top: '50%',
          color:
            toast?.type === 'info' || toast?.type === 'error'
              ? '#fff'
              : '#1B1B1F',
          transform: 'translateY(-50%)',
          fontSize: '20px',
        }}
        onClick={(): void => {
          closeSnackbar(key);
        }}
      />
    );
  };

  useEffect(() => {
    if (toast) {
      enqueueSnackbar(
        <Box position='relative'>
          <Typography
            variant='subtitle2'
            sx={{
              maxWidth: toast?.type === 'info' ? '560px' : '420px',
              width: 'auto',
              paddingRight: '32px',
            }}
          >
            {toast.message}
          </Typography>
        </Box>,
        {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal:
              toast?.direction ??
              (toast?.type === 'info' || toast?.type === 'error')
                ? 'center'
                : 'right',
          },
          persist: true,
          autoHideDuration: CLOSE_CALL_DOWN,
          variant: toast.type,
          action,
        }
      );
    }
  }, [toast]);

  return (
    <toastContext.Provider value={toastProvider}>
      {children}
    </toastContext.Provider>
  );
};

export const ToastAlertProvider: React.FC<IToastProviderInner> = ({
  children,
}) => (
  <SnackbarProvider
    maxSnack={5}
    hideIconVariant
    style={{ width: '100%', minWidth: 'auto' }}
    Components={{
      success: StyledMaterialDesignContent,
      error: StyledMaterialDesignContent,
      info: StyledMaterialDesignContent,
    }}
  >
    <ToastProviderInner>{children}</ToastProviderInner>
  </SnackbarProvider>
);
