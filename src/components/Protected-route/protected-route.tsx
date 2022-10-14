import React, { ReactNode } from "react";
import { RouteProps, Redirect, Route, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useRedux";

interface IProtectedRoute extends RouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({
  children,
  ...rest
}) => {
  const { isAuthorized } = useAppSelector((state) => state.auth);
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={() =>
        isAuthorized ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
