import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}

type RootTabParamList = {
  home: undefined;
  "todo-list": /* { refresh?: "true" } | */ undefined;
  "todo-add": undefined;
  "todo-edit": undefined;
  "todo-view": undefined;
  notFound: undefined;
  about: undefined;
};

type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, Screen>;

// Export all types with their generic types
export type { RootTabParamList, RootTabScreenProps };
