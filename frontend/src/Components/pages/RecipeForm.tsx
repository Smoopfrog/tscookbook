import { useForm, useFieldArray } from "react-hook-form";
import { MouseEvent } from "react";
import { Recipe } from "../../models/recipe";
import * as RecipesApi from "../../network/recipes_api";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../../Styles/RecipeForm.css";
import { BsChevronUp, BsChevronDown, BsTrash, BsPlusLg } from "react-icons/bs";

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
    move: directionMove,
  } = useFieldArray({
    name: "directions",
    control,
  });

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
    move: ingredientMove,
  } = useFieldArray({
    name: "ingredients",
    control,
  });

  const handleReset = () => {
    directionRemove();
    ingredientRemove();
  };

  const onSubmit = async (data: Recipe) => {
    try {
      await RecipesApi.createRecipe(data);
      navigate("/myrecipes");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const deleteRecipe = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      await RecipesApi.deleteRecipe(recipe._id);
      navigate("/myrecipes");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const onSave = async (data: Recipe) => {
    try {
      await RecipesApi.updateRecipe(data);
      navigate(`/myrecipes/${data._id}`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <form
      className="recipe-form"
      onSubmit={recipe ? handleSubmit(onSave) : handleSubmit(onSubmit)}
    >
      <div className="recipe-input-div">
        <label>Name</label>
        <input placeholder="name" {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}
      </div>
      <div className="recipe-input-div">
        <label>Description</label>
        <input placeholder="description" {...register("description")} />
      </div>
      <div className="recipe-input-div">
        <label>Yield</label>
        <input placeholder="portion" {...register("portion")} />
      </div>
      <div className="recipe-input-div">
        <label>Cooktime</label>
        <input placeholder="cooktime" {...register("cooktime")} />
      </div>
      <div className="recipe-input-div">
        <label>Image URL</label>
        <input placeholder="Image URL" {...register("imgURL")} />
      </div>
      <div className="recipe-form-ingredients">
        <div className="recipe-form-list-header">
          <h2>Ingredients</h2>{" "}
          <button
            type="button"
            onClick={() => {
              ingredientAppend({ amount: 0, measurement: "", name: "" });
            }}
          >
            Add Ingredient
          </button>
        </div>
        <ul>
          {ingredientFields.map((ingredient, index) => {
            return (
              <li className="recipe-form-ingredient" key={ingredient.id}>
                <div>
                  <input
                    placeholder="Amount"
                    {...register(`ingredients.${index}.amount`, {
                      required: true,
                    })}
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
                    {...register(`ingredients.${index}.name`, {
                      required: true,
                    })}
                  />
                </div>
                <div>
                  <button type="button" onClick={() => ingredientRemove(index)}>
                    <BsTrash />
                  </button>
                  <button
                    onClick={() => {
                      ingredientMove(index, index - 1);
                    }}
                  >
                    <BsChevronUp />
                  </button>
                  <button
                    onClick={() => {
                      ingredientMove(index, index + 1);
                    }}
                  >
                    <BsChevronDown />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="recipe-form-directions">
        <div className="recipe-form-list-header">
          <h2>Directions</h2>
        </div>
        <ol>
          {directionFields.map((direction, index) => {
            return (
              <li className="recipe-form-direction" key={direction.id}>
                <h2>Step {index + 1}</h2>
                <button
                  className="recipe-form-direction-delete"
                  type="button"
                  onClick={() => directionRemove(index)}
                >
                  <BsTrash className="recipe-form-direction-delete-icon" />
                </button>
                <textarea
                  {...register(`directions.${index}.text`, { required: true })}
                />
                <div className="recipe-form-move-btns">
                  <button
                    onClick={() => {
                      directionMove(index, index - 1);
                    }}
                  >
                    <BsChevronUp />
                  </button>
                  <button
                    onClick={() => {
                      directionMove(index, index + 1);
                    }}
                  >
                    <BsChevronDown />
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="recipe-form-add-direction">
          <button
            type="button"
            onClick={() => {
              directionAppend({ text: "" });
            }}
          >
            <BsPlusLg className="icon"/>
            <div>Add a step</div>
          </button>
        </div>
      </div>
      {recipe ? (
        <div>
          <button type="submit">Save</button>
          <button onClick={deleteRecipe}>Delete</button>
        </div>
      ) : (
        <div>
          <button type="reset" onClick={handleReset}>
            Clear
          </button>
          <button type="submit">Create Recipe</button>
        </div>
      )}
    </form>
  );
};

export default RecipeForm;
