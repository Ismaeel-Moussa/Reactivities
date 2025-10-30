import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useActivities } from '../../../lib/hooks/useActivities';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';
import ActivityDetailsSkeleton from './ActivityDetailsSkeleton';

export default function ActivityDetailPage() {
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity) return <ActivityDetailsSkeleton />;
    if (!activity) return <Typography>Activity not found</Typography>;

    return (
        <Grid container spacing={8}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChat />
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSidebar activity={activity} />
            </Grid>
        </Grid>
    );
}
