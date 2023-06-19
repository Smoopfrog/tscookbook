import { useState, MouseEvent } from "react";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage/HomePage";
import NewRecipeForm from "./Components/NewRecipeForm";
import Recipe from "./Components/Recipe";

export interface RecipeInfo {
  title: string;
  category: string;
  description: string;
  ingredients: { amount: number; measurement?: string; name: string }[];
  directions: string[];
}

function App() {
  const [showRecipeForm, setShowRecipeForm] = useState<boolean>(false);

  const handleShowRecipeForm = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("show form");
    setShowRecipeForm(!showRecipeForm);
  };

  const recipe: RecipeInfo = {
    title: "chocolate chip cookie",
    category: "Cookie",
    description: "The best cookie in the world",
    ingredients: [
      { amount: 2, measurement: undefined, name: "eggs" },
      { amount: 2, measurement: "cups", name: "flour" },
      { amount: 1, measurement: "cup", name: "butter" },
    ],
    directions: ["Put ingredient in bowl", "Mix Bowl", "Cook bowl", "Eat"],
  };

  return (
    <div className="App">
      <Header />
      <HomePage openForm={handleShowRecipeForm} />
      <dialog open={showRecipeForm}>
        <NewRecipeForm />
      </dialog>
    </div>
  );
}

export default App;
