import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Alert, GestureResponderEvent } from "react-native";

import { Todo, TodoInitializer, TodoList } from "../interfaces";
import { getTodos } from "../services";
import { useDeleteTodo } from "./useDeleteTodo";

type TodoListManager = () => {
  todoLists: TodoList[];
  onDelete(id: string): (event: GestureResponderEvent) => void;
};

export const useTodoList: TodoListManager = () => {
  const navigation = useNavigation();

  const [todos, setTodos] = useState<Todo[]>([TodoInitializer]);

  const lists = ["TODO", "IN PROGRESS", "DONE"] as const;

  const todoLists: TodoList[] = lists.map((listName) => {
    return {
      listName,
      todos: todos.filter((todo) => todo.list === listName),
    };
  });

  const onDelete = (id: string) => (event: GestureResponderEvent) => {
    event.preventDefault();
    useDeleteTodo(id, setTodos);
  };

  useEffect(() => {
    getTodos().then((todos: Todo[]) => setTodos(todos));

    // This will get the new task after adding it or editing it
    const willFocusSubscription = navigation.addListener("focus", () => {
      getTodos().then((todos: Todo[]) => setTodos(todos));
    });

    return willFocusSubscription;
  }, []);

  return { todoLists, onDelete };
};
