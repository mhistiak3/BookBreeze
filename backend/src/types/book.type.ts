import { User } from "./user.type";

export interface Book {
  _id: string;
  title: string;
  description: string;
  author: User;
  genre: string;
  coverImage: {
    public_id: string;
    url: string;
  };
  file: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
