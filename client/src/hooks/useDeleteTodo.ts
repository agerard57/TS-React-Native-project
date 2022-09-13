import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Alert } from "react-native";

import { Todo } from "../interfaces";
import { deleteTodo } from "../services";
import { RootTabParamList } from "../types";
import { useToast } from "./useToast";

type DeleteTodoManager = (
  id: string,
  setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>,
  navigation?: BottomTabNavigationProp<RootTabParamList, "todo-view", undefined>
) => void;

export const useDeleteTodo: DeleteTodoManager = (
  id,
  setTodos?,
  navigation?
) => {
  return Alert.alert(
    "Task deletion",
    "Are you sure you want to delete this task?",
    [
      {
        text: "Never mind !",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTodo(id)
            .then(() => {
              if (setTodos !== undefined)
                setTodos((todos) => todos.filter((todo) => todo._id !== id));

              useToast("Task deleted successfully", "alert");

              if (navigation) navigation.navigate("todo-list");
            })
            .catch(() => useToast("An error occurred", "error"));
        },
      },
    ]
  );
};
