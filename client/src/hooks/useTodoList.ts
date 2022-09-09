import { useState, useEffect } from "react";
import { Alert, GestureResponderEvent } from "react-native";

import { Todo, TodoInitializer, TodoList } from "../interfaces";
import { deleteTodo, getTodos } from "../services";
import { useToast } from "./useToast";

type TodoListManager = () => {
  todoLists: TodoList[];
  onDelete(id: string): (event: GestureResponderEvent) => void;
};

export const useTodoList: TodoListManager = () => {
  const [todos, setTodos] = useState<Todo[]>([TodoInitializer]);
  const lists = ["TODO", "IN PROGRESS", "DONE"] as const;
  const { toast } = useToast();

  const todoLists: TodoList[] = lists.map((listName) => {
    return {
      listName,
      todos: todos.filter((todo) => todo.list === listName),
    };
  });

  const onDelete = (id: string) => (event: GestureResponderEvent) => {
    event.preventDefault();
    Alert.alert("Task deletion", "Are you sure you want to delete this task?", [
      {
        text: "Never mind !",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTodo(id);
          setTodos(todos.filter((todo) => todo._id !== id));
          toast("Task deleted", "alert");
        },
      },
    ]);
  };

  useEffect(() => {
    getTodos().then((todos: Todo[]) => setTodos(todos));
  }, []);

  return { todoLists, onDelete };
};
