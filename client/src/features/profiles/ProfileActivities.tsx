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
} from '@mui/material';
import { Link, useParams } from 'react-router';
import { useProfile } from '../../lib/hooks/useProfile.ts';
import { formatDate } from '../../lib/util/util.ts';

export default function ProfileActivities() {
    const [activeTab, setActiveTab] = useState(0);
    const { id } = useParams();
    const { userActivities, setFilter, loadingUserActivities } = useProfile(id);

    useEffect(() => {
        if (id) {
            setFilter('future');
        }
    }, [id, setFilter]);

    const tabs = [
        { menuItem: 'Future Events', key: 'future' },
        { menuItem: 'Past Events', key: 'past' },
        { menuItem: 'Hosting', key: 'hosting' },
    ];

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabs[newValue].key);
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Tabs value={activeTab} onChange={handleTabChange}>
                        {tabs.map((tab) => (
                            <Tab label={tab.menuItem} key={tab.key} />
                        ))}
                    </Tabs>
                </Grid>
            </Grid>

            {(!userActivities || userActivities.length === 0) &&
            !loadingUserActivities ? (
                <Typography mt={2}>No activities to show</Typography>
            ) : null}

            <Grid
                container
                spacing={2}
                sx={{ py: 2, height: 400, overflow: 'auto' }}
            >
                {userActivities &&
                    userActivities.map((activity: Activity) => (
                        <Grid size={2.9} key={activity.id}>
                            <Link
                                to={`/activities/${activity.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Card elevation={4}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`/images/categoryImages/${activity.category}.jpg`}
                                        alt={activity.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            textAlign="center"
                                            mb={1}
                                            sx={{
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {activity.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            textAlign="center"
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <span>
                                                {formatDate(activity.date)}
                                            </span>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}
