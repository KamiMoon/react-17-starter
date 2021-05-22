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

export function addPost(post: Post): Post {
  const id = (posts.length + 1).toString();

  const newPost = {
    ...post,
    id,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  };

  posts.push(newPost);
  return newPost;
}

export function updatePost(id: string, updateData: Post): Post | undefined {
  let i = 0;
  let postToUpdate;

  for (; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts[i] = { ...posts[i], ...updateData };
      postToUpdate = posts[i];
      break;
    }
  }

  return postToUpdate;
}

export function removePost(id: string): Post | undefined {
  let i = 0;
  let postToRemove;

  for (; i < posts.length; i++) {
    if (posts[i].id === id) {
      postToRemove = posts[i];
      posts.splice(i, 1);
      break;
    }
  }

  return postToRemove;
}
