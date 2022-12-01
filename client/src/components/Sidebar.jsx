import React from "react";
import iconHome from "../assets/icons/iconHome.svg";
import iconUser from "../assets/icons/iconUser.svg";
import iconAllUsers from "../assets/icons/iconAllUsers.svg";
import iconDiscussions from "../assets/icons/iconDiscussions.svg";
import iconContributions from "../assets/icons/iconContributions.svg";
import iconLogout from "../assets/icons/iconLogout.svg";
import { Link as AppRouter, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DoneAllIcon from '@mui/icons-material/DoneAll';
function Sidebar() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const navigate = useNavigate();
    function logout() {
        handleClickOpen()
        // Cookies.remove("token")
        // navigate("/login")
    }
    return (
        <>
            <div className="w-2/12 h-screen bg-red px-5 py-5 bg-slate-100">
                <nav className="flex flex-col gap-5 text-l">
                    <AppRouter to="/">
                        <div className="flex flex-auto">
                            <div className="icon w-1/4">
                                <img src={iconHome} alt="" />
                            </div>
                            <p className="w-3/4">Home</p>
                        </div>
                    </AppRouter>

                    <AppRouter to="/profile">
                        <div className="flex flex-auto">
                            <div className="icon w-1/4">
                                <img src={iconUser} alt="" />
                            </div>
                            <p className="w-3/4">Profile</p>
                        </div>
                    </AppRouter>

                    {/* <AppRouter to="/paavaians">
                        <div className="flex flex-auto">
                            <div className="icon w-1/4">
                                <img src={iconAllUsers} alt="" />
                            </div>
                            <p className="w-3/4">Paavaians</p>
                        </div>
                    </AppRouter>

                    <AppRouter to="/discussions">
                        <div className="flex flex-auto">
                            <div className="icon w-1/4">
                                <img src={iconDiscussions} alt="" />
                            </div>
                            <p className="w-3/4">Discussions</p>
                        </div>
                    </AppRouter>

                    <AppRouter to="/contributions">
                        <div className="flex flex-auto">
                            <div className="icon w-1/4">
                                <img src={iconContributions} alt="" />
                            </div>
                            <p className="w-3/4">Contributions</p>
                        </div>
                    </AppRouter> */}

                    <AppRouter to="/approve">
                        <div className="flex flex-auto">
                            <div className="icon w-1/4">
                                <img src={iconContributions} alt="" />

                                {/* <img src={iconContributions} alt="" /> */}
                                <DoneAllIcon />
                            </div>
                            <p className="w-3/4">Notifications</p>
                        </div>
                    </AppRouter>

                    {/* {isAuthenticated && (
                        <AppRouter to="">
                            <div className="flex flex-auto">
                                <div className="icon w-1/4">
                                    <img src={iconContributions} alt="" />
                                </div>
                                <p className="w-3/4">Hello</p>
                            </div>
                        </AppRouter>
                    )} */}


                    <div className="flex flex-auto" style={{ cursor: "pointer" }} onClick={logout} >
                        <div className="icon w-1/4">
                            <img src={iconLogout} alt="" />
                        </div>
                        <p className="w-3/4">Logout</p>
                    </div>
                </nav>


            </div>
        </>
    );
}

export default Sidebar;
