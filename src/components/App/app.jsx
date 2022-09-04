import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { ConstructorPage, ProfilePage, SignInPage, RegistrationPage, ForgotPassFirstPage, ForgotPassSecondPage, OrdersFeed, Order, Feed, NotFound404, IngredientInformation } from "../../pages";
import { AppHeader } from "../Header/header";
import { ProtectedRoute } from "../Protected-route/protected-route";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/auth";
import { IngredientDetails } from "../Ingredient-details/ingredient-details";
import { getIngredients } from "../../services/actions/ingredients";

export const App = () => {
  const { isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  let background;
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser())
  }, [dispatch])

  if (isLoading) {
    return <p>. . .</p>
  }

  if (history.action === "PUSH" || history.action === "REPLACE") {
    background = location.state && location.state.background;
  } else {
    background = undefined;
  }

  function onCloseModal() {
    history.goBack();
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <ConstructorPage />
        </Route>
        <Route path="/ingredient/:id" exact>
          <IngredientInformation />
        </Route>
        <Route path="/login" exact>
          <SignInPage />
        </Route>
        <Route path="/register" exact>
          <RegistrationPage />
        </Route>
        <Route path="/forgot-password" component={ForgotPassFirstPage} exact>
        </Route>
        <Route path="/reset-password" exact>
          <ForgotPassSecondPage />
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <Order />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <OrdersFeed />
        </ProtectedRoute>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredient/:id" exact>
          <IngredientDetails closeModal={onCloseModal} />
        </Route>
      )}
    </ >
  );
};
