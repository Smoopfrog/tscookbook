import { useForm } from "react-hook-form";
import * as UsersApi from "../../network/users_api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { login } from "../../slices/userSlice";
import "../../Styles/LoginPage.css";
import { useState } from "react";
import Modal from "../Modal";

interface User {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

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
    } catch (error: any) {
      const errorMessage: string = error.toString();

      if (errorMessage.startsWith("Error: ")) {
        setErrorMessage(errorMessage.slice(7));
      } else {
        setErrorMessage(error.toString());
      }
      setShowErrorModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)} className="login-form">
      <h1>Sign Up</h1>
      <div className="login-form-input">
        <div>
          <label>Username</label>
          {errors.username && <span>Please enter your username</span>}
        </div>

        <input
          placeholder="Username"
          {...register("username", { required: true })}
        />
      </div>
      <div className="login-form-input">
        <div>
          <label>Email</label>
          {errors.email && <span>Please enter your email</span>}
        </div>
        <input placeholder="Email" {...register("email", { required: true })} />
      </div>
      <div className="login-form-input">
        <div>
          <label>Password</label>
          {errors.email && <span>Please enter your password</span>}
        </div>
        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
      </div>
      <button type="submit">Sign Up</button>
      <Link className="login-link" to="/login">
        Already have an account? Log in here
      </Link>
      <Modal
        show={showErrorModal}
        handleClose={() => {
          setShowErrorModal(false);
        }}
      >
        <p>{errorMessage}</p>
        <hr />
        <button
          onClick={() => {
            setShowErrorModal(false);
          }}
          type="button"
        >
          Close
        </button>
      </Modal>
    </form>
  );
};

export default Signup;
