import { React, useEffect } from "react";
import Cookies from "js-cookie";
import.meta.env.VITE_API_URL
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent"

// material icons
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sessions from "js-cookie"
import.meta.env.VITE_API_URL


function DiscussionsAll({ allDiscussions, setAllDiscussions }) {

    useEffect(() => {
        loadDiscussions();
        console.log('allDiscussions: ', allDiscussions);
    }, []);

    async function loadDiscussions() {
        const token = Cookies.get("token");
        const discussions = await fetch(
            `${import.meta.env.VITE_API_URL}/discussion`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const { data } = await discussions.json();
        setAllDiscussions(data);
    }

    async function deleteDiscussion(id) {
        const token = Sessions.get('token')

        if (window.confirm("Are you sure want to delete the Discussion?")) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/discussion/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const isDeleted = await res.json();

            if (res.ok) {
                loadDiscussions()
            }
        }

    }



    return (
        <div>

            {

                allDiscussions.length <= 0
                    ? "No Discussion Found"
                    : allDiscussions.map((discussion) => {
                        return (
                            <Card key={discussion._id} sx={{ minWidth: 275, padding: "8px", margin: "0 0 16px 0", boxShadow: "none", border: "1px solid #CBCBCB" }}>
                                {/* title and description */}
                                <CardContent style={{ textAlign: " left" }}>
                                    <Typography variant="h6" component="div" sx={{
                                        color: "#A12137", fontWeight: 600, marginBottom: "4px",
                                    }} >
                                        {discussion.dis_title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {discussion.dis_description}
                                    </Typography>
                                </CardContent>

                                {/* card details */}
                                <CardActions style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "20px", alignItems: "center", }} >
                                    <div style={{ flex: 1 }}>
                                        {/* Varun Krishnan V */}
                                    </div>
                                    <div style={{
                                        display: "flex", justifyContent: "flex-end", gap: "10px", alignItems: "center",
                                    }}>
                                        <IconButton aria-label="delete" size="large">
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton aria-label="delete" size="large" onClick={() => deleteDiscussion(discussion._id)} >
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton aria-label="delete" size="large" style={{ borderRadius: "4px", padding: "5px" }} >
                                            <CommentOutlinedIcon />
                                            <Typography style={{ fontSize: "14px", marginLeft: "8px" }}>
                                                20
                                            </Typography>
                                        </IconButton>

                                        <div style={{ display: "flex", flexDirection: "row", gap: "2px", alignItems: "center", }} >
                                            <CalendarMonthOutlinedIcon style={{ color: "gray" }} />
                                            <Typography style={{ color: "gray", fontSize: "14px", marginLeft: "8px", }} >
                                                {discussion.createdAt}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardActions>
                            </Card>
                        );
                    })}

        </div >
    );
}

export default DiscussionsAll;

