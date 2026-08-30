import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if(!user || user.role!=='Admin'){
        return <Navigate to='/' replace />;
    }
    return children;
}

export default AdminRoute