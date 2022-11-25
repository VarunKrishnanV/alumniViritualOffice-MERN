import { React, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DiscussionForm from "../components/Discussions/DiscussionForm";
import DiscussionsAll from "../components/Discussions/DiscussionsAll";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function PageAllDiscussions() {

    const [allDiscussions, setAllDiscussions] = useState([]);


    return (
        <Box className="AllDiscussionPageCotnainer" sx={{ flexGrow: 1, background: "#f1f1f1", padding: "20px" }} >
            <Typography variant="h5">All Discussions</Typography>

            <Grid className="AllDiscussionInner" container spacing={2}>
                {/* discusssion List */}
                <Grid className="AllDiscussionList" item xs={6} md={7} sx={{ backgroundColor: "none", background: "none", boxShadow: "none", }} >
                    <DiscussionsAll allDiscussions={allDiscussions} setAllDiscussions={setAllDiscussions} />
                </Grid>

                {/* Create Discussion form */}
                <Grid item xs={6} md={5} style={{ padding: "20px", marginTop: "4px" }} >
                    <Item>
                        <DiscussionForm setAllDiscussions={setAllDiscussions} />
                    </Item>
                </Grid>

            </Grid>
        </Box>
    );
}
