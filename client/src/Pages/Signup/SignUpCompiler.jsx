import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountDetails from './AccountDetails';
import CollegeDetails from './CollegeDetails';
import PersonalDetails from './PersonalDetails';
import JobDetails from './JobDetails';
import pecImage from "../../assets/images/CollegeBanner.jpg"
import pecLogo from "../../assets/images/pec-logo.png"
import Grid from '@mui/material/Grid';
import { Link as RouterLink, useNavigate } from 'react-router-dom'


const steps = ['Account Details', 'College Details', 'Personal Information', 'Job details'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AccountDetails />;
        case 1:
            return <CollegeDetails />;
        case 2:
            return <PersonalDetails />;
        case 3:
            return <JobDetails />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function SignUpCompiler() {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    const navigate = useNavigate();
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper component="form" noValidate onSubmit={handleSubmit} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    {/* <img src={pecLogo} alt="" style={{ width: "80px", margin: "auto" }} align="center" /> */}
                    {/* <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#000", marginTop: "20px" }}>Paavai Engineering College</h1> */}
                    {/* <h2 align="center" style={{ fontSize: "28px", fontWeight: 500, color: "#000", marginTop: "20px" }}>Alumni Virtual Office</h2> */}
                    {/* <Typography align="center" style={{ fontSize: "24px", fontWeight: 500, color: "gray", marginTop: "4px" }}>
                        Alumni Registration
                    </Typography> */}
                    <Typography component="h1" variant="h4" align="center">
                        Alumni Registration
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                {activeStep === steps.length - 1
                                    ? (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign Up
                                        </Button>
                                    )
                                    : (<Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Next
                                    </Button>)}
                                {/* <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button> */}

                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <RouterLink to="/login">
                            <Link component="span" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </RouterLink>
                    </Grid>
                </Grid>
            </Container>

        </ThemeProvider>
    );
}