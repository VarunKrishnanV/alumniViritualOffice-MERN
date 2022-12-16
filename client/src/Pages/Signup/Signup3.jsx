import * as React from 'react';
import Button from '@mui/material/Button';

// routers
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function SignUp() {

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
        <>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
            
        </>

    );
}

