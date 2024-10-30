import React from 'react';

import { SpinnerWrapper, Circle } from './spinner.styled';
import { SpinnerProps } from './spinner.types';

export const Spinner = ({ spinnerWrapperProps, circleProps }: SpinnerProps) => {
  return (
    <SpinnerWrapper {...spinnerWrapperProps}>
      <Circle {...circleProps} />
    </SpinnerWrapper>
  );
}
