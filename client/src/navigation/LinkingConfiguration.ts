import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

export const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      root: {
        screens: {
          home: "home",
        },
      },
      "todo-list": {
        screens: {
          "todo-add": "todo-add",
          "todo-list": "todo-list",
        },
      },
      "todo-modify": "todo-modify/:id",
      "todo-view": "todo-view/:id",
      about: "about",
      notFound: "*",
    },
  },
};
