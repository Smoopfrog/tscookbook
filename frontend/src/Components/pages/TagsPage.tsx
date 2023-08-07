import { useForm } from "react-hook-form";
import { selectUser } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import * as UsersApi from "../../network/users_api";

interface Tag {
  tag: string;
}

const TagsPage = () => {
  const user = useSelector(selectUser);

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<Tag>();

  const onSubmit = async (data: Tag) => {
    try {
      console.log(data);
      await UsersApi.addTag(data);
      // navigate("/myrecipes");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div>
      <h1>Tags</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("tag")} />
        <button>Add Tag</button>
      </form>
      <ul>
        {user.tags.map((tag) => {
          return <li>{tag}</li>;
        })}
      </ul>
    </div>
  );
};

export default TagsPage;
