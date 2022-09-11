import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps } from "react";

type Props = {
  name: ComponentProps<typeof FontAwesome>["name"];
  color: string;
};

export const TabBarIcon = (props: Props) => (
  <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
);
