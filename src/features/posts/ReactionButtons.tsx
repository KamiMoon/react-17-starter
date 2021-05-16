import React from "react";
import { useDispatch } from "react-redux";
import { Post } from "../../models/Post";

import { reactionAdded } from "../../redux/slicers/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    let reactions: any = post.reactions;
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
