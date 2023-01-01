import AppBar from '@mui/material/AppBar';
import * as React from 'react';
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { logout } from "./store/auth.js"

// CSS
import "./App.css";
import "./index.css"

// material UI
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


// icons
import iconHome from "./assets/icons/iconHome.svg";
import iconUser from "./assets/icons/iconUser.svg";
import iconAllUsers from "./assets/icons/iconAllUsers.svg";
import iconDiscussions from "./assets/icons/iconDiscussions.svg";
import iconContributions from "./assets/icons/iconContributions.svg";
import iconLogout from "./assets/icons/iconLogout.svg";
import appLogo from "./assets/images/logo.svg"
import iconNotifications from './assets/icons/iconNotifications.svg';
import Avatar from '@mui/material/Avatar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { width } from '@mui/system';


const drawerWidth = 240;

function Dashboard(props) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth)
    console.log('Dashauth: ', auth);


    const navigate = useNavigate();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function _logout() {
        Cookies.remove("token")
        dispatch(logout())
        navigate("/login")
    }


    let navItems;

    // sidebar for admin
    if (auth.user.user_type === "admin" && auth.user.alumni_status === "active") {
        navItems = [
            { key: "1", label: "Home", route: "/", icon: iconHome },
            { key: "2", label: "Profile", route: "/profile", icon: iconUser },
            { key: "3", label: "Paavaians", route: "/paavaians", icon: iconAllUsers },
            { key: "4", label: "Discussions", route: "/discussions", icon: iconDiscussions },
            { key: "5", label: "Contributions", route: "/contributions", icon: iconContributions },
            { key: "6", label: "Notifications", route: "/notifications", icon: iconNotifications },
        ]
    }
    // sidebar fo alumni - users who were approved by admin
    else if (auth.user.user_type === "alumni" && auth.user.alumni_status === "active") {
        navItems = [
            { key: "1", label: "Home", route: "/", icon: iconHome },
            { key: "2", label: "Profile", route: "/profile", icon: iconUser },
            { key: "4", label: "Discussions", route: "/discussions", icon: iconDiscussions },
            { key: "5", label: "Contributions", route: "/contributions", icon: iconContributions },
        ]
    }
    // sidebar for guest - users who were not approved by admin
    else {
        navItems = [
            { key: "1", label: "Home", route: "/", icon: iconHome },
            { key: "2", label: "Profile", route: "/profile", icon: iconUser },
            { key: "4", label: "Discussions", route: "/waitforapproval", icon: iconDiscussions },
            { key: "5", label: "Contributions", route: "/waitforapproval", icon: iconContributions },
        ]
    }

    const drawer = (
        <>
            <div style={{ height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <img src={appLogo} />
            </div>
            <Divider />
            <List>
                {
                    navItems.map((hello) => {
                        return (
                            <Link to={hello.route} key={hello.key}>
                                <ListItem key={hello.key} disablePadding>
                                    <ListItemButton>
                                        <img style={{ marginRight: "20px" }} src={hello.icon} />
                                        <ListItemText primary={hello.label} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        )
                    })
                }

                {/* logout item on sidebar */}
                <ListItem key="logout" disablePadding>
                    <ListItemButton onClick={_logout}>
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
            <AppBar style={{ background: "linear-gradient(273.84deg, #600817 1.56%, #a12137 100%)" }} position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, }} >
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }} >
                        <MenuIcon />
                    </IconButton>
                    <div className='navTopBar'>
                        <p variant="h6" noWrap component="div">
                            Alumni Virutal Office
                        </p>
                        <Link to="/profile">
                            <div className="navUserDetails">
                                <Avatar style={{ background: "#a02136", fontSize: "12px", width: "30px", height: "30px" }} />
                                <div className="user__detials" sx={{ mr: 2, display: { sm: 'none' } }}>
                                    <p className="user__name" style={{ fontWeight: 600, fontSize: "16px" }}>
                                        {`${auth.user.fullName}`}
                                    </p>

                                    {/* <div className='user__meta' style={{ textTransform: "uppercase", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600, color: "#A6A6A6" }}>
                                    {auth.user.dept}
                                    <FiberManualRecordIcon className="content__separater" />
                                    {auth.user.college}
                                </div> */}
                                </div>
                            </div>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders" >
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


            <Box style={{ marginTop: "70px" }} component="main" sx={{ marginTop: "60px", flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
                <Outlet />
            </Box>
        </Box>
    );
}

export default Dashboard;