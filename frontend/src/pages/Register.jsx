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
    height: '',
    weight: '',
    goal: '',
    activity_level: '',
    body_fat_percent: '',
    experience_level: '',
    workout_preference: '',
    workout_days_per_week: '',
    time_per_session_minutes: '',
    equipment_available: '',
    injuries_or_limitations: '',
    sleep_hours_per_night: '',
    diet_quality: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...form,
      age: form.age ? parseInt(form.age) : undefined,
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      body_fat_percent: form.body_fat_percent ? parseFloat(form.body_fat_percent) : undefined,
      workout_days_per_week: form.workout_days_per_week ? parseInt(form.workout_days_per_week) : undefined,
      time_per_session_minutes: form.time_per_session_minutes ? parseInt(form.time_per_session_minutes) : undefined,
      sleep_hours_per_night: form.sleep_hours_per_night ? parseInt(form.sleep_hours_per_night) : undefined,
      equipment_available: form.equipment_available.split(',').map((item) => item.trim()),
      injuries_or_limitations: form.injuries_or_limitations.split(',').map((item) => item.trim()),
    };

    try {
      const res = await dispatch(registerUser(formattedData));
      if (res?.type === 'REGISTER_SUCCESS') {
        navigate('/login');
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
    <Box sx={{ p: 3 }}>
      <Paper elevation={4} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Create Your Account
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item><TextField fullWidth size="small" name="name" label="Name" value={form.name} onChange={handleChange} required /></Grid>
            <Grid item><TextField fullWidth size="small" name="email" label="Email" value={form.email} onChange={handleChange} required /></Grid>
            <Grid item><TextField fullWidth size="small" name="password" label="Password" type="password" value={form.password} onChange={handleChange} required /></Grid>

            <Grid item><TextField fullWidth size="small" name="age" label="Age" type="number" value={form.age} onChange={handleChange} /></Grid>
            <Grid item>
              <TextField fullWidth select size="small" name="gender" label="Gender" value={form.gender} onChange={handleChange}>
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item><TextField fullWidth size="small" name="height" label="Height (cm)" type="number" value={form.height} onChange={handleChange} /></Grid>
            <Grid item><TextField fullWidth size="small" name="weight" label="Weight (kg)" type="number" value={form.weight} onChange={handleChange} /></Grid>
            <Grid item>
              <TextField fullWidth select size="small" name="goal" label="Fitness Goal" value={form.goal} onChange={handleChange}>
                <MenuItem value="">Select Goal</MenuItem>
                <MenuItem value="Weight Loss">Weight Loss</MenuItem>
                <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
                <MenuItem value="Strength Training">Strength Training</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
              </TextField>
            </Grid>
            <Grid item>
              <TextField fullWidth select size="small" name="activity_level" label="Activity Level" value={form.activity_level} onChange={handleChange}>
                <MenuItem value="">Select Activity Level</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Athlete">Athlete</MenuItem>
              </TextField>
            </Grid>

            {/* New Fields */}
            <Grid item><TextField fullWidth size="small" name="body_fat_percent" label="Body Fat (%)" type="number" value={form.body_fat_percent} onChange={handleChange} /></Grid>

            <Grid item>
              <TextField fullWidth select size="small" name="experience_level" label="Experience Level" value={form.experience_level} onChange={handleChange}>
                <MenuItem value="">Select Experience</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </TextField>
            </Grid>

            <Grid item>
              <TextField fullWidth select size="small" name="workout_preference" label="Workout Preference" value={form.workout_preference} onChange={handleChange}>
                <MenuItem value="">Select Preference</MenuItem>
                <MenuItem value="Full Body">Full Body</MenuItem>
                <MenuItem value="Upper Lower">Upper Lower</MenuItem>
                <MenuItem value="Push Pull Legs">Push Pull Legs</MenuItem>
                <MenuItem value="Bro Split">Bro Split</MenuItem>
                <MenuItem value="Custom">Custom</MenuItem>
              </TextField>
            </Grid>

            <Grid item><TextField fullWidth size="small" name="workout_days_per_week" label="Workout Days per Week" type="number" value={form.workout_days_per_week} onChange={handleChange} /></Grid>
            <Grid item><TextField fullWidth size="small" name="time_per_session_minutes" label="Time per Session (minutes)" type="number" value={form.time_per_session_minutes} onChange={handleChange} /></Grid>
            <Grid item><TextField fullWidth size="small" name="equipment_available" label="Equipment Available (comma-separated)" value={form.equipment_available} onChange={handleChange} /></Grid>
            <Grid item><TextField fullWidth size="small" name="injuries_or_limitations" label="Injuries or Limitations (comma-separated)" value={form.injuries_or_limitations} onChange={handleChange} /></Grid>
            <Grid item><TextField fullWidth size="small" name="sleep_hours_per_night" label="Sleep Hours per Night" type="number" value={form.sleep_hours_per_night} onChange={handleChange} /></Grid>

            <Grid item>
              <TextField fullWidth select size="small" name="diet_quality" label="Diet Quality" value={form.diet_quality} onChange={handleChange}>
                <MenuItem value="">Select Diet Quality</MenuItem>
                <MenuItem value="Poor">Poor</MenuItem>
                <MenuItem value="Average">Average</MenuItem>
                <MenuItem value="High Protein">High Protein</MenuItem>
                <MenuItem value="Keto">Keto</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Balanced">Balanced</MenuItem>
              </TextField>
            </Grid>

            <Grid item>
              <Button fullWidth variant="contained" type="submit">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Paper,
//   Grid
// } from "@mui/material";

// export default function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, error } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     age: '',
//     gender: '',
//     height_cm: '',
//     weight_kg: '',
//     goal: '',
//     activity_level: ''
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formattedData = {
//       ...form,
//       height_cm: parseFloat(form.height_cm),
//       weight_kg: parseFloat(form.weight_kg),
//       age: form.age ? parseInt(form.age) : undefined
//     };
//     try {
//       const res = await dispatch(registerUser(formattedData));
//       if (res?.type === 'REGISTER_SUCCESS') {
//         navigate('/login');
//       } else {
//         console.error('Registration failed.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={4} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
//         <Typography variant="h5" gutterBottom>
//           Create Your Account
//         </Typography>

//         {error && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         <form onSubmit={handleSubmit}>
//           <Grid container direction="column" spacing={2}>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 size="small"
//                 margin="dense"
//                 name="name"
//                 label="Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 size="small"
//                 margin="dense"
//                 name="email"
//                 label="Email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 size="small"
//                 margin="dense"
//                 name="password"
//                 label="Password"
//                 type="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 size="small"
//                 margin="dense"
//                 name="age"
//                 label="Age"
//                 type="number"
//                 value={form.age}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 select
//                 size="small"
//                 margin="dense"
//                 name="gender"
//                 label="Gender"
//                 value={form.gender}
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="">Select Gender</MenuItem>
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 size="small"
//                 margin="dense"
//                 name="height_cm"
//                 label="Height (cm)"
//                 type="number"
//                 value={form.height_cm}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 size="small"
//                 margin="dense"
//                 name="weight_kg"
//                 label="Weight (kg)"
//                 type="number"
//                 value={form.weight_kg}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 select
//                 size="small"
//                 margin="dense"
//                 name="goal"
//                 label="Fitness Goal"
//                 value={form.goal}
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="">Select Goal</MenuItem>
//                 <MenuItem value="Weight Loss">Weight Loss</MenuItem>
//                 <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
//                 <MenuItem value="Strength Training">Strength Training</MenuItem>
//                 <MenuItem value="Maintenance">Maintenance</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item>
//               <TextField
//                 fullWidth
//                 select
//                 size="small"
//                 margin="dense"
//                 name="activity_level"
//                 label="Activity Level"
//                 value={form.activity_level}
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="">Select Activity Level</MenuItem>
//                 <MenuItem value="Low">Low</MenuItem>
//                 <MenuItem value="Moderate">Moderate</MenuItem>
//                 <MenuItem value="High">High</MenuItem>
//                 <MenuItem value="Athlete">Athlete</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item>
//               <Button fullWidth variant="contained" type="submit">
//                 Register
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Box>
//   );
// }
