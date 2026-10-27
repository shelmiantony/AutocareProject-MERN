import { useEffect, useState } from "react";
import { getProfile } from "../../services/api";
import { Box, Typography, Paper, Button } from "@mui/material";
import { logoutUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import AppSnackbar from "../../components/AppSnackbar";
import { useAuth } from "../../context/AuthContext";
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
        <Typography variant="h4">Dashboard</Typography>

        <Typography>Welcome {user?.username}</Typography>

        <Typography>Email: {user?.email}</Typography>
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
