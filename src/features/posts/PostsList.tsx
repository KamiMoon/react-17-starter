import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { PostExcerpt } from "./PostExcerpt";

import { fetchPosts, selectPostIds } from "../../redux/slicers/postsSlice";

export const PostsList = () => {
  const dispatch = useAppDispatch();
  //const posts = useSelector(selectAllPosts);
  const orderedPostIds = useAppSelector(selectPostIds);

  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // Sort posts in reverse chronological order by datetime string
  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts = orderedPostIds.map((postId) => (
    <PostExcerpt key={postId} postId={postId.toString()} />
  ));

  let content;

  if (postStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === "succeeded") {
    content = renderedPosts;
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <Link to="/posts/add">Add Post</Link>
      {content}
    </section>
  );
};
