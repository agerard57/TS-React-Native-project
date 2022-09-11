import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import { Colors } from "../../constants";
import { useColorScheme } from "../../hooks";
import { Themed } from "../Themed";

type Props = {
  iconName: keyof typeof FontAwesome.glyphMap;
  onPress: () => void;
};

export const HeaderBarIcons = ({ options }: { options: Props[] }) => {
  const colorScheme = useColorScheme();
  const { View } = Themed;

  return (
    <View style={styles.container}>
      {options.map((options) => (
        <Pressable
          onPress={options.onPress}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome
            name={options.iconName}
            size={25}
            color={Colors[colorScheme].text}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
});
