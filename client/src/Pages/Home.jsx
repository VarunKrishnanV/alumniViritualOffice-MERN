import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

// other files
import "./styles/home.css"
import DiscussionsLatest from '../components/Discussions/DiscussionsLatest';

// material ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
}));


function Home() {

    const [latestDiscussions, setLatestDiscussions] = useState([])
    const [latestUsers, setLatestUsers] = useState([])
    const [discussionCount, setDiscussionCount] = useState(0)
    const [commentsCount, setCommentsCount] = useState(0)
    const [contributionCount, setContributionCount] = useState(0)

    const auth = useSelector((state) => state.auth)
    const { fullName } = auth.user;
    const token = Cookies.get("token")

    // ------------------ API Calls -----------------

    // API ----- getting all disucussions
    async function loadLatestDiscussions() {
        const discussions = await fetch(`${import.meta.env.VITE_API_URL}/discussion/latest`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data } = await discussions.json();
        setLatestDiscussions(data);
    }

    // API ----- get latest users
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

    // API ----- get discussion count
    async function getDiscussionCount() {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/discussion/count`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        const disCount = await res.json();
        setDiscussionCount(disCount.data)
    }

    // API ----- get discussion count
    async function getCommentsCount() {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/comments/count`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        const comCount = await res.json();
        setCommentsCount(comCount.data)
    }

    // API ----- get contributionn count
    async function getContributionsCount() {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/contributions/count`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        const contCount = await res.json();
        setCommentsCount(contCount.data)
    }

    useEffect(() => {
        loadLatestDiscussions();
        getLatestUsers();
        getDiscussionCount();
        getCommentsCount();
        // getContributionsCount();
    }, [])

    return (
        <div>
            <Grid container spacing={2}>
                {/* -----------------------banner--------------- */}
                <Grid item xs={12} >
                    <Item className="banner">
                        <h1 className='bannerHeading'>👋 Hello {fullName} </h1>
                        <Grid container item xs={12} sm={12} spacing={3} className="bannerStats">
                            <Grid item xs={12} md={3} lg={3}>
                                <Item className='bannerStats_item'>
                                    <p>{discussionCount}</p>
                                    <span>Discussions</span>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Item className='bannerStats_item'>
                                    <p>{commentsCount}</p>
                                    <span>Comments</span>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                                <Item className='bannerStats_item'>
                                    <p>{contributionCount}</p>
                                    <span>Contributions</span>
                                </Item>
                            </Grid>

                        </Grid>
                    </Item>
                </Grid>

                {/* --------------------- content ---------------- */}

                <Grid container item xs={12} style={{ marginTop: "0px" }} spacing={3}>

                    {/* ------------------recent discussions---------------- */}

                    <Grid item xs={12} lg={8}>
                        <div>
                            <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#a02136", marginBottom: "2px" }}>Recent Discussions</h1>
                            <DiscussionsLatest latestDiscussions={latestDiscussions} loadLatestDiscussions={loadLatestDiscussions} setLatestDiscussions={setLatestDiscussions} />
                        </div>
                    </Grid>


                    {/* --------------------- People recently joined ------------------- */}
                    <Grid item xs={12} lg={4}>
                        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#a02136" }}>Alumni Recently Joined</h1>
                        <List item sx={{ width: '100%', gap: "30px" }}>

                            {
                                latestUsers.map((user, index) => {
                                    if (index <= 5) {
                                        return (
                                            <ListItem key={user._id} style={{ gap: "10px", padding: "10px 0", borderBottom: "1px solid #EFEFEF" }}>
                                                <Avatar style={{ background: "#a02136", fontSize: "14px" }} />
                                                <div className="user__detials">
                                                    <p className="user__name" style={{ fontWeight: 600, fontSize: "16px" }}>
                                                        {`${user.fullName}`}
                                                    </p>

                                                    <div className='user__meta' style={{ textTransform: "uppercase", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600, color: "#A6A6A6" }}>
                                                        {user.dept}
                                                        <FiberManualRecordIcon className="content__separater" />
                                                        {user.college}
                                                    </div>
                                                </div>
                                            </ListItem>
                                        );
                                    }
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