import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../AuthProvider/UseAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const location = useLocation()

    if (loading) {
        return '.....loading'
    }

    if (user?.email && user?.email) {
        return children
    }

    return <Navigate to={'/login/'} state={location.pathname}></Navigate>

};

export default PrivateRoute;