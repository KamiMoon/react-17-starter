import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Link } from "react-router-dom";

import { selectUserById, fetchUser } from "redux/slicers/usersSlice";
import {
  selectPostsByUser,
  fetchPostsByUserId,
} from "redux/slicers/postsSlice";

interface Match {
  match: {
    params: { userId: string };
  };
}

export const UserPage = ({ match }: Match) => {
  const { userId } = match.params;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUserById(state, userId));

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId)
  );

  useEffect(() => {
    dispatch(fetchUser({ id: userId }));
    dispatch(fetchPostsByUserId({ id: userId }));
  }, [dispatch, userId]);

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
