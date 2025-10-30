import { Group } from '@mui/icons-material';
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
                height: '100vh',
                textAlign: 'center',
                color: 'white',
                background:
                    'linear-gradient(14deg, #163273ff 0%, #1e3a5f 50%, #01756bff 100%)',
            }}
        >
            <Container maxWidth="md">
                <Groups2Icon sx={{ height: 110, width: 110 }} />
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                >
                    Welcome to Reactivities
                </Typography>
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{ mb: 4, color: 'grey.300' }}
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
                        py: 1.5,
                        px: 4,
                        fontSize: '1.2rem',
                        borderRadius: 3,
                        boxShadow: 3,
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
