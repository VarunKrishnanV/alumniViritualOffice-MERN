import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import.meta.env.VITE_API_URL;
import { useDispatch } from "react-redux";
import { getUser } from '../store/auth';
import pecImage from "../assets/images/CollegeBanner.jpg"
import pecLogo from "../assets/images/pec-logo.png"

export default function Login() {

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    })

    const { token, user } = await res.json();

    if (res.ok) {
      Cookies.set("token", token)
      dispatch(getUser(user))
      navigate("/")
    } else {
      window.alert("Incorrect password / Email Address")
    }
  };

  return (
    <>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={6}>
          <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src="https://pec.paavai.edu.in/wp-content/uploads/2019/04/CollegeBanner.jpg" alt="" />
        </Grid>
        <Grid item xs={6}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
              <img src={pecLogo} alt="" style={{ width: "80px" }} />
              {/* <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#000", marginTop: "20px" }}>Paavai Engineering College</h1> */}
              <h2 style={{ fontSize: "28px", fontWeight: 500, color: "#000", marginTop: "20px" }}>Alumni Virtual Office</h2>
              <Typography style={{ fontSize: "24px", fontWeight: 500, color: "gray", marginTop: "4px" }}>
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{ background: "#A12137" }}>
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <RouterLink to="/signup">
                      <Link component="span" variant="body2">
                        Don't have an account? Register
                      </Link>
                    </RouterLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container >
        </Grid>
      </Grid>
    </>
  );
}