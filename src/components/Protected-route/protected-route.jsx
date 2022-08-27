import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";

export function ProtectedRoute({ children, ...rest }) {
    const { isAuthorized } = useSelector(state => state.auth)

    return (
        <Route
            {...rest}
            render={() =>
                isAuthorized ? (
                    children
                ) : (
                    <Redirect
                        to='/login'
                    />
                )
            }
        />
    );
} 