import { useNavigation } from "@react-navigation/native";
import {
  Button,
  GestureResponderEvent,
  TouchableHighlight,
} from "react-native";
import { StyleSheet } from "react-native";

import { Todo } from "../../interfaces";
import { Themed } from "../Themed";

type Props = {
  todo: Todo;
  onDelete(id: string): (event: GestureResponderEvent) => void;
};

export const TodoCard = ({ todo, onDelete }: Props) => {
  const navigation = useNavigation();

  const { Text, View } = Themed;

  const cropDescription = (description: string) => {
    if (description.length > 100) {
      return description.slice(0, 100) + "...";
    }
    return description;
  };

  return (
    <TouchableHighlight
      style={styles.todoContainer}
      onPress={() => {
        navigation.navigate("todo-view", { id: todo._id });
      }}
    >
      <View style={styles.todoCard}>
        <>
          <View>
            <Text style={styles.todoCardTitle}>{todo.title}</Text>
            <View style={styles.separator} />
            <View style={styles.todoCardContentContainer}>
              <Text>
                {todo.description
                  ? cropDescription(todo.description)
                  : "No description"}
              </Text>
              <Text style={styles.todoCardAuthor}>By {todo.author}</Text>
              <View style={styles.contentSeparator} />
              <View style={styles.buttons}>
                <View style={styles.button}>
                  <Button
                    title="Edit"
                    onPress={() => {
                      navigation.navigate("todo-edit", { id: todo._id });
                    }}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Delete"
                    color="#ff5c5c"
                    onPress={onDelete(todo._id)}
                  />
                </View>
              </View>
            </View>
          </View>
        </>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#a9a9a9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    marginVertical: 10,
  },
  separator: {
    marginVertical: 10,
    width: "100%",
    height: 1,
    backgroundColor: "grey",
  },
  contentSeparator: {
    marginVertical: 10,
    width: "30%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "#d1d3d4",
  },
  todoCard: {
    width: "98%",
    margin: 10,
  },
  todoCardContentContainer: {
    padding: 10,
  },
  todoCardAuthor: {
    fontSize: 12,
    paddingTop: 10,
    color: "grey",
  },
  todoCardTitle: {
    fontSize: 18,
    paddingTop: 10,
    paddingHorizontal: 10,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  button: { width: "40%" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
