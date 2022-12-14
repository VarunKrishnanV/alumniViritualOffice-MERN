import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"

// material ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";

// components
import AllContributionsTab from "../components/Contributions/AllContributionsTab";
import CompletedContributionsTab from "../components/Contributions/CompletedContributionsTab";
import ContributionForm from "../components/Contributions/ContributionForm";


// tab functionality
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


export default function Contributions() {

  // variables
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false); //popup
  const [allContributions, setAllContributions] = useState([]); //discussions
  const [isLoading, setIsLoading] = useState(false) //loader


  // popup open and close
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // popup events
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  // ----- API - getting all disucussions -----
  async function loadContributions() {
    const token = Cookies.get("token")
    const contributions = await fetch(`${import.meta.env.VITE_API_URL}/contributions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = await contributions.json();
    console.log(data);
    setIsLoading(true)
    setAllContributions(data);
  }


  // function calls
  useEffect(() => {
    loadContributions()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container xs={12}>
        <div className="discussionHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h2 className="pageHeading" variant="h5">Contributions</h2>
          <Button variant="outlined" onClick={handleClickOpen}>
            Create Contribution
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle>Create new Contribution</DialogTitle>
          <DialogContent>
            <ContributionForm loadContributions={loadContributions} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Contributions" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{ padding: 0 }}>
        <AllContributionsTab loadContributions={loadContributions} allContributions={allContributions} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CompletedContributionsTab />
      </TabPanel>
    </Box>
  );
}