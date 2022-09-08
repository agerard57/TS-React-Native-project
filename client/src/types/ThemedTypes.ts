import { Text as DefaultText, View as DefaultView } from "react-native";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedTypes = {
  TextProps: ThemeProps & DefaultText["props"];
  ViewProps: ThemeProps & DefaultView["props"];
};
