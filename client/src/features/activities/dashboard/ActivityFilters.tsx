import { Event, FilterList, Category, Person } from '@mui/icons-material';
import {
    Box,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Stack,
    Typography,
    Divider,
    GlobalStyles,
    useTheme,
    TextField,
    InputAdornment,
} from '@mui/material';
import Calendar from 'react-calendar';
import { useStore } from '../../../lib/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const CalendarGlobalStyles = () => {
    const theme = useTheme();

    return (
        <GlobalStyles
            styles={{
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
                    '--cal-border-radius': '20px 10px',
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

type Props = {
    onClose?: () => void;
};

const ActivityFilters = observer(({ onClose }: Props) => {
    const {
        activityStore: {
            setFilter,
            filter,
            setStartDate,
            startDate,
            setHostName,
            hostName,
            setCategoryType,
            categoryType,
        },
    } = useStore();

    const [localHostName, setLocalHostName] = useState(hostName);
    const [localCategory, setLocalCategory] = useState(categoryType);

    return (
        <>
            <CalendarGlobalStyles />

            <Stack spacing={3}>
                {/* Mobile Title */}
                {onClose && (
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        Filter Activities
                    </Typography>
                )}

                <Box
                    display={'flex'}
                    gap={3}
                    sx={{
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    {/* Search Filters */}
                    <Paper
                        elevation={2}
                        sx={{
                            p: { xs: 2, md: 2.5 },
                            borderRadius: 2,
                            width: { xs: '100%', md: '65%' },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1,
                                color: 'primary.main',
                            }}
                        >
                            <FilterList
                                sx={{
                                    mr: 1,
                                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: { xs: '1rem', md: '1.25rem' },
                                }}
                            >
                                Search Filters
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />

                        <Stack spacing={2.5}>
                            {/* Host Filter */}
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 1.5,
                                    }}
                                >
                                    <Person
                                        sx={{
                                            fontSize: '1.2rem',
                                            color: 'text.secondary',
                                            mr: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            fontSize: {
                                                xs: '0.688rem',
                                                md: '0.75rem',
                                            },
                                        }}
                                    >
                                        Filter by Host
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Write to search..."
                                    value={localHostName}
                                    onChange={(e) => {
                                        setLocalHostName(e.target.value);
                                        setHostName(e.target.value);
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person
                                                        sx={{
                                                            fontSize: '1.1rem',
                                                            color: 'text.disabled',
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            bgcolor: 'rgba(32, 167, 172, 0.04)',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                bgcolor:
                                                    'rgba(32, 167, 172, 0.08)',
                                            },
                                            '&.Mui-focused': {
                                                bgcolor: 'background.paper',
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            {/* Category Filter */}
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 1.5,
                                    }}
                                >
                                    <Category
                                        sx={{
                                            fontSize: '1.2rem',
                                            color: 'text.secondary',
                                            mr: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            fontSize: {
                                                xs: '0.688rem',
                                                md: '0.75rem',
                                            },
                                        }}
                                    >
                                        Filter by Category
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Write to search..."
                                    value={localCategory}
                                    onChange={(e) => {
                                        setLocalCategory(e.target.value);
                                        setCategoryType(e.target.value);
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Category
                                                        sx={{
                                                            fontSize: '1.1rem',
                                                            color: 'text.disabled',
                                                        }}
                                                    />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            bgcolor: 'rgba(32, 167, 172, 0.04)',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                bgcolor:
                                                    'rgba(32, 167, 172, 0.08)',
                                            },
                                            '&.Mui-focused': {
                                                bgcolor: 'background.paper',
                                            },
                                        },
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Paper>

                    {/* Activity Type Filter */}
                    <Paper
                        elevation={2}
                        sx={{
                            p: { xs: 2, md: 2 },
                            borderRadius: 2,
                            width: { xs: '100%', md: '35%' },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1,
                                color: 'primary.main',
                            }}
                        >
                            <FilterList
                                sx={{
                                    mr: 1,
                                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: { xs: '1rem', md: '1.25rem' },
                                }}
                            >
                                Activity Type
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 1 }} />
                        <MenuList
                            sx={{
                                '& .MuiMenuItem-root:not(:last-child)': {
                                    mb: { xs: 1, md: 3 },
                                },
                            }}
                        >
                            <MenuItem
                                selected={filter === 'all'}
                                onClick={() => setFilter('all')}
                                sx={{
                                    borderRadius: 1.5,
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(32, 167, 172, 0.12)',
                                        '&:hover': {
                                            bgcolor: 'rgba(32, 167, 172, 0.18)',
                                        },
                                    },
                                }}
                            >
                                <ListItemText primary="All Activities" />
                            </MenuItem>
                            <MenuItem
                                selected={filter === 'isGoing'}
                                onClick={() => setFilter('isGoing')}
                                sx={{
                                    borderRadius: 2.5,
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(32, 167, 172, 0.12)',
                                        '&:hover': {
                                            bgcolor: 'rgba(32, 167, 172, 0.18)',
                                        },
                                    },
                                }}
                            >
                                <ListItemText primary="I'm going" />
                            </MenuItem>
                            <MenuItem
                                selected={filter === 'isHost'}
                                onClick={() => setFilter('isHost')}
                                sx={{
                                    borderRadius: 1.5,
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(32, 167, 172, 0.12)',
                                        '&:hover': {
                                            bgcolor: 'rgba(32, 167, 172, 0.18)',
                                        },
                                    },
                                }}
                            >
                                <ListItemText primary="I'm hosting" />
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Box>

                {/* Date Filter */}
                <Paper
                    elevation={2}
                    sx={{
                        p: { xs: 2, md: 2 },
                        borderRadius: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'primary.main',
                        }}
                    >
                        <Event
                            sx={{
                                mr: 1,
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '1rem', md: '1.25rem' },
                            }}
                        >
                            Select Date
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Calendar
                        value={startDate}
                        onChange={(date) => setStartDate(date as Date)}
                    />
                </Paper>

                {/* Mobile Apply Button */}

                {/* {onClose && (
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={onClose}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            borderRadius: 2,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: '0 4px 12px rgba(32, 167, 172, 0.3)',
                            },
                        }}
                    >
                        Apply Filters
                    </Button>
                )} */}
            </Stack>
        </>
    );
});

export default ActivityFilters;
