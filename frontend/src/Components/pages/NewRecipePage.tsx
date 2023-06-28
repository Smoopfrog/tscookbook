import { useForm, useFieldArray } from "react-hook-form";
import { Recipe } from "../../models/recipe";
import * as RecipesApi from "../../network/recipes_api";

interface ButtonProps {
  handleClose: () => void;
}

const NewRecipeForm = ({ handleClose }: ButtonProps) => {
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

  const onSubmit = async (data: Recipe) => {
    try {
      await RecipesApi.createRecipe(data);
      handleClose();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add a new Recipe</h1>
      <input placeholder="name" {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <input placeholder="description" {...register("description")} />
      <input placeholder="portion" {...register("portion")} />
      <input placeholder="cooktime" {...register("cooktime")} />
      <h2>Ingredients</h2>
      <ul>
        {ingredientFields.map((ingredient, index) => {
          return (
            <li key={ingredient.id}>
              <input
                placeholder="amount"
                {...register(`ingredients.${index}.amount`, { required: true })}
              />
              <select {...register(`ingredients.${index}.measurement`)}>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
                <option value="cup">cups</option>
                <option value="g">grams</option>
                <option value="">none</option>
              </select>
              <input
                placeholder="ingredient"
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
              <input
                {...register(`directions.${index}.text`, { required: true })}
              />
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
          directionAppend({ text: "" });
        }}
      >
        Add Direction
      </button>
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default NewRecipeForm;
