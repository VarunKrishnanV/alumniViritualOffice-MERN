import React from 'react'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import "./styles/home.css"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
}));


function Home() {

    const auth = useSelector((state) => state.auth)
    const { firstName, lastName } = auth.user;

    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} >
                    <Item className="banner">
                        <h1 className='bannerHeading'>Hello {firstName}</h1>
                        <Grid container xs={12} sm={12} spacing={3} className="bannerStats">
                            <Grid item xs={12} md={3} lg={3}>
                                <Item className='bannerStats_item'>
                                    <p>123</p>
                                    <span>Discussions</span>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Item className='bannerStats_item'>
                                    <p>12</p>
                                    <span>Comments</span>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Item className='bannerStats_item'>
                                    <p>86</p>
                                    <span>Contributions</span>
                                </Item>
                            </Grid>

                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home