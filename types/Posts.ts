// import { ObjectId } from "mongodb";

export interface Posts {
  _id: string | null;
  slug: string;
  title: string;
  userEmail: string;
  image: string;
  excerpt: string;
}
