import { useForm } from "react-hook-form";
import { login } from "../slices/userSlice";
import * as UsersApi from "../api/users_api";
import "../Styles/Tags.css";
import { BsTrash } from "react-icons/bs";
import { useAppDispatch } from "../hooks";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User } from "../models/user";
import Modal from "../Components/UI/Modal";
import { useState } from "react";
import Swal from "sweetalert2";

interface Tag {
  tag: string;
}

const TagsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tags } = useLoaderData() as User;

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<Tag>();

  const closeModal = () => {
    setShowModal(false);
  };

  const trueModal = () => {
    setShowModal(true);
  };

  const onSubmit = async (data: Tag) => {
    try {
      const user = await UsersApi.addTag(data);
      dispatch(login(user));
      navigate("/tags");
      closeModal();
    } catch (e) {
      if (typeof e === "string") {
        console.log(e);

        e.toUpperCase();
        Swal.fire(e);
      } else if (e instanceof Error) {
        console.log(e);

        const errorMsg = e.message;
        Swal.fire(errorMsg);
      }
    }
  };

  const deleteTag = async (tagName: string) => {
    try {
      const user = await UsersApi.deleteTag(tagName);
      dispatch(login(user));
      Swal.fire(`${tagName} tag deleted.`);
      navigate("/tags");
    } catch (e) {
      if (typeof e === "string") {
        console.log(e);

        e.toUpperCase();
        Swal.fire(e);
      } else if (e instanceof Error) {
        console.log(e);

        const errorMsg = e.message;
        Swal.fire(errorMsg);
      }
    }
  };

  return (
    <div className="tags-page">
      <div className="tags-page-controller">
        <h1>Tags</h1>
        <button onClick={trueModal}>Add Tag</button>
      </div>
      <ul>
        {tags &&
          tags.map((tag, index) => {
            return (
              <li key={index} className="tag">
                <span>{tag}</span>
                <button onClick={() => deleteTag(tag)}>
                  <BsTrash className="tag-delete-icon" />
                </button>
              </li>
            );
          })}
      </ul>
      <Modal show={showModal} handleClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Add a new tag</h1>
          <input className="tag-input" type="text" {...register("tag")} />
          <div>
            <button onClick={closeModal} type="button">
              Cancel
            </button>
            <button className="accept" type="submit">
              Add Tag
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TagsPage;
