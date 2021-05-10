import React from "react";
import { useSelector } from "react-redux";

export const PostAuthor = ({ userId }: any) => {
  const author = useSelector((state: any) =>
    state.users.find((user: any) => user.id === userId)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
