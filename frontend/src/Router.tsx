import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Recipe from "./Components/Recipe";
import Signup from "./Components/pages/Signup";
import RecipeForm from "./Components/pages/RecipeForm";
import MyRecipesPage from "./Components/pages/MyRecipesPage";
import HomePage from "./Components/pages/HomePage";
import * as UsersApi from "./network/users_api";
import * as RecipesApi from "./network/recipes_api";
import LoginPage from "./Components/pages/LoginPage";
import AccountPage from "./Components/pages/AccountPage";
import TagsPage from "./Components/pages/TagsPage";
import ErrorPage from "./Components/pages/ErrorPage";

export const router = createBrowserRouter([
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
        loader: async () => {
          return await UsersApi.getLoggedInUser();
        },
      },
      {
        path: "/myrecipes",
        element: <MyRecipesPage />,
        loader: async () => {
          const data = {
            user: await UsersApi.getLoggedInUser(),
            recipes: await RecipesApi.fetchRecipes(),
          };
          return data;
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
          const data = {
            user: await UsersApi.getLoggedInUser(),
            recipe: await RecipesApi.fetchRecipe(params.recipeId),
          };
          return data;
        },
      },
      {
        path: "/newrecipe",
        element: <RecipeForm />,
      },
    ],
  },
]);
