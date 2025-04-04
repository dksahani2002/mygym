import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data.user));
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" mt={4}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
}
