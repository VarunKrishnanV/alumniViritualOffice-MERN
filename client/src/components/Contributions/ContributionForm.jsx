import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"
// import.meta.env.VITE_API_URL

// popups
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';


const token = Cookies.get("token")

function ContributionForm({ loadContributions, handleClose }) {
    const auth = useSelector((state) => state.auth)

    // ------------------ Form Handiling -------------------

    // default values of input fields
    const [form, setForm] = useState({
        cont_type: "",
        cont_description: "",
        cont_by: auth.user.fullName,
    });

    const [type, setType] = React.useState('')
    const handleType = (event) => {
        setType(event.target.value);
    };

    // handle Input
    function handleInput(e) {
        console.log(e.target.value);
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // ------------------ API tasks -------------------

    // handle submit
    async function handleSubmit(e) {

        e.preventDefault();
        console.log(form);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/contributions`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        if (res.ok) {
            loadContributions();
            handleClose();
        }
    }

    // loading ConloadContributions
    useEffect(() => {
        loadContributions();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (
        <div>
            <form>

                {/* <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-select-small">College</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        label="College"
                        name="cont_type"
                        value={type}
                        onChange={handleType}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="webinar">Webinar</MenuItem>
                        <MenuItem value="alumni guest lecture">Alumni Guest Lecture</MenuItem>
                        <MenuItem value="placements">Placement</MenuItem>
                        <MenuItem value="workshop">Workshop</MenuItem>
                    </Select>
                </FormControl> */}

                <TextField
                    fullWidth
                    label="Contribution type"
                    id="fullWidth"
                    type="text"
                    placeholder="Webinar / Placement / Alumni Guest Lecture"
                    name="cont_type"
                    value={form.cont_type}
                    onChange={handleInput}
                    style={{ marginTop: "20px" }}
                />

                <TextField
                    sx={{ marginTop: "8px" }}
                    fullWidth
                    id="outlined-textarea"
                    label="Description"
                    multiline
                    rows={4}
                    onChange={handleInput}
                    placeholder="Contribution description"
                    name="cont_description"
                    value={form.cont_description}
                />

                <DialogActions>
                    <Button onClick={handleClose}
                        sx={{
                            marginTop: "10px",
                            textTransform: "capitalize",
                            backgroundColor: "transparent",
                            color: "gray"
                        }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        type="submit"
                        sx={{
                            marginTop: "10px",
                            textTransform: "capitalize",
                            backgroundColor: "#A12137",
                        }}
                    >
                        Create Contribution
                    </Button>
                </DialogActions>
            </form>
        </div>
    );
}

export default ContributionForm;
