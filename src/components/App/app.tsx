import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import {
  ConstructorPage,
  ProfilePage,
  SignInPage,
  RegistrationPage,
  ForgotPassFirstPage,
  ForgotPassSecondPage,
  OrdersFeed,
  Order,
  Feed,
  NotFound404,
  IngredientInformation,
  OrderPage,
  FeedPage,
} from "../../pages";
import { AppHeader } from "../Header/header";
import { ProtectedRoute } from "../Protected-route/protected-route";
import { getUser } from "../../services/actions/auth";
import { IngredientDetails } from "../Ingredient-details/ingredient-details";
import { getIngredients } from "../../services/actions/ingredients";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { ILocationState } from "../../services/types/data";

export const App = () => {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  let background;
  const location = useLocation<ILocationState>();
  const history = useHistory();

  useEffect(() => {
    dispatch(getIngredients()); // ts
    dispatch(getUser()); // ts
  }, [dispatch]);

  if (isLoading) {
    return <p>. . .</p>;
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
        <Route
          path="/forgot-password"
          component={ForgotPassFirstPage}
          exact
        ></Route>
        <Route path="/reset-password" exact>
          <ForgotPassSecondPage />
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <FeedPage />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderPage />
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
      {background && (
        <Route path="/feed/:id" exact>
          <Order closeModal={onCloseModal} />
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id" exact>
          <Order closeModal={onCloseModal} />
        </Route>
      )}
    </>
  );
};
