import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMeals,
  addMeal,
  editMeal,
  removeMeal
} from '../redux/slices/mealSlice';

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
    <div style={{ padding: '2rem' }}>
      <h2>{editId ? 'Edit Meal' : 'Add Meal'}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="text" name="foodItem" placeholder="Food Item" value={formData.foodItem} onChange={handleChange} required />
        <input type="number" name="calories" placeholder="Calories" value={formData.calories} onChange={handleChange} required />
        <input type="number" name="protein" placeholder="Protein" value={formData.protein} onChange={handleChange} />
        <input type="number" name="carbs" placeholder="Carbs" value={formData.carbs} onChange={handleChange} />
        <input type="number" name="fat" placeholder="Fat" value={formData.fat} onChange={handleChange} />
        <button type="submit">{editId ? 'Update' : 'Add'} Meal</button>
      </form>

      {loading ? (
        <p>Loading meals...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        meals.map(meal => (
          <div key={meal._id} style={{ marginBottom: '1rem' }}>
            <strong>{meal.foodItem}</strong> - {meal.calories} cal | Protein: {meal.protein}g | Carbs: {meal.carbs}g | Fat: {meal.fat}g
            <div>
              <button onClick={() => handleEdit(meal)}>Edit</button>
              <button onClick={() => handleDelete(meal._id)} style={{ marginLeft: '1rem' }}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Meal;
