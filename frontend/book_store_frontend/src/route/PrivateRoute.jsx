import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateAdminRoute = () => {
    const auth = useAuth();
    if(!auth.user || !auth.user.token || auth.user.role === "USER") {
        console.log("token not found")
        return <Navigate to="admin/login" />
    }
    return <Outlet/>;
}

const PrivateCustomerRoute = () => {
    const auth = useAuth();
    if(!auth.customer || !auth.customer.token) {
        console.log("token not found")
        return <Navigate to="login" />
    }
    return <Outlet/>;
}

export default { PrivateAdminRoute, PrivateCustomerRoute };