import { Post } from "../../models/Post";

export const post1: Post = {
  id: "1",
  date: new Date().toISOString(),
  title: "My Title",
  content: "My content",
  user: "1",
  reactions: {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
};

export const post2: Post = {
  id: "2",
  date: new Date().toISOString(),
  title: "My Title 2",
  content: "My content 2",
  user: "2",
  reactions: {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
};

export const posts: Array<Post> = [post1, post2];
