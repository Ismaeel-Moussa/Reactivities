import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useActivities } from "../../lib/hooks/useActivities";

type Activity = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  isCancelled: boolean;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
};

type Props = {
  selectedActivity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
};

export default function ActivityDetails({
  selectedActivity,
  cancelSelectActivity,
  openForm,
}: Props) {
  const { activities } = useActivities();
  const activity = activities?.find((x) => x.id === selectedActivity.id);
  if (!activity) return <Typography>Loading...</Typography>;

  return (
    <Grid>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={`../../../public/images/categoryImages/${activity.category}.jpg`}
          alt={activity.title}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              {activity.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button onClick={() => openForm(activity.id)} variant="outlined">
                Edit
              </Button>
              <Button onClick={cancelSelectActivity} variant="outlined">
                Cancel
              </Button>
            </Stack>
          </Box>

          <Stack spacing={2} divider={<Divider flexItem />}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <EventIcon sx={{ mr: 1.5 }} />
              <Typography variant="body1">
                {new Date(activity.date).toDateString()}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <InfoOutlinedIcon sx={{ mr: 1.5, mt: 0.5 }} />
              <Typography variant="body1">{activity.description}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <LocationOnIcon sx={{ mr: 1.5 }} />
              <Typography variant="body1">
                {activity.venue}, {activity.city}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
