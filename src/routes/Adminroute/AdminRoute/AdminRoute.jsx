import React from 'react';
import UseAuth from '../../../AuthProvider/UseAuth';
import AdminUse from '../../../UseHooks/AdminUse/AdminUse';
import { Navigate, useLocation } from 'react-router-dom';
import { FiLoader } from "react-icons/fi";

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const [isAdmin, adMinLoading] = AdminUse()
    const location = useLocation()

    if (loading || adMinLoading) {
        return <FiLoader className='text-3xl text-center block text-green-700' />
    }

    if (isAdmin && user) {
        return children
    }

    return <Navigate to={'/'} state={{ form: location }} replace></Navigate>

};

export default AdminRoute;
