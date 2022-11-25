import React from 'react'
import "./styles/error.css"

function ErrorPage() {
    return (
        <div className='error_page'>
            <img className='error_image' src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=2000" />
            <h1>Oops! Page Not Found</h1>
        </div>
    )
}

export default ErrorPage