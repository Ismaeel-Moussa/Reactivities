import { createContext, useContext } from 'react';

// Define the shape of the context data
export interface ThemeContextType {
    mode: 'light' | 'dark';
    toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleMode: () => {
        console.error('toggleMode function called without a ThemeProvider');
    },
});

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
