import { Themed } from "./Themed";
import { ThemedTypes } from "../types";

export const MonoText = (props: ThemedTypes["TextProps"]) => {
  const { Text } = Themed;

  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
};
