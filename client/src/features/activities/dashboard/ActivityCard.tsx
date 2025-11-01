import {
    Button,
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    CardHeader,
    Avatar,
    Divider,
    Stack,
    CardActions,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Link } from 'react-router';
import {
    AccessTime,
    Place,
    PersonOutline,
    Category,
    Visibility,
} from '@mui/icons-material';
import { formatDate } from '../../../lib/util/util';
import AvatarPopover from '../../../app/shared/components/AvatarPopover';

type Props = {
    activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const numberOfAttendeesToShow = isMobile ? 5 : 7;

    const getStatusChips = () => {
        const chipsToShow = [];

        if (activity.isHost) {
            chipsToShow.push(
                <Chip
                    key="host"
                    label="You're hosting"
                    size="small"
                    sx={{
                        bgcolor: '#e3f2fd',
                        color: '#2600ffff',
                        fontWeight: 600,
                        border: '1px solid #2600ffff',
                    }}
                />
            );
        } else if (activity.isGoing) {
            chipsToShow.push(
                <Chip
                    key="going"
                    label="You're going"
                    size="small"
                    sx={{
                        bgcolor: '#fff3e0',
                        color: '#c55504ff',
                        fontWeight: 600,
                        border: '1px solid #c55504ff',
                    }}
                />
            );
        }

        if (activity.isCancelled) {
            chipsToShow.push(
                <Chip
                    key="cancelled"
                    label="Cancelled"
                    color="error"
                    size="small"
                    sx={{ fontWeight: 600 }}
                />
            );
        }

        if (chipsToShow.length === 0) {
            return null;
        }

        return (
            <Box sx={{ mr: { xs: 0, sm: 2 }, my: { xs: 1 } }}>
                <Stack spacing={1} direction={'row'}>
                    {chipsToShow}
                </Stack>
            </Box>
        );
    };

    return (
        <Card
            elevation={2}
            sx={{
                mb: { xs: 2, md: 3 },
                borderRadius: { xs: 2, md: 3 },
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transform: { xs: 'none', md: 'translateY(-2px)' },
                    borderColor: 'primary.main',
                },
            }}
        >
            {/* Header Section */}
            <CardHeader
                avatar={
                    <Avatar
                        component={Link}
                        to={`/profiles/${activity.hostId}`}
                        sx={{
                            mb: { xs: 1 },
                            width: { xs: 50, md: 60 },
                            height: { xs: 50, md: 60 },
                            transition: 'transform 0.2s ease',
                            border: '3px solid',
                            borderColor: 'primary.main',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.08)',
                            },
                        }}
                        src={activity.hostImageUrl}
                        alt="host image"
                    />
                }
                action={getStatusChips()}
                title={
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            color: 'text.primary',
                        }}
                    >
                        {activity.title}
                    </Typography>
                }
                subheader={
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.813rem', md: '0.875rem' },
                            mt: 0.5,
                        }}
                    >
                        Hosted by{' '}
                        <Box
                            component={Link}
                            to={`/profiles/${activity.hostId}`}
                            sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            {activity.hostDisplayName}
                        </Box>
                    </Typography>
                }
                sx={{
                    pb: 1,
                    px: { xs: 2, md: 2 },
                    pt: { xs: 2, md: 2 },
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    '& .MuiCardHeader-action': {
                        mt: { xs: 1, sm: 0 },
                        mr: { xs: 0, sm: 0 },
                        alignSelf: { xs: 'flex-start', sm: 'auto' },
                    },
                }}
            />

            <CardContent
                sx={{
                    pt: 1,
                    pb: 2,
                    px: { xs: 2, md: 2 },
                }}
            >
                {/* Category, Date and Location Info */}
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                    {/* Category */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 32, md: 36 },
                                height: { xs: 32, md: 36 },
                                borderRadius: 2,
                                bgcolor: 'rgba(32, 167, 172, 0.1)',
                            }}
                        >
                            <Category
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    color: 'primary.main',
                                }}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: 'text.primary',
                                fontSize: { xs: '0.813rem', md: '0.875rem' },
                                textTransform: 'capitalize',
                            }}
                        >
                            {activity.category}
                        </Typography>
                    </Box>

                    {/* Date */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 32, md: 36 },
                                height: { xs: 32, md: 36 },
                                borderRadius: 2,
                                bgcolor: 'rgba(32, 167, 172, 0.1)',
                            }}
                        >
                            <AccessTime
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    color: 'primary.main',
                                }}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: 'text.primary',
                                fontSize: { xs: '0.813rem', md: '0.875rem' },
                            }}
                        >
                            {formatDate(activity.date)}
                        </Typography>
                    </Box>

                    {/* Location */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: { xs: 32, md: 36 },
                                height: { xs: 32, md: 36 },
                                borderRadius: 2,
                                bgcolor: 'rgba(32, 167, 172, 0.1)',
                            }}
                        >
                            <Place
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    color: 'primary.main',
                                }}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: 'text.primary',
                                fontSize: { xs: '0.813rem', md: '0.875rem' },
                            }}
                        >
                            {activity.venue}, {activity.city}
                        </Typography>
                    </Box>
                </Stack>

                {/* Attendees Section */}
                <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                        <PersonOutline
                            sx={{
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                color: 'text.secondary',
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: 'text.secondary',
                                fontSize: { xs: '0.813rem', md: '0.875rem' },
                            }}
                        >
                            Attendees: ( {activity.attendees.length} )
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        gap={1}
                        sx={{
                            bgcolor: 'rgba(32, 167, 172, 0.04)',
                            p: { xs: 1.5, md: 2 },
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'rgba(32, 167, 172, 0.1)',
                            overflowX: 'auto',
                            '&::-webkit-scrollbar': {
                                height: 6,
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(32, 167, 172, 0.3)',
                                borderRadius: 3,
                            },
                        }}
                    >
                        {activity.attendees
                            .slice(0, numberOfAttendeesToShow)
                            .map((attendee) => (
                                <AvatarPopover
                                    profile={attendee}
                                    key={attendee.id}
                                    sx={{
                                        width: { xs: 40, md: 50 },
                                        height: { xs: 40, md: 50 },
                                        flexShrink: 0,
                                    }}
                                />
                            ))}
                        {activity.attendees.length >
                            numberOfAttendeesToShow && (
                            <Avatar
                                sx={{
                                    color: 'white',
                                    bgcolor: 'primary.main',
                                    width: { xs: 40, md: 50 },
                                    height: { xs: 40, md: 50 },
                                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                                    fontWeight: 600,
                                    flexShrink: 0,
                                }}
                            >
                                +
                                {activity.attendees.length -
                                    numberOfAttendeesToShow}
                            </Avatar>
                        )}
                    </Box>
                </Box>

                {/* Description - Only visible on mobile, hidden on desktop */}
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.813rem',
                        mt: 2,
                        display: { xs: '-webkit-box', md: 'none' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {activity.description}
                </Typography>
            </CardContent>

            <Divider />

            {/* Footer Section */}
            <CardActions
                sx={{
                    justifyContent: { xs: 'center', md: 'space-between' },
                    alignItems: 'center',
                    px: { xs: 2, md: 2.5 },
                    py: { xs: 1.5, md: 2 },
                }}
            >
                {/* Description - Only visible on desktop */}
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        display: { xs: 'none', md: 'block' },
                        flex: 1,
                        mr: 2,
                    }}
                >
                    {activity.description}
                </Typography>

                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="medium"
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: { xs: 2, md: 3 },
                        py: { xs: 1, md: 1 },
                        fontSize: { xs: '0.875rem', md: '0.938rem' },
                        width: { xs: 'auto', md: 'auto' },
                        boxShadow: 'none',
                        '&:hover': {
                            bgcolor: '#20787cff',
                            boxShadow: '0 4px 12px rgba(32, 167, 172, 0.3)',
                            transform: { xs: 'none', md: 'translateY(-1px)' },
                        },
                        transition: 'all 0.2s ease',
                    }}
                >
                    <Visibility sx={{ mr: 1, fontSize: '1.3rem' }} />
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}
