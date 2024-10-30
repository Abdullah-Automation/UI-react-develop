import React, { useState } from 'react';

type ToastDirection = 'center' | 'left' | 'right';

type ToastState = {
  type: ToastTypes;
  message: React.ReactNode;
  direction?: ToastDirection;
};

export type UseProvideToastType = {
  toast: ToastState | null;
  showErrorToast: (
    message?: React.ReactNode,
    direction?: ToastDirection
  ) => void;
  showSuccessToast: (
    message?: React.ReactNode,
    direction?: ToastDirection
  ) => void;
  showInfoToast: (message: React.ReactNode, direction?: ToastDirection) => void;
  showWarningToast: (
    message: React.ReactNode,
    direction?: ToastDirection
  ) => void;
};

export type ToastTypes = 'error' | 'success' | 'info' | 'warning';

export const useProvideToast = (): UseProvideToastType => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showErrorToast = (
    message?: React.ReactNode,
    direction?: ToastDirection
  ): void => {
    setToast({
      type: 'error',
      message: message || 'Error',
      direction,
    });
  };

  const showSuccessToast = (
    message?: React.ReactNode,
    direction?: ToastDirection
  ): void => {
    setToast({
      type: 'success',
      message: message || 'Success!',
      direction,
    });
  };

  const showInfoToast = (
    message: React.ReactNode,
    direction?: ToastDirection
  ): void => {
    setToast({
      type: 'info',
      message,
      direction,
    });
  };

  const showWarningToast = (
    message: React.ReactNode,
    direction?: ToastDirection
  ): void => {
    setToast({
      type: 'warning',
      message,
      direction,
    });
  };

  return {
    toast,
    showErrorToast,
    showSuccessToast,
    showInfoToast,
    showWarningToast,
  };
};
