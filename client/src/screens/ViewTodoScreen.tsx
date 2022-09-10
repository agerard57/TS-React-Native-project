import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Image } from "react-native";

import { Themed, ListContainer } from "../components";
import { useTodoList } from "../hooks";
import { Todo, TodoInitializer } from "../interfaces";
import { Navigation } from "../navigation";
import { getTodoByUserId } from "../services";

export const ViewTodoScreen = ({
  route,
}: {
  route: { params: { id: string } };
}) => {
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <Text>{todo.title}</Text>
      <Text>{todo.description}</Text>
      <Text>{todo.author}</Text>
      <Text>{todo.fav}</Text>
      <Text>{todo.list}</Text>
      <Image source={{ uri: todo.imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 30,
    marginHorizontal: 20,
    justifyContent: "flex-end",
  },
  image: {
    width: 100,
    height: 100,
  },
});
