import React from "react";
import Cookies from "js-cookie";
import { Navigate, redirect } from "react-router-dom";
import { useEffect, useState } from "react"


function CheckAuth({ children }) {
    const token = Cookies.get("token");
    const [isLoading, setIsLoading] = useState(false)

    async function fetchUser() {
        setIsLoading(true)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (!res.ok) {
            redirect("/login")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchUser();
    }, [])

    if (isLoading) {
        return (<p>"Loading"</p>)
    }
    return children;
}

export default CheckAuth;
