import { Recipe } from "../models/recipe";

const localApi = "http://localhost:5000";
const server = "https://tscookbook-api.onrender.com";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  console.log("response", response);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    throw Error(response.status + " " + errorMessage);
  }
};

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await fetchData(`${server}/api/recipes`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const fetchRecipe = async (recipeId?: string): Promise<Recipe> => {
  const response = await fetchData(`${server}/api/recipes/${recipeId}`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export interface RecipeInput {
  title: string;
  description?: string;
  portion?: string;
  cooktime?: string;
  category?: string;
  imgUrl?: string;
  tags?: string[];
  ingredients?: { amount?: string; name: string }[];
  directions?: { text: string }[];
}

export const createRecipe = async (recipe: RecipeInput): Promise<Recipe> => {
  const response = await fetchData(`${server}/api/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
    credentials: "include",
  });

  return response.json();
};

export interface UpdateRecipeInput {}

export const updateRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const response = await fetchData(`${server}/api/recipes/${recipe._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
    credentials: "include",
  });

  return response.json();
};

export const deleteRecipe = async (recipeId: string) => {
  await fetchData(`${server}/api/recipes/` + recipeId, {
    method: "DELETE",
    credentials: "include",
  });
};
