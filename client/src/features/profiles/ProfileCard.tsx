import { Person, VerifiedUser } from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Typography,
    Stack,
} from '@mui/material';
import { Link } from 'react-router';

type Props = {
    profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
    return (
        <Link
            to={`/profiles/${profile.id}`}
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <Card
                sx={{
                    borderRadius: 3,
                    maxWidth: 280,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                        borderColor: 'primary.main',
                        '& .profile-image': {
                            transform: 'scale(1.05)',
                        },
                    },
                }}
                elevation={2}
            >
                {/* Image Section with Gradient Overlay */}
                <Box
                    sx={{
                        position: 'relative',
                        height: 200,
                        overflow: 'hidden',
                        bgcolor: 'rgba(32, 167, 172, 0.05)',
                    }}
                >
                    <CardMedia
                        component="img"
                        src={profile?.imageUrl || '/images/user.png'}
                        alt={profile.displayName + ' image'}
                        className="profile-image"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                        }}
                    />
                    {/* Gradient Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50%',
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                        }}
                    />

                    {/* Following Badge */}
                    {profile.following && (
                        <Chip
                            icon={<VerifiedUser sx={{ fontSize: '1.1rem' }} />}
                            label="Following"
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(8px)',
                                fontWeight: 700,
                                color: '#f59e0b',
                                border: '2px solid',
                                borderColor: '#f59e0b',
                                '& .MuiChip-icon': {
                                    color: '#f59e0b',
                                },
                            }}
                        />
                    )}
                </Box>

                <CardContent sx={{ p: 2.5 }}>
                    <Stack spacing={2}>
                        {/* Name Section */}
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '1.25rem',
                                    mb: 0.5,
                                    color: 'text.primary',
                                    lineHeight: 1.3,
                                }}
                            >
                                {profile.displayName}
                            </Typography>

                            {profile.bio && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {profile.bio}
                                </Typography>
                            )}
                        </Box>
                        {/* Followers Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                p: 2,
                                borderRadius: 2,
                                bgcolor: 'rgba(32, 167, 172, 0.08)',
                                border: '1px solid rgba(32, 167, 172, 0.2)',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 44,
                                    height: 44,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                }}
                            >
                                <Person
                                    sx={{ fontSize: '1.4rem', color: 'white' }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {profile.followersCount}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Followers
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Link>
    );
}
