import { useForm, useFieldArray } from "react-hook-form";
import { Recipe } from "../models/recipe";

const NewRecipeForm = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<Recipe>();

  const {
    fields: directionFields,
    append: directionAppend,
    remove: directionRemove,
  } = useFieldArray({
    name: "directions",
    control,
  });

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onSubmit = (data: Recipe) => console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add a new Recipe</h1>
      <input placeholder="name" {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <input placeholder="description" {...register("description")} />
      <input placeholder="portion" {...register("portion")} />
      <input placeholder="cooktime" {...register("cooktime")} />
      <select>
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Dessert</option>
        <option>Sides</option>
      </select>
      <h2>Ingredients</h2>
      <ul>
        {ingredientFields.map((ingredient, index) => {
          return (
            <li key={ingredient.id}>
              <input
                {...register(`ingredients.${index}.amount`, { required: true })}
              />
              <select>
                <option>tsp</option>
                <option>tbsp</option>
                <option>cups</option>
                <option>grams</option>
                <option>none</option>
              </select>
              <input
                type="text"
                {...register(`ingredients.${index}.name`, { required: true })}
              />
              <button type="button" onClick={() => ingredientRemove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => {
          ingredientAppend({ amount: 0, measurement: "", name: "" });
        }}
      >
        Add Ingredient
      </button>
      <ol>
        {directionFields.map((direction, index) => {
          return (
            <li key={direction.id}>
              <input {...register(`directions.${index}`, { required: true })} />
              <button type="button" onClick={() => directionRemove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        onClick={() => {
          directionAppend({ direction: "" });
        }}
      >
        Add Direction
      </button>
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default NewRecipeForm;
