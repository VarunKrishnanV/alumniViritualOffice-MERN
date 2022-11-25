import { React, useEffect, useState } from "react";
import DiscussionCard from "./DiscussionCard";
import Cookies from "js-cookie";
import.meta.env.VITE_API_URL



function DiscussionsAll({ allDiscussions, setAllDiscussions }) {

    useEffect(() => {
        loadDiscussions();
    }, [allDiscussions]);

    async function loadDiscussions() {
        const token = Cookies.get("token");
        const discussions = await fetch(
            `${import.meta.env.VITE_API_URL}/discussion`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const { data } = await discussions.json();
        setAllDiscussions(data);
    }

    return (
        <div>
            {allDiscussions.length <= 0
                ? "No Discussion Found"
                : allDiscussions.map((discussion) => {
                    return (
                        <DiscussionCard
                            key={discussion._id}
                            data={discussion}
                        />
                    );
                })}
        </div>
    );
}

export default DiscussionsAll;
