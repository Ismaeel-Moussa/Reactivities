import { Event, FilterList } from '@mui/icons-material';
import {
    Box,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Stack,
    Typography,
    Divider,
    GlobalStyles, // We need this for the new component
    useTheme, // and this
} from '@mui/material';
import Calendar from 'react-calendar';

// ---
// Create the new component here (paste code from above)
// ---
const CalendarGlobalStyles = () => {
    const theme = useTheme();

    return (
        <GlobalStyles
            styles={{
                // ... (all the styles from the section above) ...
                ':root': {
                    '--cal-font-family': theme.typography.fontFamily,
                    '--cal-primary-color': theme.palette.primary.main,
                    '--cal-primary-color-hover':
                        theme.palette.mode === 'light'
                            ? theme.palette.primary.dark
                            : theme.palette.primary.light,
                    '--cal-text-color': theme.palette.text.primary,
                    '--cal-text-color-light': theme.palette.text.secondary,
                    '--cal-text-color-faded': theme.palette.text.disabled,
                    '--cal-nav-bg-hover': theme.palette.action.hover,
                    '--cal-tile-bg-hover': theme.palette.action.hover,
                    '--cal-today-bg-hover': theme.palette.action.selected,
                    '--cal-border-radius': '40px 10px',
                    '--cal-transition-speed': '0.3s',
                },
                '.react-calendar': {
                    width: '100%',
                    border: 'none',
                    fontFamily: 'var(--cal-font-family)',
                    backgroundColor: 'transparent',
                    lineHeight: '1.5em',
                },
                '.react-calendar__navigation': {
                    display: 'flex',
                    height: '44px',
                    marginBottom: '1em',
                    alignItems: 'center',
                },
                '.react-calendar__navigation button': {
                    minWidth: '44px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--cal-text-color-light)',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition:
                        'background-color var(--cal-transition-speed) ease',
                    borderRadius: 'var(--cal-border-radius)',
                },
                '.react-calendar__navigation button:hover': {
                    backgroundColor: 'var(--cal-nav-bg-hover)',
                },
                '.react-calendar__navigation__label': {
                    flexGrow: 1,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: 'var(--cal-text-color)',
                },
                '.react-calendar__month-view__weekdays__weekday': {
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--cal-text-color-light)',
                    padding: '0.5em',
                    textDecoration: 'none',
                },
                '.react-calendar__tile': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    background: 'none',
                    border: '1px solid transparent',
                    color: 'var(--cal-text-color)',
                    cursor: 'pointer',
                    borderRadius: 'var(--cal-border-radius)',
                    transition:
                        'background-color var(--cal-transition-speed) ease, border-color var(--cal-transition-speed) ease',
                },
                '.react-calendar__tile:hover': {
                    backgroundColor: 'var(--cal-tile-bg-hover)',
                    borderColor: theme.palette.divider,
                },
                '.react-calendar__tile--active': {
                    backgroundColor: 'var(--cal-primary-color)',
                    color: theme.palette.primary.contrastText,
                    borderColor: 'var(--cal-primary-color)',
                },
                '.react-calendar__tile--active:hover': {
                    backgroundColor: 'var(--cal-primary-color-hover)',
                    borderColor: 'var(--cal-primary-color-hover)',
                },
                '.react-calendar__tile--now': {
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    border: '1px solid var(--cal-primary-color)',
                    color: 'var(--cal-primary-color)',
                },
                '.react-calendar__tile--now:hover': {
                    backgroundColor: 'var(--cal-today-bg-hover)',
                },
                '.react-calendar__month-view__days__day--neighboringMonth': {
                    color: 'var(--cal-text-color-faded)',
                },
            }}
        />
    );
};

export default function ActivityFilters() {
    return (
        <>
            <CalendarGlobalStyles />

            <Stack spacing={3}>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'primary.main',
                        }}
                    >
                        <FilterList sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Filters
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 1 }} />
                    <MenuList>
                        <MenuItem selected>
                            <ListItemText primary="All Activities" />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary="I'm going" />
                        </MenuItem>
                        <MenuItem>
                            <ListItemText primary="I'm hosting" />
                        </MenuItem>
                    </MenuList>
                </Paper>
                <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'primary.main',
                        }}
                    >
                        <Event sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Select Date
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Calendar />
                </Paper>
            </Stack>
        </>
    );
}
