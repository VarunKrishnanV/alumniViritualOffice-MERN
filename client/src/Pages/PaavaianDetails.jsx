import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom"
import Cookies from 'js-cookie';
import ProfileSection from '../components/ProfileSection';

function PaavaianDetails() {

    const token = Cookies.get("token")
    const { id } = useParams()

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

    useEffect(() => {
        getSpecificUser();
    }, [])





    return (
        <>
            <div className='pageHeading'>Paavaian Profile</div>
            <ProfileSection data={paavaian} />
        </>
    )
}

export default PaavaianDetails