import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
  return (
    <Grid container spacing={10}>
      <Grid size={7} mt={2}>
        <ActivityList />
      </Grid>
      <Grid size={5} mt={2}>
        <ActivityFilters />
      </Grid>
    </Grid>
  );
}
