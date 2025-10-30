import { CalendarToday, Info, Place } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';
import { formatDate } from '../../../lib/util/util';
import { useState } from 'react';
import MapComponent from '../../../app/shared/components/MapComponent';

type Props = {
    activity: Activity;
};

export default function ActivityDetailsInfo({ activity }: Props) {
    const [mapOpen, setMapOpen] = useState(false);

    return (
        <Card
            elevation={3}
            sx={{
                mb: 3,
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent sx={{ pb: 0 }}>
                <Stack spacing={0}>
                    {/* Description */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2.5,
                            p: 3,

                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 48,
                                height: 48,
                                borderRadius: 2,
                                background:
                                    'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                color: 'white',
                            }}
                        >
                            <Info sx={{ fontSize: 28 }} />
                        </Box>
                        <Box sx={{ flex: 1, pt: 0.5 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                    mb: 0.5,
                                    display: 'block',
                                }}
                            >
                                Description
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.primary',
                                    lineHeight: 1.7,
                                }}
                            >
                                {activity.description}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ height: 1, bgcolor: 'divider' }} />

                    {/* Date */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2.5,
                            p: 3,
                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 48,
                                height: 48,
                                borderRadius: 2,
                                background:
                                    'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                color: 'white',
                            }}
                        >
                            <CalendarToday sx={{ fontSize: 26 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                    mb: 0.5,
                                    display: 'block',
                                }}
                            >
                                Date & Time
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.primary',
                                    fontWeight: 500,
                                }}
                            >
                                {formatDate(activity.date)}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ height: 1, bgcolor: 'divider' }} />

                    {/* Location */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2.5,
                            p: 3,
                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 48,
                                height: 48,
                                borderRadius: 2,
                                background:
                                    'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                color: 'white',
                            }}
                        >
                            <Place sx={{ fontSize: 28 }} />
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                        mb: 0.5,
                                        display: 'block',
                                    }}
                                >
                                    Location
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 500,
                                    }}
                                >
                                    {activity.venue}, {activity.city}
                                </Typography>
                            </Box>
                            <Button
                                onClick={() => setMapOpen(!mapOpen)}
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 3,
                                    borderColor: '#0d9488',
                                    color: '#0d9488',
                                    '&:hover': {
                                        borderColor: '#0f766e',
                                        backgroundColor:
                                            'rgba(13, 148, 136, 0.08)',
                                    },
                                }}
                            >
                                {mapOpen ? 'Hide Map' : 'Show Map'}
                            </Button>
                        </Box>
                    </Box>
                </Stack>

                {/* Map Section */}
                {mapOpen && (
                    <Box
                        sx={{
                            height: 400,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <MapComponent
                            position={[activity.latitude, activity.longitude]}
                            venue={activity.venue}
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
