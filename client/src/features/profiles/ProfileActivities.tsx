import { type SyntheticEvent, useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Tab,
    Tabs,
    Typography,
    Chip,
    alpha,
    Skeleton,
} from '@mui/material';
import { Link, useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile.ts';
import { formatDate } from '../../lib/util/util.ts';
import { CalendarMonth, EventBusy } from '@mui/icons-material';

export default function ProfileActivities() {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams();
    const { userActivities, setFilter, loadingUserActivities } = useProfile(id);

    useEffect(() => {
        setFilter('future');
    }, [setFilter]);

    const tabs = [
        { menuItem: 'Future Events', key: 'future', icon: <CalendarMonth /> },
        { menuItem: 'Past Events', key: 'past', icon: <EventBusy /> },
        { menuItem: 'Hosting', key: 'hosting', icon: <CalendarMonth /> },
    ];

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabs[newValue].key);
    };

    return (
        <Box>
            {/* Enhanced Tabs */}
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mb: 3,
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            minHeight: 48,
                        },
                        '& .Mui-selected': {
                            color: '#28969c',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#28969c',
                            height: 3,
                        },
                    }}
                >
                    {tabs.map((tab) => (
                        <Tab
                            label={tab.menuItem}
                            key={tab.key}
                            icon={tab.icon}
                            iconPosition="start"
                        />
                    ))}
                </Tabs>
            </Box>

            {/* Loading State */}
            {loadingUserActivities && (
                <Grid container spacing={2}>
                    {[1, 2, 3, 4].map((item) => (
                        <Grid size={3} key={item}>
                            <Card>
                                <Skeleton variant="rectangular" height={140} />
                                <CardContent>
                                    <Skeleton width="80%" />
                                    <Skeleton width="60%" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Empty State */}
            {(!userActivities || userActivities.length === 0) &&
                !loadingUserActivities && (
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
                        <EventBusy
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
                            No activities to show
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Check back later for upcoming events
                        </Typography>
                    </Box>
                )}

            {/* Activities Grid */}
            <Box
                sx={{
                    maxHeight: 395,
                    overflow: 'auto',
                    pr: 2,
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
                <Grid container spacing={2}>
                    {userActivities &&
                        userActivities.map((activity: Activity) => (
                            <Grid size={3} key={activity.id}>
                                <Link
                                    to={`/activities/${activity.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Card
                                        elevation={0.8}
                                        sx={{
                                            height: '100%',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 2,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow:
                                                    '0 8px 24px rgba(0,0,0,0.12)',
                                                borderColor: '#28969c',
                                            },
                                        }}
                                    >
                                        <Box sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={`/images/categoryImages/${activity.category}.jpg`}
                                                alt={activity.title}
                                                sx={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            {/* Category Badge */}
                                            <Chip
                                                label={activity.category}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    bgcolor: alpha(
                                                        '#fff',
                                                        0.95
                                                    ),
                                                    color: '#28969c',
                                                    fontWeight: 700,
                                                    fontSize: '0.7rem',
                                                    textTransform: 'uppercase',
                                                    backdropFilter: 'blur(4px)',
                                                }}
                                            />
                                        </Box>
                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    fontWeight: 700,
                                                    fontSize: '1rem',
                                                    mb: 1,
                                                    color: 'text.primary',
                                                }}
                                            >
                                                {activity.title}
                                            </Typography>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                gap={0.5}
                                            >
                                                <CalendarMonth
                                                    sx={{
                                                        fontSize: '0.9rem',
                                                        color: '#28969c',
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {formatDate(activity.date)}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </Box>
    );
}
