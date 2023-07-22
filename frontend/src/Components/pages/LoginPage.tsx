import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as UsersApi from "../../network/users_api";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();

  const login = async (data: User) => {
    try {
      await UsersApi.login(data);
      navigate("/myrecipes");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <h1>Login</h1>
      <div>
        <label>Username</label>
        <input placeholder="username" {...register("username")} />
      </div>
      <div>
        <label>Password</label>
        <input placeholder="password" {...register("password")} />
      </div>
      <button type="submit">Log in</button>
      <Link to="/signup">Don't have an account? Sign up here</Link>
    </form>
  );
};

export default LoginPage;
