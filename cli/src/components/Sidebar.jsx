import React from "react";
import iconHome from "../assets/icons/iconHome.svg";
import iconUser from "../assets/icons/iconUser.svg";
import iconAllUsers from "../assets/icons/iconAllUsers.svg";
import iconDiscussions from "../assets/icons/iconDiscussions.svg";
import iconContributions from "../assets/icons/iconContributions.svg";
import iconLogout from "../assets/icons/iconLogout.svg";

function Sidebar() {
    return (
        <>
            <div className="w-2/12 bg-red px-5 py-5">
                <nav className="flex flex-col gap-5 text-l">
                    <a className="flex flex-auto" href="#">
                        <div className="icon w-1/4">
                            <img src={iconHome} alt="" />
                        </div>
                        <p className="w-3/4 hover:text-red-900">Home</p>
                    </a>
                    <a className="flex flex-auto" href="#">
                        <div className="icon w-1/4">
                            <img src={iconUser} alt="" />
                        </div>
                        <p className="w-3/4">Profile</p>
                    </a>
                    <a className="flex flex-auto" href="#">
                        <div className="icon w-1/4">
                            <img src={iconAllUsers} alt="" />
                        </div>
                        <p className="w-3/4">Paavaians</p>
                    </a>
                    <a className="flex flex-auto" href="#">
                        <div className="icon w-1/4">
                            <img src={iconDiscussions} alt="" />
                        </div>
                        <p className="w-3/4">Discussions</p>
                    </a>
                    <a className="flex flex-auto" href="#">
                        <div className="icon w-1/4">
                            <img src={iconContributions} alt="" />
                        </div>
                        <p className="w-3/4">Contributions</p>
                    </a>
                    <a className="flex flex-auto" href="#">
                        <div className="icon w-1/4">
                            <img src={iconLogout} alt="" />
                        </div>
                        <p className="w-3/4">Logout</p>
                    </a>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
