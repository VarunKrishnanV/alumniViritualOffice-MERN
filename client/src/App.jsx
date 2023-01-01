
import "./App.css";
import { useDispatch } from 'react-redux'
import { getUser } from "./store/auth.js"
import Cookies from "js-cookie";
import Dashboard from "./dashboard.jsx";
import { useEffect, useState } from "react"
import { redirect } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function App() {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
    const token = Cookies.get("token");

    async function fetchUser() {
        setIsLoading(true)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.ok) {
            const user = await res.json()
            dispatch(getUser(user))
            redirect("/login")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchUser();
    }, [])

    if (isLoading) {
        return <div className="loadingContainer">
            <CircularProgress />
            <h1 style={{ fontSize: "20px" }}>Loading...</h1>
        </div>
    }

    return (
        <>
            <Dashboard />
        </>
    );
}

export default App;
