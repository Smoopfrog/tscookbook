import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout, selectUser } from "../../slices/userSlice";
import Modal from "../Modal";
import * as UsersApi from "../../network/users_api";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Account</h1>
      <div>{user.username}</div>
      <div>{user.email}</div>
      <button
        onClick={() => {
          setShowDeleteUserModal(true);
        }}
      >
        Delete Account
      </button>
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
    </div>
  );
};

export default AccountPage;
