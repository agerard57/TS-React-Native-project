import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { AboutContent, Themed } from "../components";

export const ModalAboutScreen = () => {
  const { Text, View } = Themed;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <AboutContent />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
