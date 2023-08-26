import { useForm, useFieldArray } from "react-hook-form";
import { Recipe } from "../models/recipe";
import { User } from "../models/user";
import * as RecipesApi from "../api/recipes_api";
import { MouseEvent } from "react";
import { BiTrash } from "react-icons/bi";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../Styles/RecipeForm.css";
import {
  BsChevronUp,
  BsChevronDown,
  BsTrash,
  BsPlusLg,
  BsCheckLg,
  BsXLg,
} from "react-icons/bs";
import { useState } from "react";
import Modal from "../Components/UI/Modal";
import { useInView } from "react-intersection-observer";

const RecipeForm = () => {
  const [carouselPage, setCarouselPage] = useState("About");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const { user, recipe } = useLoaderData() as {
    user: User;
    recipe: Recipe;
  };

  const [aboutRef] = useInView({
    threshold: 0.7,
    onChange: (inView) => {
      if (inView) {
        setCarouselPage("About");
      }
    },
  });

  const [ingredientsRef] = useInView({
    threshold: 0.7,
    onChange: (inView) => {
      if (inView) {
        setCarouselPage("Ingredients");
      }
    },
  });

  const [directionsRef] = useInView({
    threshold: 0.7,
    onChange: (inView) => {
      if (inView) {
        setCarouselPage("Directions");
      }
    },
  });

  const handleClickScroll = (page: string) => {
    const element = document.getElementById(page);

    if (element) {
      setCarouselPage(page);

      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
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

  const {
    register,
    formState: { errors },
    control,
    watch,
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

  const { append: tagsAppend, remove: tagsRemove } = useFieldArray<any>({
    name: "tags",
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

  const onSave = async (data: Recipe) => {
    try {
      await RecipesApi.updateRecipe(data);
      navigate(`/myrecipes/${data._id}`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const addTag = (tagName: string) => {
    tagsAppend(tagName);
  };

  const removeTag = (tagName: string) => {
    const index = watchTags.indexOf(tagName);
    tagsRemove(index);
  };

  const watchTags: string[] = watch("tags") || [];

  return (
    <form
      className="recipe-form"
      onSubmit={recipe ? handleSubmit(onSave) : handleSubmit(onSubmit)}
    >
      <header className="header-nav">
        <button
          className="header-menu-btn"
          onClick={() => navigate(-1)}
          type="button"
        >
          <BsXLg />
        </button>
        <h1>Flavourful Plates</h1>
        <button className="header-menu-btn" type="submit">
          <BsCheckLg />
        </button>
      </header>
      <div className="recipe-carousel">
        <section ref={aboutRef} id="About">
          <div className="recipe-input-div">
            <label>
              Name
              {errors.title && (
                <span className="recipe-form-err">This field is required</span>
              )}
            </label>
            <input
              placeholder="name"
              {...register("title", { required: true })}
            />
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
          <div className="recipe-input-div recipe-tags">
            <label>Tags</label>
            <div>
              {user.tags ? (
                user.tags.map((tag, index) => {
                  if (watchTags.includes(tag)) {
                    return (
                      <button
                        key={index}
                        className="remove-tag"
                        onClick={() => removeTag(tag)}
                        type="button"
                      >
                        {tag}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={index}
                        className="add-tag"
                        onClick={() => addTag(tag)}
                        type="button"
                      >
                        {tag}
                      </button>
                    );
                  }
                })
              ) : (
                <div>Create Some tags</div>
              )}
            </div>
          </div>
          {recipe && (
            <div className="recipe-form-delete">
              <button
                className="recipe-form-delete-btn"
                onClick={() => setShowModal(true)}
                type="button"
              >
                <BiTrash />
                <span>Delete</span>
              </button>
              <Modal
                handleClose={() => {
                  setShowModal(false);
                }}
                show={showModal}
              >
                <h1>Delete this recipe?</h1>
                <hr />
                <p>Are you sure you want to delete {recipe.title}?</p>
                <hr />
                <div>
                  <button
                    className="delete"
                    type="button"
                    onClick={deleteRecipe}
                  >
                    Delete
                  </button>
                  <button type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </Modal>
            </div>
          )}
        </section>
        <section
          ref={ingredientsRef}
          id="Ingredients"
          className="recipe-form-ingredients"
        >
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
        </section>
        <section
          ref={directionsRef}
          id="Directions"
          className="recipe-form-directions"
        >
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
        </section>
      </div>

      <footer className="recipe-form-footer">
        <button
          className={` ${carouselPage === "About" && "in-view"}`}
          onClick={() => handleClickScroll("About")}
          type="button"
        >
          About
        </button>
        <button
          className={` ${carouselPage === "Ingredients" && "in-view"}`}
          onClick={() => handleClickScroll("Ingredients")}
          type="button"
        >
          Ingredients
        </button>
        <button
          className={` ${carouselPage === "Directions" && "in-view"}`}
          onClick={() => handleClickScroll("Directions")}
          type="button"
        >
          Directions
        </button>
      </footer>
    </form>
  );
};

export default RecipeForm;
