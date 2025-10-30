import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    Avatar,
    Box,
    Divider,
    ListItemIcon,
    ListItemText,
    Typography,
    alpha,
} from '@mui/material';
import { useAccount } from '../../lib/hooks/useAccount';
import { Link } from 'react-router';
import { Add, Logout, Person, KeyboardArrowDown } from '@mui/icons-material';

export default function UserMenu() {
    const { currentUser, logoutUser } = useAccount();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                onClick={handleClick}
                color="inherit"
                size="large"
                sx={{
                    fontSize: '1rem',
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar
                        src={currentUser?.imageUrl}
                        alt="current user"
                        sx={{
                            width: 39,
                            height: 39,
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 600,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        {currentUser?.displayName}
                    </Typography>
                    <KeyboardArrowDown
                        sx={{
                            fontSize: 21,
                            transition: 'transform 0.2s ease',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                    />
                </Box>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 3,
                        sx: {
                            minWidth: 220,
                            borderRadius: 2,
                            mt: 1.5,
                            border: '1px solid',
                            borderColor: 'divider',
                            overflow: 'visible',
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                borderLeft: '1px solid',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* User Info Header */}
                <Box sx={{ px: 2, py: 1.5, pb: 1 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                        }}
                    >
                        {currentUser?.displayName}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        {currentUser?.email}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <MenuItem
                    component={Link}
                    to="/createActivity"
                    onClick={handleClose}
                    sx={{
                        py: 1.5,
                        px: 2,
                        borderRadius: 1,
                        mx: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: alpha('#0d9488', 0.1),
                            '& .MuiListItemIcon-root': {
                                color: 'primary.main',
                            },
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <Add fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Create Activity"
                        slotProps={{
                            primary: {
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            },
                        }}
                    />
                </MenuItem>

                <MenuItem
                    component={Link}
                    to={`/profiles/${currentUser?.id}`}
                    onClick={handleClose}
                    sx={{
                        py: 1.5,
                        px: 2,
                        borderRadius: 1,
                        mx: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: alpha('#0d9488', 0.1),
                            '& .MuiListItemIcon-root': {
                                color: 'primary.main',
                            },
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="My Profile"
                        slotProps={{
                            primary: {
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            },
                        }}
                    />
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem
                    onClick={() => {
                        logoutUser.mutate();
                        handleClose();
                    }}
                    sx={{
                        py: 1.5,
                        px: 2,
                        borderRadius: 1,
                        mx: 1,
                        mb: 0.5,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: alpha('#ef4444', 0.1),
                            '& .MuiListItemIcon-root': {
                                color: 'error.main',
                            },
                            '& .MuiListItemText-primary': {
                                color: 'error.main',
                            },
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Logout"
                        slotProps={{
                            primary: {
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            },
                        }}
                    />
                </MenuItem>
            </Menu>
        </Box>
    );
}
