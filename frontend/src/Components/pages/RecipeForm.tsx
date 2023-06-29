import { useForm, useFieldArray } from "react-hook-form";
import { Recipe } from "../../models/recipe";
import * as RecipesApi from "../../network/recipes_api";
import { useLoaderData, useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const navigate = useNavigate();
  const recipe = useLoaderData() as Recipe;
  
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<Recipe>({
    defaultValues: recipe,
  });

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
      navigate("/myrecipes");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {recipe ? <h1>Edit Recipe</h1> : <h1>Add a new Recipe</h1>}
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
      {recipe ? (
        <button>Save</button>
      ) : (
        <button type="submit">Create Recipe</button>
      )}
    </form>
  );
};

export default RecipeForm;
