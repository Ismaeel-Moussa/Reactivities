import { Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (isLoadingActivity) return <ActivityDetailsSkeleton />;
    if (!activity) return <Typography>Activity not found</Typography>;

    return (
        <Grid container spacing={isMobile ? 2 : 8}>
            <Grid size={{ xs: 12, md: 8 }}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                {!isMobile && <ActivityDetailsChat />}
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <ActivityDetailsSidebar activity={activity} />
            </Grid>
            {isMobile && (
                <Grid size={12}>
                    <ActivityDetailsChat />
                </Grid>
            )}
        </Grid>
    );
}
