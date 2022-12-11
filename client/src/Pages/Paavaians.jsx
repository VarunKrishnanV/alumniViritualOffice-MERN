import React from 'react'
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { CSVLink, CSVDownload } from "react-csv";

const RenderProfileButton = (row) => {
  return (
    <Link to={row.row._id}>
      <Button style={{ textTransform: "capitalize" }} variant="outlined" size="small">View Profile</Button>
    </Link>
  )
};

const RenderStatus = (row) => {
  return (
    <span className="discussion__author"
      style={row.row.alumni_status === "in-approval" ?
        { color: "#A67A46", textTransform: "capitalize", background: "#FCF5E5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500, fontSize: "12px" }
        : { color: "#007E5F", textTransform: "capitalize", background: "#C7EFE5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500, fontSize: "12px" }
      }
    >
      {`${row.row.alumni_status}`}
    </span>
  )
}



// Avatar name generatror
function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function Paavains() {
  const columns = [
    { field: 'fullName', headerName: 'Alumni Name', minWidth: 200, flex: 2 },
    { field: 'phone', headerName: 'Phone', minWidth: 120 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1, },
    { field: 'college', headerName: 'College', minWidth: 50 },
    { field: 'batch', headerName: 'Batch', minWidth: 60 },
    { field: 'dept', headerName: 'Department', minWidth: 100 },
    { field: 'alumni_status', headerName: 'Status', minWidth: 100, renderCell: RenderStatus },
    { field: 'present_organization', headerName: 'Company', minWidth: 150 },
    { field: 'View', headerName: 'View Profile', minWidth: 130, renderCell: RenderProfileButton },
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

  function backupUsersData() {
    console.log("Hi");
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(allUsers)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    console.log(link);
    link.download = "allUsers.csv";
    link.click();
  }

  return (
    <div className='paavaiansContainer'>

      <div className="discussionHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <h2 className="pageHeading" variant="h5">Paavians</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="outlined"><CSVLink data={allUsers}>Download CSV</CSVLink></Button>
          <Button variant="outlined" onClick={backupUsersData}>Download JSON</Button>
        </div>
      </div>
      <Box sx={{ height: "70vh", width: '100%' }}>
        <DataGrid
          rows={allUsers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20, 100, 500]}
          components={{ Toolbar: GridToolbar }}
          getRowId={() => generateRandom()}
        />
      </Box>
    </div >
  )
}

export default Paavains

