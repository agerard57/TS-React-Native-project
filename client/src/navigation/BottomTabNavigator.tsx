import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";

import { Colors } from "../constants";
import { useColorScheme } from "../hooks";
import {
  HomeScreen,
  TabTwoScreen,
  ModalAboutScreen,
  TodoListScreen,
} from "../screens";
import { TodoFormScreen } from "../screens/TodoFormScreen";
import { RootTabParamList, RootTabScreenProps } from "../types";
import { TabBarIcon } from "./TabBarIcon";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("about")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="todo-list"
        component={TodoListScreen}
        options={({ navigation }: RootTabScreenProps<"todo-list">) => ({
          title: "Todo list",
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("todo-add")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="todo-edit"
        component={TabTwoScreen}
        options={{
          title: "Edit task",
          tabBarButton: () => null,
        }}
      />
      <BottomTab.Screen
        name="todo-add"
        component={TodoFormScreen}
        options={{
          title: "Add task",
          tabBarButton: () => null,
        }}
      />
      <BottomTab.Screen
        name="todo-view"
        component={TabTwoScreen}
        options={{
          title: "View task",
          tabBarButton: () => null,
        }}
      />
      <BottomTab.Screen
        name="about"
        component={ModalAboutScreen}
        options={{ title: "About", tabBarButton: () => null }}
      />
    </BottomTab.Navigator>
  );
};
