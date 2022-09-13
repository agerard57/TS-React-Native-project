import { Fragment } from "react";
import { StyleSheet } from "react-native";

import { TodoTypes } from "../../types";
import { Themed } from "../Themed";

type Props = {
  currentList: TodoTypes["list"];
};

export const ListDisplay = ({ currentList }: Props) => {
  const { Text, View } = Themed;

  const displayedLists = {
    TODO: "To do",
    "IN PROGRESS": "In progress",
    DONE: "Done",
  };

  return (
    <View style={styles.listsContainer}>
      {Object.keys(displayedLists).map((list) => (
        <Fragment key={list}>
          <Text
            style={{
              fontWeight: list === currentList ? "bold" : "normal",
            }}
          >
            {list}
          </Text>

          {list !==
            Object.keys(displayedLists)[
              Object.keys(displayedLists).length - 1
            ] && <Text> | </Text>}
        </Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
});
