import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
import * as UsersApi from "./api/users_api";
import { useAppDispatch } from "./hooks";
import { login } from "./slices/userSlice";
import Sidebar from "./Components/Header/Sidebar";

function App() {
  const [showSidebar, SetShowSidebar] = useState(false);
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

  const toggleSidebar = () => {
    SetShowSidebar((prev) => !prev);
  };

  return (
    <div className="App">
      <Header handleSidebar={toggleSidebar} />
      <main className="main-section">
        <Sidebar show={showSidebar} handleSidebar={toggleSidebar} />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
