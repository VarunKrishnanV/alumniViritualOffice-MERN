import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function CheckAdmin({ children }) {

    const auth = useSelector((state) => state.auth)
    console.log('auth: ', auth);

    if (auth.user.user_type === "admin" && auth) {
        return children
    } else {
        return <Navigate to="/accessdenied" />
    }
}

export default CheckAdmin;
