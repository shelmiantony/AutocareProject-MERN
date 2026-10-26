import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
interface AuthFormProps {
  title: string;
  subtitle: string;
  isLogin?: boolean;
  onSubmit: (data: any) => Promise<void>;
}

const AuthForm = ({
  title,
  subtitle,
  isLogin = false,
  onSubmit,
}: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "rgba(148, 163, 184, 0.22)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, textAlign: "center" }}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="color.secondary" sx={{ mb: 4 }}>
        {" "}
      </Typography>
      {subtitle}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {!isLogin && (
          <TextField
            label="Username"
            {...register("username", {
              required: "Username is required",
            })}
            error={!!errors.username}
            helperText={errors.username?.message as string}
          />
        )}
        <TextField
          label="Email"
          {...register("email", {
            required: "Email is required",
          })}
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />{" "}
        <TextField
          label="Password"
          {...register("password", {
            required: "password is required",
          })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isLogin ? "Login" : "Register"}
        </Button>
      </Box>
    </Paper>
  );
};

export default AuthForm;
