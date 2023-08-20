import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Recipe from "./pages/RecipePage";
import Signup from "./pages/Signup";
import RecipeForm from "./pages/RecipeForm";
import MyRecipesPage from "./pages/MyRecipesPage";
import HomePage from "./pages/HomePage";
import * as UsersApi from "./api/users_api";
import * as RecipesApi from "./api/recipes_api";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import TagsPage from "./pages/TagsPage";
import ErrorPage from "./pages/ErrorPage";
import { router } from "./Router";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
