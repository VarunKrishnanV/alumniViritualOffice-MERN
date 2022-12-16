import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// dropdown - MUI
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function CollegeDetails() {

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

    const [batch, setBatch] = React.useState("");
    const handleBatch = (event) => {
        setBatch(event.target.value);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                College Details
            </Typography>

            <Grid container spacing={3}>
                {/* identity number */}
                <Grid item xs={12}>
                    <TextField
                        // required
                        fullWidth
                        id="identity_number"
                        label="Roll / Register number"
                        name="identity_number"
                        autoComplete="identity_number"
                        variant="standard"
                    />
                </Grid>

                {/* college */}
                <Grid item xs={12}>
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-standard-label">College</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
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
                    <FormControl variant="standard" sx={{ width: "100%" }}>
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
                    <FormControl variant="standard" sx={{ width: "100%" }}>
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
                
            </Grid>
        </React.Fragment>
    );
}