import { React, useEffect, useState } from "react";
import.meta.env.VITE_API_URL
import Cookies from "js-cookie"
import.meta.env.VITE_API_URL
import DiscussionCard from "./DiscussionCard"
import { Skeleton } from "@mui/material";

function DiscussionsAll({ allDiscussions, loadDiscussions, myDiscussions }) {

    const [isLoading, setIsLoading] = useState(false)

    //  Delete a discussion
    async function deleteDiscussion(id) {
        const token = Cookies.get('token')

        if (window.confirm("Are you sure want to delete the Discussion?")) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/discussion/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                setIsLoading(true)
                loadDiscussions()
            }
        }
    }

    const discussions = allDiscussions ? allDiscussions : myDiscussions

    return (
        <div>
            {
                (
                    discussions.length <= 0
                        ? "No Discussions Found"
                        : discussions.map((discussion) => {
                            return (
                                <DiscussionCard key={discussion._id} data={discussion} deleteDiscussion={deleteDiscussion} />
                            );
                        })
                )
            }
        </div >
    );
}

export default DiscussionsAll;

