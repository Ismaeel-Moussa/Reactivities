import { Box, Typography } from '@mui/material';
import ActivityCard from './ActivityCard';
import { useActivities } from '../../../lib/hooks/useActivities';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ActivityCardSkeleton from './ActivityCardSkeleton';

const ActivityList = observer(() => {
    const { activitiesGroup, isLoading, hasNextPage, fetchNextPage } =
        useActivities();
    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <ActivityCardSkeleton />
                <ActivityCardSkeleton />
            </Box>
        );
    }

    if (!activitiesGroup) return <Typography>No activities found</Typography>;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            {activitiesGroup.pages.map((activities, index) => (
                <Box
                    key={index}
                    ref={
                        index === activitiesGroup.pages.length - 1 ? ref : null
                    }
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {activities.items.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </Box>
            ))}
        </Box>
    );
});

export default ActivityList;
