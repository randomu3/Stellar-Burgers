import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConstructorPage, ProfilePage, SignInPage, RegistrationPage, ForgotPassFirstPage, ForgotPassSecondPage, OrdersFeed, Order, Feed, NotFound404 } from "../pages";
import { AppHeader } from "../Header/header";
import { ProtectedRoute } from "../Protected-route/protected-route";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/auth";

export const App = () => {
  const { isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  if (isLoading) {
    return <p>. . .</p>
  }

  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/login" exact>
          <SignInPage />
        </Route>
        <Route path="/register" exact>
          <RegistrationPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassFirstPage />
        </Route>
        <Route path="/reset-password" exact>
          <ForgotPassSecondPage />
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/" exact>
          <ConstructorPage />
        </Route>
        <ProtectedRoute path="/">
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
          <Route path="/profile/orders/:id" exact>
            <Order />
          </Route>
          <Route path="/profile/orders" exact>
            <OrdersFeed />
          </Route>
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router >
  );
};
