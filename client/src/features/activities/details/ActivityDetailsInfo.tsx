import { CalendarToday, Info, Place } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { formatDate } from '../../../lib/util/util';
import { useState } from 'react';
import MapComponent from '../../../app/shared/components/MapComponent';

type Props = {
    activity: Activity;
};

export default function ActivityDetailsInfo({ activity }: Props) {
    const [mapOpen, setMapOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Card
            elevation={3}
            sx={{
                mb: isMobile ? 2 : 3,
                borderRadius: isMobile ? 2 : 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent style={{ paddingBottom: 0, padding: 12 }}>
                <Stack>
                    {/* Description */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: isMobile ? 1.5 : 2.5,
                            p: isMobile ? 2 : 3,
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
                                minWidth: isMobile ? 40 : 48,
                                height: isMobile ? 40 : 48,
                                borderRadius: 2,
                                background:
                                    'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                color: 'white',
                            }}
                        >
                            <Info sx={{ fontSize: isMobile ? 24 : 28 }} />
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
                                    fontSize: isMobile ? '0.7rem' : '0.75rem',
                                }}
                            >
                                Description
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.primary',
                                    lineHeight: 1.7,
                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                }}
                            >
                                {activity.description}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Date */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: isMobile ? 1.5 : 2.5,
                            p: isMobile ? 2 : 3,
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
                                minWidth: isMobile ? 40 : 48,
                                height: isMobile ? 40 : 48,
                                borderRadius: 2,
                                background:
                                    'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                color: 'white',
                            }}
                        >
                            <CalendarToday
                                sx={{ fontSize: isMobile ? 22 : 26 }}
                            />
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
                                    fontSize: isMobile ? '0.7rem' : '0.75rem',
                                }}
                            >
                                Date & Time
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.primary',
                                    fontWeight: 500,
                                    fontSize: isMobile ? '0.9rem' : '1rem',
                                }}
                            >
                                {formatDate(activity.date)}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Location */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: isMobile ? 'flex-start' : 'center',
                            flexDirection: isMobile ? 'column' : 'row',
                            justifyContent: 'space-between',
                            gap: isMobile ? 1.5 : 2.5,
                            p: isMobile ? 2 : 3,
                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: isMobile ? 1.5 : 2.5,
                                width: isMobile ? '100%' : 'auto',
                                flex: 1, // Takes available space
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: isMobile ? 40 : 48,
                                    height: isMobile ? 40 : 48,

                                    borderRadius: 2,
                                    background:
                                        'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                                    color: 'white',
                                }}
                            >
                                <Place sx={{ fontSize: isMobile ? 24 : 28 }} />
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
                                        fontSize: isMobile
                                            ? '0.7rem'
                                            : '0.75rem',
                                    }}
                                >
                                    Location
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 500,
                                        fontSize: isMobile ? '0.9rem' : '1rem',
                                    }}
                                >
                                    {activity.venue}, {activity.city}
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            onClick={() => setMapOpen(!mapOpen)}
                            variant="outlined"
                            fullWidth={isMobile}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: isMobile ? 2 : 3,
                                py: isMobile ? 1 : 'auto',
                                borderColor: '#0d9488',
                                color: '#0d9488',
                                fontSize: isMobile ? '0.85rem' : '0.9rem',
                                '&:hover': {
                                    borderColor: '#0f766e',
                                    backgroundColor: 'rgba(13, 148, 136, 0.08)',
                                },
                            }}
                        >
                            {mapOpen ? 'Hide Map' : 'Show Map'}
                        </Button>
                    </Box>
                </Stack>

                {/* Map Section */}
                {mapOpen && (
                    <Box>
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
