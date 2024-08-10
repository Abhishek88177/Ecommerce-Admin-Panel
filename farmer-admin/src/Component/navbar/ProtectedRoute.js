import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

const ProtectedRoute = () => {
    const { autherization , user, role } = useContext(AuthContext);

    if (!autherization) {
        return <Navigate to="/login" />;
    }

    // if (requiredRole && role !== requiredRole) {
    //     return <Navigate to="/unauthorized" />;
    // }

    return <Outlet />;
};

export default ProtectedRoute;
