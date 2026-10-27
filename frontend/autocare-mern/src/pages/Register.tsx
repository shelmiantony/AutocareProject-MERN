import { Container, Box } from "@mui/material";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppSnackbar from "../components/AppSnackbar";

const Register = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser(data);
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Registration failed",
        severity: "error",
      });
    }
  };
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm">
        <AuthForm
          title="Create your account"
          subtitle="Enter your details to get started"
          onSubmit={onSubmit}
        />
      </Container>
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
export default Register;
