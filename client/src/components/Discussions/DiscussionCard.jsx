import * as React from "react";
import dayjs from "dayjs"
import { useEffect, useState } from "react";

// material icons
import.meta.env.VITE_API_URL
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Cookies from "js-cookie"
import { Link } from "react-router-dom";

export default function DiscussionCard({ data, deleteDiscussion }) {

    let [paavaian, setPaavaian] = useState("")

    // const [paavaian, setPaavaian] = useState([])
    const dateFormatter = (date) => {
        return dayjs(date).format('MMM DD, YYYY')
    }

    const { _id, dis_title, dis_description, createdAt, alumni_id } = data;

    async function getSpecificUser() {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/allusers/paavaian/${alumni_id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        }
        );

        const user = await res.json();
        setPaavaian(user.user.firstName)
    }

    useEffect(() => {
        getSpecificUser()
    }, [])

    return (
        <div key={_id} sx={{ minWidth: 275, padding: "8px", margin: "0 0 16px 0", boxShadow: "none", border: "1px solid #CBCBCB" }}>
            <Link to={`/discussions/${_id}`}>
                <div className="discussion" >
                    <div className="discussion__details">
                        <h2 className="discussion__title" >{dis_title}</h2>
                        <p className="discussion__description">
                            {dis_description}
                        </p>
                    </div>
                    <div className="discussion__meta" >
                        <span className="discussion__author">{`${paavaian}`}</span>
                        <FiberManualRecordIcon className="content__separater" />
                        <span className="discussion__date">{dateFormatter(createdAt)}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
