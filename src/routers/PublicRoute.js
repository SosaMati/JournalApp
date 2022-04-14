import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }) => {

    const { auth } = useSelector((state) => state);

    return auth.uid ? <Navigate to="/" /> : children;
};

