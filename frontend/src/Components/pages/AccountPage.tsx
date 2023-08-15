import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout, selectUser } from "../../slices/userSlice";
import Modal from "../Modal";
import * as UsersApi from "../../network/users_api";
import { useNavigate } from "react-router-dom";
import "../../Styles/AccountPage.css";
import { FaLock, FaRegUser, FaTrash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

const AccountPage = () => {
  const user = useAppSelector(selectUser);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const deleteAccount = async () => {
    try {
      await UsersApi.deleteAccount();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="account-page">
      <div>
        <h1>Account</h1>
        <div className="account-page-section">
          <div>
            <FaRegUser size={24} className="icon" />
            <span>Username: {user.username}</span>
          </div>
          <div>
            <MdEmail size={24} className="icon" />
            <span>Email: </span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
      <h1>Account Settings</h1>
      <div className="account-page-section">
        <button
          onClick={() => {
            setShowDeleteUserModal(true);
          }}
        >
          <FaPencil size={24} className="icon" />
          <span>Change Username</span>
        </button>
        <div>
          <FaLock size={24} className="icon" />
          <button
            onClick={() => {
              setShowDeleteUserModal(true);
            }}
          >
            Change Password
          </button>
        </div>
        <div>
          <FaTrash size={24} className="icon" />
          <button
            onClick={() => {
              setShowDeleteUserModal(true);
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
      <Modal
        show={showDeleteUserModal}
        handleClose={() => setShowDeleteUserModal(false)}
      >
        <h1>Delete Account</h1>
        <hr />
        <p>Are you sure you want to delete your account, {user.username}?</p>
        <hr />
        <div>
          <button className="delete" onClick={deleteAccount}>
            Delete
          </button>
          <button onClick={() => setShowDeleteUserModal(false)}>Cancel</button>
        </div>
      </Modal>
    </section>
  );
};

export default AccountPage;
