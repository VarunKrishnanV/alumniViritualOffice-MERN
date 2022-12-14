import { React,  useState } from "react";
import.meta.env.VITE_API_URL
import Cookies from "js-cookie"
import.meta.env.VITE_API_URL
import ContributionCard from "./ContributionCard"

function ContributionsAll({ allContributions, loadContributions, myContributions }) {

    const [isLoading, setIsLoading] = useState(false)

    //  Delete a discussion
    async function deleteContribution(id) {
        const token = Cookies.get('token')

        if (window.confirm("Are you sure want to delete the Contributions?")) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/contributions/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                setIsLoading(true)
                loadContributions()
            }
        }
    }

    const contributions = allContributions ? allContributions : myContributions

    return (
        <div>
            {
                (
                    contributions.length <= 0
                        ? "No contributions Found"
                        : contributions.map((discussion) => {
                            return (
                                <ContributionCard key={discussion._id} data={discussion} deleteContribution={deleteContribution} />
                            );
                        })
                )
            }
        </div >
    );
}

export default ContributionsAll;

