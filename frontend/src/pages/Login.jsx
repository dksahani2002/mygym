// pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Alert
} from '@mui/material';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              type="password"
              required
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Register
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
