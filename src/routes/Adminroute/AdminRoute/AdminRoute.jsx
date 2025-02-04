import React from 'react';
import UseAuth from '../../../AuthProvider/UseAuth';
import AdminUse from '../../../UseHooks/AdminUse/AdminUse';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const [isAdmin, adMinLoading] = AdminUse()
    const location = useLocation()

    if (loading || adMinLoading) {
        return <span className="loading loading-bars loading-xs"></span>
    }

    if (isAdmin && user) {
        return children
    }

    return <Navigate to={'/'} state={{ form: location }} replace></Navigate>

};

export default AdminRoute;
