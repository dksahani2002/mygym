// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Meal from "./pages/Meal";
import Header from "./components/Header";
import theme from "./theme";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";
import Progress from "./pages/Progress";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/meal" element={<Meal />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
