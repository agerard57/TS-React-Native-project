import { ScrollView, StyleSheet } from "react-native";

import { ViewContainer, BackButton } from "../components";
import { useTodoScreen } from "../hooks";

type Props = {
  route: { params: { id: string } };
};

export const ViewTodoScreen = ({ route }: Props) => {
  const { todo } = useTodoScreen(route);

  return (
    <ScrollView style={styles.scrollView}>
      <ViewContainer todo={todo} />
      <BackButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { marginBottom: 30 },
});
