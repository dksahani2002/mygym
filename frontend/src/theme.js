// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // blue
    },
    secondary: {
      main: '#ff4081', // pink
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f5f5',
        },
        '#root': {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
