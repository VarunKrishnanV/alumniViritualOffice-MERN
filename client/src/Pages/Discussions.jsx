import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DiscussionForm from "../components/Discussions/DiscussionForm";
import Cookies from "js-cookie"
import DiscussionsAll from '../components/Discussions/DiscussionsAll';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const token = Cookies.get("token")

export default function Discussions() {


    // popup
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [allDiscussions, setAllDiscussions] = useState([]);

    // ------------------ API Calls -----------------

    // getting all disucussions
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

    useEffect(() => {
        loadDiscussions()
    }, [])

    return (
        <Box className="AllDiscussionPageCotnainer" sx={{ flexGrow: 1, background: "", padding: "20px" }} >
            <h2 className="pageHeading" variant="h5" sx={{ marginBottom: "16px" }}>All Discussions</h2>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Create Discusssion
                </Button>
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Create new Discussion</DialogTitle>
                    <DialogContent>
                        <DiscussionForm loadDiscussions={loadDiscussions} handleClose={handleClose} />
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions> */}
                </Dialog>
            </div>
            <Grid className="AllDiscussionInner" container spacing={5}>
                <Grid item xs={8}>
                    <Box style={{ boxShadow: "none", padding: "0" }}>
                        <DiscussionsAll allDiscussions={allDiscussions} loadDiscussions={loadDiscussions} />
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box style={{ boxShadow: "none", border: "1px solid #CBCBCB", padding: "20px" }}>
                        {/* <DiscussionForm loadDiscussions={loadDiscussions} /> */}
                        <h3 style={{ marginBottom: "8px", color: "#a02136", fontWeight: 500, fontSize: "18px" }}>How it works?</h3>
                        <ol style={{ listStyleType: "number", marginLeft: "30px" }}>
                            <li> Create a discussion</li>
                            <li> Wait until admin publish your discussion</li>
                            <li> Other Alumni can comment on your discussion</li>
                            <li> You can able to view the comments once admin approve the comment</li>
                        </ol>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
}
