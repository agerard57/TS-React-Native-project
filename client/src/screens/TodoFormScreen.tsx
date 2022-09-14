import { RouteProp } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";

import { Themed, TodoForm } from "../components";
import { FormTypes, RootTabParamList } from "../types";

type Props = {
  route:
    | RouteProp<RootTabParamList, "todo-add">
    | RouteProp<RootTabParamList, "todo-edit">;
  mode: FormTypes["modes"];
};

export const TodoFormScreen = ({ route, mode }: Props) => {
  const { View } = Themed;
  return (
    <ScrollView>
      <View style={styles.container}>
        <TodoForm route={route} mode={mode} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 20,
    padding: 20,
  },
});
