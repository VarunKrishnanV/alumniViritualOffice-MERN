import * as React from "react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
// material icons
import.meta.env.VITE_API_URL;
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function DiscussionCard({ data, deleteDiscussion }) {
    let [paavaian, setPaavaian] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    const [getCommentCount, setGetCommentCount] = useState(0);
    const dateFormatter = (date) => {
        return dayjs(date).format("MMM DD, YYYY");
    };

    const { _id, dis_title, dis_description, createdAt, alumni_id, status } = data;

    // ----- API - get discussion counts -----
    async function getSpecificUser() {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/allusers/paavaian/${alumni_id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );
        const user = await res.json();
        setIsLoading(true);
        // console.log('user: ', user.user.fullName);
        setPaavaian(user.user.fullName);
    }

    // ----- API - get discussion counts -----
    async function getCommentsCount(id) {
        const commentCount = await fetch(`${import.meta.env.VITE_API_URL}/comments/discussion/count/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        const { data } = await commentCount.json();
        setGetCommentCount(data)
    }


    useEffect(() => {
        getSpecificUser();
        getCommentsCount(_id)
    }, []);

    return (
        <div
            key={_id}
            style={{
                minWidth: 275,
                margin: "0 0 16px 0",
                boxShadow: "none",
            }}
        >
            {isLoading ? (
                <Link to={`/discussions/${_id}`}>
                    <div className="discussion">
                        <div className="discussion__details">
                            <h2 className="discussion__title">{dis_title}</h2>
                            <span className="discussion__description">
                                {dis_description}
                            </span>
                        </div>
                        <div className="discussion__meta">
                            <span className="discussion__author">
                                {paavaian}
                            </span>
                            <FiberManualRecordIcon className="content__separater" />
                            <span className="discussion__date">
                                {dateFormatter(createdAt)}
                            </span>
                            <FiberManualRecordIcon className="content__separater" />
                            <span className="discussion__date">
                                {getCommentCount} Comments
                            </span>
                            <FiberManualRecordIcon className="content__separater" />
                            <span className="discussion__author"
                                style={status === "in-approval" ?
                                    { color: "#A67A46", textTransform: "capitalize", borderRadius: "50px", fontWeight: 600 }
                                    : { color: "#007E5F", textTransform: "capitalize", borderRadius: "50px", fontWeight: 600 }
                                }
                            >{`${status}`}</span>
                        </div>
                    </div>
                </Link>
            ) : (
                <Skeleton variant="rounded" width={"100%"} height={"50px"} />
            )}
        </div>
    );
}
