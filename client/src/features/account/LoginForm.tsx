import { useForm } from 'react-hook-form';
import { useAccount } from '../../lib/hooks/useAccount';
import { loginSchema, type LoginSchema } from '../../lib/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { Link, useLocation, useNavigate } from 'react-router';

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitting },
    } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities');
            },
        });
    };

    return (
        // 1. This new Box is the full-height centering container
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
                    <LockOpen fontSize="large" color="primary" />
                    <Typography variant="h4" color="primary">
                        Sign in
                    </Typography>
                </Box>
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
                    Login
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Don't have an account?
                    <Typography
                        component={Link}
                        to="/register"
                        color="primary"
                        sx={{ ml: 1, textDecoration: 'none' }}
                    >
                        Sign up
                    </Typography>
                </Typography>
            </Paper>
        </Box>
    );
}
