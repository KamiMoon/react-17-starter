import { useAppSelector } from "redux/hooks";
import { selectUserById } from "redux/slicers/usersSlice";

export const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useAppSelector((state) => selectUserById(state, userId));

  return <span>by {author ? author.firstName : "Unknown author"}</span>;
};
