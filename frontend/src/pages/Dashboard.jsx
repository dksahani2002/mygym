// pages/Dashboard.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Welcome to your Dashboard
      </Typography>

      {user ? (
        <>
          <Typography variant="subtitle1">Name: {user.name}</Typography>
          <Typography variant="subtitle1">Email: {user.email}</Typography>
          <Typography variant="subtitle1">Age: {user.age}</Typography>
          <Typography variant="subtitle1">Gender: {user.gender}</Typography>
          <Typography variant="subtitle1">Goal: {user.goal}</Typography>
        </>
      ) : (
        <Typography variant="body1">User data not available.</Typography>
      )}
    </Box>
  );
}
