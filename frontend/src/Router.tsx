import {
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import App from "./App";
import Recipe from "./pages/RecipePage";
import RecipeForm from "./pages/RecipeForm";
import MyRecipesPage from "./pages/MyRecipesPage";
import HomePage from "./pages/HomePage";
import * as UsersApi from "./api/users_api";
import * as RecipesApi from "./api/recipes_api";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import TagsPage from "./pages/TagsPage";
import ErrorPage from "./pages/ErrorPage";
import SignupPage from "./pages/SignupPage";

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
        element: <SignupPage />,
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
          if (params.recipeId === "random") {
            const recipeId = await RecipesApi.fetchRandomRecipe();
            return redirect(`/myrecipes/${recipeId}`);
          } else {
            return RecipesApi.fetchRecipe(params.recipeId);
          }
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
        loader: async () => {
          const data = {
            user: await UsersApi.getLoggedInUser(),
            recipes: await RecipesApi.fetchRecipes(),
          };
          return data;
        },
      },
    ],
  },
]);
