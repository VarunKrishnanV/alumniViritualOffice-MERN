import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function CheckAdmin({ children }) {

    const auth = useSelector((state) => state.auth)

    if (auth) {
        return children
    } else {
        return <Navigate to="/DontHaveAccess" />
    }
}

export default CheckAdmin;
