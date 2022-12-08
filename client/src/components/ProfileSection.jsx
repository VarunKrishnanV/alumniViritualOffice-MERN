import React from 'react'
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import dayjs from 'dayjs';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProfileSection({ data, getSpecificUser, deactiateUser, approveInApprovalUser }) {
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const { _id, user_type, fullName, alumni_status, batch, college, createdAt, dept, email, phone, gender, dob, high_qualification, present_organization, designation, current_city, state, country } = data;

    const dateFormatter = (date) => {
        return dayjs(date).format('MMM DD, YYYY - H:M:A')
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid className='detailsTitle' item xs={12} lg={2.5} md={12}>
                    <div className='profileImageContainer'>
                        {/* <img src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=" alt="" /> */}
                        <Avatar style={{ width: "100%", height: "100%", background: "#a02136", fontSize: "30px" }} />
                    </div>
                </Grid>
                <Grid container item xs={12} lg={8.5} md={18.5} spacing={3} >
                    {/* <Grid className='detailsTitle' item xs={12}>Name</Grid> */}
                    <Grid item xs={12} style={{ fontSize: "40px" }}> {fullName}</Grid>

                    {/* account details */}
                    <Grid item xs={12} style={{ fontSize: "20px", fontWeight: 600, color: " #a12137" }}> Account Details</Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Profile Status</Grid>
                    <Grid item md={9} xs={8}>
                        <Chip
                            style={alumni_status == "in-approval" ?
                                { background: "#FCF5E5", color: "#A67A46", fontWeight: 600 } :
                                alumni_status == "active" ?
                                    { background: "#C7EFE5", color: "#007E5F", fontWeight: 600 } :
                                    { background: "#FFE7EB", color: "#A12137", fontWeight: 600 }
                            }
                            label={alumni_status} />
                    </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>ID</Grid>
                    <Grid item md={9} xs={8}>{_id}</Grid>

                    <Grid className='detailsTitle' item xs={4} md={3}>Joined on</Grid>
                    <Grid item md={9} xs={8}>{dateFormatter(createdAt)} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Email </Grid>
                    <Grid item md={9} xs={8}> {email}</Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Phone</Grid>
                    <Grid item md={9} xs={8}>{phone} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Gender</Grid>
                    <Grid item md={9} xs={8}>{gender} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>DOB</Grid>
                    <Grid item md={9} xs={8}>{dob} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Highest Qualification</Grid>
                    <Grid item md={9} xs={8}>{high_qualification} </Grid>

                    {/* College details */}
                    <Grid item xs={12} style={{ fontSize: "20px", fontWeight: 600, color: " #a12137", marginTop: "30px" }}> College Details</Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>College </Grid>
                    <Grid item md={9} xs={8}>{college} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Department</Grid>
                    <Grid item md={9} xs={8}>{dept} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Batch</Grid>
                    <Grid item md={9} xs={8}>{batch} </Grid>






                    {/* Job details */}
                    <Grid item xs={12} style={{ fontSize: "20px", fontWeight: 600, color: " #a12137", marginTop: "30px" }}> Job Details</Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Present Organization</Grid>
                    <Grid item md={9} xs={8}>{present_organization} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Designation</Grid>
                    <Grid item md={9} xs={8}>{designation} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Current City</Grid>
                    <Grid item md={9} xs={8}>{current_city} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>State</Grid>
                    <Grid item md={9} xs={8}>{state} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Current City</Grid>
                    <Grid item md={9} xs={8}>{current_city} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Country</Grid>
                    <Grid item md={9} xs={8}>{country} </Grid>

                </Grid>
            </Grid>
        </>
    )
}

export default ProfileSection;