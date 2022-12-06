import React from 'react'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const RenderProfileButton = (row) => {
    return (
        <Link to={`/paavaians/${row.row._id}`}>
            <Button style={{ textTransform: "capitalize" }} variant="outlined" size="small" >View Profile</Button>
        </Link>
    )
};

function InApprovalUsers() {

    const token = Cookies.get("token")
    const [inApprovalUsers, setInApprovalUsers] = useState([]);

    // fetchUsers
    async function fetchInApprovalUser() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/allusers/inapproval`, {
            headers: {

                Authorization: `Bearer ${token}`,
            }
        })
        const users = await res.json();
        if (res.ok) {
            setInApprovalUsers(users.allUsers);
        }
    }

    useEffect(() => {
        fetchInApprovalUser()
    }, [])



    const columns = [
        { field: 'fullName', headerName: 'Alumni Name', minWidth: 200, flex: 2 },
        // { field: 'lastName', headerName: 'Last name', width: 100 },
        { field: 'phone', headerName: 'Phone', minWidth: 120 },
        { field: 'email', headerName: 'Email', minWidth: 200, flex: 1, },
        { field: 'college', headerName: 'College', minWidth: 50 },
        { field: 'batch', headerName: 'Batch', minWidth: 60 },
        { field: 'dept', headerName: 'Department', minWidth: 100 },
        { field: 'alumni_status', headerName: 'Status', minWidth: 100 },
        { field: 'View', headerName: 'View Profile', minWidth: 130, renderCell: RenderProfileButton },
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
            <h1 className='pageHeading'>Paavians</h1>

            <Box sx={{ height: "70vh", width: '100%' }}>
                <DataGrid
                    rows={inApprovalUsers}
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

export default InApprovalUsers


