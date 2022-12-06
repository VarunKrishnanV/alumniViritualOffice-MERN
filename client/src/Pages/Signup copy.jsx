import * as React from 'react';
import { useState } from 'react';
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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import pecImage from "../assets/images/CollegeBanner.jpg"
import pecLogo from "../assets/images/pec-logo.png"
// routers
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigate = useNavigate();
    // college dropdown
    const [college, setCollege] = React.useState('')
    const handleCollege = (event) => {
        setCollege(event.target.value);
    };

    // college dropdown
    const [dept, setDept] = React.useState('')
    const handleDept = (event) => {
        setDept(event.target.value);
    };


    const [gender, setGender] = React.useState('')
    const handleGender = (event) => {
        setGender(event.target.value);
    };

    const [dob, setDob] = useState(null);
    // const [value, setValue] = React.useState(null);
    const handleDob = (event) => {
        setDob(event);
        console.log(dob);
    };

    const [batch, setBatch] = React.useState("");
    const handleBatch = (event) => {
        setBatch(event.target.value);
    };



    // handing form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const formData = {
            fullName: data.get('fullName'),
            email: data.get('email'),
            phone: data.get('phone'),
            identity_number: data.get('identity_number'),
            college: data.get('college'),
            batch: data.get('batch'),
            dept: data.get('dept'),
            gender: data.get('gender'),
            dob: data.get('dob'),
            high_qualification: data.get('high_qualification'),
            present_organization: data.get('present_organization'),
            designation: data.get('designation'),
            current_city: data.get('current_city'),
            state: data.get('state'),
            country: data.get('country'),
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
        <Grid container style={{ minHeight: "100vh",  }}>
            <Grid item xs={6} style={{ height: "100vh" }} >
                <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src="https://pec.paavai.edu.in/wp-content/uploads/2019/04/slider.jpg" alt="" />
            </Grid>
            <Grid item xs={6} style={{ height: "100vh", overflow: "scroll" }}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                        <img src={pecLogo} alt="" style={{ width: "80px" }} />
                        {/* <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#000", marginTop: "20px" }}>Paavai Engineering College</h1> */}
                        <h2 style={{ fontSize: "28px", fontWeight: 500, color: "#000", marginTop: "20px" }}>Alumni Virtual Office</h2>
                        <Typography style={{ fontSize: "24px", fontWeight: 500, color: "gray", marginTop: "4px" }}>
                            Alumni Registration
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                            <Grid container spacing={2}>

                                {/* fullname */}
                                <Grid item xs={12} >
                                    <TextField
                                        autoComplete="given-name"
                                        name="fullName"
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        autoFocus
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
                                        // required
                                        fullWidth
                                        id="identity_number"
                                        label="Roll / Register number"
                                        name="identity_number"
                                        autoComplete="identity_number"
                                    />
                                </Grid>

                                {/* college */}
                                <Grid item xs={12}>
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
                                            <MenuItem value="2030">2030</MenuItem>
                                            <MenuItem value="2029">2029</MenuItem>
                                            <MenuItem value="2028">2028</MenuItem>
                                            <MenuItem value="2027">2027</MenuItem>
                                            <MenuItem value="2026">2026</MenuItem>
                                            <MenuItem value="2025">2025</MenuItem>
                                            <MenuItem value="2024">2024</MenuItem>
                                            <MenuItem value="2023">2023</MenuItem>
                                            <MenuItem value="2022">2022</MenuItem>
                                            <MenuItem value="2021">2021</MenuItem>
                                            <MenuItem value="2020">2020</MenuItem>
                                            <MenuItem value="2019">2019</MenuItem>
                                            <MenuItem value="2018">2018</MenuItem>
                                            <MenuItem value="2017">2017</MenuItem>
                                            <MenuItem value="2016">2016</MenuItem>
                                            <MenuItem value="2015">2015</MenuItem>
                                            <MenuItem value="2014">2014</MenuItem>
                                            <MenuItem value="2013">2013</MenuItem>
                                            <MenuItem value="2012">2012</MenuItem>
                                            <MenuItem value="2011">2011</MenuItem>
                                            <MenuItem value="2010">2010</MenuItem>
                                            <MenuItem value="2009">2009</MenuItem>
                                            <MenuItem value="2008">2008</MenuItem>
                                            <MenuItem value="2007">2007</MenuItem>
                                            <MenuItem value="2006">2006</MenuItem>
                                            <MenuItem value="2005">2005</MenuItem>
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
                                            <MenuItem value="CSE">CSE</MenuItem>
                                            <MenuItem value="CSE - IOT">CSE - IOT</MenuItem>
                                            <MenuItem value="CSE - AI&ML">CSE - AI&ML</MenuItem>
                                            <MenuItem value="IT">IT</MenuItem>
                                            <MenuItem value="EEE">EEE</MenuItem>
                                            <MenuItem value="ECE">ECE</MenuItem>
                                            <MenuItem value="MECH">MECH</MenuItem>
                                            <MenuItem value="AGRI">AGRI</MenuItem>
                                            <MenuItem value="AERO">AERO</MenuItem>
                                            <MenuItem value="CHEMICAL">CHEMICAL</MenuItem>
                                            <MenuItem value="FOOD">FOOD</MenuItem>
                                            <MenuItem value="PHARAMA">PHARAMA</MenuItem>
                                            <MenuItem value="MCT">MCT</MenuItem>
                                            <MenuItem value="MBA">MBA</MenuItem>
                                            <MenuItem value="ROBOTICS">ROBOTICS</MenuItem>
                                            <MenuItem value="BME">BME</MenuItem>
                                            <MenuItem value="ME">ME</MenuItem>
                                            <MenuItem value="FS">FS</MenuItem>
                                            <MenuItem value="CIVIL">CIVIL</MenuItem>
                                            <MenuItem value="BIO-TECH">BIO-TECH</MenuItem>
                                            <MenuItem value="CYBER">CYBER</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* gender */}
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-select-small">Gender</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            name="gender"
                                            label="Gender"
                                            value={gender}
                                            onChange={handleGender}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* date of birth */}
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: "100%" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Date of Birth"
                                                name="dob"
                                                value={dob}
                                                onChange={handleDob}

                                                renderInput={(params) => <TextField name="dob" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>

                                {/* highest qualification */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="high_qualification"
                                        label="Highest Qualification"
                                        name="high_qualification"
                                        autoComplete="high_qualification"
                                    />
                                </Grid>

                                {/* present_organization */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="present_organization"
                                        label="Present organization"
                                        name="present_organization"
                                        autoComplete="present_organization"
                                    />
                                </Grid>

                                {/* designation */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="designation"
                                        label="Designation"
                                        name="designation"
                                        autoComplete="designation"
                                    />
                                </Grid>

                                {/* current_city */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="current_city"
                                        label="Current City"
                                        name="current_city"
                                        autoComplete="current_city"
                                    />
                                </Grid>

                                {/* state */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="state"
                                        label="State"
                                        name="state"
                                        autoComplete="state"
                                    />
                                </Grid>

                                {/* country */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="country"
                                        label="Country"
                                        name="country"
                                        autoComplete="country"
                                    />
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
            </Grid>
        </Grid>

    );
}

