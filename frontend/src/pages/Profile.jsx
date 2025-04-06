import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, saveProfile } from '../redux/slices/profileSlice';

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.profile); // change 'loading' to 'status'
  
  const [form, setForm] = useState({
    name: '',
    email: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);  // Flag to control edit mode

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        email: profile.email || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveProfile(form));  // Save updated profile data
    setIsEditing(false);  // Exit edit mode after save

  };

  const handleEditClick = () => {
    setIsEditing(true);  // Enable edit mode when the user clicks "Edit"
  };

  if (status === 'loading') {
    return <CircularProgress sx={{ display: 'block', m: 'auto', mt: 4 }} />;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <h1>Welcome to Your Profile</h1>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        {!isEditing ? (
          // Display profile data in plain format if not editing
          <Box>
            <Typography variant="h6">Name: {profile?.name}</Typography>
            <Typography variant="h6">Email: {profile?.email}</Typography>
            <Typography variant="h6">Age: {profile?.age}</Typography>
            <Typography variant="h6">Goal: {profile?.goal}</Typography>
            <Typography variant="h6">Activity Level: {profile?.activity_level}</Typography>
            {/* You can add more fields here if available in the profile data */}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleEditClick}
              fullWidth
            >
              Edit Profile
            </Button>
          </Box>
        ) : (
          // Display form for editing name and email
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              margin="dense"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
              Update Profile
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}
