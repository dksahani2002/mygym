import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material';

import loginStyles from '../styles/LoginStyles';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Box style={loginStyles.root}>
      <Paper elevation={3} style={loginStyles.paper}>
        <Typography variant="h5" style={loginStyles.title}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="dense"
            size="small"
            type="email"
            required
          />
          <TextField
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
            size="small"
            type="password"
            required
          />
          {error && (
            <Typography color="error" variant="body2" style={{ marginTop: 8 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" style={loginStyles.submitButton}>
            Login
          </Button>
        </form>

        {/* 👇 Register redirect link */}
        <Box style={{ marginTop: 16 }}>
          <Typography variant="body2" align="center">
            Don&apos;t have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
