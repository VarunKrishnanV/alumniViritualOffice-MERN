import React from 'react'
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridFilterPanel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const RenderViewButton = (row) => {
    return (
        <Link to={row.row._id}>
            <Button style={{ textTransform: "capitalize" }} variant="outlined" size="small">View</Button>
        </Link>
    )
};

const RenderStatus = (row) => {
    return (
        <span className="discussion__author"
            style={row.row.status === "in-approval" ?
                { color: "#A67A46", textTransform: "capitalize", background: "#FCF5E5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500, fontSize: "12px" }
                : { color: "#007E5F", textTransform: "capitalize", background: "#C7EFE5", padding: "0px 8px", borderRadius: "50px", fontWeight: 500, fontSize: "12px" }
            }
        >
            {`${row.row.status}`}
        </span>
    )
}

const dateFormatter = (row) => {
    return dayjs(row.row.createdAt).format('MMM DD, YYYY h:M:A');

};


function AllDiscussionTableTab({ getAllDiscussionsAdmin, allUsersDiscussions }) {
    console.log('getAllDiscussionsAdmin: ', getAllDiscussionsAdmin);
    console.log('allUsersDiscussions: ', allUsersDiscussions);


    const columns = [
        { field: 'dis_title', headerName: 'Title', minWidth: 200, flex: 2 },
        { field: 'dis_by', headerName: 'Author', minWidth: 50 },
        { field: 'status', headerName: 'Status', minWidth: 120, renderCell: RenderStatus },
        { field: 'createdAt', headerName: 'Date', minWidth: 200, flex: 1, renderCell: dateFormatter },
        { field: 'View', headerName: 'View', minWidth: 120, renderCell: RenderViewButton },
    ];

    const token = Cookies.get("token");

    // const [allUsersDiscussions, setAllUsersDiscussions] = useState([])

    // async function getAllDiscussionsAdmin() {
    //     const res = await fetch(
    //         `${import.meta.env.VITE_API_URL}/discussion/getAllForAdmin`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     }
    //     );

    //     const discussAll = await res.json();
    //     setDiscussions(discussAll.data);
    // }

    useEffect(() => {
        getAllDiscussionsAdmin();
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
        <div className='paavaiansContainer'>

            <div className="discussionHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <h2 className="pageHeading" variant="h5">Paavians</h2>
            </div>
            <Box sx={{ height: "70vh", width: '100%' }}>
                <DataGrid
                    rows={allUsersDiscussions}
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

export default AllDiscussionTableTab

