import { Button, useTheme, useMediaQuery } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

type ButtonTheme = {
    colorTheme: 'primary' | 'error' | 'success' | 'warning';
    shapeTheme: 'contained' | 'outlined' | 'text';
};

type StyledButtonProps = ButtonTheme &
    Omit<ButtonProps, keyof ButtonTheme> & {
        [key: string]: any;
    };

const StyledButton = ({
    colorTheme,
    shapeTheme,
    sx,
    ...props
}: StyledButtonProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const colorThemes = {
        primary: {
            background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
            hoverBackground:
                'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.4)',
            hoverBoxShadow: '0 6px 16px rgba(13, 148, 136, 0.5)',
        },
        error: {
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            hoverBackground:
                'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
            hoverBoxShadow: '0 6px 16px rgba(220, 38, 38, 0.5)',
        },
        success: {
            background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
            hoverBackground:
                'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)',
            hoverBoxShadow: '0 6px 16px rgba(22, 163, 74, 0.5)',
        },
        warning: {
            background: 'linear-gradient(135deg, #902217ff 0%, #9d251aff 100%)',
            hoverBackground:
                'linear-gradient(135deg, #7f1d13ff 0%, #902217ff 100%)',
            boxShadow: '0 2px 6px rgba(245, 50, 11, 0.4)',
            hoverBoxShadow: '0 6px 16px rgba(245, 50, 11, 0.5)',
        },
    } as const;

    const selectedColorTheme = colorTheme ? colorThemes[colorTheme] : null;

    return (
        <Button
            variant={shapeTheme}
            {...props}
            sx={{
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: isMobile ? '0.8rem' : '1rem',
                ...(selectedColorTheme && {
                    background: selectedColorTheme.background,
                    boxShadow: selectedColorTheme.boxShadow,
                    color: 'white',
                    '&:hover': {
                        background: selectedColorTheme.hoverBackground,
                        transform: isMobile ? 'none' : 'translateY(-2px)',
                        boxShadow: selectedColorTheme.hoverBoxShadow,
                    },
                }),
                ...sx,
            }}
        />
    );
};

export default StyledButton;
