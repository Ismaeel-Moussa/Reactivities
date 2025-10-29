import { Grid } from '@mui/material';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';

export default function ActivityDashboard() {
    return (
        <Grid container spacing={10}>
            <Grid size={7}>
                <ActivityList />
            </Grid>
            <Grid
                size={5}
                sx={{ position: 'sticky', top: 100, alignSelf: 'flex-start' }}
            >
                <ActivityFilters />
            </Grid>
        </Grid>
    );
}
