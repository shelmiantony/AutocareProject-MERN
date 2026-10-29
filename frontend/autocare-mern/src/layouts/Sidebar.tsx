import { useState } from "react";
import {
  BarChartRounded,
  DashboardRounded,
  DirectionsCarRounded,
  EventNoteRounded,
  Inventory2Rounded,
  PeopleAltRounded,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { LogoutRounded } from "@mui/icons-material";

import { logoutUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import AppSnackbar from "../components/AppSnackbar";
const Sidebar = () => {
  const navItems = [
    { label: "Overview", path: "/home", icon: <DashboardRounded /> },
    {
      label: "Appointments",
      path: "/appointments",
      icon: <EventNoteRounded />,
    },
    { label: "Customers", path: "/customers", icon: <PeopleAltRounded /> },
    { label: "Vehicles", path: "/vehicles", icon: <DirectionsCarRounded /> },
    { label: "Inventory", path: "/inventory", icon: <Inventory2Rounded /> },
    { label: "Reports", path: "/reports", icon: <BarChartRounded /> },
  ];
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const navigate = useNavigate();
  const { logout } = useAuth();
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
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          height: 64,
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Autocare Pro
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LogoutRounded />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: 220,
            minHeight: "calc(100vh - 64px)",
            borderRight: "1px solid #ddd",
            p: 2,
          }}
        >
          <List component="nav" aria-label="workspace" sx={{ px: 1.75, py: 0 }}>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#e3f2fd" : "transparent",
                  })}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
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

export default Sidebar;
