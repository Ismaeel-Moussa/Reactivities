import {
    type ReactNode,
    useState,
    useMemo,
    useCallback,
    useEffect,
} from 'react';
import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from '@mui/material/styles';
import { ThemeContext } from './ThemeContext';

const getInitialMode = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
        const savedMode = localStorage.getItem('themeMode');
        if (savedMode === 'light' || savedMode === 'dark') {
            return savedMode;
        }

        // Check user's OS preference
        const userPrefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        return userPrefersDark ? 'dark' : 'light';
    }
    return 'light';
};

type Props = {
    children: ReactNode;
};

export default function AppThemeProvider({ children }: Props) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // Initialize mode from localStorage/system preference on mount
    useEffect(() => {
        setMode(getInitialMode());
        setMounted(true);
    }, []);

    // Save theme preference to localStorage
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('themeMode', mode);
        }
    }, [mode, mounted]);

    // Listen for system theme changes
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            // Only auto-switch if user hasn't manually set a preference
            const savedMode = localStorage.getItem('themeMode');
            if (!savedMode) {
                setMode(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleMode = useCallback(() => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }, []);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                              primary: { main: '#28969cff' },
                              background: { default: '#eee' },
                          }
                        : {
                              primary: { main: '#28969cff' },
                              background: { default: '#121212' },
                          }),
                },
            }),
        [mode]
    );

    const contextValue = useMemo(
        () => ({ mode, toggleMode }),
        [mode, toggleMode]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
