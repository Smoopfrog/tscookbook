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
  }, []);

  const handleShowRecipeForm = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("show form");
    setShowRecipeForm(!showRecipeForm);
  };

  // const recipe: RecipeInfo = {
  //   title: "chocolate chip cookie",
  //   category: "Cookie",
  //   description: "The best cookie in the world",
  //   ingredients: [
  //     { amount: 2, measurement: undefined, name: "eggs" },
  //     { amount: 2, measurement: "cups", name: "flour" },
  //     { amount: 1, measurement: "cup", name: "butter" },
  //   ],
  //   directions: ["Put ingredient in bowl", "Mix Bowl", "Cook bowl", "Eat"],
  // };

  return (
    <div className="App">
      <Header />
      <HomePage openForm={handleShowRecipeForm} />
      {recipes.map((recipe) => {
        return <Recipe recipe={recipe} key={recipe._id} />;
      })}
      <dialog open={showRecipeForm}>
        <NewRecipeForm />
      </dialog>
    </div>
  );
}

export default App;
