import { React, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DiscussionForm from "../components/Discussions/DiscussionForm";
import DiscussionsAll from "../components/Discussions/DiscussionsAll";
import { Typography } from "@mui/material";


export default function PageAllDiscussions() {

    const [allDiscussions, setAllDiscussions] = useState([]);

    return (
        <Box className="AllDiscussionPageCotnainer" sx={{ flexGrow: 1, background: "", padding: "20px" }} >
            <Typography variant="h5" sx={{ marginBottom: "16px" }}>All Discussions</Typography>

            <Grid className="AllDiscussionInner" container spacing={5}>
                <Grid item xs={8}>
                    <Box style={{ boxShadow: "none", padding: "0" }}>
                        <DiscussionsAll allDiscussions={allDiscussions} setAllDiscussions={setAllDiscussions} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box style={{ boxShadow: "none", border: "1px solid #CBCBCB" }}>
                        <DiscussionForm setAllDiscussions={setAllDiscussions} />
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
}
