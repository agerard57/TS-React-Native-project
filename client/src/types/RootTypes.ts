import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type RootStackParamList = {
  root: NavigatorScreenParams<RootTabParamList> | undefined;
  "todo-list": NavigatorScreenParams<RootTabParamList> | undefined;
  "todo-view": { id: string } | undefined;
  "todo-edit": { id: string } | undefined;
  notFound: undefined;
  about: undefined;
};

type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

type RootTabParamList = {
  home: undefined;
  "todo-list": undefined;
  "todo-add": undefined;
  "todo-edit": undefined;
  "todo-view": undefined;
  notFound: undefined;
  about: undefined;
};

type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

// Export all types with their generic types
export type {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
  RootTabScreenProps,
};
