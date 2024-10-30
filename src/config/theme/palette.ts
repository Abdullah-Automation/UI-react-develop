import { lightModeColors } from './colors';

export const themePalette = () => {
  return {
    primary: {
      light: lightModeColors.blue90,
      main: lightModeColors.blue,
      dark: lightModeColors.blue10,
      contrastText: lightModeColors.white,
    },
    secondary: {
      light: lightModeColors.purple90,
      main: lightModeColors.purple,
      dark: lightModeColors.purple10,
      contrastText: lightModeColors.white,
    },
    error: {
      light: lightModeColors.red90,
      main: lightModeColors.red,
      dark: lightModeColors.red10,
      contrastText: lightModeColors.white,
    },
    info: {
      light: lightModeColors.cyan10,
      main: lightModeColors.cyan,
      dark: lightModeColors.cyan90,
      contrastText: lightModeColors.black,
    },
    neutral: {
      light: lightModeColors.white90,
      main: lightModeColors.black30,
      dark: lightModeColors.black50,
      contrastText: lightModeColors.white,
    },
    tertiary: {
      light: lightModeColors.white90,
      main: lightModeColors.green50,
      dark: lightModeColors.black50,
      contrastText: lightModeColors.white,
    },
    dark: {
      main: 'rgba(0, 0, 0, 0.6)',
    },
  };
};
