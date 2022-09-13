import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet } from "react-native";

import { Themed } from "../Themed";

export const BackButton = () => {
  const { View } = Themed;

  const navigation = useNavigation();

  return (
    <View style={styles.button}>
      <Button onPress={() => navigation.navigate("todo-list")} title="Back" />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
  },
});
