import {
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
  alpha,
} from '@mui/material';

import { lightModeColors } from './colors';

const primaryColor = lightModeColors.blue;
const secondaryColor = lightModeColors.purple;
// const neutralColor = lightModeColors.black30;

export default {
  defaultProps: {
    color: 'primary',
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      // width: '32px',
      // height: '32px',
      // fontSize: 24,
      borderRadius: 8,
      '&:disabled': {
        opacity: 0.38,
        svg: {
          color: `${lightModeColors.black10} !important`,
        },
      },
    },
  },
  
  variants: [
    // size
    {
      props: { size: 'medium' },
      style: {
        padding: '4px',
        width: '32px',
        height: '32px',
        alignItems:'center',
        justifyContent:'center'
      },
    },
    {
      props: { size: 'small' },
      style: {
        padding: '4px',
        width: '24px',
        height: '24px',
        alignItems:'center',
        justifyContent:'center',
      },
    },
    
    // theme
    {
      props: { color: 'primary' },
      style: {
        '&:hover': {
          backgroundColor: alpha(primaryColor, 0.08),
        },
        '&:focus': {
          backgroundColor: alpha(primaryColor, 0.12),
        },
        '&:active': {
          backgroundColor: alpha(primaryColor, 0.12),
        },
      },
    },
    {
      props: { color: 'secondary' },
      style: {
        '&:hover': {
          backgroundColor: alpha(secondaryColor, 0.08),
        },
        '&:focus': {
          backgroundColor: alpha(secondaryColor, 0.12),
        },
        '&:active': {
          backgroundColor: alpha(secondaryColor, 0.12),
        },
      },
    },
    {
      props: { color: 'neutral' },
      style: {
        '&[aria-modal="true"]': {
          backgroundColor: '#F1F1F1',
        },
        '&:hover': {
          backgroundColor: '#F1F1F1',
        },
        '&:focus': {
          backgroundColor: '#E8E8E9',
        },
        '&:active': {
          backgroundColor: '#E8E8E9',
        },
      },
    },
    {
      props: { color: 'dark' },
      style: {
        color: '#FFFFFF',
        backgroundColor: '#1B1B1F',
        '&:hover': {
          backgroundColor: '#1B1B1F',
        },
        '&:focus': {
          backgroundColor: '#832AD0',
        },
        '&:active': {
          backgroundColor: '#832AD0',
        },
      },
    },
    {
      props: { color: 'tertiary' },
      style: {
        '&:hover': {
          backgroundColor: '#36DECF14',
        },
        '&:focus': {
          backgroundColor: '#36DECF1F',
        },
        '&:active': {
          backgroundColor: '#36DECF1F',
        },
      },
    },
  ],
} as {
  defaultProps?: ComponentsProps['MuiIconButton'];
  styleOverrides?: ComponentsOverrides<unknown>['MuiIconButton'];
  variants?: ComponentsVariants['MuiIconButton'];
};
