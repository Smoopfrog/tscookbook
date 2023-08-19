import { useForm } from "react-hook-form";
import { login } from "../../slices/userSlice";
import * as UsersApi from "../../network/users_api";
import "../../Styles/Tags.css";
import { BsTrash } from "react-icons/bs";
import { useAppDispatch } from "../../hooks";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User } from "../../models/user";
import Modal from "../Modal";
import { useState } from "react";

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
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const deleteTag = async (tagName: string) => {
    try {
      const user = await UsersApi.deleteTag(tagName);
      dispatch(login(user));
      alert(`${tagName} tag deleted.`)
      navigate("/tags");
    } catch (error) {
      console.log(error);
      alert(error);
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
