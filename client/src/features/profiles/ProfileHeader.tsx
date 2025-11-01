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
                borderRadius: { xs: 2, md: 3 },
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box
                sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    mr: { xs: 0, md: 2 },
                    py: { xs: 2, md: !isCurrentUser ? 0 : 4 },
                }}
            >
                {/* Mobile Layout (stacked) */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    {/* Avatar and Name - Centered on Mobile */}
                    <Stack spacing={2} alignItems="center" mb={3}>
                        <Avatar
                            src={profile.imageUrl}
                            alt={`${profile.displayName} profile image`}
                            sx={{
                                width: { xs: 100, sm: 120 },
                                height: { xs: 100, sm: 120 },
                                border: '3px solid',
                                borderColor: 'primary.main',
                                boxShadow: '0 4px 12px rgba(32, 167, 172, 0.3)',
                            }}
                        />

                        <Box textAlign="center">
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1,
                                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                                }}
                            >
                                {profile.displayName}
                            </Typography>

                            {profile.following && (
                                <Chip
                                    icon={
                                        <VerifiedUser
                                            sx={{ fontSize: '1.1rem' }}
                                        />
                                    }
                                    label="Following"
                                    size="small"
                                    sx={{
                                        bgcolor: '#f59e0b',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '0.75rem',
                                        '& .MuiChip-icon': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            )}
                        </Box>
                    </Stack>

                    {/* Stats Row - Mobile */}
                    <Stack direction="row" spacing={1.5} mb={2.5}>
                        {/* Followers */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: 'rgba(32, 167, 172, 0.08)',
                                border: '1px solid',
                                borderColor: 'rgba(32, 167, 172, 0.2)',
                            }}
                        >
                            <PersonAdd
                                sx={{
                                    fontSize: '1.5rem',
                                    color: 'primary.main',
                                }}
                            />
                            <Box textAlign="center">
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        fontSize: {
                                            xs: '1.25rem',
                                            sm: '1.5rem',
                                        },
                                    }}
                                >
                                    {profile.followersCount}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        fontSize: '0.65rem',
                                    }}
                                >
                                    Followers
                                </Typography>
                            </Box>
                        </Box>

                        {/* Following */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: 'rgba(32, 167, 172, 0.08)',
                                border: '1px solid',
                                borderColor: 'rgba(32, 167, 172, 0.2)',
                            }}
                        >
                            <People
                                sx={{
                                    fontSize: '1.5rem',
                                    color: 'primary.main',
                                }}
                            />
                            <Box textAlign="center">
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        fontSize: {
                                            xs: '1.25rem',
                                            sm: '1.5rem',
                                        },
                                    }}
                                >
                                    {profile.followingCount}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        fontSize: '0.65rem',
                                    }}
                                >
                                    Following
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>

                    {/* Follow Button - Mobile */}
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
                            fullWidth
                            sx={{
                                height: 44,
                                borderRadius: 2,
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                textTransform: 'none',
                            }}
                        >
                            {profile.following ? 'Unfollow' : 'Follow'}
                        </Button>
                    )}
                </Box>

                {/* Desktop Layout (horizontal) */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Stack direction="row" spacing={3} alignItems="center">
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

                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1,
                                    fontSize: '2.5rem',
                                }}
                            >
                                {profile.displayName}
                            </Typography>

                            {profile.following && (
                                <Chip
                                    icon={
                                        <VerifiedUser
                                            sx={{ fontSize: '1.3rem' }}
                                        />
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

                    <Box
                        sx={{
                            p: 2,
                            mt: 2,
                            maxWidth: '350px',
                        }}
                    >
                        <Stack spacing={3} justifyContent="space-between">
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

                            {!isCurrentUser && (
                                <Button
                                    onClick={() => {
                                        updateFollowing.mutate();
                                    }}
                                    disabled={updateFollowing.isPending}
                                    variant={
                                        profile.following
                                            ? 'outlined'
                                            : 'contained'
                                    }
                                    color={
                                        profile.following ? 'error' : 'primary'
                                    }
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
            </Box>
        </Paper>
    );
}
