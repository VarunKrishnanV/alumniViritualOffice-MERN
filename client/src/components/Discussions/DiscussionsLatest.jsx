import { React, useEffect, useState } from "react";
import.meta.env.VITE_API_URL
import Cookies from "js-cookie"
import.meta.env.VITE_API_URL
import DiscussionCard from "./DiscussionCard"

function DiscussionsLatest({ latestDiscussions, loadLatestDiscussions }) {

    //  Delete a discussion
    async function deleteDiscussion(id) {
        const token = Cookies.get('token')

        if (window.confirm("Are you sure want to delete the Discussion?")) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/discussion/latest`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                loadLatestDiscussions()
            }
        }
    }

    return (
        <div>
            {
                latestDiscussions.length <= 0
                    ? "No Discussion Found"
                    : latestDiscussions.map((discussion) => {
                        return (
                            <DiscussionCard key={discussion._id} data={discussion} deleteDiscussion={deleteDiscussion} />
                        );
                    })}

        </div >
    );
}

export default DiscussionsLatest;

