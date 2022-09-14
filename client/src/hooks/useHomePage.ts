import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { GestureResponderEvent } from "react-native";

import { Todo, TodoInitializer } from "../interfaces";
import { getTodos } from "../services";
import { useDeleteTodo } from "./useDeleteTodo";

export const useHomePage = () => {
  const navigation = useNavigation();

  const [todos, setTodos] = useState<Todo[]>([TodoInitializer]);

  const favList = {
    listName: "FAVORITES",
    todos: todos.filter((todo) => todo.fav === true),
  };

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

  return { favList, onDelete };
};
