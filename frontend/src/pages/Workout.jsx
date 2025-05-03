import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWorkouts,
  addWorkout,
  editWorkout,
  removeWorkout
} from '../redux/slices/workoutSlice';

import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';

const Workout = () => {
  const dispatch = useDispatch();
  const { workouts, loading, error } = useSelector(state => state.workouts);

  const [formData, setFormData] = useState({
    type: '',
    duration: '',
    caloriesBurned: ''
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      duration: Number(formData.duration),
      caloriesBurned: formData.caloriesBurned ? Number(formData.caloriesBurned) : undefined,
    };

    if (editId) {
      dispatch(editWorkout({ _id: editId, ...payload }));
      setEditId(null);
    } else {
      dispatch(addWorkout(payload));
    }

    setFormData({ type: '', duration: '', caloriesBurned: '' });
  };

  const handleEdit = (workout) => {
    setEditId(workout._id);
    setFormData({
      type: workout.type,
      duration: workout.duration,
      caloriesBurned: workout.caloriesBurned || ''
    });
  };

  const handleDelete = (id) => {
    dispatch(removeWorkout(id));
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {editId ? 'Edit Workout' : 'Add Workout'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid>
            <TextField
              select
              name="type"
              label="Workout Type"
              fullWidth
              required
              value={formData.type}
              onChange={handleChange}
              sx={{ minWidth: 240 }}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Cardio">Cardio</MenuItem>
              <MenuItem value="Strength">Strength</MenuItem>
              <MenuItem value="Yoga">Yoga</MenuItem>
              <MenuItem value="HIIT">HIIT</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid>
            <TextField
              name="duration"
              label="Duration (mins)"
              type="number"
              required
              value={formData.duration}
              onChange={handleChange}
              sx={{ minWidth: 160 }}
            />
          </Grid>

          <Grid>
            <TextField
              name="caloriesBurned"
              label="Calories Burned (optional)"
              type="number"
              value={formData.caloriesBurned}
              onChange={handleChange}
              sx={{ minWidth: 180 }}
            />
          </Grid>

          <Grid>
            <Button
              type="submit"
              variant="contained"
              color={editId ? 'warning' : 'primary'}
              sx={{ height: '100%' }}
            >
              {editId ? 'Update' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {loading && <CircularProgress sx={{ display: 'block', my: 2 }} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Workouts
      </Typography>

      <Grid container spacing={3}>
        {workouts.map((workout) => (
          <Grid key={workout._id}>
            <Card variant="outlined" sx={{ p: 2, minWidth: 250 }}>
              <CardContent>
                <Typography variant="h6">{workout.type}</Typography>
                <Typography>Duration: {workout.duration} mins</Typography>
                {workout.caloriesBurned && (
                  <Typography>Calories: {workout.caloriesBurned}</Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {new Date(workout.createdAt).toLocaleString()}
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={() => handleEdit(workout)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(workout._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Workout;
