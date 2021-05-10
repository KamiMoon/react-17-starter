import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../../redux/slicers/usersSlice";

export const PostAuthor = ({ userId }: any) => {
  const author = useSelector((state: any) => selectUserById(state, userId));

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
