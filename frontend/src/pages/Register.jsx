// pages/Register.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    goal: '',
    height: '',
    weight: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registered successfully");
    } catch (err) {
      console.log("error: ",error.message);
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" mt={4}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="email" label="Email" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="age" label="Age" type="number" fullWidth margin="normal" onChange={handleChange} />
        <TextField
          name="gender"
          label="Gender"
          select
          fullWidth
          margin="normal"
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          name="goal"
          label="Fitness Goal"
          select
          fullWidth
          margin="normal"
          onChange={handleChange}
        >
          <MenuItem value="weight_loss">Weight Loss</MenuItem>
          <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
          <MenuItem value="general_fitness">General Fitness</MenuItem>
        </TextField>
        <TextField name="height" label="Height (cm)" type="number" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="weight" label="Weight (kg)" type="number" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Container>
  );
}
