import { ThemedTypes } from "../types";
import { Themed } from "./Themed";

export const MonoText = (props: ThemedTypes["TextProps"]) => {
  const { Text } = Themed;

  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
};
