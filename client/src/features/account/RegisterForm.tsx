import { useForm } from 'react-hook-form';
import { useAccount } from '../../lib/hooks/useAccount';
import {
    registerSchema,
    type RegisterSchema,
} from '../../lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import { HowToReg } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { Link } from 'react-router';

export default function RegisterForm() {
    const { registerUser } = useAccount();
    const {
        control,
        handleSubmit,
        setError,
        formState: { isValid, isSubmitting },
    } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err) => {
                        if (err.includes('Email'))
                            setError('email', { message: err });
                        else if (err.includes('Password'))
                            setError('password', {
                                message: `Password must be at least 6 characters and contain:
                                        * An uppercase letter ( A - Z )
                                        * A lowercase letter ( a - z )
                                        * A non-alphanumeric character`,
                            });
                    });
                }
            },
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: {
                    xs: 'calc(100vh - 120px)',
                    sm: 'calc(100vh - 200px)',
                },
                py: { xs: 2, sm: 4 },
                px: { xs: 2, sm: 3 },
            }}
        >
            <Paper
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 2.5, sm: 3 },
                    gap: { xs: 2, sm: 3 },
                    width: '100%',
                    maxWidth: { xs: '100%', sm: 500, md: 800 },
                    borderRadius: { xs: 2, sm: 3 },
                    boxShadow: { xs: 2, sm: 3 },
                }}
            >
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={{ xs: 1.5, sm: 3 }}
                    color={'secondary.main'}
                >
                    <HowToReg
                        fontSize="large"
                        color="primary"
                        sx={{ fontSize: { xs: 32, sm: 40 } }}
                    />
                    <Typography
                        variant="h4"
                        color="primary"
                        sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}
                    >
                        Sign up
                    </Typography>
                </Box>
                <TextInput
                    label="Display Name"
                    name="displayName"
                    control={control}
                />
                <TextInput label="Email" name="email" control={control} />
                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    control={control}
                />
                <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    variant="contained"
                    size="large"
                    sx={{
                        height: { xs: 48, sm: 56 },
                        fontSize: { xs: '0.95rem', sm: '1.05rem' },
                        fontWeight: 600,
                    }}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                >
                    Already have an account?
                    <Typography
                        component={Link}
                        to="/login"
                        color="primary"
                        sx={{
                            ml: 1,
                            textDecoration: 'none',
                            fontWeight: 600,
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Sign in
                    </Typography>
                </Typography>
            </Paper>
        </Box>
    );
}
