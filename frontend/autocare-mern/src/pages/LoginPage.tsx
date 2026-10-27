import { Container, Box } from "@mui/material";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../api/api";
import AppSnackbar from "../components/AppSnackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const onSubmit = async (data: any) => {
    try {
      const res = await loginUser(data);
      console.log("res", res);
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Login failed",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <AuthForm
          title="Welcome Back"
          subtitle="Login to continue"
          isLogin={true}
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

export default Login;
