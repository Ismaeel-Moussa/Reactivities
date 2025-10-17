import { Event, FilterList } from "@mui/icons-material";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
  Divider,
  GlobalStyles,
} from "@mui/material";
import Calendar from "react-calendar";

const calendarGlobalStyles = (
  <GlobalStyles
    styles={`
 :root {
  --cal-font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  --cal-primary-color: #1976d2;
  --cal-primary-color-hover: #1565c0;
  --cal-text-color: #333;
  --cal-text-color-light: #666;
  --cal-text-color-faded: #b0b0b0;
  --cal-nav-bg-hover: #f0f0f0;
  --cal-tile-bg-hover: #e9e9e9;
  --cal-today-bg-hover: #e3f2fd;
  --cal-border-radius: 40px 10px;
  --cal-transition-speed: 0.3s;
}

/* --- General Calendar Styling --- */
.react-calendar {
  width: 100%;
  border: none;
  font-family: var(--cal-font-family);
  background-color: transparent;
  line-height: 1.5em;
}

/* --- Navigation Bar --- */
.react-calendar__navigation {
  display: flex;
  height: 44px;
  margin-bottom: 1em;
  align-items: center;
}

.react-calendar__navigation button {
  min-width: 44px;
  background: none;
  border: none;
  color: #555;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color var(--cal-transition-speed) ease;
  border-radius: var(--cal-border-radius);
}

.react-calendar__navigation button:hover {
  background-color: var(--cal-nav-bg-hover);
}

.react-calendar__navigation__label {
  flex-grow: 1 !important;
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--cal-text-color);
}

/* --- Day Tiles --- */
.react-calendar__month-view__weekdays__weekday {
  text-align: center;
  font-weight: 600;
  color: var(--cal-text-color-light);
  padding: 0.5em;
  text-decoration: none;
}

.react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: none;
  border: 1px solid transparent;
  color: var(--cal-text-color);
  cursor: pointer;
  border-radius: var(--cal-border-radius);
  transition: background-color var(--cal-transition-speed) ease,
    border-color var(--cal-transition-speed) ease;
}

.react-calendar__tile:hover {
  background-color: var(--cal-tile-bg-hover);
  border-color: #ddd;
}

/* --- Selected Day --- */
.react-calendar__tile--active {
  background-color: var(--cal-primary-color);
  color: white;
  border-color: var(--cal-primary-color);
}

.react-calendar__tile--active:hover {
  background-color: var(--cal-primary-color-hover);
  border-color: var(--cal-primary-color-hover);
}

/* --- Today's Date --- */
.react-calendar__tile--now {
  background-color: transparent;
  font-weight: bold;
  border: 1px solid var(--cal-primary-color);
  color: var(--cal-primary-color);
}

.react-calendar__tile--now:hover {
  background-color: var(--cal-today-bg-hover);
}

/* --- Other Month Days --- */
.react-calendar__month-view__days__day--neighboringMonth {
  color: var(--cal-text-color-faded);
}


  `}
  />
);

export default function ActivityFilters() {
  return (
    <>
      {calendarGlobalStyles}
      <Stack spacing={3}>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              color: "primary.main",
            }}
          >
            <FilterList sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Filters
            </Typography>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <MenuList>
            <MenuItem selected>
              <ListItemText primary="All Activities" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm going" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="I'm hosting" />
            </MenuItem>
          </MenuList>
        </Paper>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              color: "primary.main",
            }}
          >
            <Event sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Select Date
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Calendar />
        </Paper>
      </Stack>
    </>
  );
}
