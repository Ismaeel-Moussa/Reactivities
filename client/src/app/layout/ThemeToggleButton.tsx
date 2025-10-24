import { IconButton, useTheme as useMuiTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../../lib/theme/ThemeContext';

export default function ThemeToggleButton() {
    const { toggleMode } = useTheme();
    const muiTheme = useMuiTheme();

    return (
        <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
            {muiTheme.palette.mode === 'dark' ? (
                <Brightness7Icon />
            ) : (
                <Brightness4Icon />
            )}
        </IconButton>
    );
}
