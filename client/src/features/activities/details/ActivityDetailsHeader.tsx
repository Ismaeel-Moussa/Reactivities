import {
    Card,
    CardMedia,
    Box,
    Typography,
    Chip,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';
import { useActivities } from '../../../lib/hooks/useActivities';
import StyledButton from '../../../app/shared/components/StyledButton';

type Props = {
    activity: Activity;
};

export default function ActivityDetailsHeader({ activity }: Props) {
    const { updateAttendance } = useActivities(activity.id);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card
            sx={{
                position: 'relative',
                mb: isMobile ? 2 : 3,
                backgroundColor: 'transparent',
                overflow: 'hidden',
                borderRadius: isMobile ? 2 : 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
        >
            {activity.isCancelled && (
                <Chip
                    sx={{
                        position: 'absolute',
                        left: isMobile ? 12 : 24,
                        top: isMobile ? 12 : 24,
                        zIndex: 1000,
                        fontWeight: 700,
                        fontSize: isSmallMobile ? '0.75rem' : '0.875rem',
                        px: isSmallMobile ? 1 : 2,
                        py: isSmallMobile ? 1.5 : 2.5,
                    }}
                    color="error"
                    label="CANCELLED"
                />
            )}

            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height={isMobile ? '250' : '400'}
                    image={`/images/categoryImages/${activity.category}.jpg`}
                    alt={`${activity.category} image`}
                    sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: isMobile ? 'none' : 'scale(1.05)',
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
                        p: isMobile ? 2 : 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? 1.5 : 3,
                    }}
                >
                    {/* Text Section */}
                    <Box>
                        <Typography
                            variant={isMobile ? 'h5' : 'h3'}
                            sx={{
                                fontWeight: 800,
                                mb: isMobile ? 0.5 : 1,
                                textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                                lineHeight: 1.2,
                            }}
                        >
                            {activity.title}
                        </Typography>
                        <Typography
                            variant={isMobile ? 'body2' : 'h6'}
                            sx={{
                                opacity: 0.95,
                                mb: isMobile ? 0.25 : 0.5,
                                fontWeight: 500,
                            }}
                        >
                            {formatDate(activity.date)}
                        </Typography>
                        <Typography
                            variant={isMobile ? 'caption' : 'body1'}
                            sx={{
                                fontWeight: 400,
                                display: 'block',
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

                    {/* Buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            gap: isMobile ? 1 : 3,
                            width: isMobile ? '100%' : '500px',
                            ml: isMobile ? 0 : 'auto',
                        }}
                    >
                        {activity.isHost ? (
                            <>
                                <StyledButton
                                    shapeTheme="contained"
                                    colorTheme={
                                        activity.isCancelled
                                            ? 'success'
                                            : 'error'
                                    }
                                    onClick={() =>
                                        updateAttendance.mutate(activity.id)
                                    }
                                    disabled={updateAttendance.isPending}
                                    fullWidth={isMobile}
                                >
                                    {activity.isCancelled
                                        ? 'Re-activate'
                                        : 'Cancel Activity'}
                                </StyledButton>
                                <StyledButton
                                    shapeTheme="contained"
                                    colorTheme="primary"
                                    component={Link as any}
                                    to={`/manage/${activity.id}`}
                                    disabled={activity.isCancelled}
                                    fullWidth={isMobile}
                                >
                                    Manage Event
                                </StyledButton>
                            </>
                        ) : (
                            <StyledButton
                                shapeTheme="contained"
                                colorTheme={
                                    activity.isGoing ? 'warning' : 'primary'
                                }
                                onClick={() =>
                                    updateAttendance.mutate(activity.id)
                                }
                                disabled={
                                    updateAttendance.isPending ||
                                    activity.isCancelled
                                }
                                fullWidth={isMobile}
                                sx={{
                                    px: isMobile ? 2 : 4,
                                }}
                            >
                                {activity.isGoing
                                    ? 'Cancel Attendance'
                                    : 'Join Activity'}
                            </StyledButton>
                        )}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}
