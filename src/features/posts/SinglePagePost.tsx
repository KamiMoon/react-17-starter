import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Link, useHistory } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

import {
  selectPostById,
  fetchPost,
  removePost,
} from "redux/slicers/postsSlice";
import { Space, Button } from "antd";
import { unwrapResult } from "@reduxjs/toolkit";

interface Match {
  match: {
    params: { postId: string };
  };
}
export const SinglePostPage = ({ match }: Match) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { postId } = match.params;

  const post = useAppSelector((state) => selectPostById(state, postId));

  useEffect(() => {
    dispatch(fetchPost({ id: postId }));
  }, [dispatch, postId]);

  const doDelete = async () => {
    if (postId) {
      try {
        const id = postId;

        const removeAction = await dispatch(removePost({ id: id }));
        unwrapResult(removeAction);
        history.push("/posts");
      } catch (e) {
        console.log(e);
      }
    }
  };

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
        <Space>
          <Link className="ant-btn" to={`/posts/edit/${post.id}`}>
            Edit Post
          </Link>
          <Button onClick={doDelete}>Delete Post</Button>
        </Space>
      </article>
    </section>
  );
};
