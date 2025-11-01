import {
    Drawer,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router';
import { useAccount } from '../../lib/hooks/useAccount';
import { useState } from 'react';

export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    const { currentUser, logoutUser } = useAccount();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleNavClick = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 280,
                        backgroundImage:
                            'linear-gradient(135deg, #163273ff 0%, #1e3a5f 50%, #0d9488 100%)',
                    },
                }}
            >
                <Box sx={{ width: 280 }} role="presentation">
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="700"
                            sx={{
                                background:
                                    'linear-gradient(45deg, #ffffff 30%, #ffd700 90%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Reactivities
                        </Typography>
                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                    {/* User Info Section */}
                    {currentUser && (
                        <>
                            <Box
                                component={Link}
                                to={`/profiles/${currentUser?.id}`}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    textDecoration: 'none',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Avatar
                                        src={currentUser?.imageUrl}
                                        alt={currentUser?.displayName}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                            }}
                                        >
                                            {currentUser?.displayName}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {currentUser?.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider
                                sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            />
                        </>
                    )}

                    {/* Navigation Items */}
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/activities"
                                onClick={handleNavClick}
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Activities" />
                            </ListItemButton>
                        </ListItem>

                        {currentUser ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to="/createActivity"
                                        onClick={handleNavClick}
                                        sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(255, 255, 255, 0.1)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            <AddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Create Activity" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to={`/profiles/${currentUser?.id}`}
                                        onClick={handleNavClick}
                                        sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(255, 255, 255, 0.1)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="My Profile" />
                                    </ListItemButton>
                                </ListItem>

                                <Divider
                                    sx={{
                                        my: 1,
                                        borderColor: 'rgba(255, 255, 255, 0.1)',
                                    }}
                                />

                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            logoutUser.mutate();
                                            handleNavClick();
                                        }}
                                        sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(239, 68, 68, 0.2)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#ef4444' }}>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Logout"
                                            sx={{ color: '#ef4444' }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to="/login"
                                        onClick={handleNavClick}
                                        sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(255, 255, 255, 0.1)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            <LoginIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Login" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to="/register"
                                        onClick={handleNavClick}
                                        sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(255, 255, 255, 0.1)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            <AppRegistrationIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Register" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
