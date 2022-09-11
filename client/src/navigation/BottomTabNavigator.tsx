import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HeaderBarIcon, TabBarIcon } from "../components";
import { Colors } from "../constants";
import { useColorScheme } from "../hooks";
import {
  HomeScreen,
  ModalAboutScreen,
  TodoListScreen,
  TodoFormScreen,
  NotFoundScreen,
  ViewTodoScreen,
} from "../screens";
import { RootTabParamList, RootTabScreenProps } from "../types";

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
            <HeaderBarIcon
              iconName="info-circle"
              onPress={() => navigation.navigate("about")}
            />
          ),
        })}
      />
      <BottomTab.Group screenOptions={{ headerShown: true }}>
        <BottomTab.Screen
          name="todo-list"
          component={TodoListScreen}
          options={({ navigation }: RootTabScreenProps<"todo-list">) => ({
            title: "Todo list",
            tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
            headerRight: () => (
              <HeaderBarIcon
                iconName="plus-circle"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <BottomTab.Screen
          name="todo-add"
          component={TodoFormScreen}
          options={({ navigation }: RootTabScreenProps<"todo-add">) => ({
            title: "Add task",
            tabBarButton: () => null,
            headerRight: () => (
              <HeaderBarIcon
                iconName="times-circle"
                onPress={() => navigation.navigate("todo-list")}
              />
            ),
          })}
        />
      </BottomTab.Group>
      {/*       <BottomTab.Screen
          name="todo-edit"
          component={TabTwoScreen}
          options={{
            title: "Edit task",
            tabBarButton: () => null,
            
          }}
        />       
      */}
      <BottomTab.Screen
        name="todo-view"
        component={ViewTodoScreen}
        options={{
          title: "View task",
          tabBarButton: () => null,
        }}
      />
      <BottomTab.Screen
        name="about"
        component={ModalAboutScreen}
        options={({ navigation }: RootTabScreenProps<"about">) => ({
          title: "About",
          tabBarButton: () => null,
          headerRight: () => (
            <HeaderBarIcon
              iconName="times-circle"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="notFound"
        component={NotFoundScreen}
        options={{ title: "Page not found :(", tabBarButton: () => null }}
      />
    </BottomTab.Navigator>
  );
};
