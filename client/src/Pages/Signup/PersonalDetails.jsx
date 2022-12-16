import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
// dropdown - MUI
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function PersonalDetails() {

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

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Personal Details
            </Typography>
            <Grid container spacing={3}>

                {/* gender */}
                <Grid item xs={12}>
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                        <InputLabel id="demo-select-small">Gender</InputLabel>
                        <Select
                            required
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
                                required
                                renderInput={(params) => <TextField required variant="standard" name="dob" {...params} />}
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
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}