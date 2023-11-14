import Cookies from 'js-cookie';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
    const isAuthenticated =  Cookies.get('jwtAccessToken');

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <Component />
}
export default PrivateRoute;