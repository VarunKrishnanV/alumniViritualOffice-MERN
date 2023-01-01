import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Cookies from "js-cookie";
import "../../../index.css";

export default function Comments({ discussionId, getComments }) {
    const [comment, setComment] = useState("")

    const auth = useSelector((state) => state.auth)
    const { fullName } = auth.user;

    let commentDetails = {
        discussion_id: discussionId,
        commented_by_name: fullName,
        comment: comment,
        status: "in-approval",
    }

    function removeDisabled(e) {
        e.target.classList.remove("disabled");
    }

    function addDisabled(e) {
        e.target.classList.add("disabled");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!comment) {
            alert("required")
            return
        }
        e.target.classList.add("disabled")
        const res = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
            method: "POST",
            body: JSON.stringify(commentDetails),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`
            },
        });
        if (res.ok) {
            getComments()
        }
        setComment("")
        e.target.classList.remove("disabled")
    }
    function handleChange(e) {
        setComment(e.target.value)
    }

    return (
        <>
            <form action="" className='comment_form'>
                <input type="text" onChange={handleChange} value={comment} className='comment_input' placeholder='Enter your comment' />
                <button value="submit" onClick={handleSubmit} type='submit' className={
                    comment ? "comment_button " : "comment_button disabled"
                }>Comment</button>
            </form>
        </>
    );
}