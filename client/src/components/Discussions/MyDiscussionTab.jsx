import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie"
import DiscussionsAll from './DiscussionsAll';

const token = Cookies.get("token")

export default function MyDiscussionTab() {

    const [myDiscussions, setMyDiscussions] = useState([]);

    // getting all disucussions
    async function loadDiscussions() {
        const token = Cookies.get("token")
        const discussions = await fetch(`${import.meta.env.VITE_API_URL}/discussion`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data } = await discussions.json();
        setMyDiscussions(data);
    }

    useEffect(() => {
        loadDiscussions()
    }, [myDiscussions])

    return (
        <Box className="AllDiscussionPageCotnainer" sx={{ flexGrow: 1, background: "" }} >
            <Grid className="AllDiscussionInner" container spacing={5}>
                <Grid item xs={8}>
                    <Box style={{ boxShadow: "none", padding: "0" }}>
                        <DiscussionsAll myDiscussions={myDiscussions} loadDiscussions={loadDiscussions} />
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
