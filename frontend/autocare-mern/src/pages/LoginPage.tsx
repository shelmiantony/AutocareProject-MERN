import { Container, Box } from "@mui/material";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../api/api";

const Login = () => {
  const onSubmit = async (data: any) => {
    try {
      await loginUser(data);
    } catch (error) {
      console.log(error);
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
    </Box>
  );
};

export default Login;
