import { React, useEffect } from "react";
import.meta.env.VITE_API_URL
import Cookies from "js-cookie"
import.meta.env.VITE_API_URL
import DiscussionCard from "./DiscussionCard"

function DiscussionsAll({ allDiscussions, loadDiscussions, myDiscussions }) {

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
                loadDiscussions()
            }
        }
    }

    const discussions = allDiscussions ? allDiscussions : myDiscussions
    
    return (
        <div>
            {

                discussions.length <= 0
                    ? "No Discussion Found"
                    : discussions.map((discussion) => {
                        return (
                            <DiscussionCard key={discussion._id} data={discussion} deleteDiscussion={deleteDiscussion} />
                        );
                    })}

        </div >
    );
}

export default DiscussionsAll;

