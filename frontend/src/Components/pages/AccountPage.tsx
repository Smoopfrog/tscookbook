import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";

const AccountPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div>
      <h1>Account</h1>
      <div>{user.username}</div>
      <div>{user.email}</div>
    </div>
  );
};

export default AccountPage;
