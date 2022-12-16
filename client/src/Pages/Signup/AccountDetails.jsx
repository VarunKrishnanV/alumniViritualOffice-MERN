import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function AccountDetails() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Account Details
            </Typography>
            <Grid container spacing={3}>
                {/* fullname */}
                <Grid item xs={12} >
                    <TextField
                        autoComplete="given-name"
                        name="fullName"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"

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
                        variant="standard"
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
        </React.Fragment>
    );
}