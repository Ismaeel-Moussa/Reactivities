import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import ActivityCard from './ActivityCard';
import { useActivities } from '../../../lib/hooks/useActivities';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ActivityCardSkeleton from './ActivityCardSkeleton';

const ActivityList = observer(() => {
    const { activitiesGroup, isLoading, hasNextPage, fetchNextPage } =
        useActivities();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { ref, inView } = useInView({
        threshold: isMobile ? 0 : 0.5,
        rootMargin: isMobile ? '200px' : '100px',
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

    const allActivities = activitiesGroup.pages.flatMap((page) => page.items);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            {allActivities.map((activity, index) => (
                <Box
                    key={activity.id}
                    ref={index === allActivities.length - 1 ? ref : null}
                >
                    <ActivityCard activity={activity} />
                </Box>
            ))}
        </Box>
    );
});

export default ActivityList;
