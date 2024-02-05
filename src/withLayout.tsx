import { FC, createContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { paletteTypes } from "./theme/paletteTypes";
import getTheme from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";


export type themePaletteType = 'green' | 'blue' | 'indigo' | 'pink' | 'orange';
export type themeMode = 'light' | 'dark';


export const ThemeContext = createContext({
    themeMode: {
        toggleThemeMode: () => { },
    },
    themePaletteType: {
        changeThemePaletteType: (type: themePaletteType) => { },
    },
})

export const WithLayout: FC<Props> = ({ children }) => {
    const [cookies, setCookie] = useCookies<string, { 'theme-mode': themeMode, 'theme-pallete-type': themePaletteType }>(['theme-mode', 'theme-pallete-type']);

    const [mode, setMode] = useState<themeMode>(cookies['theme-mode'] || 'dark');
    const [palleteType, setPaletteType] = useState<themePaletteType>(cookies['theme-pallete-type'] || paletteTypes[0]);

    const themeMode = useMemo(() => {
        // Remove the server-side injected CSS.
        const jssStyles: HTMLInputElement | null =
            document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }

        return {
            toggleThemeMode: () => {
                setCookie('theme-mode', mode === 'light' ? 'dark' : 'light')
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        };
    }, [mode, setCookie]);

    const themePaletteType = useMemo(
        () => ({
            changeThemePaletteType: (type: themePaletteType = 'green') => {
                const palette: themePaletteType =
                    paletteTypes.indexOf(type) === -1 ? 'green' : type;

                setCookie('theme-pallete-type', palette)
                setPaletteType(palette);
            },
        }),
        [setCookie],
    );

    const theme = useMemo(() => {
        return getTheme(
            mode,
            palleteType,
        );
    }, [
        mode,
        palleteType,
    ]);


    return (
        <ThemeContext.Provider value={{ themeMode, themePaletteType }}>
            <ThemeProvider theme={theme}>
                <CssBaseline /*enableColorScheme => enabling this makes oauth2 ugly*/ />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}