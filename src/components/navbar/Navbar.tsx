import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchNotifications } from "../../redux/slicers/notificationSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/crud">Crud</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
      </ul>
      <button className="button" onClick={fetchNewNotifications}>
        Refresh Notifications
      </button>
    </div>
  );
}
