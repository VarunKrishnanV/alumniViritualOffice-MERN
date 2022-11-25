import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";


// material icons
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sessions from "js-cookie"
import.meta.env.VITE_API_URL



export default function BasicCard({ data }) {

    async function deleteDiscussion(id) {
        const token = Sessions.get('token')
        const res = await fetch(`${import.meta.env.VITE_API_URL}/discussion/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const isDeleted = await res.json();
        console.log('isDeleted: ', isDeleted);
    }

    const { _id, dis_title, dis_description, createdAt } = data;
    return (
        <Card sx={{ minWidth: 275, padding: "8px", margin: "8px 0" }}>
            <CardContent>
                <Typography variant="h6" component="div" sx={{ color: "#A12137", fontWeight: 600, marginBottom: "4px", }} >
                    {dis_title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {dis_description}
                </Typography>
            </CardContent>

            <CardActions style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "20px", alignItems: "center", }} >
                <div style={{ flex: 1 }}>
                    Varun Krishnan V
                </div>
                <div style={{
                    display: "flex", justifyContent: "flex-end", gap: "10px", alignItems: "center",
                }}>
                    <IconButton aria-label="delete" size="large">
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large" toDelete={_id} onClick={() => deleteDiscussion(_id)} >
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
                            {createdAt}
                        </Typography>
                    </div>
                </div>
            </CardActions>


        </Card>
    );
}
