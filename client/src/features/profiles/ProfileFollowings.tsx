import { useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile';
import { Box, Divider, Grid, Typography, Skeleton } from '@mui/material';
import ProfileCard from './ProfileCard';
import { People, PersonOff } from '@mui/icons-material';

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
                <Typography variant="h5" fontWeight={700}>
                    {title}
                </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Loading State */}
            {loadingFollowings && (
                <Grid container spacing={2}>
                    {[1, 2, 3, 4].map((item) => (
                        <Grid size={3} key={item}>
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
                        py: 8,
                        px: 2,
                    }}
                >
                    <PersonOff
                        sx={{
                            fontSize: 64,
                            color: 'text.secondary',
                            mb: 2,
                            opacity: 0.5,
                        }}
                    />
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                    >
                        {isFollowers
                            ? 'No followers yet'
                            : 'Not following anyone yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
                        maxHeight: 430,
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
                    <Grid container spacing={2} pb={1}>
                        {followings.map((profile) => (
                            <Grid size={3} key={profile.id}>
                                <ProfileCard profile={profile} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}
