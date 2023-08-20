import { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import * as UsersApi from "./api/users_api";
import { useAppDispatch } from "./hooks";
import { login } from "./slices/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await UsersApi.getLoggedInUser();
        dispatch(login(user));
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
