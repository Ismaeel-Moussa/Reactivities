import {
  Paper,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import type { FormEvent } from "react";

type Props = {
  closeForm: () => void;
  activity?: Activity;
  submitForm: (activity: Activity) => void;
};

export default function ActivityForm({
  closeForm,
  activity,
  submitForm,
}: Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) data.id = activity.id;
    console.log(data);

    submitForm(data as unknown as Activity);
  }

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
            value={activity?.title}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={activity?.description}
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={activity?.category}
          />
          <TextField
            fullWidth
            name="date"
            type="date"
            value={activity?.date.split("T")[0]}
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={activity?.city}
          />
          <TextField
            fullWidth
            label="Venue"
            name="venue"
            value={activity?.venue}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={closeForm} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
