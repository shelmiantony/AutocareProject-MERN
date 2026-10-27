import { Alert, Snackbar } from "@mui/material";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  onClose: () => void;
}
const AppSnackbar = ({
  open,
  message,
  severity,
  onClose,
}: AppSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
export default AppSnackbar;
