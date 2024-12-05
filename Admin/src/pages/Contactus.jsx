import React, { useState } from 'react';
import { 
  TextField, Button, Grid, Typography, Box, Container, Paper, Snackbar, IconButton,
  ThemeProvider, createTheme
} from '@mui/material';
import { 
  Send as SendIcon, 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Message as MessageIcon, 
  Close as CloseIcon 
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('All fields are required');
    } else {
      setError('');
      setSnackbarMessage('Your message has been sent!');
      setSnackbarOpen(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          Get in Touch
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: '600px', margin: 'auto' }}>
          We're excited to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </Typography>
      </Box>

      <StyledPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputProps={{
                  startAdornment: <PersonIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Email Address"
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: <EmailIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                label="Message"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                InputProps={{
                  startAdornment: <MessageIcon color="primary" sx={{ mr: 1, alignSelf: 'flex-start', mt: 2 }} />,
                }}
              />
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" align="center" sx={{ marginTop: 2, fontWeight: 'bold' }}>
              {error}
            </Typography>
          )}

          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <AnimatedButton
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
              sx={{
                padding: '12px 24px',
                fontSize: '1.1rem',
                borderRadius: '30px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #21cbf3, #2196f3)',
                },
              }}
            >
              Send Message
            </AnimatedButton>
          </Box>
        </form>
      </StyledPaper>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

// Wrap the component with ThemeProvider
const App = () => (
  <ThemeProvider theme={theme}>
    <ContactPage />
  </ThemeProvider>
);

export default App;