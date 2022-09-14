import { StyleSheet, Image } from "react-native";

import { useColorScheme } from "../../hooks";
import { Todo } from "../../interfaces";
import { normalizeDate, normalizeDescription } from "../../utils";
import { Themed } from "../Themed";
import { ListDisplay } from "./ListDisplay";

export const ViewContainer = ({ todo }: { todo: Todo }) => {
  const { Text, View } = Themed;

  const color = useColorScheme();

  return (
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
          Last update: {normalizeDate(todo.createdAt, "longDate")}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    padding: 20,
  },
  listContainer: { marginTop: 20 },
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
  description: {
    textAlign: "justify",
    lineHeight: 25,
  },
  author: {
    fontSize: 12,
    color: "grey",
    marginTop: 20,
    fontStyle: "italic",
    textAlign: "right",
  },
  image: {
    width: 1280 / 4,
    height: 720 / 4,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },
});
