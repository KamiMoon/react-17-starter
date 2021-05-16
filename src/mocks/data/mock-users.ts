import { User } from "../../models/User";

export const user1: User = {
  id: "1",
  email: "eric.kizaki@gmail.com",
  firstName: "Eric",
  lastName: "Kizaki",
};

export const user2: User = {
  id: "2",
  email: "bob@gmail.com",
  firstName: "Bob",
  lastName: "Test",
};
export const users: Array<User> = [user1, user2];
