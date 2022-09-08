import React from "react";
import { Linking } from "react-native";
import { StyleSheet } from "react-native";
import { Themed } from "../components/Themed";

export const AboutContent = () => {
  const { Text, View } = Themed;

  return (
    <View>
      <Text style={styles.paragraph}>
        This is a simple app that permits me to learn how to use React Native.
      </Text>
      <Text style={styles.paragraph}>
        The app is built using the Expo managed workflow. It uses React Native
        and React Navigation.
      </Text>
      <Text style={styles.paragraph}>
        The app is open source and available on GitHub:
      </Text>
      <Text style={styles.paragraph}>
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL(
              "https://github.com/agerard57/TS-React-Native-project"
            )
          }
        >
          Click here!
        </Text>
      </Text>
      <Text style={styles.paragraph}>Made with ❤️ by agerard57 - 2022</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "#2e78b7",
  },
});
