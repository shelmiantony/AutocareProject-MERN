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
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router";
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
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          height: 64,
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          px: 3,
        }}
      >
        <Typography>Autocare Pro</Typography>
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
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 16, fontWeight: 400 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
