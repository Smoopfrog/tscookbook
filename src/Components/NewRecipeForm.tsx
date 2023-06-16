import { useState, MouseEvent } from "react";

const NewRecipeForm = () => {
  const [ingredientList, setIngredientList] = useState<any>([]);
  const [directionList, setDirectionList] = useState<any>([]);

  const IngedientInput = () => {
    return (
      <li>
        <input type="number" />
        <select>
          <option>tsp</option>
          <option>tbsp</option>
          <option>cups</option>
          <option>grams</option>
          <option>none</option>
        </select>
        <input type="text" />
      </li>
    );
  };

  const DirectionInput = () => {
    return (
      <li>
        <input />
      </li>
    );
  };

  const addIngredient = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIngredientList(
      ingredientList.concat(<IngedientInput key={ingredientList.length} />)
    );
  };

  const addDirection = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDirectionList(
      directionList.concat(<DirectionInput key={directionList.length} />)
    );
  };

  return (
    <form>
      <h1>Add a new Recipe</h1>
      <input placeholder="name" />
      <input placeholder="description" />
      <input placeholder="name" />
      <h2>Ingredients</h2>
      <button onClick={addIngredient}>Add Ingredient</button>
      <ul>{ingredientList}</ul>
      <h2>Directions</h2>
      <button onClick={addDirection}>Add Step</button>
      <ol>{directionList}</ol>
      <button>Create Recipe</button>
    </form>
  );
};

export default NewRecipeForm;
