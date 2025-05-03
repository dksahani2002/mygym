import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProgress,
  addProgress,
  editProgress,
  removeProgress
} from '../redux/slices/progressSlice';

import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid
} from '@mui/material';

const ProgressPage = () => {
  const dispatch = useDispatch();
  const { progress, loading, error } = useSelector((state) => state.progress);

  const [form, setForm] = useState({
    weight: '',
    bodyFat: '',
    muscleMass: '',
    notes: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      weight: parseFloat(form.weight),
      bodyFat: parseFloat(form.bodyFat),
      muscleMass: parseFloat(form.muscleMass),
      notes: form.notes,
    };

    if (editingId) {
      dispatch(editProgress({ _id: editingId, ...data }));
      setEditingId(null);
    } else {
      dispatch(addProgress(data));
    }

    setForm({ weight: '', bodyFat: '', muscleMass: '', notes: '' });
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setForm({
      weight: entry.weight,
      bodyFat: entry.bodyFat,
      muscleMass: entry.muscleMass,
      notes: entry.notes,
    });
  };

  const handleDelete = (id) => {
    dispatch(removeProgress(id));
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {editingId ? 'Edit Progress' : 'Log Progress'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              required
              value={form.weight}
              onChange={handleChange}
              sx={{ minWidth: 160 }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Body Fat (%)"
              name="bodyFat"
              type="number"
              value={form.bodyFat}
              onChange={handleChange}
              sx={{ minWidth: 160 }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Muscle Mass (kg)"
              name="muscleMass"
              type="number"
              value={form.muscleMass}
              onChange={handleChange}
              sx={{ minWidth: 160 }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              sx={{ minWidth: 240 }}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color={editingId ? 'warning' : 'primary'}
              sx={{ height: '100%' }}
            >
              {editingId ? 'Update' : 'Log'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {loading && <CircularProgress sx={{ display: 'block', my: 2 }} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Typography variant="h5" sx={{ mb: 2 }}>
        Progress History
      </Typography>

      <Grid container spacing={3}>
        {progress.map((entry) => (
          <Grid item key={entry._id}>
            <Card variant="outlined" sx={{ p: 2, minWidth: 250 }}>
              <CardContent>
                <Typography variant="h6">Weight: {entry.weight} kg</Typography>
                {entry.bodyFat !== undefined && (
                  <Typography>Body Fat: {entry.bodyFat}%</Typography>
                )}
                {entry.muscleMass !== undefined && (
                  <Typography>Muscle Mass: {entry.muscleMass} kg</Typography>
                )}
                {entry.notes && (
                  <Typography variant="body2" color="text.secondary">
                    Notes: {entry.notes}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {new Date(entry.createdAt).toLocaleString()}
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(entry._id)}
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

export default ProgressPage;
