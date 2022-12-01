import React from 'react'
import { useSelector } from "react-redux";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProfileSection from '../components/ProfileSection';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Profile() {

  const auth = useSelector((state) => state.auth)
  const { _id, fullName, alumni_status, batch, college, createdAt, dept, email, phone } = auth.user;


  return (
    <>
      <div className='pageHeading'>Your Profile</div>
      <ProfileSection data={auth.user} />
    </>
  )
}

export default Profile