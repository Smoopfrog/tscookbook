import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Recipe from "./Components/Recipe";
import Signup from "./Components/pages/Signup";
import RecipeForm from "./Components/pages/RecipeForm";
import MyRecipesPage from "./Components/pages/MyRecipesPage";
import HomePage from "./Components/pages/HomePage";
import * as UsersApi from "./network/users_api";
import * as RecipesApi from "./network/recipes_api";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./Components/pages/LoginPage";
import { Provider } from "react-redux";
import { store } from "./store";
import AccountPage from "./Components/pages/AccountPage";
import TagsPage from "./Components/pages/TagsPage";
import ErrorPage from "./Components/pages/ErrorPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/tags",
        element: <TagsPage />,
      },
      {
        path: "/myrecipes",
        element: <MyRecipesPage />,
        loader: async () => {
          return RecipesApi.fetchRecipes();
        },
      },
      {
        path: "/myrecipes/:recipeId",
        element: <Recipe />,
        loader: async ({ params }) => {
          return RecipesApi.fetchRecipe(params.recipeId);
        },
      },
      {
        path: "/myrecipes/:recipeId/edit",
        element: <RecipeForm />,
        loader: async ({ params }) => {
          return RecipesApi.fetchRecipe(params.recipeId);
        },
      },
      {
        path: "/newrecipe",
        element: <RecipeForm />,
      },
    ],
  },
]);

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
