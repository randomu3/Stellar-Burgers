import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "../Header/header";
import { Constructor, LoginPage } from "../pages";
import { ProfilePage } from "../pages/profile";
import { RegisterPage } from "../pages/register";

export const App = () => {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <Constructor />
        </Route>
        <Route path="/profile" exact={true}>
          <ProfilePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register " exact={true}>
          <RegisterPage />
        </Route>
        {/* <Route path="/forgot-password " exact={true}>
          <ForgotPassPage />
        </Route> */}
        {/* <Route path="/ingredients/:id " exact={true}>
          <IngredientPage />
        </Route> */}
        {/* <Route path="/reset-password " exact={true}>
          <ResetPassPage />
        </Route> */}
      </Switch>
    </Router>
  );
};
