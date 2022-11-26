import React from 'react'
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';

function Paavains() {

  const columns = [
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 100 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'email', headerName: 'Email', width: 100 },
    { field: 'college', headerName: 'College', width: 50 },
    { field: 'batch', headerName: 'Batch', width: 100 },
    { field: 'dept', headerName: 'Department', width: 100 },
    { field: 'alumni_status', headerName: 'Alumni STarus', width: 150 },
    { field: 'createdAt', headerName: 'Created on', width: 100 },
  ];


  const token = Cookies.get("token");

  const [allUsers, setAllUsers] = useState([])

  async function getAllUsers() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/allusers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );

    const users = await res.json();
    setAllUsers(users.allUsers);
  }

  useEffect(() => {
    getAllUsers();
  }, [])
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
    <div>
      <h1>Paavians</h1>
      {/* 
      {
        allUsers.map((user) => {
          return (
            <div key={user._id} style={{ marginBottom: "20px", background: "#f1f1f1", padding: "20px" }}>
              <h1>{user.firstName} {user.lastName}</h1>
              <Chip label={user.alumni_status} size="small" variant="outlined" />
            </div>
          )
        })
      } */}


      <Box sx={{ height: "80vh", width: '100%' }}>
        <DataGrid
          rows={allUsers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          getRowId={() => generateRandom()}
        />
      </Box>

    </div>
  )
}

export default Paavains

