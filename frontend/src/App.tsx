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
  const [mobileView, setMobileView] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileView(true);
    }
  }, []);

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

  const closeSidebar = () => {
    if (mobileView) {
      SetShowSidebar(false);
    }
  };
  
  return (
    <div className="App">
      <Header handleSidebar={toggleSidebar} mobileView={mobileView} />
      <main className="main-section">
        <Sidebar show={showSidebar} handleSidebar={closeSidebar} />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
