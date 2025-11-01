import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router';
import Groups2Icon from '@mui/icons-material/Groups2';

export default function HomePage() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                color: 'white',
                background:
                    'linear-gradient(14deg, #163273ff 0%, #1e3a5f 50%, #01756bff 100%)',
                px: { xs: 2, sm: 3 },
                py: { xs: 4, sm: 0 },
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 2, sm: 3 },
                }}
            >
                <Groups2Icon
                    sx={{
                        height: { xs: 70, sm: 90, md: 110 },
                        width: { xs: 70, sm: 90, md: 110 },
                        animation: 'fadeIn 1s ease-in',
                        '@keyframes fadeIn': {
                            from: { opacity: 0, transform: 'scale(0.8)' },
                            to: { opacity: 1, transform: 'scale(1)' },
                        },
                    }}
                />
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        fontSize: {
                            xs: '2rem',
                            sm: '2.75rem',
                            md: '3.75rem',
                        },
                        lineHeight: 1.2,
                        mb: 1,
                    }}
                >
                    Welcome to Reactivities
                </Typography>
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        mb: { xs: 2, sm: 4 },
                        color: 'grey.300',
                        fontSize: {
                            xs: '1rem',
                            sm: '1.25rem',
                            md: '1.5rem',
                        },
                        px: { xs: 1, sm: 0 },
                        maxWidth: '600px',
                    }}
                >
                    Your new hub for social events and activities
                </Typography>
                <Button
                    component={Link}
                    to="/activities"
                    variant="contained"
                    size="large"
                    sx={{
                        background:
                            'linear-gradient(200deg, #163273ff 0%, #1e3a5f 50%, #01756bff 100%)',
                        py: { xs: 1.2, sm: 1.5 },
                        px: { xs: 3, sm: 4 },
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        fontWeight: 600,
                        borderRadius: 3,
                        boxShadow: 3,
                        width: { xs: '100%', sm: 'auto' },
                        maxWidth: { xs: 300, sm: 'none' },
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 6,
                        },
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    Go to Activities
                </Button>
            </Container>
        </Box>
    );
}
