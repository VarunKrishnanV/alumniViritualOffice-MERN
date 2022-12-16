import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function JobDetails() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Job Details
            </Typography>
            <Grid container spacing={3}>
                {/* present_organization */}
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="present_organization"
                        label="Present organization"
                        name="present_organization"
                        autoComplete="present_organization"
                        variant='standard'
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
                        variant='standard'

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
                        variant='standard'

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
                        variant='standard'

                    />
                </Grid>
                {/* country */}
                <Grid item xs={12}>
                    <TextField
                        variant='standard'
                        required
                        fullWidth
                        id="country"
                        label="Country"
                        name="country"
                        autoComplete="country"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}