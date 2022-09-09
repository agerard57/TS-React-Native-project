import { FlatList, StyleSheet } from "react-native";

import { Themed, ListContainer } from "../components";
import { useTodoList } from "../hooks";

export const TodoListScreen = () => {
  const { View } = Themed;
  const { todoLists } = useTodoList();

  return (
    <View style={styles.container}>
      <FlatList
        data={todoLists}
        renderItem={({ item }) => <ListContainer {...item} />}
        keyExtractor={(item) => item.listName}
      />
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
});
