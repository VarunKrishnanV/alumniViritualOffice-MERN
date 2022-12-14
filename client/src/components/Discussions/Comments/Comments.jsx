import React from 'react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import "../../../index.css"
import { useSelector } from 'react-redux'

function Comments({ comments, getComments }) {
    const dateFormatter = (date) => {
        return dayjs(date).format('MMM DD, YYYY h:M:A')
    }
    const auth = useSelector((state) => state.auth)

    // const [commentor, setCommentor] = useState("")

    // async function fetchCommentor(id) {
    //     const res = await fetch(
    //         `${import.meta.env.VITE_API_URL}/allusers/paavaian/${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`,
    //         },
    //     });
    //     const user = await res.json();
    //     const commentor = (`${user.lastName}`)
    //     return commentor;
    // }

    // --------------------- updating discussion status -------------------

    //API ------ update the status of the comments


    async function updateCommentStatus(id, status) {

        const data = status === "published" ? { status: "in-approval" } : { status: "published" }

        if (window.confirm("Are you sure want to publish / unpublish the comment?")) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/comments/comment/status/${id}`, {
                method: "PATCH",

                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (res.ok) {
                // if updated rerender the comments section and the discussion details
                getComments();
            }

        }
    }




    return (
        <div className='comments_container'>
            {comments.map((item) => {

                const { _id, commented_by, commented_by_name, comment, status, createdAt } = item

                if (status === "in-approval") {
                    if (auth.user.user_type === "admin" || commented_by === auth.user._id) {
                        return (
                            <div key={_id} className='comment_container'>
                                <div className="discussion__meta" >

                                    <span className="discussion__author">{commented_by === auth.user._id ? "You" : commented_by_name}</span>

                                    <FiberManualRecordIcon className="content__separater" />
                                    <span className="discussion__date">{dateFormatter(createdAt)}</span>
                                    {auth.user.user_type === "admin" || commented_by === auth.user._id
                                        ?
                                        <>
                                            <FiberManualRecordIcon className="content__separater" />
                                            {/* <span className="discussion__author"
                                                style={status === "in-approval" ?
                                                    { color: "#A67A46", textTransform: "capitalize", background: "#FCF5E5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500 }
                                                    : { color: "#007E5F", textTransform: "capitalize", background: "#C7EFE5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500 }
                                                }
                                            >{`${status}`}</span> */}
                                            <span className="discussion__author"
                                                style={status === "in-approval" ?
                                                    { color: "#A67A46", textTransform: "capitalize", borderRadius: "50px", fontWeight: 600 }
                                                    : { color: "#007E5F", textTransform: "capitalize", borderRadius: "50px", fontWeight: 600 }
                                                }
                                            >{`${status}`}</span>
                                        </>
                                        : ""
                                    }
                                </div>
                                <p className='comment_data'>{comment}</p>
                                <div className='discussion__actions'>

                                    {
                                        auth.user.user_type === "admin"
                                            ?
                                            status === "published"
                                                ? <button className='action__unpublish' onClick={() => updateCommentStatus(_id, status)}>UnPublish</button>
                                                : <button className='action__publish' onClick={() => updateCommentStatus(_id, status)}>Publish</button>
                                            : ""
                                    }
                                </div>
                            </div>
                        )
                    }

                } else if (status === "published") {
                    return (
                        <div key={_id} className='comment_container'>
                            <div className="discussion__meta" >

                                <span className="discussion__author">{commented_by === auth.user._id ? "You" : commented_by_name}</span>

                                <FiberManualRecordIcon className="content__separater" />
                                <span className="discussion__date">{dateFormatter(createdAt)}</span>
                                {auth.user.user_type === "admin" || commented_by === auth.user._id
                                    ?
                                    <>
                                        <FiberManualRecordIcon className="content__separater" />
                                        {/* <span className="discussion__author"
                                            style={status === "in-approval" ?
                                                { color: "#A67A46", textTransform: "capitalize", background: "#FCF5E5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500 }
                                                : { color: "#007E5F", textTransform: "capitalize", background: "#C7EFE5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500 }
                                            }
                                        >{`${status}`}</span> */}
                                        <span className="discussion__author"
                                            style={status === "in-approval" ?
                                                { color: "#A67A46", textTransform: "capitalize", borderRadius: "50px", fontWeight: 600 }
                                                : { color: "#007E5F", textTransform: "capitalize", borderRadius: "50px", fontWeight: 600 }
                                            }
                                        >{`${status}`}</span>
                                    </>
                                    : ""
                                }
                            </div>
                            <p className='comment_data'>{comment}</p>
                            <div className='discussion__actions'>

                                {
                                    auth.user.user_type === "admin"
                                        ?
                                        status === "published"
                                            ? <button className='action__unpublish' onClick={() => updateCommentStatus(_id, status)}>UnPublish</button>
                                            : <button className='action__publish' onClick={() => updateCommentStatus(_id, status)}>Publish</button>
                                        : ""
                                }
                            </div>
                        </div>
                    )
                }

            })}
        </div >
    )
}

export default Comments



