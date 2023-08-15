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
import { BiChevronDown } from "react-icons/bi";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const AccountPage = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="account-page-drawer">
          <button
            onClick={() => {
              setShowUsernameForm(!showUsernameForm);
            }}
          >
            <FaPencil size={24} className="icon" />
            <span>Change Username</span>
            <BiChevronDown
              size={24}
              className={`chevron ${showUsernameForm && "rotate"}`}
            />
          </button>
          <form
            className={`account-username-form ${
              showUsernameForm ? "" : "hide-drawer"
            }`}
          >
            <div className="account-form-input">
              <label htmlFor="">Desired Username</label>
              <input type="text" />
            </div>
            <button>Save</button>
          </form>
        </div>
        <div className="account-page-drawer">
          <button
            onClick={() => {
              setShowPasswordForm(!showPasswordForm);
            }}
          >
            <FaLock size={24} className="icon" />
            <span>Change Password</span>
            <BiChevronDown
              size={24}
              className={`chevron ${showPasswordForm && "rotate"}`}
            />
          </button>
          <form
            className={`account-password-form ${
              showPasswordForm ? "" : "hide-drawer"
            }`}
          >
            <div className="account-form-input">
              <label htmlFor="">Current Password</label>
              <div>
                <input type={`${showCurrentPassword ? "text" : "password"}`} />
                {showCurrentPassword ? (
                  <RiEyeLine
                    onClick={() => setShowCurrentPassword(false)}
                    size={32}
                    className="icon"
                  />
                ) : (
                  <RiEyeCloseLine
                    onClick={() => setShowCurrentPassword(true)}
                    size={32}
                    className="icon"
                  />
                )}
              </div>
            </div>
            <div className="account-form-input">
              <label htmlFor="">New Password</label>
              <div>
                <input type={`${showNewPassword ? "text" : "password"}`} />
                {showNewPassword ? (
                  <RiEyeLine
                    onClick={() => setShowNewPassword(false)}
                    size={32}
                    className="icon"
                  />
                ) : (
                  <RiEyeCloseLine
                    onClick={() => setShowNewPassword(true)}
                    size={32}
                    className="icon"
                  />
                )}
              </div>
            </div>
            <div className="account-form-input">
              <label htmlFor="">Confirm New Password</label>
              <div>
                <input type={`${showConfirmPassword ? "text" : "password"}`} />
                {showConfirmPassword ? (
                  <RiEyeLine
                    onClick={() => setShowConfirmPassword(false)}
                    size={32}
                    className="icon"
                  />
                ) : (
                  <RiEyeCloseLine
                    onClick={() => setShowConfirmPassword(true)}
                    size={32}
                    className="icon"
                  />
                )}
              </div>
            </div>
            <button>Save</button>
          </form>
        </div>

        <div className="account-page-drawer">
          <button
            onClick={() => {
              setShowDeleteUserModal(true);
            }}
          >
            <FaTrash size={24} className="icon" />
            <span>Delete Account</span>
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
