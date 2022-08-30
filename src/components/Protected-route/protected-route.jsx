import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

export function ProtectedRoute({ children, ...rest }) {
    const { isAuthorized } = useSelector(state => state.auth)
    const location = useLocation();
    return (
        <Route
            {...rest}
            render={() =>
                isAuthorized ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: location.state?.from } }} />
                )
            }
        />
    );
} 