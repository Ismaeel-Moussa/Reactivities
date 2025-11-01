import { IconButton, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../lib/theme/ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';

export default function ThemeToggleButton() {
    const { toggleMode } = useTheme();
    const muiTheme = useMuiTheme();

    return (
        <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
            {muiTheme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
    );
}
