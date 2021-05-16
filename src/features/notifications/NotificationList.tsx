import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { formatDistanceToNow, parseISO } from "date-fns";

import { selectAllUsers } from "../../redux//slicers/usersSlice";

import {
  selectAllNotifications,
  allNotificationsRead,
} from "../../redux/slicers/notificationSlice";
import { User } from "../../models/User";
//import classnames from 'classnames'

export const NotificationsList = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications);
  const users: Array<User> = useAppSelector(selectAllUsers);

  useEffect(() => {
    dispatch(allNotificationsRead(null));
  }, [dispatch]);

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user: User) => user.id === notification.user) || {
      firstName: "Unknown User",
    };

    return (
      <div key={notification.id} className="notification">
        <div>
          <b>{user.firstName}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};
