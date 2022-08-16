import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConstructorPage, ProfilePage, SignInPage } from "../pages";
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
        <Route path="/registration/sign-in" exact>
          <SignInPage />
        </Route>
      </Switch>
    </Router>
  );
};
