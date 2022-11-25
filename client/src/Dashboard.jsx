import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as AppRouter, useNavigate } from "react-router-dom";
import "./App.css";

import iconHome from "./assets/icons/iconHome.svg";
import iconUser from "./assets/icons/iconUser.svg";
import iconAllUsers from "./assets/icons/iconAllUsers.svg";
import iconDiscussions from "./assets/icons/iconDiscussions.svg";
import iconContributions from "./assets/icons/iconContributions.svg";
import iconLogout from "./assets/icons/iconLogout.svg";
import appLogo from "./assets/images/logo.svg"

import Cookies from "js-cookie"

// components
// import Sidebar from "./components/Sidebar";
import { Outlet } from 'react-router-dom'


const drawerWidth = 240;

function Dashboard(props) {

    const navigate = useNavigate();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function logout() {
        Cookies.remove("token")
        navigate("/login")
    }

    const navItems = [
        { key: "1", label: "Home", route: "/", icon: iconHome },
        { key: "2", label: "Profile", route: "/profile", icon: iconUser },
        { key: "3", label: "Paavaians", route: "/paavaians", icon: iconAllUsers },
        { key: "4", label: "Discussions", route: "/discussions", icon: iconDiscussions },
        { key: "5", label: "Contributions", route: "/contributions", icon: iconContributions },
    ]


    const drawer = (
        <>
            <div style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <img src={appLogo} />
            </div>
            <Divider />
            <List>
                {
                    navItems.map((navItem) => {
                        return (
                            <AppRouter to={navItem.route} key={navItem.key}>
                                <ListItem key={navItem.key} disablePadding>
                                    <ListItemButton>
                                        <img style={{ marginRight: "20px" }} src={navItem.icon} />
                                        <ListItemText primary={navItem.label} />
                                    </ListItemButton>
                                </ListItem>
                            </AppRouter>
                        )
                    })
                }
                <ListItem key="logout" disablePadding>
                    <ListItemButton onClick={logout}>
                        <img style={{ marginRight: "20px" }} src={iconLogout} />
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </ >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, }} >
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }} >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders" >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }} open >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
                <Outlet />
            </Box>
        </Box>
    );
}

export default Dashboard;