import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

import { selectPostById, fetchPost } from "redux/slicers/postsSlice";

interface Match {
  match: {
    params: { postId: string };
  };
}
export const SinglePostPage = ({ match }: Match) => {
  const { postId } = match.params;

  const dispatch = useAppDispatch();

  const post = useAppSelector((state) => selectPostById(state, postId));

  useEffect(() => {
    dispatch(fetchPost({ id: postId }));
  }, [dispatch, postId]);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
        <Link to={`/posts/edit/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
