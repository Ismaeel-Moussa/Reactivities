import {
    Box,
    AppBar,
    Toolbar,
    Container,
    MenuItem,
    Typography,
    CircularProgress,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Link } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';
import ThemeToggleButton from './ThemeToggleButton';
import MobileMenu from './MobileMenu';
import Groups2Icon from '@mui/icons-material/Groups2';

export default function NavBar() {
    const { uiStore } = useStore();
    const { currentUser } = useAccount();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
                            py: { xs: 0.5, md: 1 },
                            minHeight: { xs: 56, md: 64 },
                        }}
                    >
                        {/* Mobile Menu - Left Side */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <MobileMenu />
                        </Box>

                        {/* Logo Section */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuItem
                                component={Link}
                                to="/"
                                sx={{
                                    display: 'flex',
                                    gap: { xs: 1, md: 1.5 },
                                    alignItems: 'center',
                                    px: { xs: 0.5, md: 1 },
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.08)',
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                <Groups2Icon
                                    sx={{
                                        fontSize: { xs: 32, md: 40 },
                                        color: 'white',
                                        mb: 0.5,
                                    }}
                                />

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
                                            fontSize: {
                                                xs: '1.1rem',
                                                md: '1.5rem',
                                            },
                                        }}
                                    >
                                        Reactivities
                                    </Typography>

                                    {/* Loading Spinner */}
                                    <Observer>
                                        {() =>
                                            uiStore.isLoading ? (
                                                <CircularProgress
                                                    size={isMobile ? 20 : 26}
                                                    thickness={4}
                                                    sx={{
                                                        color: '#ffd700',
                                                        position: 'absolute',
                                                        right: {
                                                            xs: -35,
                                                            md: -45,
                                                        },
                                                        top: 2,
                                                        transform:
                                                            'translateY(-50%)',
                                                        ml: 1,
                                                    }}
                                                />
                                            ) : null
                                        }
                                    </Observer>
                                </Box>
                            </MenuItem>
                        </Box>

                        {/* Desktop Navigation Links - Hidden on Mobile */}
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
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
                                gap: { xs: 0.5, md: 1 },
                            }}
                        >
                            {/* Desktop User Menu - Hidden on Mobile */}
                            {currentUser ? (
                                <Box
                                    sx={{
                                        display: { xs: 'none', md: 'block' },
                                    }}
                                >
                                    <UserMenu />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: { xs: 'none', md: 'flex' },
                                        gap: 1,
                                    }}
                                >
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
