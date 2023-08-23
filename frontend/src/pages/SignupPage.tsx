import { useForm } from "react-hook-form";
import * as UsersApi from "../api/users_api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { login } from "../slices/userSlice";
import "../Styles/LoginPage.css";
import { useState } from "react";
import Modal from "../Components/UI/Modal";
import { FaRegUser } from "react-icons/fa";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import appleImg from "../Assets/apple-background.webp";

interface User {
  username: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="signup-page">
      <img loading="lazy" className="login-side-img" src={appleImg} alt="An apple"></img>
      <form onSubmit={handleSubmit(handleSignup)} className="login-form">
        <h1>Sign Up</h1>
        <div className="login-form-input">
          <div>
            <label>Username</label>
            {errors.username && <span>Please enter your username</span>}
          </div>

          <div>
            <input
              placeholder="Username"
              {...register("username", { required: true })}
            />
            <FaRegUser size={36} className="icon" />
          </div>
        </div>
        <div className="login-form-input">
          <div>
            <label>Email</label>
            {errors.email && <span>Please enter your email</span>}
          </div>
          <div>
            <input
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />
            <MdEmail size={36} className="icon" />
          </div>
        </div>
        <div className="login-form-input">
          <div>
            <label>Password</label>
            {errors.email && <span>Please enter your password</span>}
          </div>
          <div>
            <input
              placeholder="Password"
              type={`${showPassword ? "text" : "password"}`}
              {...register("password", { required: true })}
            />
            {showPassword ? (
              <RiEyeLine
                size={36}
                className="icon eye"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <RiEyeCloseLine
                size={36}
                className="icon eye"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
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
    </div>
  );
};

export default SignupPage;
