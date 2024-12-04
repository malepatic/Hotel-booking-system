import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "450px",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const AdminRegistration = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // API Call to request OTP
      const response = await axios.post("http://localhost:5001/api/auth/otpregister", {
        userName,
        fullName,
        email,
        phone,
        password,
      });

      console.log(response.data);
      setSnackbarMessage("OTP sent to your email. Please verify.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOtpDialogOpen(true); // Open the OTP verification dialog
    } catch (error) {
      console.error("Registration failed:", error);
      setSnackbarMessage("Failed to send OTP. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      // API Call to verify OTP and complete registration
      const response = await axios.post("http://localhost:5001/api/auth/verify-otp", {
        email,
        otp,
      });

      console.log(response.data);
      setSnackbarMessage("Registration successful! Redirecting to login...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Close OTP dialog and reset fields
      setOtpDialogOpen(false);
      setUserName("");
      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setOtp("");

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("OTP verification failed:", error);
      setSnackbarMessage("Invalid OTP. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" color="primary" gutterBottom>
          New User Registration
        </Typography>
        <form onSubmit={handleRegistration} style={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            variant="outlined"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </StyledButton>
        </form>
      </StyledPaper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>Verify OTP</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerifyOtp} variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Verify"}
          </Button>
          <Button onClick={() => setOtpDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default AdminRegistration;
