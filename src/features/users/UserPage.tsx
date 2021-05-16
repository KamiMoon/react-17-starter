import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

import { selectUserById, fetchUser } from "../../redux/slicers/usersSlice";
import {
  selectPostsByUser,
  fetchPostsByUserId,
} from "../../redux/slicers/postsSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUserById(state, userId));

  const postsForUser = useAppSelector((state: any) =>
    selectPostsByUser(state, userId)
  );

  useEffect(() => {
    dispatch(fetchUser({ id: userId }));
    dispatch(fetchPostsByUserId({ id: userId }));
  }, []);

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/view/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.firstName}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
