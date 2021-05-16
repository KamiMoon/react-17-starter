import { useAppSelector } from "redux/hooks";
import { Card } from "antd";

import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { Link } from "react-router-dom";

import { selectPostById } from "redux/slicers/postsSlice";

export const PostExcerpt = ({ postId }: { postId: string }) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  return (
    <div>
      {post && (
        <Card
          title={
            <Link to={`/posts/view/${post.id}`} className="button muted-button">
              {post.title}
            </Link>
          }
          style={{ marginBottom: "20px" }}
        >
          <article className="post-excerpt" key={post.id}>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />

            <ReactionButtons post={post} />
          </article>
        </Card>
      )}
    </div>
  );
};
