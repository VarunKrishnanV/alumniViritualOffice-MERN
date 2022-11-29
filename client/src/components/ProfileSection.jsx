import React from 'react'
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

function ProfileSection({ data }) {

    const { _id, firstName, lastName, alumni_status, batch, college, createdAt, dept, email, phone } = data;

    // Avatar name generatror
    function stringAvatar(name) {
        return {
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid className='detailsTitle' item xs={12} lg={2.5} md={12}>
                    <div className='profileImageContainer'>
                        {/* <img src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=" alt="" /> */}
                        <Avatar style={{ width: "100%", height: "100%", background: "#a02136", fontSize: "30px" }} {...stringAvatar(`${firstName} ${lastName}`)} />
                    </div>
                </Grid>
                <Grid container item xs={12} lg={8.5} md={18.5} spacing={3} >
                    {/* <Grid className='detailsTitle' item xs={12}>Name</Grid> */}
                    <Grid item xs={12} style={{ fontSize: "40px" }}> {firstName} {lastName}</Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>ID</Grid>
                    <Grid item md={9} xs={8}>{_id}</Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Profile Status</Grid>
                    <Grid item md={9} xs={8}>{alumni_status} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Email </Grid>
                    <Grid item md={9} xs={8}> {email}</Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Phone</Grid>
                    <Grid item md={9} xs={8}>{phone} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Batch</Grid>
                    <Grid item md={9} xs={8}>{batch} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>College </Grid>
                    <Grid item md={9} xs={8}>{college} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Department</Grid>
                    <Grid item md={9} xs={8}>{dept} </Grid>
                    <Grid className='detailsTitle' item xs={4} md={3}>Created at</Grid>
                    <Grid item md={9} xs={8}>{createdAt} </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileSection;