import React from 'react'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const RenderDiscussion = (row) => {
  console.log(row);
  return (
    <Link to={`/discussions/${row.row._id}`}>
      <Button style={{ textTransform: "capitalize" }} variant="outlined" size="small" >View</Button>
    </Link>
  )
};

function InApprovalDiscussions() {

  const token = Cookies.get("token")
  const [inApprovalDiscussions, setInApprovalDiscussions] = useState([]);

  // fetchUsers
  async function fetchInApprovalDiscussions() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/discussion/inapproval`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const discussions = await res.json();
    console.log('users: ', discussions.data);
    if (res.ok) {
      setInApprovalDiscussions(discussions.data);
    }
  }

  useEffect(() => {
    fetchInApprovalDiscussions()
  }, [])



  const columns = [
    { field: 'dis_by', headerName: 'Discussion By', minWidth: 120 },
    { field: 'dis_title', headerName: 'Title', minWidth: 400 },
    { field: 'dis_description', headerName: 'Description', minWidth: 50, flex: 1 },
    { field: 'status', headerName: 'Status', minWidth: 60 },
    { field: 'createdAt', headerName: 'Created on', minWidth: 100 },
    { field: 'View', headerName: 'View', minWidth: 130, renderCell: RenderDiscussion },
  ];

  function generateRandom() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }



  return (

    <div className='paavaiansContainer'>
      <h1 className='pageHeading'>Discussions</h1>

      <Box sx={{ height: "70vh", width: '100%' }}>
        <DataGrid
          rows={inApprovalDiscussions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 100, 500]}
          components={{ Toolbar: GridToolbar }}
          getRowId={() => generateRandom()}
        />
      </Box>

    </div>
  )
}

export default InApprovalDiscussions

