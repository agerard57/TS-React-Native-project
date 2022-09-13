import {
  Image as DefaultImage,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useTodoForm } from "../../hooks";
import { FormTypes } from "../../types";
import { Themed } from "../Themed";

export const Image = ({
  values,
  setFieldTouched,
  setFieldValue,
}: FormTypes["input"]) => {
  const { Text, View } = Themed;
  const { pickImage, removeImage } = useTodoForm();
  return (
    <>
      <Text style={styles.label}>Image</Text>
      {values.image.file && (
        <DefaultImage
          source={{ uri: values.image.file }}
          style={styles.image}
        />
      )}
      <View style={styles.buttons}>
        {!values.image.file ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage({ setFieldTouched, setFieldValue })}
          >
            <Text style={styles.buttonText}>Add Image</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => removeImage({ setFieldTouched, setFieldValue })}
          >
            <Text style={styles.buttonText}>Clear image</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 1280 / 4,
    height: 720 / 4,
    alignSelf: "center",
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: { color: "white", fontSize: 16, flex: 1, textAlign: "center" },
  button: {
    backgroundColor: "#2855d8",
    elevation: 3,
    width: "40%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});
