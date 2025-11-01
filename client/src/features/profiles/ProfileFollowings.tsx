import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import { Box, Divider, Grid, Typography, Skeleton } from '@mui/material';
import ProfileCard from './ProfileCard';
import { PersonOff } from '@mui/icons-material';

type Props = {
    activeTab: number;
};

export default function ProfileFollowings({ activeTab }: Props) {
    const { id } = useParams();
    const predicate = activeTab === 3 ? 'followers' : 'followings';
    const { profile, followings, loadingFollowings } = useProfile(
        id,
        predicate
    );

    if (!profile) return null;

    const isFollowers = activeTab === 3;
    const title = isFollowers
        ? `People following ${profile.displayName}`
        : `People ${profile.displayName} is following`;

    return (
        <Box>
            {/* Header */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                >
                    {title}
                </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Loading State */}
            {loadingFollowings && (
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    {[1, 2, 3, 4].map((item) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item}>
                            <Box
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={80}
                                        height={80}
                                    />
                                    <Skeleton
                                        width="70%"
                                        height={24}
                                        sx={{ mt: 1 }}
                                    />
                                    <Skeleton width="50%" height={20} />
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Empty State */}
            {!loadingFollowings && (!followings || followings.length === 0) && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: { xs: 4, md: 8 },
                        px: 2,
                    }}
                >
                    <PersonOff
                        sx={{
                            fontSize: { xs: 48, md: 64 },
                            color: 'text.secondary',
                            mb: 2,
                            opacity: 0.5,
                        }}
                    />
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                        {isFollowers
                            ? 'No followers yet'
                            : 'Not following anyone yet'}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                    >
                        {isFollowers
                            ? 'Be the first to follow!'
                            : 'Start connecting with people'}
                    </Typography>
                </Box>
            )}

            {/* Followings Grid */}
            {!loadingFollowings && followings && followings.length > 0 && (
                <Box
                    sx={{
                        maxHeight: { xs: 500, md: 430 },
                        overflow: 'auto',
                        pr: 1,
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#28969c',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#227278',
                        },
                    }}
                >
                    <Grid container spacing={{ xs: 1.5, sm: 2 }} pb={1}>
                        {followings.map((profile) => (
                            <Grid
                                size={{ xs: 6, sm: 4, md: 3 }}
                                key={profile.id}
                            >
                                <ProfileCard profile={profile} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}
