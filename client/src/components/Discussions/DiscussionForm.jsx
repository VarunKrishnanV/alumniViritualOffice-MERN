import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Cookies from "js-cookie"
// import.meta.env.VITE_API_URL


function DiscussionForm({ setAllDiscussions }) {
    // const [allDiscussions, setAllDiscussions] = useState([]);

    useEffect(() => {
        loadDiscussions();
    }, []);


    // default values of input fields
    const [form, setForm] = useState({
        dis_title: "",
        dis_description: "",
        dis_likes: "0",
    });


    async function loadDiscussions() {
        const token = Cookies.get("token")
        const discussions = await fetch(`${import.meta.env.VITE_API_URL}/discussion`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data } = await discussions.json();
        setAllDiscussions(data);
    }

    // handle Input
    function handleInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(e.target.value);
    }

    // handle submit
    async function handleSubmit(e) {
        const token = Cookies.get("token")
        console.log('token: ', token);

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
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1
                style={{
                    fontSize: "18px",
                    marginBottom: "16px",
                }}
            >
                Create new Discussion
            </h1>
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
                />
                <TextField
                    sx={{ marginTop: "8px" }}
                    fullWidth
                    id="outlined-textarea"
                    label="Description"
                    multiline
                    onChange={handleInput}
                    placeholder="Discussion description"
                    name="dis_description"
                    value={form.dis_description}
                />

                <input onChange={handleInput} type="text" value={form.dis_likes} name="dis_likes" hidden />

                <Button variant="contained" onClick={handleSubmit} type="submit" sx={{ marginTop: "10px", textTransform: "capitalize", backgroundColor: "#A12137", }} >
                    Create Discussion
                </Button>
            </form>
        </div>
    );
}

export default DiscussionForm;
