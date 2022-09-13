import { Fragment } from "react";
import { StyleSheet } from "react-native";

import { TodoTypes } from "../../types";
import { Themed } from "../Themed";

export const ListDisplay = ({
  currentList,
}: {
  currentList: TodoTypes["list"];
}) => {
  const { Text, View } = Themed;
  const displayedLists = {
    TODO: "To do",
    "IN PROGRESS": "In progress",
    DONE: "Done",
  };
  // the currentList that is in displayList will be displayed in bold and the others will be displayed in normal
  // Desired output: To do | In progress | Done
  // Add separator between the lists
  // Match currentList with the keys of displayedLists

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
