import { RouteProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as yup from "yup";

import { Todo, TodoInitializer } from "../interfaces";
import { getTodoByUserId, postTodo, putTodoById } from "../services";
import { FormTypes, RootTabParamList } from "../types";
import { useToast } from "./useToast";

type TodoFormProps = {
  route:
    | RouteProp<RootTabParamList, "todo-add">
    | RouteProp<RootTabParamList, "todo-edit">;
  mode: FormTypes["modes"];
};

export const useTodoForm = ({ route, mode }: TodoFormProps) => {
  const navigation = useNavigation();

  const [editValues, setEditValues] = useState<Todo>(TodoInitializer);

  /////////////////////////////
  // Form validation schema
  const formValidationSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .max(50, ({ max, value }) => `${value.length} / ${max}`),
    content: yup
      .string()
      .max(500, ({ max, value }) => `${value.length} / ${max}`),
    list: yup.string().required("List is required"),
    author: yup
      .string()
      .required("Author is required")
      .max(20, ({ max, value }) => `${value.length} / ${max}`),
  });

  /////////////////////////////
  // Submit form handler
  const handleSubmit = (values: FormTypes["values"]) => {
    if (mode === "add") {
      postTodo(values).then((res) => {
        if (res) {
          useToast(res, "success");
          navigation.navigate("todo-list");
        } else {
          useToast("Something went wrong", "error");
        }
      });
    } else if (mode === "edit" && route.params) {
      const { id } = route.params;

      putTodoById({ id, ...values }).then((res) => {
        if (res) {
          useToast(res, "success");
          navigation.navigate("todo-list");
        } else {
          useToast("Something went wrong", "error");
        }
      });
    }
  };

  useEffect(() => {
    if (mode === "add") {
      const willFocusSubscription = navigation.addListener("focus", () => {
        setEditValues(TodoInitializer);
      });

      return willFocusSubscription;
    }
  }, []);

  useEffect(() => {
    if (mode === "edit" && route.params) {
      const id = route.params.id.match(/^[0-9a-fA-F]{24}$/)
        ? route.params.id
        : navigation.navigate("notFound");

      if (typeof id === "string") {
        const willFocusSubscription = navigation.addListener("focus", () => {
          getTodoByUserId(id).then((todo: Todo) => {
            todo ? setEditValues(todo) : navigation.navigate("notFound");
          });
        });
        return willFocusSubscription;
      }
    }
  }, [mode, route.params?.id]);

  return {
    handleSubmit,
    formValidationSchema,
    editValues,
  };
};
