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
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 200px)',
                    py: 4,
                }}
            >
                <Paper
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        gap: 3,
                        width: '100%',
                        maxWidth: 800,
                        borderRadius: 3,
                    }}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={3}
                        color={'secondary.main'}
                    >
                        <HowToReg fontSize="large" />
                        <Typography variant="h4">Sign up</Typography>
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
                    >
                        Register
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?
                        <Typography
                            component={Link}
                            to="/login"
                            color="primary"
                            sx={{ ml: 1, textDecoration: 'none' }}
                        >
                            Sign in
                        </Typography>
                    </Typography>
                </Paper>
            </Box>
        </>
    );
}
