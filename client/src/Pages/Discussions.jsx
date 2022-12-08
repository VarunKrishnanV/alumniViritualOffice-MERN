import React from "react";
import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DiscussionForm from "../components/Discussions/DiscussionForm";
import Cookies from "js-cookie"
import DiscussionsAll from '../components/Discussions/DiscussionsAll';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllDiscussionTab from "../components/Discussions/AllDiscussionTab";
import MyDiscussionTab from "../components/Discussions/MyDiscussionTab";
import { Skeleton } from "@mui/material";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const token = Cookies.get("token")



export default function Discussions() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // popup
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // ------------------ API Calls -----------------

    const [allDiscussions, setAllDiscussions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    // getting all disucussions
    async function loadDiscussions() {
        const token = Cookies.get("token")
        const discussions = await fetch(`${import.meta.env.VITE_API_URL}/discussion`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { data } = await discussions.json();
        setIsLoading(true)
        setAllDiscussions(data);
    }

    useEffect(() => {
        loadDiscussions()
    }, [])


    return (
        <Box sx={{ width: '100%' }}>
            <Grid container xs={12}>

                <div className="discussionHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <h2 className="pageHeading" variant="h5">Discussion Forum</h2>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Create Discusssion
                    </Button>
                </div>

                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Create new Discussion</DialogTitle>
                    <DialogContent>
                        <DiscussionForm loadDiscussions={loadDiscussions} handleClose={handleClose} />
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions> */}
                </Dialog>
            </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="My Discussions" {...a11yProps(0)} />
                    <Tab label="All Discussions" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} style={{ padding: 0 }}>
                <MyDiscussionTab loadDiscussions={loadDiscussions} allDiscussions={allDiscussions} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AllDiscussionTab />
            </TabPanel>
        </Box>
    );
}