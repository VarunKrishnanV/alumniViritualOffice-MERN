import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"
// import.meta.env.VITE_API_URL

// popups
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const token = Cookies.get("token")

function DiscussionForm({ loadDiscussions, handleClose }) {

    // ------------------ Form Handiling -------------------

    // default values of input fields
    const [form, setForm] = useState({
        dis_title: "",
        dis_description: "",
        dis_likes: "0",
    });

    // handle Input
    function handleInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    // ------------------ API tasks -------------------

    // handle submit
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/discussion`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        if (res.ok) {
            loadDiscussions();
            handleClose();
        }
    }

    // loading Discussions
    useEffect(() => {
        loadDiscussions();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (
        <div>
            <form>
                <TextField
                    fullWidth
                    label="Discussion title"
                    id="fullWidth"
                    type="text"
                    placeholder="Discussion title"
                    name="dis_title"
                    value={form.dis_title}
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
                    placeholder="Discussion description"
                    name="dis_description"
                    value={form.dis_description}
                />

                <input
                    onChange={handleInput}
                    type="text"
                    value={form.dis_likes}
                    name="dis_likes"
                    hidden
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
                        Create Discussion
                    </Button>
                </DialogActions>
            </form>
        </div>
    );
}

export default DiscussionForm;
