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
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading...</Typography>;
  if (!activity) return <Typography>Activity not found</Typography>;

  return (
    <Grid>
      <Card>
        <CardMedia
          component="img"
          image={`/images/categoryImages/${activity.category}.jpg`}
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
              <Button
                component={Link}
                to={`/manage/${activity.id}`}
                variant="outlined"
                color="primary"
              >
                Edit
              </Button>
              <Button
                onClick={() => navigate("/activities")}
                variant="outlined"
                color="inherit"
              >
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
