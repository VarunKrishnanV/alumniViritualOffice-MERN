import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import Cookies from 'js-cookie';
import ProfileSection from '../components/ProfileSection';

// materail UI
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

function PaavaianDetails() {

    const token = Cookies.get("token")
    const { id } = useParams()
    const auth = useSelector((state) => state.auth)

    const [paavaian, setPaavaian] = useState({})

    async function getSpecificUser() {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/allusers/paavaian/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        const user = await res.json();
        setPaavaian(user.user);
    }

    // ------------------------------------
    const { _id, user_type, fullName, alumni_status: a_status } = paavaian;

    const data = a_status === "active" ? { alumni_status: "in-approval" } : { alumni_status: "active" }


    async function updateUserStatus(id) {
        if (window.confirm("Are you sure want to approve / disapprove the user?")) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/allusers/updateuserstatus/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            if (res.ok) {
                console.log("updated");
                getSpecificUser();
            }
        }
    }

    useEffect(() => {
        getSpecificUser();
    }, [])


    return (
        <>
            <div className='pageHeading'>Paavaian Profile</div>
            {
                auth.user.user_type === "admin" && auth.user._id !== _id ?
                    ((a_status === "active" && auth.user._id !== _id) ?
                        (<Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <Button variant="contained" onClick={() => updateUserStatus(_id)} style={{ textTransform: "capitalize", color: "#A12137", background: "#FFE3E8", fontWeight: 600, fontSize: "18px" }}>Make inactive</Button>
                        </Grid>
                        ) :
                        (<Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            <Button variant="contained" onClick={() => updateUserStatus(_id)} style={{ textTransform: "capitalize", color: "#007E5F", background: "#C7EFE5", fontWeight: 600, fontSize: "18px" }}>Approve</Button>
                        </Grid>
                        )) : ""
            }
            <ProfileSection data={paavaian} getSpecificUser={getSpecificUser} />
        </>
    )
}

export default PaavaianDetails