import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity: Activity;
  selectActivity: (id: string) => void;
};

export default function ActivityCard({ activity, selectActivity }: Props) {
  const { deleteActivity } = useActivities();
  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          {activity.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            mb: 1.5,
          }}
        >
          <EventIcon sx={{ mr: 1, fontSize: "1rem" }} />
          <Typography variant="body2">
            {new Date(activity.date).toDateString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          {activity.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <LocationOnIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
          <Typography variant="body2">
            {activity.venue}, {activity.city}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Chip label={activity.category} variant="outlined" />
        <Box display="flex" gap={1}>
          <Button
            onClick={() => deleteActivity.mutate(activity.id)}
            disabled={deleteActivity.isPending}
            size="small"
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button
            onClick={() => selectActivity(activity.id)}
            size="small"
            variant="contained"
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
