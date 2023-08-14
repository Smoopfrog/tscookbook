import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as UsersApi from "../../network/users_api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, selectUser } from "../../slices/userSlice";
import "../../Styles/LoginPage.css";
import { useEffect, useState } from "react";
import Modal from "../Modal";

interface User {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUser).username;

  useEffect(() => {
    if (username) {
      navigate("/");
    }
  }, [username, navigate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();

  const handleLogin = async (data: User) => {
    try {
      const userData = await UsersApi.login(data);
      dispatch(login(userData));
      navigate("/");
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
    <form onSubmit={handleSubmit(handleLogin)} className="login-form">
      <h1>Login</h1>
      <div className="login-form-input">
        <div>
          <label>Username</label>{" "}
          {errors.username && (
            <span className="login-form-err">Please enter your username</span>
          )}
        </div>
        <input
          placeholder="username"
          {...register("username", { required: true })}
        />
      </div>
      <div className="login-form-input">
        <div>
          <label>Password</label>
          {errors.password && (
            <span className="login-form-err">Please enter your password</span>
          )}
        </div>
        <input
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />
      </div>
      <button type="submit">Log in</button>
      <Link className="login-link" to="/signup">
        Don't have an account? Sign up here
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

export default LoginPage;
