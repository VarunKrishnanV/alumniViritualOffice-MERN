import React from 'react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import "../../../index.css"

function Comments({ comments }) {
    const dateFormatter = (date) => {
        return dayjs(date).format('MMM DD, YYYY - H:M:A')
    }

    // const [commentor, setCommentor] = useState("")

    async function fetchCommentor(id) {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/allusers/paavaian/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        const user = await res.json();
        const commentor = (`${user.lastName}`)
        return commentor;
    }

    // const { _id, commented_by, discussion_id, comment, status, createdAt } = item


    return (
        <div className='comments_container'>
            {comments.map((item) => {

                const { _id, commented_by } = item

                return (
                    <div key={_id} className='comment_container'>
                        <div className="discussion__meta" >
                            {/* <span className="discussion__author">{commented_by}</span> */}
                            {/* <FiberManualRecordIcon className="content__separater" /> */}
                            <span className="discussion__date">{dateFormatter(item.createdAt)}</span>
                        </div>
                        <p className='comment_data'>{item.comment}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments



