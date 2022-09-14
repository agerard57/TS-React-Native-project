import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { Todo, TodoInitializer } from "../interfaces";
import { getTodoByUserId } from "../services";

export const useTodoScreen = (route: { params: { id: string } }) => {
  const navigation = useNavigation();

  const [todo, setTodo] = useState<Todo>(TodoInitializer);

  // if [0-9a-f]{24} is not a valid id, it will return null
  const id = route.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? route.params.id
    : navigation.navigate("notFound");

  useEffect(() => {
    // if id is a string, it will return a todo
    if (typeof id === "string") {
      const willFocusSubscription = navigation.addListener("focus", () => {
        getTodoByUserId(id).then((todo: Todo) => {
          todo ? setTodo(todo) : navigation.navigate("notFound");
        });
      });

      return willFocusSubscription;
    }
  }, [route.params.id]);

  return {
    todo,
  };
};
