import { Container, Box } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "../../components/AuthForm";
import { loginUser } from "../../services/api";
import AppSnackbar from "../../components/AppSnackbar";
import { useAuth } from "../../context/AuthContext";

interface LoginData {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const { login } = useAuth();
  const onSubmit = async (data: LoginData) => {
    try {
      const res = await loginUser(data);
      console.log("res", res);
      login(res.data);
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "success",
      });
      setTimeout(() => {
        navigate("/home");
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
