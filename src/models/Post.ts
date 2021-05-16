export interface Reactions {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface Post {
  id: string;
  date: string;
  title: string;
  content: string;
  user: string;
  reactions: Reactions;
}
