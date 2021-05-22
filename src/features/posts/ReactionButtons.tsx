import { useAppDispatch } from "redux/hooks";
import { Post } from "models/Post";
import { unwrapResult } from "@reduxjs/toolkit";
import { updatePost } from "redux/slicers/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useAppDispatch();

  const onReactionClicked = async (name: string) => {
    try {
      const deepCopy = JSON.parse(JSON.stringify(post));

      let foundReaction: any = deepCopy.reactions;
      foundReaction[name]++;

      const updateAction = await dispatch(
        updatePost(deepCopy)
      );
      unwrapResult(updateAction);
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    let reactions: any = post.reactions;
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => {
          onReactionClicked(name);
        }}
      >
        {emoji} {reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
