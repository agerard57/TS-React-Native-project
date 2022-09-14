import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  GestureResponderEvent,
  TouchableHighlight,
} from "react-native";
import { StyleSheet } from "react-native";

import { Colors } from "../../constants";
import { useColorScheme } from "../../hooks";
import { Todo } from "../../interfaces";
import { normalizeDescription } from "../../utils";
import { Themed } from "../Themed";

type Props = {
  todo: Todo;
  onDelete(id: string): (event: GestureResponderEvent) => void;
};

export const TodoCard = ({ todo, onDelete }: Props) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const { Text, View } = Themed;
  const color = useColorScheme();

  return (
    <TouchableHighlight
      style={styles.todoContainer}
      underlayColor={color === "light" ? "#dddddd" : "#333333"}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("todo-view", { id: todo._id });
      }}
    >
      <View style={[styles.todoCard, styles.transparent]}>
        <>
          <View style={styles.transparent}>
            <Text style={styles.todoCardTitle}>{todo.title}</Text>
            <View style={styles.separator} />
            <View style={[styles.todoCardContentContainer, styles.transparent]}>
              <View style={styles.iconsContainer}>
                {todo.fav && (
                  <FontAwesome
                    size={20}
                    style={styles.imageIcon}
                    name="star"
                    color={"#4169E1"}
                  />
                )}
                {todo.imageName && (
                  <FontAwesome
                    size={20}
                    style={styles.imageIcon}
                    name="image"
                    color={Colors[colorScheme].text}
                  />
                )}
              </View>
              <Text style={styles.description}>
                {normalizeDescription(todo.description, true)}
              </Text>
              <Text style={styles.todoCardAuthor}>By {todo.author}</Text>
              <View style={styles.contentSeparator} />
              <View style={[styles.buttons, styles.transparent]}>
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
    borderColor: "#d3d3d3",
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
  },
  imageIcon: {
    marginBottom: 10,
    marginRight: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  todoCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
  description: {
    textAlign: "justify",
  },
  todoCard: {
    width: "100%",
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
  button: { width: "40%" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  transparent: { backgroundColor: "transparent" },
});
