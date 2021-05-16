import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById } from "../../redux/slicers/usersSlice";
import {
  selectAllPosts,
  selectPostsByUser,
} from "../../redux/slicers/postsSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params;

  const user = useSelector((state) => selectUserById(state, userId));

  const postsForUser = useSelector((state: any) =>
    selectPostsByUser(state, userId)
  );

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
