
import "./App.css";
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from "./store/auth.js"
import Cookies from "js-cookie";
import Dashboard from "./dashboard";
import { useEffect, useState } from "react"
import { Navigate, redirect } from "react-router-dom";


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
        return <p>Loading....</p>
    }

    return (
        <>
            <Dashboard />
        </>
    );
}

export default App;
