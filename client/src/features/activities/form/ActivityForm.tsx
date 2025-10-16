import {
  Paper,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  closeForm: () => void;
  activity?: Activity;
};

export default function ActivityForm({ closeForm, activity }: Props) {
  const { updateActivities, createActivities } = useActivities();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) {
      data.id = activity.id;
      await updateActivities.mutateAsync(data as unknown as Activity);
      closeForm();
    } else {
      await createActivities.mutateAsync(data as unknown as Activity);
      closeForm();
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
        >
          Create Activity
        </Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            defaultValue={activity?.title}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            defaultValue={activity?.description}
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            defaultValue={activity?.category}
          />
          <TextField
            fullWidth
            name="date"
            type="date"
            defaultValue={
              activity?.date
                ? new Date(activity?.date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            defaultValue={activity?.city}
          />
          <TextField
            fullWidth
            label="Venue"
            name="venue"
            defaultValue={activity?.venue}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={closeForm} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={
                updateActivities.isPending || createActivities.isPending
              }
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
