import { useForm } from "react-hook-form";
import * as UsersApi from "../../network/users_api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { login } from "../../slices/userSlice";
interface User {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();
  const handleSignup = async (data: User) => {
    try {
      const userData = await UsersApi.createUser(data);
      dispatch(login(userData));
      navigate("/myrecipes");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <h1>Sign Up</h1>
      <div className="user-input-div">
        <label>Username</label>
        <input placeholder="Username" {...register("username")} />
      </div>
      <div className="user-input-div">
        <label>Email</label>
        <input placeholder="Email" {...register("email")} />
      </div>
      <div className="user-input-div">
        <label>Password</label>
        <input placeholder="Password" {...register("password")} />
      </div>
      <button type="submit">Sign Up</button>
      <Link to="/login">Already have an account? Log in here</Link>
    </form>
  );
};

export default Signup;
