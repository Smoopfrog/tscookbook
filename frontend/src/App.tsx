import { useState, MouseEvent, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Components/pages/HomePage";
import { Recipe as RecipeModel } from "./models/recipe";
import Recipe from "./Components/Recipe";
import * as RecipesApi from "./network/recipes_api";
import { Routes, Route } from "react-router-dom";
import NewRecipePage from "./Components/pages/NewRecipePage";
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
        <Route path="/newrecipe" element={<NewRecipePage />} />
      </Routes>
    </div>
  );
}

export default App;
