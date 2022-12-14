import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie"
import ContributionsAll from './ContributionsAll';


export default function AllContributionsTab() {

    const [myContributions, setMyContributions] = useState([]);

    // getting all disucussions
    async function loadContributions() {
        const token = Cookies.get("token")
        const contributions = await fetch(`${import.meta.env.VITE_API_URL}/contributions`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data } = await contributions.json();
        setMyContributions(data);
    }

    useEffect(() => {
        loadContributions()
    }, [])

    return (
        <Box className="AllDiscussionPageCotnainer" sx={{ flexGrow: 1, background: "" }} >
            <Grid className="AllDiscussionInner" container spacing={5}>
                <Grid item xs={12} md={8}>
                    <Box style={{ boxShadow: "none", padding: "0" }}>
                        <ContributionsAll myContributions={myContributions} loadContributions={loadContributions} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
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
