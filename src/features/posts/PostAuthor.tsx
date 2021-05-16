import { useAppSelector } from "../../redux/hooks";
import { selectUserById } from "../../redux/slicers/usersSlice";

export const PostAuthor = ({ userId }: any) => {
  const author = useAppSelector((state: any) => selectUserById(state, userId));

  return <span>by {author ? author.firstName : "Unknown author"}</span>;
};
