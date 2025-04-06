import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid
} from "@mui/material";
import registerStyles from "../styles/RegisterStyles";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height_cm: '',
    weight_kg: '',
    goal: '',
    activity_level: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...form,
      height_cm: parseFloat(form.height_cm),
      weight_kg: parseFloat(form.weight_kg),
      age: form.age ? parseInt(form.age) : undefined
    };
    try {
      const res = await dispatch(registerUser(formattedData));
      if (res?.type === 'REGISTER_SUCCESS') {
        navigate('/login');
      } else {
        console.error('Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box>
      <Paper elevation={4}>
        <Typography variant="h5">Create Your Account</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={1}>
            <Grid>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                name="name"
                label="Name"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                name="email"
                label="Email"
                type="email"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                name="age"
                label="Age"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                size="small"
                margin="dense"
                name="gender"
                label="Gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                name="height_cm"
                label="Height (cm)"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                name="weight_kg"
                label="Weight (kg)"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                size="small"
                margin="dense"
                name="goal"
                label="Fitness Goal"
                value={form.goal}
                onChange={handleChange}
                required
              >
                <MenuItem value="Weight Loss">Weight Loss</MenuItem>
                <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
                <MenuItem value="Strength Training">Strength Training</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                size="small"
                margin="dense"
                name="activity_level"
                label="Activity Level"
                value={form.activity_level}
                onChange={handleChange}
                required
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Athlete">Athlete</MenuItem>
              </TextField>
            </Grid>
            <Grid>
              <Button
                fullWidth
                variant="contained"
                type="submit"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
