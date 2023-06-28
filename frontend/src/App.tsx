import { useState, MouseEvent, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Components/pages/HomePage";
import { Recipe as RecipeModel } from "./models/recipe";
import * as RecipesApi from "./network/recipes_api";
import { Routes, Route } from "react-router-dom";
import NewRecipePage from "./Components/pages/NewRecipePage";
import MyRecipesPage from "./Components/pages/MyRecipesPage";
import Recipe from "./Components/Recipe";

function App() {
  const [showRecipeForm, setShowRecipeForm] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipes = await RecipesApi.fetchRecipes();
        setRecipes(recipes);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    loadRecipes();
  }, [showRecipeForm]);

  const getRecipes = async () => {
    try {
      const recipes = await RecipesApi.fetchRecipes();
      setRecipes(recipes);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleShowRecipeForm = (e: MouseEvent<HTMLButtonElement>) => {
    setShowRecipeForm(!showRecipeForm);
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage openForm={handleShowRecipeForm} />}
        />
        <Route path="/myrecipes" element={<MyRecipesPage />} />
        <Route path="/newrecipe" element={<NewRecipePage />} />
        <Route
          element={<Recipe />}
          path="myrecipes/:recipeId"
          loader={async ({ params }) => {
            return RecipesApi.fetchRecipe(`/api/recipes/${params.recipeId}`);
          }}
        />
      </Routes>
    </div>
  );
}

export default App;
