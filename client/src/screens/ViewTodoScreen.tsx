import { useNavigation } from "@react-navigation/native";
import { Formik, Field } from "formik";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Image, Button } from "react-native";

import { Themed, ListContainer } from "../components";
import { CustomInput } from "../components/todoForm/CustomInput";
import { SelectInput } from "../components/todoForm/SelectInput";
import { useTodoForm, useTodoList } from "../hooks";
import { FormValuesInitializer, Todo, TodoInitializer } from "../interfaces";
import { Navigation } from "../navigation";
import { getTodoByUserId } from "../services";
import { FormikTypes } from "../types";

export const ViewTodoScreen = ({
  route,
}: {
  route: { params: { id: string } };
}) => {
  const navigation = useNavigation();
  const { handleSubmit, formValidationSchema } = useTodoForm();

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
    <>
      <View style={styles.head}>
        <Text style={styles.title}>{todo.list}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.part}>
          <Text style={styles.title}>{todo.title}</Text>
        </View>
        <View style={styles.part}>
          <Text>{todo.description}</Text>
        </View>
        <View style={styles.part}>
          {todo.image && (
            <Image source={{ uri: todo.image.file }} style={styles.image} />
          )}
        </View>
        <View style={styles.part}>
          <Text>{todo.author}</Text>
        </View>
        <View style={styles.button}>
          <Button onPress={() => navigation.goBack()} title="Back" />
        </View>

        {/*       <Text>{todo.title}</Text>
      <Text>{todo.description}</Text>
      <Text>{todo.author}</Text>
      <Text>{todo.fav}</Text>
      <Text>{todo.list}</Text>
      <Image source={{ uri: todo.imageUrl }} style={styles.image} /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    padding: 20,
  },
  head: {
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    textAlign: "center",
    top: 0,
    left: 0,
    right: 0,

    textAlignVertical: "top",
    // center left
  },
  part: {
    marginVertical: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    justifyContent: "center",
  },
  button: {
    //Center bottom
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 30,
  },
  image: {
    width: 1280 / 4,
    height: 720 / 4,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
