import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

interface Appointment {
  id: number;
  initials: string;
  name: string;
  vehicle: string;
  service: string;
  time: string;
  status: "In progress" | "Checked in" | "Awaiting";
  color: string;
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    initials: "JM",
    name: "Jordan Mitchell",
    vehicle: "2022 Toyota Camry",
    service: "Oil change",
    time: "09:30 AM",
    status: "In progress",
    color: "#f6ded3",
  },
  {
    id: 2,
    initials: "SC",
    name: "Sofia Chen",
    vehicle: "2021 Honda CR-V",
    service: "Brake inspection",
    time: "10:15 AM",
    status: "Checked in",
    color: "#eee7fb",
  },
  {
    id: 3,
    initials: "RW",
    name: "Ryan Walker",
    vehicle: "2023 Ford F-150",
    service: "Tire rotation",
    time: "11:00 AM",
    status: "Awaiting",
    color: "#e4eefc",
  },
  {
    id: 4,
    initials: "AP",
    name: "Ava Patel",
    vehicle: "2020 Mazda CX-5",
    service: "Annual service",
    time: "11:45 AM",
    status: "Checked in",
    color: "#e3f2e9",
  },
];

const navItems = [
  { label: "Overview", icon: <DashboardRoundedIcon /> },
  { label: "Appointments", icon: <EventNoteRoundedIcon /> },
  { label: "Customers", icon: <PeopleAltRoundedIcon /> },
  { label: "Vehicles", icon: <DirectionsCarRoundedIcon /> },
  { label: "Inventory", icon: <Inventory2RoundedIcon /> },
  { label: "Reports", icon: <BarChartRoundedIcon /> },
];

const ink = "#25313d";
const muted = "#788492";
const orange = "#ed754a";

function MetricCard({
  title,
  value,
  change,
  detail,
  children,
  icon,
}: {
  title: string;
  value: string;
  change?: string;
  detail: string;
  children?: ReactNode;
  icon: ReactNode;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.2,
        borderColor: "#e9edf1",
        borderRadius: 3,
        minHeight: 153,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color={muted} fontWeight={600}>
          {title}
        </Typography>
        <Avatar
          sx={{
            width: 34,
            height: 34,
            bgcolor: "#fff0e9",
            color: orange,
            borderRadius: 2,
          }}
        >
          {icon}
        </Avatar>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.4 }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: 26,
            fontWeight: 750,
            letterSpacing: "-.8px",
            color: ink,
          }}
        >
          {value}
        </Typography>
        {change && (
          <Chip
            size="small"
            icon={<ArrowUpwardRoundedIcon />}
            label={change}
            sx={{
              height: 22,
              bgcolor: "#edf8f2",
              color: "#388765",
              fontWeight: 700,
              "& .MuiChip-icon": { color: "inherit", fontSize: 14 },
            }}
          />
        )}
      </Stack>
      <Typography
        variant="caption"
        color={muted}
        display="block"
        sx={{ mt: 0.4 }}
      >
        {detail}
      </Typography>
      {children}
    </Paper>
  );
}

function App() {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeNav, setActiveNav] = useState("Overview");
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const filteredAppointments = useMemo(
    () =>
      appointments.filter((item) =>
        `${item.name} ${item.vehicle} ${item.service}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [appointments, query],
  );

  const addAppointment = () => {
    setAppointments((current) => [
      ...current,
      {
        id: Date.now(),
        initials: "NB",
        name: "New booking",
        vehicle: "Vehicle details pending",
        service: "Service to be confirmed",
        time: "12:30 PM",
        status: "Awaiting",
        color: "#e4eefc",
      },
    ]);
    setNotice("Appointment added to today’s schedule.");
  };

  const sidebar = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: 1.5,
        py: 2.5,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.2}
        sx={{ px: 1, mb: 4 }}
      >
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: orange,
            width: 38,
            height: 38,
            borderRadius: 2,
            fontWeight: 800,
          }}
        >
          ✦
        </Avatar>
        {!smallScreen && (
          <Box>
            <Typography fontWeight={800} color={ink} lineHeight={1}>
              autocare
            </Typography>
            <Typography
              variant="overline"
              color={muted}
              sx={{ fontSize: 9, letterSpacing: 1.5 }}
            >
              DEALERSHIP
            </Typography>
          </Box>
        )}
      </Stack>
      {!smallScreen && (
        <Typography
          variant="overline"
          sx={{
            px: 1.5,
            color: "#a0a9b3",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.3,
            mb: 1,
          }}
        >
          WORKSPACE
        </Typography>
      )}
      <List disablePadding sx={{ display: "grid", gap: 0.5 }}>
        {navItems.map(({ label, icon }) => (
          <ListItemButton
            key={label}
            selected={activeNav === label}
            onClick={() => setActiveNav(label)}
            sx={{
              minHeight: 44,
              borderRadius: 2,
              px: 1.3,
              color: activeNav === label ? orange : muted,
              "&.Mui-selected": { bgcolor: "#fff1eb", color: orange },
              "&.Mui-selected:hover": { bgcolor: "#ffebe2" },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: smallScreen ? 0 : 36,
                color: "inherit",
                justifyContent: smallScreen ? "center" : "flex-start",
              }}
            >
              {icon}
            </ListItemIcon>
            {!smallScreen && (
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: activeNav === label ? 700 : 500,
                }}
              />
            )}
            {!smallScreen && label === "Appointments" && (
              <Chip
                label="8"
                size="small"
                sx={{ height: 21, fontSize: 10, bgcolor: "#f1f3f5" }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ mt: "auto" }}>
        {!smallScreen && (
          <Paper
            variant="outlined"
            sx={{
              p: 1.7,
              mb: 2,
              borderRadius: 2.5,
              bgcolor: "#fafafa",
              borderColor: "#eff1f3",
            }}
          >
            <BuildRoundedIcon sx={{ color: orange, mb: 0.6 }} />
            <Typography fontWeight={700} fontSize={13}>
              Need a hand?
            </Typography>
            <Typography
              variant="caption"
              color={muted}
              display="block"
              sx={{ my: 0.8, lineHeight: 1.6 }}
            >
              Our support team is just a message away.
            </Typography>
            <Button
              size="small"
              onClick={() => setNotice("Our support team will be in touch.")}
              sx={{
                p: 0,
                minWidth: 0,
                color: orange,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Contact support ↗
            </Button>
          </Paper>
        )}
        <ListItemButton
          onClick={() => setActiveNav("Settings")}
          sx={{ minHeight: 42, borderRadius: 2, color: muted, px: 1.3 }}
        >
          <ListItemIcon
            sx={{
              minWidth: smallScreen ? 0 : 36,
              color: "inherit",
              justifyContent: smallScreen ? "center" : "flex-start",
            }}
          >
            <SettingsRoundedIcon />
          </ListItemIcon>
          {!smallScreen && (
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ fontSize: 13 }}
            />
          )}
        </ListItemButton>
        <Divider sx={{ my: 1.7 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{ px: 0.5 }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "#f4dfd4",
              color: "#9c593a",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            AM
          </Avatar>
          {!smallScreen && (
            <>
              <Box sx={{ flex: 1 }}>
                <Typography fontSize={12} fontWeight={700}>
                  Alex Morgan
                </Typography>
                <Typography variant="caption" color={muted}>
                  Service manager
                </Typography>
              </Box>
              <IconButton size="small" aria-label="Profile options">
                <MoreHorizRoundedIcon />
              </IconButton>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7f8fa", color: ink }}>
      <Drawer
        variant="permanent"
        sx={{
          width: smallScreen ? 72 : 246,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: smallScreen ? 72 : 246,
            boxSizing: "border-box",
            borderRight: "1px solid #e9edf1",
            bgcolor: "#fff",
          },
        }}
      >
        {sidebar}
      </Drawer>
      <Box
        component="main"
        sx={{ ml: smallScreen ? "72px" : "246px", minWidth: 0 }}
      >
        <Box
          component="header"
          sx={{ bgcolor: "#fff", borderBottom: "1px solid #e9edf1" }}
        >
          <Toolbar
            sx={{
              minHeight: "70px !important",
              px: { xs: 2, md: 4 },
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" color={muted}>
              Workspace{" "}
              <Box component="span" sx={{ px: 1, color: "#c2c8ce" }}>
                /
              </Box>
              <Box component="strong" sx={{ color: ink, fontWeight: 600 }}>
                {activeNav}
              </Box>
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 1, sm: 2 }}
            >
              <TextField
                size="small"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search anything..."
                inputProps={{ "aria-label": "Search dashboard" }}
                sx={{
                  width: { xs: 150, sm: 230 },
                  "& .MuiOutlinedInput-root": {
                    height: 36,
                    bgcolor: "#fff",
                    fontSize: 12,
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon
                        fontSize="small"
                        sx={{ color: "#9aa3ad" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Tooltip title="Notifications">
                <IconButton
                  aria-label="Notifications"
                  onClick={() => setNotice("You’re all caught up!")}
                >
                  <Badge variant="dot" color="error">
                    <NotificationsNoneRoundedIcon sx={{ color: "#697582" }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Avatar
                sx={{
                  width: 31,
                  height: 31,
                  bgcolor: "#f4dfd4",
                  color: "#9c593a",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                AM
              </Avatar>
            </Stack>
          </Toolbar>
        </Box>
        <Box sx={{ maxWidth: 1500, mx: "auto", p: { xs: 2, sm: 3, lg: 4 } }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: muted,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  fontSize: 10,
                }}
              >
                ● &nbsp;TUESDAY, OCTOBER 24, 2024
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mt: 0.4,
                  fontSize: { xs: 22, sm: 27 },
                  fontWeight: 800,
                  letterSpacing: "-1px",
                }}
              >
                Good morning, Alex{" "}
                <Box component="span" sx={{ color: "#f4a451", fontSize: 20 }}>
                  ✦
                </Box>
              </Typography>
              <Typography variant="body2" color={muted} sx={{ mt: 0.5 }}>
                Here’s what’s happening at your service center today.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={addAppointment}
              sx={{
                bgcolor: orange,
                whiteSpace: "nowrap",
                boxShadow: "none",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { bgcolor: "#d9633a", boxShadow: "none" },
              }}
            >
              New appointment
            </Button>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2,minmax(0,1fr))",
                xl: "repeat(4,minmax(0,1fr))",
              },
              gap: 1.8,
              mb: 2,
            }}
          >
            <MetricCard
              title="Today’s appointments"
              value="24"
              change="12.5%"
              detail="vs. 21 appointments yesterday"
              icon={<EventNoteRoundedIcon fontSize="small" />}
            />
            <MetricCard
              title="Vehicles in service"
              value="18"
              change="8.2%"
              detail="6 bays currently available"
              icon={<DirectionsCarRoundedIcon fontSize="small" />}
            >
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{
                  mt: 1.3,
                  height: 5,
                  borderRadius: 4,
                  bgcolor: "#f0edff",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#9380dc",
                    borderRadius: 4,
                  },
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 0.4 }}
              >
                <Typography variant="caption" color={muted}>
                  Bay capacity
                </Typography>
                <Typography variant="caption" fontWeight={700}>
                  75%
                </Typography>
              </Stack>
            </MetricCard>
            <MetricCard
              title="Service revenue"
              value="$8,420"
              change="18.4%"
              detail="vs. $7,110 same day last week"
              icon={<PaidRoundedIcon fontSize="small" />}
            >
              <Box
                sx={{
                  mt: 1.2,
                  height: 22,
                  display: "flex",
                  alignItems: "end",
                  gap: 0.5,
                }}
              >
                {[8, 13, 10, 15, 11, 19, 14, 22, 17, 24, 20, 29].map(
                  (height, index) => (
                    <Box
                      key={index}
                      sx={{
                        height,
                        flex: 1,
                        bgcolor: index === 11 ? "#57b38c" : "#c8e9d9",
                        borderRadius: "3px 3px 0 0",
                      }}
                    />
                  ),
                )}
              </Box>
            </MetricCard>
            <MetricCard
              title="Customer satisfaction"
              value="4.8 / 5"
              detail="Based on 186 reviews this month"
              icon={<StarRoundedIcon fontSize="small" />}
            >
              <Stack
                direction="row"
                spacing={0.1}
                sx={{ mt: 0.8, color: "#efae45" }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarRoundedIcon key={star} sx={{ fontSize: 15 }} />
                ))}
                <Typography variant="caption" color={muted} sx={{ ml: 0.7 }}>
                  Happy customers
                </Typography>
              </Stack>
            </MetricCard>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0,1.7fr) minmax(280px,1fr)",
              },
              gap: 1.8,
              mb: 2,
            }}
          >
            <Paper
              variant="outlined"
              sx={{ p: 2.2, borderColor: "#e9edf1", borderRadius: 3 }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={750}>Service performance</Typography>
                  <Typography variant="caption" color={muted}>
                    Revenue overview across your service center
                  </Typography>
                </Box>
                <Chip label="This week　⌄" variant="outlined" size="small" />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 2 }}
              >
                <Typography variant="h5" fontWeight={800}>
                  $42,580
                </Typography>
                <Chip
                  size="small"
                  icon={<ArrowUpwardRoundedIcon />}
                  label="14.8%"
                  sx={{
                    bgcolor: "#edf8f2",
                    color: "#388765",
                    "& .MuiChip-icon": { color: "inherit", fontSize: 14 },
                  }}
                />
                <Typography variant="caption" color={muted}>
                  vs. last week
                </Typography>
              </Stack>
              <Box
                sx={{
                  height: 175,
                  mt: 1.5,
                  position: "relative",
                  background:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 33px, #edf0f2 34px)",
                }}
              >
                <Box
                  component="svg"
                  viewBox="0 0 700 175"
                  preserveAspectRatio="none"
                  sx={{ width: "100%", height: "100%", overflow: "visible" }}
                >
                  <defs>
                    <linearGradient
                      id="revenueFill"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={orange} stopOpacity=".22" />
                      <stop offset="100%" stopColor={orange} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 132 C35 120 53 133 88 111 S140 105 175 119 S230 88 263 94 S315 76 350 92 S405 58 438 70 S490 49 525 66 S580 32 613 47 S668 16 700 24 V175 H0Z"
                    fill="url(#revenueFill)"
                  />
                  <path
                    d="M0 132 C35 120 53 133 88 111 S140 105 175 119 S230 88 263 94 S315 76 350 92 S405 58 438 70 S490 49 525 66 S580 32 613 47 S668 16 700 24"
                    fill="none"
                    stroke={orange}
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ position: "absolute", bottom: -19, left: 0, right: 0 }}
                >
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <Typography key={day} variant="caption" color={muted}>
                        {day}
                      </Typography>
                    ),
                  )}
                </Stack>
              </Box>
            </Paper>
            <Paper
              variant="outlined"
              sx={{ p: 2.2, borderColor: "#e9edf1", borderRadius: 3 }}
            >
              <Typography fontWeight={750}>Service breakdown</Typography>
              <Typography variant="caption" color={muted}>
                Jobs completed this week
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                sx={{ py: 2.2 }}
              >
                <Box
                  sx={{
                    width: 126,
                    height: 126,
                    borderRadius: "50%",
                    background:
                      "conic-gradient(#f17a4b 0 54%,#9380dc 54% 82%,#75a9df 82% 100%)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 94,
                      height: 94,
                      borderRadius: "50%",
                      bgcolor: "#fff",
                      display: "grid",
                      placeContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h5" fontWeight={800}>
                      146
                    </Typography>
                    <Typography variant="caption" color={muted}>
                      Total jobs
                    </Typography>
                  </Box>
                </Box>
                <Stack spacing={1.5}>
                  {[
                    ["#f17a4b", "Maintenance", "54%"],
                    ["#9380dc", "Repairs", "28%"],
                    ["#75a9df", "Diagnostics", "18%"],
                  ].map(([color, label, amount]) => (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      key={label}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: 1,
                          bgcolor: color,
                        }}
                      />
                      <Typography
                        variant="caption"
                        color={muted}
                        sx={{ minWidth: 72 }}
                      >
                        {label}
                      </Typography>
                      <Typography variant="caption" fontWeight={700}>
                        {amount}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Alert
                severity="info"
                icon={<BuildRoundedIcon fontSize="small" />}
                sx={{
                  py: 0,
                  bgcolor: "#fff7f2",
                  color: "#525b65",
                  "& .MuiAlert-icon": { color: orange },
                  "& .MuiAlert-message": { fontSize: 11 },
                }}
              >
                <b>Maintenance is up 12%</b> compared to last week
              </Alert>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0,1.7fr) minmax(280px,1fr)",
              },
              gap: 1.8,
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                borderColor: "#e9edf1",
                borderRadius: 3,
                p: 2.2,
                overflow: "hidden",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Box>
                  <Typography fontWeight={750}>
                    Upcoming appointments{" "}
                    <Chip
                      label={filteredAppointments.length}
                      size="small"
                      sx={{ ml: 0.6, height: 19, fontSize: 10 }}
                    />
                  </Typography>
                  <Typography variant="caption" color={muted}>
                    Your service schedule for today
                  </Typography>
                </Box>
                <Button
                  size="small"
                  onClick={() => setActiveNav("Appointments")}
                  sx={{ color: orange, textTransform: "none", fontWeight: 700 }}
                >
                  View schedule →
                </Button>
              </Stack>
              <Box sx={{ overflowX: "auto" }}>
                <Table size="small" sx={{ minWidth: 590 }}>
                  <TableHead>
                    <TableRow>
                      {[
                        "CUSTOMER & VEHICLE",
                        "SERVICE",
                        "TIME",
                        "STATUS",
                        "",
                      ].map((heading) => (
                        <TableCell
                          key={heading}
                          sx={{
                            color: "#97a1ac",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: ".5px",
                            borderBottomColor: "#edf0f2",
                            px: 1,
                          }}
                        >
                          {heading}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments.map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell sx={{ px: 1 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Avatar
                              sx={{
                                width: 30,
                                height: 30,
                                bgcolor: item.color,
                                color: "#53606c",
                                fontSize: 9,
                                fontWeight: 700,
                              }}
                            >
                              {item.initials}
                            </Avatar>
                            <Box>
                              <Typography fontSize={11} fontWeight={700}>
                                {item.name}
                              </Typography>
                              <Typography variant="caption" color={muted}>
                                {item.vehicle}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 11, color: "#626d79" }}>
                          {item.service}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11, fontWeight: 600 }}>
                          {item.time}
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={item.status}
                            sx={{
                              height: 23,
                              fontSize: 10,
                              bgcolor:
                                item.status === "In progress"
                                  ? "#fff4e9"
                                  : item.status === "Checked in"
                                    ? "#edf6fc"
                                    : "#f2effa",
                              color:
                                item.status === "In progress"
                                  ? "#c97843"
                                  : item.status === "Checked in"
                                    ? "#568fbb"
                                    : "#8d77cf",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            aria-label={`More options for ${item.name}`}
                          >
                            <MoreHorizRoundedIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredAppointments.length === 0 && (
                  <Typography align="center" color={muted} sx={{ p: 4 }}>
                    No appointments match “{query}”.
                  </Typography>
                )}
              </Box>
            </Paper>
            <Paper
              variant="outlined"
              sx={{ borderColor: "#e9edf1", borderRadius: 3, p: 2.2 }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={750}>Recent activity</Typography>
                  <Typography variant="caption" color={muted}>
                    Latest updates from your team
                  </Typography>
                </Box>
                <IconButton size="small" aria-label="More activity options">
                  <MoreHorizRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={2.2} sx={{ mt: 2.5 }}>
                {[
                  {
                    icon: <CheckCircleRoundedIcon />,
                    color: "#e9f6ef",
                    tint: "#54a87d",
                    text: (
                      <>
                        <b>Emma Wilson</b> completed a service
                      </>
                    ),
                    sub: "2021 Subaru Outback · Oil change",
                    time: "12 min ago",
                  },
                  {
                    icon: <PersonAddAltRoundedIcon />,
                    color: "#f0edfc",
                    tint: "#8975d1",
                    text: (
                      <>
                        New customer <b>Oliver James</b> added
                      </>
                    ),
                    sub: "2024 Hyundai Tucson",
                    time: "38 min ago",
                  },
                  {
                    icon: <PaidRoundedIcon />,
                    color: "#fff2e8",
                    tint: "#e89156",
                    text: (
                      <>
                        Payment received <b>$385.00</b>
                      </>
                    ),
                    sub: "Invoice #INV-2048 · Sofia Chen",
                    time: "1 hour ago",
                  },
                ].map((item) => (
                  <Stack direction="row" spacing={1.2} key={item.time}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: item.color,
                        color: item.tint,
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 11, color: "#6f7984", lineHeight: 1.5 }}
                      >
                        {item.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color={muted}
                      >
                        {item.sub}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ color: "#a4adb6", mt: 0.4 }}
                      >
                        {item.time}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
              <Button
                size="small"
                onClick={() => setActiveNav("Reports")}
                sx={{
                  mt: 2,
                  p: 0,
                  color: orange,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                View all activity →
              </Button>
            </Paper>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ pt: 2.5, color: "#a4adb6" }}
          >
            <Typography variant="caption">
              © 2024 Autocare Dealership
            </Typography>
            <Stack direction="row" spacing={0.8} alignItems="center">
              <Typography variant="caption">All systems operational</Typography>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#61b687",
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={2800}
        onClose={() => setNotice("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setNotice("")}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notice}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
