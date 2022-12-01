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


function DiscussionSingle() {

  const discussionId = useParams().id

  // get a discussion
  const [discussion, setDiscussion] = useState({});
  const [alumni, setAlumni] = useState({})

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
    setAlumni(alumniData)


    // ---------------------- get associated comments -------------------

  }


  useEffect(() => {
    getOneDiscussion()
  }, [])

  const { alumni_id, createdAt, dis_description, dis_likes, dis_title, status } = discussion
  const { lastName, _id } = alumni

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
    console.log('resComments: ', resComments.data);
    setComments(resComments.data);
  }

  useEffect(() => {
    getComments()
  }, [])


  return (
    <>
      <Grid className="DiscussionSingleContainer" container spacing={0}>

        {/* discussion data */}
        <Grid item xs={6}>
          <div className="discussionDetails">
            <div className="discussion" >
              <div className="discussion__meta" >
                <span className="discussion__author">{`${fullName}`}</span>
                <FiberManualRecordIcon className="content__separater" />
                <span className="discussion__date">{dateFormatter(createdAt)}</span>
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
            <Comments comments={comments} />
            <CommentsForm discussionId={discussionId} getComments={getComments} />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default DiscussionSingle