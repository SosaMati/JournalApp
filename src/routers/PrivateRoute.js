import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {

    const { auth } = useSelector((state) => state);

    return auth.uid ? children : <Navigate to="auth/login" />;
};

