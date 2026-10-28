import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

import { logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import AppSnackbar from "../../components/AppSnackbar";
import { useAuth } from "../../context/AuthContext";
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
  const navigate = useNavigate();
  const { logout } = useAuth();
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

  const handleLogout = async () => {
    const res = await logoutUser();
    logout();
    setSnackbar({
      open: true,
      message: "Logout successful",
      severity: "success",
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
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
          Here’s what’s happening at your service center today.
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </Box>
  );
};

export default Dashboard;
