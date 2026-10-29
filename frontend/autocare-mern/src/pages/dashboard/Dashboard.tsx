import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

import AppSnackbar from "../../components/AppSnackbar";
import { getProfile } from "../../services/api";
interface User {
  _id: string;
  username: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);
  const today = new Date();
  const formatedToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Box p={4}>
      <Paper sx={{ p: 3 }}>
        <Typography
          variant="overline"
          sx={{
            fontWeight: 700,
            color: "#788492",
            letterSpacing: 1.2,
            fontSize: 10,
          }}
        >
          ● &nbsp;{formatedToday}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: "-1px",
            mt: 0.4,
            fontSize: { xs: 22, sm: 27 },
          }}
        >
          Good morning, {user?.username}
        </Typography>

        <Typography variant="body2" color="#788492" sx={{ mt: 0.5 }}>
          Welcome back! Here's what's happening today.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
