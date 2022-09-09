import { useNavigation } from "@react-navigation/native";
import { Button, TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";

import { Todo } from "../../interfaces";
import { Themed } from "../Themed";

export const TodoCard = ({ todo }: { todo: Todo }) => {
  const navigation = useNavigation();

  const { Text, View } = Themed;
  const cropDescription = (description: string) => {
    if (description.length > 30) {
      return description.slice(0, 30) + "...";
    }
    return description;
  };

  return (
    <View style={styles.todoCard}>
      <TouchableHighlight
        style={styles.todoCard}
        onPress={() => {
          navigation.navigate("todo-view", { id: todo._id });
        }}
      >
        <View style={styles.todoCardContent}>
          <Text style={styles.todoCardTitle}>{todo.title}</Text>
          <Text
            style={styles.todoCardCompleted}
            onPress={() => console.log("pressed")}
          >
            {todo.description
              ? cropDescription(todo.description)
              : "No description"}
          </Text>
          <Button
            title="Delete"
            onPress={() => console.log("pressed")}
            color="#f00"
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  todoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoCardContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  todoCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoCardCompleted: {
    fontSize: 14,
    color: "#999",
  },
});
