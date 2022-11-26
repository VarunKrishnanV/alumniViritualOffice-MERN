import React from "react";
import "./ContentBox.css";
import { useEffect, useState } from "react"
import DiscussionsAll from "../Discussions/DiscussionsAll";

function ContentBox() {

    return (
        <>
            <div className="w-10/12">
                <div className="header p-10">
                    <div className="header__content">
                        <p className="text-white">My dashboard</p>
                        <h1 className="font-bold text-5xl text-white">
                            Hello Varun
                        </h1>
                    </div>
                    <div className="header__stats">
                        <div className="stat">
                            <p className="stat__count">123</p>
                            <p className="stat_description">Discussions</p>
                        </div>
                        <div className="stat">
                            <p className="stat__count">30</p>
                            <p className="stat_description">Events</p>
                        </div>
                        <div className="stat">
                            <p className="stat__count">10</p>
                            <p className="stat_description">Students placed</p>
                        </div>
                    </div>
                </div>

                <DiscussionsAll />
            </div>
        </>
    );
}

export default ContentBox;
