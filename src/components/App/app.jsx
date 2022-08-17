import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConstructorPage, ProfilePage, SignInPage, RegistrationPage, ForgotPassFirstPage, ForgotPassSecondPage } from "../pages";
import { AppHeader } from "../Header/header";

export const App = () => {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact>
          <ConstructorPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
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
      </Switch>
    </Router>
  );
};
