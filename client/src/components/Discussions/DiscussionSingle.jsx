import React from 'react'
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

function DiscussionSingle() {

  const discussionId = useParams().id
  console.log('discussionId: ', discussionId);

  return (
    <>
      <Grid className="AllDiscussionInner" container spacing={5}>
        <Grid item xs={6}>
          <div className="discussionDetails">
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
          </div>
        </Grid>
        <Grid item xs={6}>
          This is comment section
        </Grid>
      </Grid>
    </>
  )
}

export default DiscussionSingle