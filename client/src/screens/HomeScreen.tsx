import { FlatList, StyleSheet } from "react-native";

import { ListContainer, Themed } from "../components";
import { useHomePage } from "../hooks";

export const HomeScreen = () => {
  const { Text, View } = Themed;
  const { favList, onDelete } = useHomePage();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Home</Text>
        <View
          style={styles.separator}
          lightColor="#000000"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Hello and welcome to this Kanban! I hope you'll enjoy it!</Text>
        <View
          style={styles.separator}
          lightColor="#000000"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
      <FlatList
        data={[favList]}
        renderItem={({ item }) => (
          <ListContainer {...item} onDelete={onDelete} />
        )}
        keyExtractor={(item) => item.listName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "transparent",
  },

  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
