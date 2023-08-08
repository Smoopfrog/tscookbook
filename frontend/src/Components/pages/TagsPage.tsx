import { useForm } from "react-hook-form";
import { login, selectUser } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import * as UsersApi from "../../network/users_api";
import "../../Styles/Tags.css";
import { BsTrash } from "react-icons/bs";

interface Tag {
  tag: string;
}

const TagsPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<Tag>();

  const onSubmit = async (data: Tag) => {
    try {
      const user = await UsersApi.addTag(data);
      dispatch(login(user));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const deleteTag = async (tagName: string) => {
    console.log(tagName);
    try {
      const user = await UsersApi.deleteTag(tagName);
      dispatch(login(user));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="tagsPage">
      <h1>Tags</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("tag")} />
        <button>Add Tag</button>
      </form>
      <ul>
        {user.tags.map((tag) => {
          return (
            <li className="tag">
              <span>{tag}</span>
              <button onClick={() => deleteTag(tag)}>
                <BsTrash className="tag-delete-icon"/>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagsPage;
