import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Themed } from "../components";

export const NotFoundScreen = () => {
  const navigation = useNavigation();

  const { Text, View } = Themed;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This page doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("home")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
