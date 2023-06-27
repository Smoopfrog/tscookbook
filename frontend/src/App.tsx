import { useState, MouseEvent, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage/HomePage";
import NewRecipeForm from "./Components/NewRecipeForm";
import { Recipe as RecipeModel } from "./models/recipe";
import Recipe from "./Components/Recipe";
import * as RecipesApi from "./network/recipes_api";

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

  const handleShowRecipeForm = (e: MouseEvent<HTMLButtonElement>) => {
    setShowRecipeForm(!showRecipeForm);
  };

  const closeRecipeForm = () => {
    setShowRecipeForm(false)
  }

  return (
    <div className="App">
      <Header />
      <HomePage openForm={handleShowRecipeForm} />
      {recipes.map((recipe) => {
        return <Recipe recipe={recipe} key={recipe._id} />;
      })}
      <dialog open={showRecipeForm}>
        <NewRecipeForm handleClose={closeRecipeForm}/>
      </dialog>
    </div>
  );
}

export default App;
