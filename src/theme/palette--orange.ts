import { Palette } from '@mui/material/styles/createPalette';
import { defaultTheme } from './defaultTheme';

export const light: Palette = {
  ...defaultTheme.palette,
  alternate: {
    main: '#f7f9fc',
    dark: '#edf1f7',
  },
  cardShadow: 'rgba(23, 70, 161, .11)',
  mode: 'light',
  paletteType: 'orange',
  primary: {
    main: '#f57c00',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#fff',
  },
  secondary: {
    main: '#00AB55',
    light: '#33CC70',
    dark: '#009357',
    contrastText: '#fff',
  },
  text: {
    primary: '#2d3748',
    secondary: '#646e73',
    disabled: defaultTheme.palette.text.disabled,
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#fff',
    default: '#fff',
    level3: '#f6f6f6',
    level2: '#f5f5f5',
    level1: '#fff',
  },
};

export const dark: Palette = {
  ...defaultTheme.palette,
  alternate: {
    main: '#1a2138',
    dark: '#151a30',
  },
  cardShadow: 'rgba(0, 0, 0, .11)',
  common: {
    black: '#000',
    white: '#fff',
  },
  mode: 'dark',
  paletteType: 'orange',
  primary: {
    main: '#f57c00',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#fff',
  },
  secondary: {
    main: '#00AB55',
    light: '#33CC70',
    dark: '#009357',
    contrastText: '#fff',
  },
  text: {
    primary: '#EEEEEF',
    secondary: '#AEB0B4',
    disabled: defaultTheme.palette.text.disabled,
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#222B45',
    default: '#222B45',
    level3: '#444',
    level2: '#333',
    level1: '#2D3748',
  },
};
