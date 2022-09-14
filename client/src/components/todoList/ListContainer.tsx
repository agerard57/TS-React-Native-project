import { FlatList, GestureResponderEvent, StyleSheet } from "react-native";

import { Todo } from "../../interfaces";
import { Themed } from "../Themed";
import { TodoCard } from "./TodoCard";

type Props = {
  listName: string;
  todos: Todo[];
  onDelete(id: string): (event: GestureResponderEvent) => void;
};

export const ListContainer = ({ listName, todos, onDelete }: Props) => {
  const { Text, View } = Themed;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.titleLine} />
          <Text style={styles.title}>{listName}</Text>
          <View style={styles.titleLine} />
        </View>
        <FlatList
          style={styles.list}
          data={todos}
          renderItem={({ item }) => (
            <TodoCard todo={item} onDelete={onDelete} />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={() => <Text>No todos</Text>}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginVertical: 20,
    borderRadius: 5,
  },
  titleContainer: { flexDirection: "row", paddingBottom: 10 },
  title: {
    fontSize: 20,
    paddingHorizontal: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleLine: {
    backgroundColor: "#dcdcdc",
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
  list: {
    width: "100%",
  },
});
