import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewRecipePage from "./Components/pages/NewRecipePage";
import MyRecipesPage from "./Components/pages/MyRecipesPage";
import Recipe from "./Components/Recipe";
import * as RecipesApi from "./network/recipes_api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/myrecipes",
        element: <MyRecipesPage />,
        loader: async () => {
          return RecipesApi.fetchRecipes();
        }
      },
      {
        path: "/myrecipes/:recipeId",
        element: <Recipe />,
        loader: async ({ params }) => {
          return RecipesApi.fetchRecipe(params.recipeId);
        },
      },
      {
        path: "/newrecipe",
        element: <NewRecipePage />,
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
