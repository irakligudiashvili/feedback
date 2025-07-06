import {  Navigate } from "react-router-dom"
import type { JSX } from "react";
import { useAuth } from "../contexts/AuthContext";

interface Props{
    children: JSX.Element;
    requiredRole?: string;
}

function ProtectedRoute({children, requiredRole} : Props){
    const {user, isLoggedIn} = useAuth();

    if(!isLoggedIn){
        return <Navigate to='/login' />
    }

    if(requiredRole && user?.role !== requiredRole){
        return <Navigate to='/' />
    }

    return children
}

export default ProtectedRoute