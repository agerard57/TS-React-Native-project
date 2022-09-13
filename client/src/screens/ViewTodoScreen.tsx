import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Image, Button } from "react-native";

import { Themed, ListContainer } from "../components";
import { ListDisplay } from "../components";
import { CustomInput } from "../components/todoForm/CustomInput";
import { SelectInput } from "../components/todoForm/SelectInput";
import { useColorScheme, useTodoForm, useTodoList } from "../hooks";
import { FormValuesInitializer, Todo, TodoInitializer } from "../interfaces";
import { Navigation } from "../navigation";
import { getTodoByUserId } from "../services";
import { FormikTypes } from "../types";
import { normalizeDate, normalizeDescription } from "../utils";

export const ViewTodoScreen = ({
  route,
}: {
  route: { params: { id: string } };
}) => {
  const navigation = useNavigation();
  const { handleSubmit, formValidationSchema } = useTodoForm();
  const color = useColorScheme();

  const { View, Text } = Themed;
  const { todoLists, onDelete } = useTodoList();
  const [todo, setTodo] = useState<Todo>(TodoInitializer);
  // if [0-9a-f]{24} is not a valid id, it will return null
  const id = route.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? route.params.id
    : navigation.navigate("notFound");

  useEffect(() => {
    // if id is a string, it will return a todo
    if (typeof id === "string") {
      getTodoByUserId(id).then((todo: Todo) => {
        todo ? setTodo(todo) : navigation.navigate("notFound");
      });
    }
  }, [route.params.id]);
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ListDisplay currentList={todo.list} />
        </View>
        <View style={styles.part}>
          <View
            style={[
              { borderColor: color === "light" ? "#dddddd" : "#333333" },
              styles.titleContainer,
            ]}
          >
            <Text style={styles.title}>{todo.title}</Text>
          </View>
          <Text style={styles.createdAt}>
            Created: {normalizeDate(todo.createdAt, "longDate")}
          </Text>
        </View>
        <View style={styles.part}>
          {todo.image && (
            <Image source={{ uri: todo.image.file }} style={styles.image} />
          )}
          <Text style={styles.description}>
            {normalizeDescription(todo.description, false)}
          </Text>
          <Text style={styles.author}>Made by {todo.author}</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button onPress={() => navigation.navigate("todo-list")} title="Back" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { marginBottom: 30 },
  container: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    padding: 20,
  },
  listContainer: { marginTop: 20 },
  list: { fontSize: 16, textAlign: "center" },
  titleContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    top: 0,
    left: 0,
    right: 0,
    textAlignVertical: "top",
  },
  createdAt: {
    fontSize: 12,
    color: "grey",
    marginTop: 10,
    textAlign: "center",
  },
  part: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    // Justify the text
    textAlign: "justify",

    // Increase the space between the lines
    lineHeight: 25,
  },
  author: {
    fontSize: 12,
    color: "grey",
    marginTop: 20,
    fontStyle: "italic",
    textAlign: "right",
  },
  button: {
    marginHorizontal: 20,
  },
  image: {
    width: 1280 / 4,
    height: 720 / 4,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },
});
