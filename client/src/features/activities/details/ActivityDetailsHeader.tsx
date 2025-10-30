import { Card, CardMedia, Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';
import { useActivities } from '../../../lib/hooks/useActivities';
import StyledButton from '../../../app/shared/components/StyledButton';

type Props = {
    activity: Activity;
};

export default function ActivityDetailsHeader({ activity }: Props) {
    const { updateAttendance } = useActivities(activity.id);

    return (
        <Card
            sx={{
                position: 'relative',
                mb: 3,
                backgroundColor: 'transparent',
                overflow: 'hidden',
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
        >
            {activity.isCancelled && (
                <Chip
                    sx={{
                        position: 'absolute',
                        left: 24,
                        top: 24,
                        zIndex: 1000,
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        px: 2,
                        py: 2.5,
                    }}
                    color="error"
                    label="CANCELLED"
                />
            )}

            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`/images/categoryImages/${activity.category}.jpg`}
                    alt={`${activity.category} image`}
                    sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                />

                {/* Gradient overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)',
                    }}
                />

                {/* Content */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        color: 'white',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    {/* Text Section */}
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 1,
                                textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                            }}
                        >
                            {activity.title}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                opacity: 0.95,
                                mb: 0.5,
                                fontWeight: 500,
                            }}
                        >
                            {formatDate(activity.date)}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 400,
                            }}
                        >
                            Hosted by{' '}
                            <Box
                                component={Link}
                                to={`/profiles/${activity.hostId}`}
                                sx={{
                                    color: '#2dd4bf',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: '#5eead4',
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {activity.hostDisplayName}
                            </Box>
                        </Typography>
                    </Box>
                </Box>
                {/* Buttons */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        color: 'white',
                        p: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 3,
                        width: '500px',
                    }}
                >
                    {activity.isHost ? (
                        <>
                            <StyledButton
                                variant="contained"
                                color={
                                    activity.isCancelled ? 'success' : 'error'
                                }
                                onClick={() =>
                                    updateAttendance.mutate(activity.id)
                                }
                                disabled={updateAttendance.isPending}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    color: 'white',
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
                                    },
                                }}
                            >
                                {activity.isCancelled
                                    ? 'Re-activate Activity'
                                    : 'Cancel Activity'}
                            </StyledButton>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/manage/${activity.id}`}
                                disabled={activity.isCancelled}
                                sx={{
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    background:
                                        'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                    boxShadow:
                                        '0 4px 12px rgba(13, 148, 136, 0.4)',
                                    '&:hover': {
                                        background:
                                            'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow:
                                            '0 6px 16px rgba(13, 148, 136, 0.5)',
                                    },
                                }}
                            >
                                Manage Event
                            </StyledButton>
                        </>
                    ) : (
                        <StyledButton
                            variant="contained"
                            color={activity.isGoing ? 'warning' : 'primary'}
                            onClick={() => updateAttendance.mutate(activity.id)}
                            disabled={
                                updateAttendance.isPending ||
                                activity.isCancelled
                            }
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                color: 'white',
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                background: activity.isGoing
                                    ? 'linear-gradient(135deg, #902217ff 0%, #9d251aff 100%)'
                                    : 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                boxShadow: activity.isGoing
                                    ? '0 4px 12px rgba(245, 50, 11, 0.4)'
                                    : '0 4px 12px rgba(13, 148, 136, 0.4)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: activity.isGoing
                                        ? '0 6px 16px rgba(245, 50, 11, 0.5)'
                                        : '0 6px 16px rgba(13, 148, 136, 0.5)',
                                },
                            }}
                        >
                            {activity.isGoing
                                ? 'Cancel Attendance'
                                : 'Join Activity'}
                        </StyledButton>
                    )}
                </Box>
            </Box>
        </Card>
    );
}
