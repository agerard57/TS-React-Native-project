import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootTabParamList } from "../types";

export const LinkingConfiguration: LinkingOptions<RootTabParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      home: "home",
      "todo-list": "todo/list",
      "todo-add": "todo/add",
      "todo-edit": "todo/edit/:id",
      "todo-view": "todo/view/:id",
      about: "about",
      notFound: "*",
    },
  },
};
