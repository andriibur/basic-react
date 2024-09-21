import { createContext, useState, useCallback, useMemo } from 'react';

export const ThemeContext = createContext('light');

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark')

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
