import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";

export default function ActivityDashboard() {
  return (
    <Grid container spacing={10}>
      <Grid size={7} sx={{ p: 2 }}>
        <ActivityList />
      </Grid>
      <Grid size={5}>Activity filters go here</Grid>
    </Grid>
  );
}
