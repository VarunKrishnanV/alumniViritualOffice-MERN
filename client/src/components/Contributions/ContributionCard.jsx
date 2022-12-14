import * as React from "react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

// material icons
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function ContributionCard({ data, deleteDiscussion }) {
    let [paavaian, setPaavaian] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    // const [paavaian, setPaavaian] = useState([])
    const dateFormatter = (date) => {
        return dayjs(date).format("MMM DD, YYYY");
    };

    const { _id, cont_type, cont_description, cont_by, alumni_id, status, createdAt } =
        data;

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

    useEffect(() => {
        getSpecificUser();
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
                // <Link to={`/discussions/${_id}`}>
                <div className="discussion">
                    <div className="discussion__details">
                        <h2 className="discussion__title">{cont_type}</h2>
                        <p className="discussion__description">
                            {cont_description}
                        </p>
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
                        {/* <span className="discussion__date">{status}</span> */}
                        <span className="discussion__author"
                            style={status === "in-approval" ?
                                { color: "#A67A46", textTransform: "capitalize", borderRadius: "50px", fontWeight: 600 }
                                : { color: "#007E5F", textTransform: "capitalize", borderRadius: "50px", fontWeight: 600 }
                            }
                        >{`${status}`}</span>
                    </div>
                </div>
                // </Link>
            ) : (
                <Skeleton variant="rounded" width={"100%"} height={"50px"} />
            )}
        </div>
    );
}
