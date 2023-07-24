import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as UsersApi from "../../network/users_api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { login } from "../../slices/userSlice";

interface User {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();

  const handleLogin = async (data: User) => {
    try {
      const userData = await UsersApi.login(data);
      dispatch(login(userData));
      navigate("/myrecipes");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h1>Login</h1>
      <div>
        <label>Username</label>
        <input placeholder="username" {...register("username")} />
      </div>
      <div>
        <label>Password</label>
        <input
          placeholder="password"
          type="password"
          {...register("password")}
        />
      </div>
      <button type="submit">Log in</button>
      <Link to="/signup">Don't have an account? Sign up here</Link>
    </form>
  );
};

export default LoginPage;
