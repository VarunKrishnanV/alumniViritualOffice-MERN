import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


function CheckAuth({ children }) {

    const auth = useSelector((state) => state.auth)

    if (auth) {
        return children
    } else {
        return <Navigate to="/login" />
    }

}

export default CheckAuth;
