import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, saveProfile } from '../redux/slices/profileSlice';

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Alert,
  MenuItem
} from '@mui/material';
import { useSnackbar } from 'notistack';

const goals = ["Weight Loss", "Muscle Gain", "Strength Training", "Maintenance"];
const genders = ["Male", "Female", "Other"];
const activityLevels = ["Low", "Moderate", "High", "Athlete"];
const experienceLevels = ["Beginner", "Intermediate", "Advanced"];
const workoutPreferences = ["Full Body", "Upper Lower", "Push Pull Legs", "Bro Split", "Custom"];
const dietQualities = ["Poor", "Average", "High Protein", "Keto", "Vegan", "Balanced"];

export default function Profile() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { profile, status, error } = useSelector((state) => state.profile);

  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activity_level: '',
    body_fat_percent: '',
    experience_level: '',
    workout_preference: '',
    workout_days_per_week: '',
    time_per_session_minutes: '',
    equipment_available: '',
    injuries_or_limitations: '',
    sleep_hours_per_night: '',
    diet_quality: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        ...form,
        ...profile,
        equipment_available: profile.equipment_available?.join(', ') || '',
        injuries_or_limitations: profile.injuries_or_limitations?.join(', ') || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...form,
      age: parseInt(form.age),
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      body_fat_percent: parseFloat(form.body_fat_percent),
      workout_days_per_week: parseInt(form.workout_days_per_week),
      time_per_session_minutes: parseInt(form.time_per_session_minutes),
      sleep_hours_per_night: parseFloat(form.sleep_hours_per_night),
      equipment_available: form.equipment_available.split(',').map((s) => s.trim()).filter(Boolean),
      injuries_or_limitations: form.injuries_or_limitations.split(',').map((s) => s.trim()).filter(Boolean),
    };

    dispatch(saveProfile(formattedData)).then(() => {
      enqueueSnackbar("Profile updated successfully!", { variant: "success" });
      setIsEditing(false);
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (status === 'loading') {
    return <CircularProgress sx={{ display: 'block', m: 'auto', mt: 4 }} />;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card variant="outlined">
        <CardContent>
          {!isEditing ? (
            <Box>
              {Object.entries(form).map(([key, value]) => (
                <Typography key={key} variant="body1">
                  {`${key.replace(/_/g, ' ')}: ${value}`}
                </Typography>
              ))}

              <Button variant="contained" sx={{ mt: 2 }} onClick={handleEditClick} fullWidth>
                Edit Profile
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth name="name" label="Name" value={form.name} onChange={handleChange} margin="normal" required />
              <TextField fullWidth name="email" label="Email" type="email" value={form.email} onChange={handleChange} margin="normal" required />
              <TextField fullWidth name="age" label="Age" type="number" value={form.age} onChange={handleChange} margin="normal" />
              <TextField fullWidth select name="gender" label="Gender" value={form.gender} onChange={handleChange} margin="normal">
                {genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
              </TextField>
              <TextField fullWidth name="height" label="Height (cm)" type="number" value={form.height} onChange={handleChange} margin="normal" />
              <TextField fullWidth name="weight" label="Weight (kg)" type="number" value={form.weight} onChange={handleChange} margin="normal" />
              <TextField fullWidth select name="goal" label="Goal" value={form.goal} onChange={handleChange} margin="normal">
                {goals.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
              </TextField>
              <TextField fullWidth select name="activity_level" label="Activity Level" value={form.activity_level} onChange={handleChange} margin="normal">
                {activityLevels.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
              </TextField>
              <TextField fullWidth name="body_fat_percent" label="Body Fat (%)" type="number" value={form.body_fat_percent} onChange={handleChange} margin="normal" />
              <TextField fullWidth select name="experience_level" label="Experience Level" value={form.experience_level} onChange={handleChange} margin="normal">
                {experienceLevels.map((lvl) => <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>)}
              </TextField>
              <TextField fullWidth select name="workout_preference" label="Workout Preference" value={form.workout_preference} onChange={handleChange} margin="normal">
                {workoutPreferences.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </TextField>
              <TextField fullWidth name="workout_days_per_week" label="Workout Days per Week" type="number" value={form.workout_days_per_week} onChange={handleChange} margin="normal" />
              <TextField fullWidth name="time_per_session_minutes" label="Session Time (min)" type="number" value={form.time_per_session_minutes} onChange={handleChange} margin="normal" />
              <TextField fullWidth name="equipment_available" label="Equipment (comma separated)" value={form.equipment_available} onChange={handleChange} margin="normal" />
              <TextField fullWidth name="injuries_or_limitations" label="Injuries/Limitations (comma separated)" value={form.injuries_or_limitations} onChange={handleChange} margin="normal" />
              <TextField fullWidth name="sleep_hours_per_night" label="Sleep (hrs/night)" type="number" value={form.sleep_hours_per_night} onChange={handleChange} margin="normal" />
              <TextField fullWidth select name="diet_quality" label="Diet Quality" value={form.diet_quality} onChange={handleChange} margin="normal">
                {dietQualities.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>

              <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
                Update Profile
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
