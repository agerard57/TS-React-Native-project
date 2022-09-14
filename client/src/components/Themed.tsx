import { Text as DefaultText, View as DefaultView } from "react-native";

import { useThemeColor } from "../hooks";
import { ThemedTypes } from "../types";

const Text = (props: ThemedTypes["TextProps"]) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const customFont = { fontFamily: "Roboto" };

  return <DefaultText style={[{ color }, style, customFont]} {...otherProps} />;
};

const View = (props: ThemedTypes["ViewProps"]) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export const Themed = {
  Text,
  View,
};
