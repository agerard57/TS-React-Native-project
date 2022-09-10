import { TodoTypes } from "../types";

export interface Todo {
  _id: string;
  list: TodoTypes["list"];
  title: string;
  description?: string;
  fav: boolean;
  author: string;
  imageUrl?: string;
}

export interface TodoList {
  listName: TodoTypes["list"];
  todos: Todo[];
}

export const TodoInitializer = {
  _id: "",
  list: "TODO" as TodoTypes["list"],
  title: "",
  description: "",
  fav: false,
  author: "",
  imageUrl: "",
};
