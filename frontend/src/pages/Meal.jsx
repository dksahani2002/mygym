import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMeals,
  addMeal,
  editMeal,
  removeMeal
} from '../redux/slices/mealSlice';

import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress
} from '@mui/material';

const Meal = () => {
  const dispatch = useDispatch();
  const { meals = [], loading, error } = useSelector((state) => state.meals);

  const [formData, setFormData] = useState({
    foodItem: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchMeals());
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
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fat: Number(formData.fat)
    };

    if (editId) {
      dispatch(editMeal({ _id: editId, ...payload }));
    } else {
      dispatch(addMeal(payload));
    }

    setFormData({
      foodItem: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
    setEditId(null);
  };

  const handleEdit = (meal) => {
    setEditId(meal._id);
    setFormData({
      foodItem: meal.foodItem,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat
    });
  };

  const handleDelete = (id) => {
    dispatch(removeMeal(id));
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {editId ? 'Edit Meal' : 'Add Meal'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              name="foodItem"
              label="Food Item"
              required
              value={formData.foodItem}
              onChange={handleChange}
              sx={{ minWidth: 180 }}
            />
          </Grid>

          <Grid item>
            <TextField
              name="calories"
              label="Calories"
              type="number"
              required
              value={formData.calories}
              onChange={handleChange}
              sx={{ minWidth: 120 }}
            />
          </Grid>

          <Grid item>
            <TextField
              name="protein"
              label="Protein (g)"
              type="number"
              value={formData.protein}
              onChange={handleChange}
              sx={{ minWidth: 120 }}
            />
          </Grid>

          <Grid item>
            <TextField
              name="carbs"
              label="Carbs (g)"
              type="number"
              value={formData.carbs}
              onChange={handleChange}
              sx={{ minWidth: 120 }}
            />
          </Grid>

          <Grid item>
            <TextField
              name="fat"
              label="Fat (g)"
              type="number"
              value={formData.fat}
              onChange={handleChange}
              sx={{ minWidth: 120 }}
            />
          </Grid>

          <Grid item>
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

      <Typography variant="h5" sx={{ mb: 2 }}>Meals</Typography>

      <Grid container spacing={3}>
        {meals.map(meal => (
          <Grid item key={meal._id}>
            <Card variant="outlined" sx={{ p: 2, minWidth: 250 }}>
              <CardContent>
                <Typography variant="h6">{meal.foodItem}</Typography>
                <Typography>Calories: {meal.calories} cal</Typography>
                <Typography>Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fat: {meal.fat}g</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={() => handleEdit(meal)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(meal._id)}
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

export default Meal;
