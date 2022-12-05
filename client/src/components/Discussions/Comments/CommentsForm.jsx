import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Cookies from "js-cookie"
import SendIcon from '@mui/icons-material/Send';

export default function Comments({ discussionId, getComments }) {

    console.log(useSelector);



    const [comment, setComment] = useState("")

    const auth = useSelector((state) => state.auth)
    // const { _id: userId } = auth.user;
    const { _id, fullName, alumni_status, batch, college, createdAt, dept, email, phone } = auth.user;

    let commentDetails = {
        discussion_id: discussionId,
        // commented_by: userId,
        commented_by_name: fullName,
        comment: comment,
        status: "pending",

    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
            method: "POST",
            body: JSON.stringify(commentDetails),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`
            },
        });
        if (res.ok) {
            console.log(await res.json());
            getComments()
        }
    }

    function handleChange(e) {
        setComment(e.target.value)
    }

    return (
        <>
            <form action="" className='comment_form'>
                <input type="text" onChange={handleChange} className='comment_input' />
                <button style={{ background: "white" }} value="submit" onClick={handleSubmit} type='submit' className='comment_button'>Comment</button>
            </form>

        </>
    );
}