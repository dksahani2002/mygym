// src/pages/Logout.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // ✅ Using slice action
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());                   // Clear Redux auth state
    localStorage.removeItem('token');     // Remove token if stored
    navigate('/login');                   // Redirect to login
  }, [dispatch, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Logging you out...</h2>
    </div>
  );
}
