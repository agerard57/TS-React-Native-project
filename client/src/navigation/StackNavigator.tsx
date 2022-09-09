import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ModalAboutScreen } from "../screens";
import { RootStackParamList } from "../types";
import { BottomTabNavigator } from "./BottomTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Stack navigator is not used in this project (because of bottom tab navigation),
// but it is here for reference.
// Since I'm not using it, I'm not maintaining this file.
// Hence the naming and the missing pages.

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="about" component={ModalAboutScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
