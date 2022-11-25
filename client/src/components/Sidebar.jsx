import React from "react";
import iconHome from "../assets/icons/iconHome.svg";
import iconUser from "../assets/icons/iconUser.svg";
import iconAllUsers from "../assets/icons/iconAllUsers.svg";
import iconDiscussions from "../assets/icons/iconDiscussions.svg";
import iconContributions from "../assets/icons/iconContributions.svg";
import iconLogout from "../assets/icons/iconLogout.svg";
import { Link as AppRouter, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"




function Sidebar() {
    const navigate = useNavigate();
    function logout() {
        if (window.confirm("Are you sure want to logout?")){
            Cookies.remove("token")
            navigate("/login")
        }
        
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

                    <AppRouter to="/paavaians">
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
                    </AppRouter>


                    <div className="flex flex-auto" style={{ cursor: "pointer" }} onClick={logout}>
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
