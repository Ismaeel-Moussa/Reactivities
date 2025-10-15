import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);
  return (
    <>
      <Typography variant="h3">Reactivities</Typography>
      <List>
        {activities.map((act) => (
          <ListItem key={act.id}>
            <ListItemText>{act.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
