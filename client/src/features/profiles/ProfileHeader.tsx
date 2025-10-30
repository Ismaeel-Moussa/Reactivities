import {
    Avatar,
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useProfile } from '../../lib/hooks/useProfile';
import { useParams } from 'react-router';
import { VerifiedUser, PersonAdd, People } from '@mui/icons-material';

export default function ProfileHeader() {
    const { id } = useParams();
    const { profile, isCurrentUser, updateFollowing } = useProfile(id);

    if (!profile) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                    p: 3,
                    mr: 2,
                    py: !isCurrentUser ? 0 : 4,
                }}
            >
                <Stack direction="row" spacing={3} alignItems="center">
                    {/* Avatar with border */}
                    <Avatar
                        src={profile.imageUrl}
                        alt={`${profile.displayName} profile image`}
                        sx={{
                            width: 140,
                            height: 140,
                            border: '4px solid',
                            borderColor: 'primary.main',
                            boxShadow: '0 4px 12px rgba(32, 167, 172, 0.3)',
                            transition: 'all 0.2s ease',
                        }}
                    />

                    {/* Name and Following Badge */}
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 1,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                            }}
                        >
                            {profile.displayName}
                        </Typography>

                        {profile.following && (
                            <Chip
                                icon={
                                    <VerifiedUser sx={{ fontSize: '1.3rem' }} />
                                }
                                label="Following"
                                size="medium"
                                sx={{
                                    bgcolor: '#f59e0b',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '0.875rem',
                                    px: 1,
                                    '& .MuiChip-icon': {
                                        color: 'white',
                                    },
                                }}
                            />
                        )}
                    </Box>
                </Stack>
                {/* Stats and Action Section */}
                <Box
                    sx={{
                        p: 2,
                        mt: 2,
                        maxWidth: '350px',
                    }}
                >
                    <Stack spacing={3} justifyContent="space-between">
                        {/* Stats Section */}
                        <Stack direction="row" spacing={2}>
                            {/* Followers */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: 'rgba(32, 167, 172, 0.08)',
                                    border: '1px solid',
                                    borderColor: 'rgba(32, 167, 172, 0.2)',

                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: 'rgba(32, 167, 172, 0.12)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                    }}
                                >
                                    <PersonAdd
                                        sx={{
                                            fontSize: '1.5rem',
                                            color: 'white',
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'primary.main',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {profile.followersCount}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.5px',
                                        }}
                                    >
                                        Followers
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Following */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: 'rgba(32, 167, 172, 0.08)',
                                    border: '1px solid',
                                    borderColor: 'rgba(32, 167, 172, 0.2)',

                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: 'rgba(32, 167, 172, 0.12)',
                                        transform: 'translateY(-2px)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                    }}
                                >
                                    <People
                                        sx={{
                                            fontSize: '1.6rem',
                                            color: 'white',
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'primary.main',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {profile.followingCount}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: '0.5px',
                                        }}
                                    >
                                        Following
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>

                        {/* Action Button */}
                        {!isCurrentUser && (
                            <Button
                                onClick={() => {
                                    updateFollowing.mutate();
                                }}
                                disabled={updateFollowing.isPending}
                                variant={
                                    profile.following ? 'outlined' : 'contained'
                                }
                                color={profile.following ? 'error' : 'primary'}
                                size="large"
                                sx={{
                                    width: '111%',
                                    height: 48,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    boxShadow: profile.following
                                        ? 'none'
                                        : '0 4px 12px rgba(32, 167, 172, 0.3)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: profile.following
                                            ? 'none'
                                            : '0 6px 16px rgba(32, 167, 172, 0.4)',
                                    },
                                }}
                            >
                                {profile.following ? 'Unfollow' : 'Follow'}
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
}
