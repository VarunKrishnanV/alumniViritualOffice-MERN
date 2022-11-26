import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// dropdown - MUI
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// autocomplete
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// routers
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function SignUp() {

    const navigate = useNavigate();
    // college dropdown
    const [college, setCollege] = React.useState('')
    const handleCollege = (event) => {
        setCollege(event.target.value);
        console.log(college);
    };

    // college dropdown
    const [dept, setDept] = React.useState('')
    const handleDept = (event) => {
        setDept(event.target.value);
    };

    // batch dropdown
    const [batch, setBatch] = React.useState('')
    const handleBatch = (event) => {
        setBatch(event.target.value);
    };

    // handing form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const formData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            phone: data.get('phone'),
            college: data.get('college'),
            identity_number: data.get('identity_number'),
            dept: data.get('dept'),
            batch: data.get('batch'),
            password: data.get('password'),
            alumni_status: data.get('alumni_status'),
            user_type: data.get('user_type'),
        };

        console.log(formData);

        const res = await fetch("http://localhost:5050/auth/signup", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "content-type": "application/json",
            },
        })

        if (res.ok) {
            console.log("Account created")
            navigate("/login")
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                <Avatar sx={{
                    m: 1, bgcolor: '#A12137'
                }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                    {/* firstname */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>

                        {/* lastname */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>

                        {/* email */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>

                        {/* phone */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Phone number"
                                name="phone"
                                autoComplete="phone"
                            />
                        </Grid>


                        {/* identity number */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="identity_number"
                                label="Roll / Register number"
                                name="identity_number"
                                autoComplete="identity_number"
                            />
                        </Grid>

                        {/* college */}
                        <Grid item xs={12}>


                            {/* <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    setCollege(newValue);
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={collegeOptions}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Controllable" />}
                            /> */}



                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="demo-select-small">College</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label="College"
                                    name="college"
                                    value={college}
                                    onChange={handleCollege}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="pec">Paavai Engineering College</MenuItem>
                                    <MenuItem value="pce">Paavai College of Engineering</MenuItem>
                                    <MenuItem value="pct">Paavai College of Technology</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* dept */}
                        <Grid item xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="demo-select-small">Department</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    name='dept'
                                    value={dept}
                                    label="Department"
                                    onChange={handleDept}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="cse">CSE</MenuItem>
                                    <MenuItem value="mech">Mech</MenuItem>
                                    <MenuItem value="it">IT</MenuItem>
                                    <MenuItem value="cyber">Cyber</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* batch */}
                        <Grid item xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="demo-select-small">Batch</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    name="batch"
                                    label="Batch"
                                    value={batch}
                                    onChange={handleBatch}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="2021">2021</MenuItem>
                                    <MenuItem value="2022">2022</MenuItem>
                                    <MenuItem value="2023">2023</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>




                        {/* password */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>

                        <div style={{ display: "none" }}>
                            <TextField
                                required
                                name="alumni_status"
                                type="text"
                                value="in-approval"
                            />

                            <TextField
                                required
                                fullWidth
                                name="user_type"
                                type="text"
                                value="alumni"
                            />
                        </div>


                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <RouterLink to="/login">
                                <Link component="span" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    );
}