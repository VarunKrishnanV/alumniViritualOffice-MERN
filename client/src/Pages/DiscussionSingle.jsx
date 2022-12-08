import React from 'react'
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import "./../index.css"
import CommentsForm from '../components/Discussions/Comments/CommentsForm';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Cookies from "js-cookie";
import dayjs from "dayjs"
import Comments from '../components/Discussions/Comments/Comments';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { useSelector } from "react-redux";
import { Button } from '@mui/material';

function DiscussionSingle() {

  const discussionId = useParams().id
  const auth = useSelector((state) => state.auth)

  // get a discussion
  const [discussion, setDiscussion] = useState({});
  const [author, setAuthor] = useState({})

  async function getOneDiscussion() {
    const token = Cookies.get("token");

    // ---------------------- get discussion details -------------------
    const discussion = await fetch(
      `${import.meta.env.VITE_API_URL}/discussion/discuss/${discussionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // setting discussionData
    const res = await discussion.json();
    const discussionData = await res.data[0]
    setDiscussion(discussionData)

    // ---------------------- finding the author of the discussion -------------------
    const discussionAlumniId = discussionData.alumni_id
    const user = await fetch(
      `${import.meta.env.VITE_API_URL}/allusers/paavaian/${discussionAlumniId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const alumniRes = await user.json();
    const alumniData = alumniRes.user;
    setAuthor(alumniData)

    // ---------------------- get associated comments -------------------

  }


  const { _id: discussion_id, alumni_id, createdAt, dis_description, dis_likes, dis_title, status: discussion_status } = discussion
  const { fullName, _id } = author

  const dateFormatter = (date) => {
    return dayjs(date).format('MMM DD, YYYY')
  }

  // ---------------------all comments------------------
  const [comments, setComments] = useState([])

  async function getComments() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/comments/discussion/${discussionId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
    );
    const resComments = await res.json();
    setComments(resComments.data);
  }



  // --------------------- update discussion status -------------------

  const data = discussion_status === "published" ? { status: "in-approval" } : { status: "published" }

  async function updateDiscussionStatus(id) {
    if (window.confirm("Are you sure want to publish / unpublish the discussion?")) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/discussion/discuss/status/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (res.ok) {
        console.log("updated");
        getComments();
        getOneDiscussion();
      }
    }
  }

  useEffect(() => {
    getOneDiscussion()
    getComments()
  }, [])


  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px" }}>
        <h1 className='pageHeading' style={{ marginBottom: 0, fontSize: "24px" }}>Discussion</h1>
        {
          auth.user.user_type === "admin" ?
            ((discussion_status === "published") ?
              <Button variant="contained" onClick={() => updateDiscussionStatus(discussion_id)} style={{ textTransform: "capitalize", color: "#A12137", background: "#FFE3E8", fontWeight: 600, fontSize: "18px" }}>Un-publish</Button>
              :
              <Button variant="contained" onClick={() => updateDiscussionStatus(discussion_id)} style={{ textTransform: "capitalize", color: "#007E5F", background: "#C7EFE5", fontWeight: 600, fontSize: "18px" }}>Publish</Button>
            ) : ""
        }
      </div>

      <Grid className="DiscussionSingleContainer" container spacing={0}>
        {/* discussion data */}
        <Grid item xs={6}>
          <div className="discussionDetails">
            <div className="discussion" >
              <div className="discussion__meta" >
                <span className="discussion__author">{`${fullName}`}</span>
                <FiberManualRecordIcon className="content__separater" />
                <span className="discussion__date">{dateFormatter(createdAt)}</span>
                <FiberManualRecordIcon className="content__separater" />
                <span className="discussion__author"
                  style={discussion_status === "in-approval" ?
                    { color: "#A67A46", textTransform: "capitalize", background: "#FCF5E5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500 }
                    : { color: "#007E5F", textTransform: "capitalize", background: "#C7EFE5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500 }
                  }
                >{`${discussion_status}`}</span>
              </div>
              <div className="discussion__details">
                <h2 className="discussion__title" >
                  {dis_title}
                </h2>
                <p className="discussion__description">
                  {dis_description}
                </p>
              </div>
            </div>
          </div>
        </Grid>

        {/* comment section */}
        <Grid item xs={6} >
          <div className="commentsAll_container" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            {
              (discussion_status === "published")
                ?
                (
                  comments.length !== 0 ?
                    <>
                      <Comments comments={comments} />
                      <CommentsForm discussionId={discussionId} getComments={getComments} />
                    </>
                    :
                    <>
                      <p style={{ textAlign: "center", color: "gray" }}>Be the first one to commen on this post</p>
                      <CommentsForm discussionId={discussionId} getComments={getComments} />
                    </>
                )
                : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignSelf: "center", justifyContent: "center", color: "gray" }}>
                    <p style={{ textAlign: "center", alignSelf: "center", width: "70%", lineHeight: "1.8", display: "flex", flexDirection: "column", alignItems: "center", }}>
                      <CommentsDisabledIcon style={{ fontSize: "32px", marginBottom: "12px" }} />
                      Comment section will be turned on once the article is approved
                    </p>
                  </div>
                )}
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default DiscussionSingle