import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";

import { Colors } from "../../constants";
import { useColorScheme } from "../../hooks";

type Props = {
  iconName: keyof typeof FontAwesome.glyphMap;
  onPress: () => void;
};

export const HeaderBarIcon = ({ iconName, onPress }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={() => onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <FontAwesome
        name={iconName}
        size={25}
        color={Colors[colorScheme].text}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
};
