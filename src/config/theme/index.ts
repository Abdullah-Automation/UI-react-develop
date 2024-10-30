import '@mui/material/styles/createPalette';

import { alpha } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';

import { themePalette } from './palette';
import { themeTypography } from './typography';
import { lightModeColors } from './colors';
import iconButton from './iconButton';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    dark: Palette['primary'];
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    dark?: PaletteOptions['primary'];
    tertiary?: Palette['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    tertiary: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    neutral: true;
    tertiary: true;
    dark: true;
  }
}

const focusedColor = alpha(lightModeColors.black30, 0.12);
const hoveredColor = alpha(lightModeColors.black30, 0.08);

const themeOptions: ThemeOptions = {
  palette: themePalette(),
  // @ts-ignore
  typography: themeTypography(),
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: 0,
          margin: 0,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          borderRadius: 4,
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: '0.004em',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          background: '#fff',
        },
        root: {
          width: 'auto',
          height: 'auto',
          overflow: 'visible',
          padding: 0,
        },
        switchBase: {
          background: '#fff',
          transition: 'all ease-in-out 375ms',
          width: 20,
          height: 20,
          padding: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          transformOrigin: 'center',
          '&:hover': {
            background: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: alpha(lightModeColors.black50, 0.8),
            },
          },
          '&.Mui-checked': {
            background: '#fff',
            left: 'unset',
            right: 0,
            transform: 'translateY(-50%)',
            '&:hover': {
              background: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: alpha(lightModeColors.purple, 0.8),
              },
            },
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: lightModeColors.purple,
              '&:hover': {
                backgroundColor: alpha(lightModeColors.purple, 0.8),
              },
            },
          },
        },
        track: {
          transition: 'all ease-in-out 0.365s',
          width: 42,
          height: 16,
          opacity: 1,
          backgroundColor: lightModeColors.black50,
          borderRadius: 8,
          '&:hover': {
            backgroundColor: alpha(lightModeColors.black50, 0.8),
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginTop: '6px',
          marginBlock: '6px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        // Target the indicator specifically
        indicator: {
          display: 'none', // Hide the indicator
        },
      },
    },
    MuiTab:{
      defaultProps: {
        disableRipple: true,
        color: 'neutral',
      },
      styleOverrides: {
        // Target the selected state
        root: {
          textTransform: "none",
          '&:hover': {
            color: lightModeColors.black10, // Change color for selected state
            backgroundColor: 'transparent', // Ensure background is transparent or matches your design
          },
          '&.Mui-selected': {
            color: lightModeColors.black10, // Change color for selected state
            backgroundColor: 'transparent', // Ensure background is transparent or matches your design
          },
        },
      },
    },
    MuiSelect: {
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            borderRadius:'8px !important',
            border: 0,
            boxShadow: 'none',
            background: 'transparent',
            '&:has(.MuiSelect-icon)': {
              background: 'transparent',
            },
            '&:has(.MuiSelect-iconOpen)': {
              background: focusedColor,
            },
            '&:hover': {
              background: hoveredColor,
            },
            '&:focus': {
              background: focusedColor,
            },
          },
        },
        {
          props: { variant: 'filled', color: 'secondary' },
          style: {
            border: 0,
            boxShadow: 'none',
            background: 'transparent',
            '&:has(.MuiSelect-icon)': {
              background: 'transparent',
            },
            '&:has(.MuiSelect-iconOpen)': {
              background: 'transparent',
            },
            '&:hover': {
              background: 'transparent',
            },
            '&:focus': {
              background: 'transparent',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            background: 'white',
            border: '1px solid #C4C5D0 !important',
            '.MuiOutlinedInput-notchedOutline': {
              border: '0 !important',
            },
            input: {
              border: 0,
            },
            '&:has(.MuiSelect-iconOpen)': {
              background: 'white',
              border: '1px solid #832AD0 !important',
            },
            '&:has(.MuiSelect-icon)': {
              background: 'white',
              border: '1px solid #C4C5D0',
            },
            '&:hover': {
              border: '1px solid #C4C5D0 !important',
            },
            '&.Mui-disabled': {
              background: 'rgba(116, 117, 126, 0.08)',
              border: '1px solid #74757E1F !important',
              '&:hover': {
                border: '1px solid #74757E1F !important',
              },
            },
          },
        },
      ],
      styleOverrides: {
        select: {
          paddingLeft: '8px',
          '.MuiSelect-root': {
            background: 'transparent',
          },
          '&:focus': {
            background: 'transparent',
          },
          '&:active': {
            background: 'transparent',
          },
          '&:hover': {
            background: 'transparent',
          },
        },
        filled: {
          background: 'transparent',
          border: '0 !important',
          boxShadow: 'none',
          borderBottom: '0',
        },
        outlined: {
          border: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          '&:disabled': {
            color: '#1B1B1F',
            opacity: '0.38',
          },
        },
      },
      variants: [
        // Size
        {
          props: { size: 'medium' },
          style: {
            padding: '6px 12px',
            height: '36px',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
          },
        },
        {
          props: { size: 'small' },
          style: {
            padding: '6px 12px',
            height: '32px',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            minWidth: 'auto',
          },
        },
        // Disabled
        {
          props: { variant: 'contained' },
          style: {
            '&:disabled': {
              background: 'rgba(27, 27, 31, 0.12)',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            '&:disabled': {
              border: '1px solid rgba(27, 27, 31, 0.12)',
            },
          },
        },
        // Primary
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            '&:hover': {
              backgroundColor: '#2536C4',
              // boxShadow:
              //   '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            },
            '&:focus': {
              backgroundColor: '#2536C4',
            },
            '&:active': {
              backgroundColor: '#3A4ADE',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            border: '1px solid #C4C5D0',
            '&:hover': {
              border: '1px solid #3A4ADE',
              background: 'rgba(58, 74, 222, 0.08)',
              color: '#3A4ADE',
            },
            '&:focus': {
              border: '1px solid #3A4ADE',
              background: 'rgba(58, 74, 222, 0.12)',
            },
            '&:active': {
              background: 'rgba(58, 74, 222, 0.12)',
              border: '1px solid #3A4ADE',
            },
          },
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            '&:hover': {
              background: 'rgba(58, 74, 222, 0.08)',
            },
            '&:focus': {
              background: 'rgba(58, 74, 222, 0.12)',
            },
            '&:active': {
              background: 'rgba(58, 74, 222, 0.12)',
            },
          },
        },
        // Secondary
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            '&:hover': {
              backgroundColor: '#6D1EB2',
              // boxShadow:
              //   '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            },
            '&:focus': {
              backgroundColor: '#6D1EB2',
            },
            '&:active': {
              backgroundColor: '#832AD0',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            border: '1px solid #C4C5D0',
            '&:hover': {
              border: '1px solid #832AD0',
              background: 'rgba(131, 42, 208, 0.08)',
            },
            '&:focus': {
              border: '1px solid #832AD0',
              background: 'rgba(131, 42, 208, 0.12)',
            },
            '&:active': {
              background: 'rgba(131, 42, 208, 0.12)',
              border: '1px solid #832AD0',
            },
          },
        },
        {
          props: { variant: 'text', color: 'secondary' },
          style: {
            '&:hover': {
              background: 'rgba(131, 42, 208, 0.08)',
            },
            '&:focus': {
              background: 'rgba(131, 42, 208, 0.12)',
            },
            '&:active': {
              background: 'rgba(131, 42, 208, 0.12)',
            },
          },
        },
        // Neutral
        {
          props: { variant: 'contained', color: 'neutral' },
          style: {
            '&:hover': {
              backgroundColor: 'rgba(48, 48, 51, 1)',
              // boxShadow:
              //   '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            },
            '&:focus': {
              backgroundColor: 'rgba(48, 48, 51, 1)',
            },
            '&:active': {
              backgroundColor: 'rgba(69, 70, 79, 1)',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'neutral' },
          style: {
            border: '1px solid #C4C5D0',
            '&:hover': {
              border: `1px solid ${hoveredColor}`,
              backgroundColor: hoveredColor,
            },
            '&:focus': {
              border: `1px solid ${focusedColor}`,
              backgroundColor: focusedColor,
            },
            '&:active': {
              border: `1px solid ${focusedColor}`,
              backgroundColor: focusedColor,
            },
          },
        },
        {
          props: { variant: 'text', color: 'neutral' },
          style: {
            '&:hover': {
              background: hoveredColor,
            },
            '&:focus': {
              background: focusedColor,
            },
            '&:active': {
              background: focusedColor,
            },
          },
        },
        // Error
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            '&:hover': {
              backgroundColor: '#C4441C',
              boxShadow:
                '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            },
            '&:focus': {
              backgroundColor: '#C4441C',
            },
            '&:active': {
              backgroundColor: '#C4441C',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            border: '1px solid #C4C5D0',
            '&:hover': {
              border: '1px solid #C4441C',
              backgroundColor: 'rgba(196, 68, 28, 0.08)',
            },
            '&:focus': {
              border: '1px solid #C4441C',
              backgroundColor: 'rgba(196, 68, 28, 0.12)',
            },
            '&:active': {
              border: '1px solid #C4441C',
              backgroundColor: 'rgba(196, 68, 28, 0.12)',
            },
          },
        },
        {
          props: { variant: 'text', color: 'error' },
          style: {
            '&:hover': {
              background: 'rgba(196, 68, 28, 0.08)',
            },
            '&:focus': {
              background: 'rgba(196, 68, 28, 0.12)',
            },
            '&:active': {
              background: 'rgba(196, 68, 28, 0.12)',
            },
          },
        },
        // Tertiary
        {
          props: { variant: 'contained', color: 'tertiary' },
          style: {
            '&:hover': {
              backgroundColor: '#35978E',
              boxShadow:
                '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            },
            '&:focus': {
              backgroundColor: '#35978E',
            },
            '&:active': {
              backgroundColor: '#35978E',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'tertiary' },
          style: {
            border: '1px solid #C4C5D0',
            '&:hover': {
              border: `1px solid #2CBAAD`,
              backgroundColor: '#36DECF14',
            },
            '&:focus': {
              border: `1px solid #2CBAAD`,
              backgroundColor: '#36DECF14',
            },
            '&:active': {
              border: `1px solid #2CBAAD`,
              backgroundColor: '#36DECF14',
            },
          },
        },
        {
          props: { variant: 'text', color: 'tertiary' },
          style: {
            '&:hover': {
              background: '#36DECF14',
            },
            '&:focus': {
              background: '#36DECF1F',
            },
            '&:active': {
              background: '#36DECF1F',
            },
          },
        },
      ],
    },
    MuiIconButton: iconButton,
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          overflow: 'visible',
          maxHeight: 'none !important',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          top: '49px !important',
          position: 'sticky',
          zIndex: 1,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&[aria-selected="true"]': {
            backgroundColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: 'rgba(69, 70, 79, 0.08)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px !important',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '8px',
          borderRadius: '8px',
          color: 'rgba(27, 27, 31, 0.08) !important',
          '&:hover': {
            background: 'rgba(131, 42, 208, 0.08)',
          },
          '&.Mui-checked': {
            color: '#832AD0 !important',
          },
          '&.MuiCheckbox-indeterminate': {
            color: '#832AD0 !important',
          },
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        autoFocus: false,
      },
      styleOverrides: {
        root: {},
        paper: {
          borderRadius: 8,
          background: '#fff',
          border: '1px solid #E0E1EC',
          boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10);',
          marginTop: '0px',
          // '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15) !important',
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
      styleOverrides: {
        root: {
          borderRadius:'8px',
          padding: '6px 24px 6px 16px',
          background: 'transparent',
          '&&.Mui-selected': {
            backgroundColor: 'rgba(131, 42, 208, 0.08)',
          },
          '&:hover': {
            backgroundColor: 'rgba(69, 70, 79, 0.08)',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '4px 4px',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: '1px solid #C4C5D0',
        },
        root: {
          background: '#fff',
          border: '1px solid #C4C5D0',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&:hover': {
            border: '1px solid #3A4ADE',
          },
          '&:has(input:not(:placeholder-shown))': {
            border: '1px solid #3A4ADE',
          },
        },
        input: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            border: '1px solid #C4C5D0',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 0,
            },
            '&:hover': {
              border: '1px solid #832AD0',
            },
            '&:has(input:not(:placeholder-shown))': {
              border: '1px solid #832AD0',
            },
          },
        },
      ],
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#3A4ADE',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          paddingTop: 0,
          border: 0,
          paddingBottom: 0,
          backgroundColor: 'transparent',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.0025em',
          color: '#1B1B1F',
          height: '40px',
          borderRadius: '8px',
          border: 0,
          '&:hover': {
            border: 0,
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
