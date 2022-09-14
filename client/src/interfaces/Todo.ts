import { TodoTypes } from "../types";

export interface Todo {
  _id: string;
  list: TodoTypes["list"];
  title: string;
  description?: string;
  fav: boolean;
  author: string;
  imageName?: string;
  image?: { fileName: string; file: string };
  createdAt: Date;
}

export interface TodoList {
  listName: TodoTypes["list"];
  todos: Todo[];
}

export const TodoInitializer = {
  _id: "",
  list: "TODO" as TodoTypes["list"],
  title: "",
  fav: false,
  author: "",
  createdAt: new Date(),
};
