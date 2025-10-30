import { MenuItem } from '@mui/material';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

export default function MenuItemLink({
    children,
    to,
}: {
    children: ReactNode;
    to: string;
}) {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            sx={{
                fontSize: '1.05rem',
                textTransform: 'uppercase',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                letterSpacing: '0.5px',
                px: 2,
                py: 1,
                borderRadius: 1,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: '2px',
                    backgroundColor: '#ffd700',
                    transition: 'width 0.3s ease',
                },
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffd700',
                    '&::before': {
                        width: '80%',
                    },
                },
                '&.active': {
                    color: '#ffd700',
                    backgroundColor: 'rgba(255, 215, 0, 0.15)',
                    fontWeight: '700',
                    '&::before': {
                        width: '80%',
                    },
                },
            }}
        >
            {children}
        </MenuItem>
    );
}
