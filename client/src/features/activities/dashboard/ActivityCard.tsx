import React from 'react';
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
} from '@mui/material';
import { Link } from 'react-router';
import { AccessTime, Place, PersonOutline } from '@mui/icons-material';
import { formatDate } from '../../../lib/util/util';
import AvatarPopover from '../../../app/shared/components/AvatarPopover';

type Props = {
    activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
    const getStatusChips = () => {
        const chipsToShow = [];

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

        if (chipsToShow.length === 0) {
            return null;
        }

        return (
            <Box sx={{ mr: 2, mt: 1.5 }}>
                <Stack spacing={1.5} direction="row">
                    {chipsToShow}
                </Stack>
            </Box>
        );
    };

    return (
        <Card
            elevation={2}
            sx={{
                mb: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transform: 'translateY(-2px)',
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
                            width: 60,
                            height: 60,
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
                            fontSize: '1.1rem',
                            mb: 0.5,
                            color: 'text.primary',
                        }}
                    >
                        {activity.title}
                    </Typography>
                }
                subheader={
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
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
                sx={{ pb: 1 }}
            />

            <CardContent sx={{ pt: 1, pb: 2 }}>
                {/* Date and Location Info */}
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                bgcolor: 'rgba(32, 167, 172, 0.1)',
                            }}
                        >
                            <AccessTime
                                sx={{
                                    fontSize: '1.1rem',
                                    color: 'primary.main',
                                }}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, color: 'text.primary' }}
                        >
                            {formatDate(activity.date)}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                bgcolor: 'rgba(32, 167, 172, 0.1)',
                            }}
                        >
                            <Place
                                sx={{
                                    fontSize: '1.1rem',
                                    color: 'primary.main',
                                }}
                            />
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, color: 'text.primary' }}
                        >
                            {activity.venue}, {activity.city}
                        </Typography>
                    </Box>
                </Stack>

                {/* Attendees Section */}
                <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                        <PersonOutline
                            sx={{ fontSize: '1.1rem', color: 'text.secondary' }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: 'text.secondary' }}
                        >
                            Attendees: ( {activity.attendees.length} )
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        gap={1}
                        sx={{
                            bgcolor: 'rgba(32, 167, 172, 0.04)',
                            p: 2,
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
                        {activity.attendees.map((attendee) => (
                            <AvatarPopover
                                profile={attendee}
                                key={attendee.id}
                                sx={{
                                    width: 50,
                                    height: 50,
                                }}
                            />
                        ))}
                        {activity.attendees.length > 8 && (
                            <Avatar
                                sx={{
                                    bgcolor: 'primary.main',
                                    width: 40,
                                    height: 40,
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                }}
                            >
                                +{activity.attendees.length - 8}
                            </Avatar>
                        )}
                    </Box>
                </Box>
            </CardContent>

            <Divider />

            {/* Footer Section */}
            <CardActions
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2.5,
                    py: 2,
                }}
            >
                <Box display="flex" alignItems="center" gap={2} flex={1}>
                    <Chip
                        label={activity.category}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(32, 167, 172, 0.1)',
                            color: 'primary.main',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            border: '1px solid rgba(32, 167, 172, 0.3)',
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {activity.description}
                    </Typography>
                </Box>

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
                        px: 3,
                        boxShadow: 'none',
                        '&:hover': {
                            bgcolor: '#20787cff',
                            boxShadow: '0 4px 12px rgba(32, 167, 172, 0.3)',
                            transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease',
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}
