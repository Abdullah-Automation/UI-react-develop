import { SelectProps as MuiSelectProps } from '@mui/material';
import { ReactNode } from 'react';

export type SelectProps = {
  labelIcon?: ReactNode;
  label?: (value?: string) => string;
  options: SelectOptions[];
} & Omit<MuiSelectProps, 'renderValue' | 'label'>;

export type SelectOptions = {
  name: string;
  value: string;
  disabled?: boolean;
  hasDivider?: boolean;
  icon?: boolean;
  onClick?: any;
};
