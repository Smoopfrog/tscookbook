import "./App.css";
import Header from "./Components/Header";
import Recipe from "./Components/Recipe";

export interface RecipeInfo {
  title: string;
  category: string;
  description: string;
  ingredients: { amount: number; measurement?: string; name: string }[];
  directions: string[];
}

function App() {
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
      <Recipe recipe={recipe} />
    </div>
  );
}

export default App;
