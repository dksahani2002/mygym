import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>

        {!isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" component={Link} to="/meal">Meal</Button>
            <Button color="inherit" component={Link} to="/logout">Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
