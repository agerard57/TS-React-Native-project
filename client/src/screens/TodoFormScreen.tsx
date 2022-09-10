import { ScrollView, StyleSheet } from "react-native";

import { Themed, TodoForm } from "../components";

export const TodoFormScreen = () => {
  const { View } = Themed;
  return (
    <ScrollView>
      <View style={styles.container}>
        <TodoForm />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    padding: 20,
  },
});
