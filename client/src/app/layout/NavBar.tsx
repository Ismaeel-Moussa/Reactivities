import {
    Box,
    AppBar,
    Toolbar,
    Container,
    MenuItem,
    Typography,
    CircularProgress,
} from '@mui/material';
import { NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';
import ThemeToggleButton from './ThemeToggleButton';
import Groups2Icon from '@mui/icons-material/Groups2';

export default function NavBar() {
    const { uiStore } = useStore();
    const { currentUser } = useAccount();

    return (
        <Box>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundImage:
                        'linear-gradient(135deg, #163273ff 0%, #1e3a5f 50%, #0d9488 100%)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            py: 1,
                        }}
                    >
                        {/* Logo Section */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuItem
                                component={NavLink}
                                to="/"
                                sx={{
                                    display: 'flex',
                                    gap: 1.5,
                                    alignItems: 'center',
                                    px: 1,
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.08)',
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                <Groups2Icon
                                    sx={{
                                        fontSize: 40,
                                        color: 'white',
                                        mb: 0.5,
                                    }}
                                />

                                {/* 1. Wrap Typography and Observer in a relative Box */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight="700"
                                        sx={{
                                            background:
                                                'linear-gradient(45deg, #ffffff 30%, #ffd700 90%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            letterSpacing: '0.5px',
                                        }}
                                    >
                                        Reactivities
                                    </Typography>

                                    {/* 3. Spinner is now inside the Box, positioned absolutely */}
                                    <Observer>
                                        {() =>
                                            uiStore.isLoading ? (
                                                <CircularProgress
                                                    size={26}
                                                    thickness={4}
                                                    sx={{
                                                        color: '#ffd700',
                                                        position: 'absolute', // As requested
                                                        right: -50, // Position at the end of the parent Box
                                                        top: 2, // Center vertically
                                                        transform:
                                                            'translateY(-50%)', // Adjust centering
                                                        ml: 1, // Add 1 unit of margin
                                                    }}
                                                />
                                            ) : null
                                        }
                                    </Observer>
                                </Box>
                            </MenuItem>
                        </Box>

                        {/* Navigation Links */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            <MenuItemLink to="/activities">
                                Activities
                            </MenuItemLink>
                        </Box>

                        {/* Right Section - User Menu & Theme Toggle */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            {/* --- SPINNER REMOVED FROM HERE --- */}

                            {currentUser ? (
                                <UserMenu />
                            ) : (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <MenuItemLink to="/login">
                                        Login
                                    </MenuItemLink>
                                    <MenuItemLink to="/register">
                                        Register
                                    </MenuItemLink>
                                </Box>
                            )}
                            <ThemeToggleButton />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
