import { FlatList, StyleSheet } from "react-native";

import { Todo } from "../../interfaces";
import { Themed } from "../Themed";
import { TodoCard } from "./TodoCard";

type Props = {
  listName: string;
  todos: Todo[];
};

export const ListContainer = ({ listName, todos }: Props) => {
  const { Text, View } = Themed;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{listName}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoCard todo={item} />}
        /* extraData={selectedId} */
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => <Text>No todos</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    padding: 20,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
