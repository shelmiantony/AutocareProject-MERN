import { Container, Box } from "@mui/material";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      navigate("/");
    } catch (err) {
      console.log(err);
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
    </Box>
  );
};
export default Register;
