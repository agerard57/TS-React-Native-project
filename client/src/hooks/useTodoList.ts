import { useState, useEffect } from "react";

import { Todo, TodoInitializer, TodoList } from "../interfaces";
import { getTodos } from "../services";

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([TodoInitializer]);
  const lists = ["TODO", "IN PROGRESS", "DONE"] as const;

  const todoLists: TodoList[] = lists.map((listName) => {
    return {
      listName,
      todos: todos.filter((todo) => todo.list === listName),
    };
  });

  useEffect(() => {
    getTodos().then((todos: Todo[]) => setTodos(todos));
  }, []);

  return { todoLists };
};
