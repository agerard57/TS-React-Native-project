import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ColorSchemeName } from "react-native";

import { BottomTabNavigator } from "./BottomTabNavigator";
import { LinkingConfiguration } from "./LinkingConfiguration";

type Props = {
  colorScheme: ColorSchemeName;
};

export const Navigation = ({ colorScheme }: Props) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
