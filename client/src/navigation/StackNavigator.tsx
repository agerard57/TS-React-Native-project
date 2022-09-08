import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PhotoScreen, NotFoundScreen, ModalAboutScreen } from "../screens";
import { RootStackParamList } from "../types";
import { BottomTabNavigator } from "./BottomTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Photo"
        component={PhotoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="About" component={ModalAboutScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
