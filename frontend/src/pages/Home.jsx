// pages/Dashboard.jsx
import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>

      <Card variant="outlined">
        <CardContent>
          {user ? (
            <>
              <Typography variant="h6">Name: {user.name}</Typography>
              <Typography variant="h6">Email: {user.email}</Typography>
              <Typography variant="body1">Age: {user.age}</Typography>
              <Typography variant="body1">Gender: {user.gender}</Typography>
              <Typography variant="body1">Goal: {user.goal}</Typography>
            </>
          ) : (
            <Typography variant="body1">User data not available.</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
