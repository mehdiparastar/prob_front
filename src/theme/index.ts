import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { themeMode, themePaletteType } from "../withLayout";
import palette from "./palette";
import shadows from "./shadows";

// create a fonts.d.ts file and add the following to it
// declare module '*.woff';
// declare module '*.woff2';
import BeautyDemoWoff from '../assets/fonts/BeautyDemo.woff';
import IransansXBoldWoff from '../assets/fonts/IRANSansX-Bold.woff';
import IransansXBoldWoff2 from '../assets/fonts/IRANSansX-Bold.woff2';
import IransansXWoff from '../assets/fonts/IRANSansX-Regular.woff';
import IransansXWoff2 from '../assets/fonts/IRANSansX-Regular.woff2';
import TheBlacklistWoff from '../assets/fonts/TheBlacklist.woff';

const getTheme = (mode: themeMode, paletteType: themePaletteType) =>
    responsiveFontSizes(
        createTheme({
            palette: palette(mode, paletteType),
            layout: {
                contentWidth: 1236,
            },
            shadows: shadows(mode),
            typography: {
                fontFamily: '"Inter", sans-serif',
                button: {
                    textTransform: 'none',
                    fontWeight: 'medium',
                },
            },
            zIndex: {
                appBar: 1200,
                drawer: 1300,
            },
            components: {
                MuiCssBaseline: {
                    styleOverrides(theme) {
                        return `
                @font-face {
                  font-family: 'IRANSansX';
                  font-style: normal;
                  font-weight: 400;
                  src: url(${IransansXWoff}) format('woff'), url(${IransansXWoff2}) format('woff2');
                }
  
                @font-face {
                  font-family: 'IRANSansX';
                  font-style: normal;
                  font-weight: 700;
                  src: url(${IransansXBoldWoff}) format('woff'), url(${IransansXBoldWoff2}) format('woff2');
                }
  
                @font-face {
                  font-family: 'TheBlacklist';
                  font-style: normal;
                  font-weight: 400;
                  src: url(${TheBlacklistWoff}) format('woff');
                }
  
                @font-face {
                  font-family: 'BeautyDemo';
                  font-style: normal;
                  font-weight: 400;
                  src: url(${BeautyDemoWoff}) format('woff');
                }
  
                ::-webkit-scrollbar {
                  width: 2px;
                  height: 2px;
                  background-color: #aaa;
                }
  
                ::-webkit-scrollbar-thumb {
                  background: ${theme.palette.primary.light};
                }              
              `;
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        containedSecondary: mode === 'light' ? { color: 'white' } : {},
                    },
                },
                MuiIconButton: {
                    defaultProps: {
                        sx: { color: 'inherit' },
                    },
                },
                MuiListItemIcon: {
                    defaultProps: {
                        sx: { color: 'inherit' },
                    },
                },
            },
        }),
    );

export default getTheme;
