import { useForm, useFieldArray } from "react-hook-form";
import { MouseEvent } from "react";
import { Recipe } from "../../models/recipe";
import * as RecipesApi from "../../network/recipes_api";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../../Styles/RecipeForm.css";
import {
  BsChevronUp,
  BsChevronDown,
  BsTrash,
  BsPlusLg,
  BsCheckLg,
  BsXLg,
} from "react-icons/bs";

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
      <header className="header-nav">
        <button className="header-menu-btn" onClick={() => navigate(-1)}>
          <BsXLg />
        </button>
        <h1>TS Cookbook</h1>
        <button className="header-menu-btn" type="submit">
          <BsCheckLg />
        </button>
      </header>
      <div className="recipe-input-div">
        <label>
          Name
          {errors.title && (
            <span className="recipe-form-err">This field is required</span>
          )}
        </label>

        <input placeholder="name" {...register("title", { required: true })} />
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
        <h1>Ingredients</h1>
        <ul>
          {ingredientFields.map((ingredient, index) => {
            return (
              <li className="recipe-form-ingredient" key={ingredient.id}>
                <div className="recipe-form-ingredient-inputs">
                  <div className="recipe-form-ingredient-input">
                    <label>Amount</label>
                    <input
                      placeholder="Amount"
                      {...register(`ingredients.${index}.amount`, {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="recipe-form-ingredient-input">
                    <label>Ingredient</label>
                    <input
                      placeholder="Ingredient"
                      type="text"
                      {...register(`ingredients.${index}.name`, {
                        required: true,
                      })}
                    />
                  </div>
                  <button
                    className="recipe-form-ingredient-delete"
                    type="button"
                    onClick={() => ingredientRemove(index)}
                  >
                    <BsTrash className="recipe-form-delete-icon" />
                  </button>
                </div>
                <div className="recipe-form-move-btns">
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
          <li className="recipe-form-add-direction">
            <button
              type="button"
              onClick={() => {
                ingredientAppend({ amount: "", name: "" });
              }}
            >
              <BsPlusLg className="icon" />
              <div>Add Ingredient</div>
            </button>
          </li>
        </ul>
      </div>
      <div className="recipe-form-directions">
        <h1>Directions</h1>
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
                  <BsTrash className="recipe-form-delete-icon" />
                </button>
                <textarea
                  {...register(`directions.${index}.text`, {
                    required: true,
                  })}
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
          <li className="recipe-form-add-direction">
            <button
              type="button"
              onClick={() => {
                directionAppend({ text: "" });
              }}
            >
              <BsPlusLg className="icon" />
              <div>Add a step</div>
            </button>
          </li>
        </ol>
      </div>
    </form>
  );
};

export default RecipeForm;
