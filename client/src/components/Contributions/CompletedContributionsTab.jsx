import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie"
import ContributionsAll from './ContributionsAll';

export default function CompletedContributionsTab() {

    const [allContributions, setAllContributions] = useState([]);

    // getting all disucussions
    async function loadContributions() {
        const token = Cookies.get("token")
        const contributions = await fetch(`${import.meta.env.VITE_API_URL}/contributions/completed`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data } = await contributions.json();
        setAllContributions(data);
    }

    useEffect(() => {
        loadContributions()
    }, [])

    return (
        <Box className="AllDiscussionPageCotnainer" sx={{ flexGrow: 1, background: "" }} >
            <Grid className="AllDiscussionInner" container spacing={5}>
                <Grid item md={8} xs={12}>
                    <Box style={{ boxShadow: "none", padding: "0" }}>
                        <ContributionsAll allContributions={allContributions} loadContributions={loadContributions} />
                    </Box>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Box style={{ boxShadow: "none", border: "1px solid #CBCBCB", padding: "20px" }}>
                        {/* <DiscussionForm loadDiscussions={loadDiscussions} /> */}
                        <h3 style={{ marginBottom: "8px", color: "#a02136", fontWeight: 500, fontSize: "18px" }}>How it works?</h3>
                        <ol style={{ listStyleType: "number", marginLeft: "30px" }}>
                            <li> Create a Contribution</li>
                            <li> Our admin will contact you and proceed further</li>
                        </ol>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
}
