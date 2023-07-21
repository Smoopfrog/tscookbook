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
import * as RecipesApi from "./network/recipes_api";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <Signup />,
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

        // Reuse previous loader somehow?
        loader: async ({ params }) => {
          return RecipesApi.fetchRecipe(params.recipeId);
        },
      },
      {
        // Keeps data if edit recipe is open
        path: "/newrecipe",
        element: <RecipeForm />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
