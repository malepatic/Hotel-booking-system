import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    InputAdornment,
    IconButton,
    ThemeProvider,
    createTheme,
    Snackbar,
    Alert,
    Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

// Custom theme
const theme = createTheme({
    palette: {
        primary: { main: '#3f51b5' },
        secondary: { main: '#f50057' },
        background: { default: '#f4f6f8' },
    },
    typography: { fontFamily: "'Poppins', sans-serif" },
    shape: { borderRadius: 12 },
});

// Styled components
const LoginContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: '450px',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
}));

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', {
                email: identifier,
                password,
            });

            if (response.data.token) {
                // Store token and role in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);

                setSnackbarMessage('Login successful! Redirecting...');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);

                // Redirect based on role
                setTimeout(() => {
                    const role = response.data.role;
                    if (role === 'admin') {
                        navigate('/admin/dashboard');
                    } else if (role === 'user') {
                        navigate('/user/dashboard');
                    } else {
                        console.error('Received an unknown role:', role);
                        setSnackbarMessage('Login failed. Unknown role received.');
                        setSnackbarSeverity('error');
                        setOpenSnackbar(true);
                    }
                }, 1500);
            } else {
                throw new Error('Login failed: No token received.');
            }
        } catch (error) {
            setSnackbarMessage('Login failed. Check your credentials.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <LoginContainer maxWidth={false}>
                <LoginPaper elevation={3}>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <StyledButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </StyledButton>
                    </form>
                    <Box mt={3}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Button
                                color="primary"
                                onClick={() => navigate('/admin/register')}
                                style={{ textTransform: 'none', fontWeight: 'bold' }}
                            >
                                Sign up
                            </Button>
                        </Typography>
                    </Box>
                </LoginPaper>
            </LoginContainer>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default Login;
