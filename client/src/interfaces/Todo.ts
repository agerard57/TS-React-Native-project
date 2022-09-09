import { TodoType } from "../types";

export interface Todo {
  _id: string;
  list: TodoType["list"];
  title: string;
  description?: string;
  fav: boolean;
  author: string;
  photoUrl?: string;
}

export interface TodoList {
  listName: TodoType["list"];
  todos: Todo[];
}

export const TodoInitializer = {
  _id: "",
  list: "TODO" as TodoType["list"],
  title: "",
  description: "",
  fav: false,
  author: "",
  photoUrl: "",
};
