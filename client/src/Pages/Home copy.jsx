import React from 'react'
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import "./styles/home.css"
import DiscussionsLatest from '../components/Discussions/DiscussionsLatest';
import Cookies from 'js-cookie';

// latest users
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Avatar from '@mui/material/Avatar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
}));


function Home() {


    // Avatar name generatror
    function stringAvatar(name) {
        return {
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const [latestDiscussions, setLatestDiscussions] = useState([])

    const auth = useSelector((state) => state.auth)
    const { firstName } = auth.user;

    // ------------------ API Calls -----------------
    const token = Cookies.get("token")

    // getting all disucussions
    async function loadLatestDiscussions() {
        const discussions = await fetch(`${import.meta.env.VITE_API_URL}/discussion/latest`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data } = await discussions.json();
        setLatestDiscussions(data);
    }

    useEffect(() => {
        loadLatestDiscussions()
    }, [])



    const [latestUsers, setLatestUsers] = useState([])

    async function getLatestUsers() {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/allusers/latest`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        const users = await res.json();
        setLatestUsers(users.latestUsers);
    }

    useEffect(() => {
        getLatestUsers();
    }, [])


    return (
        <div>
            <Grid container item rowSpacing={{ sm: 1 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                {/* -----------------------------------banner----------------------------- */}

                <Grid item xs={12} >
                    <Item className="banner">
                        <h1 className='bannerHeading'>👋 Hello {firstName} </h1>
                        <Grid container item xs={12} sm={12} spacing={{ sm: 3, md: 3 }} className="bannerStats">
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

                {/* ----------------------------------- content ----------------------------- */}

                <Grid container item xs={12} style={{ marginTop: "30px" }} columnSpacing={{ xs: 10, sm: 4, md: 12 }} rowSpacing={{ sm: 4 }}>

                    {/* -----------------------------------recent discussions----------------------------- */}

                    <Grid item xs={12} lg={8}>
                        <div>
                            <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#a02136" }}>Recent Discussions</h1>
                            <DiscussionsLatest latestDiscussions={latestDiscussions} loadLatestDiscussions={loadLatestDiscussions} setLatestDiscussions={setLatestDiscussions} />
                        </div>
                    </Grid>


                    {/* ----------------------------------- People recently joined ----------------------------- */}

                    <Grid item xs={12} lg={4}>
                        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#a02136" }}>Alumni Recently Joined</h1>
                        <List item sx={{ width: '100%', gap: "30px" }}>

                            {
                                latestUsers.map((user) => {
                                    return (
                                        <ListItem key={user._id} style={{ gap: "10px", padding: "10px 0", borderBottom: "1px solid #EFEFEF" }}>
                                            <Avatar style={{ background: "#a02136", fontSize: "14px" }} {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
                                            <div className="user__detials">
                                                <p className="user__name" style={{ fontWeight: 600, fontSize: "16px" }}>
                                                    {`${user.firstName} ${user.lastName}`}
                                                </p>

                                                <div className='user__meta' style={{ textTransform: "uppercase", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600, color: "#A6A6A6" }}>
                                                    {user.dept}
                                                    <FiberManualRecordIcon className="content__separater" />
                                                    {user.college}
                                                </div>
                                            </div>
                                        </ListItem>
                                    );
                                })
                            }


                        </List>

                    </Grid>

                </Grid>
            </Grid>



        </div >
    )
}


export default Home