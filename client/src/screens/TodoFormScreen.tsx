import * as ImagePicker from "expo-image-picker";
import { Field, Formik } from "formik";
import { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import * as yup from "yup";

import { Themed, ListContainer, CustomInput } from "../components";
import { useToast, useTodoList } from "../hooks";
import { postTodo } from "../services";

export const TodoFormScreen = () => {
  const { Text, View } = Themed;
  const { toast } = useToast();
  const pickImage = async (
    setFieldTouched: {
      (
        field: string,
        isTouched?: boolean | undefined,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: boolean): void;
    },
    setFieldValue: {
      (field: string, value: any, shouldValidate?: boolean | undefined): void;
      (arg0: string, arg1: any): void;
    }
  ) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      // Check if the image is less than 1MB
      if (result.uri.length > 3000000) {
        toast(
          "The image is too large. Your image must be less than 3MB in size.",
          "error"
        );
        return;
      }

      setFieldValue("image.fileName", result.uri);
      setFieldTouched("image", true);
      toast("Your image has been uploaded!", "success");
    }
  };

  const removeImage = (
    setFieldTouched: {
      (
        field: string,
        isTouched?: boolean | undefined,
        shouldValidate?: boolean | undefined
      ): void;
      (arg0: string, arg1: boolean): void;
    },
    setFieldValue: {
      (field: string, value: any, shouldValidate?: boolean | undefined): void;
      (arg0: string, arg1: any): void;
    }
  ) => {
    setFieldValue("image.fileName", "");
    setFieldTouched("image", false);
  };
  const handleSubmit = (values: {
    title: string;
    content: string;
    image: { fileName: string };
    list: string;
    author: string;
  }) => {
    postTodo(values).then((res) => {
      if (res) {
        toast(res.message, "success");
      } else {
        toast("Something went wrong", "error");
      }
    });
  };

  const formValidationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().max(300, ({ max, value }) => `${value.length / max}`),
    list: yup.string().required("List is required"),
    author: yup.string().required("Author is required"),
  });
  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          validationSchema={formValidationSchema}
          initialValues={{
            title: "",
            content: "",
            image: { fileName: "" },
            list: "To do",
            author: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            submitForm,
            isValid,
            values,
            setFieldValue,
            setFieldTouched,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.formInput}>
                <Text style={styles.label}>* List</Text>

                <View
                  style={{
                    height: 40,
                    margin: 10,
                    backgroundColor: "white",
                    borderColor: "gray",
                    borderWidth: StyleSheet.hairlineWidth,
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <RNPickerSelect
                    pickerProps={{
                      accessibilityLabel: values.list,
                    }}
                    style={{
                      placeholder: {
                        color: "",
                        fontWeight: "bold",
                      },
                    }}
                    onValueChange={(value) => {
                      value !== null
                        ? (setFieldValue("list", value),
                          setFieldTouched("list", true))
                        : (setFieldValue("list", ""),
                          setFieldTouched("list", false));
                    }}
                    items={[
                      { label: "To do", value: "TODO" },
                      { label: "In progress...", value: "IN PROGRESS" },
                      { label: "Done !", value: "DONE" },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.formInput}>
                <Field
                  component={CustomInput}
                  name="title"
                  placeholder="Task title"
                  required
                />
              </View>
              <View style={styles.formInput}>
                <Field
                  component={CustomInput}
                  name="content"
                  placeholder="Write description..."
                  multiline
                  numberOfLines={3}
                  maxLength={300}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.label}>Image</Text>

                {errors.image && touched.image && (
                  <Text style={{ color: "red" }}>{errors.image.fileName}</Text>
                )}
                {values.image.fileName && (
                  <Image
                    source={{ uri: values.image.fileName }}
                    style={styles.image}
                  />
                )}
                <View style={styles.buttons}>
                  {!values.image.fileName ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => pickImage(setFieldTouched, setFieldValue)}
                    >
                      <Text style={styles.buttonText}>Add Image</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        removeImage(setFieldTouched, setFieldValue)
                      }
                    >
                      <Text style={styles.buttonText}>Clear image</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.formInput}>
                <Field
                  component={CustomInput}
                  name="author"
                  placeholder="author"
                  required
                />
              </View>
              <Button
                onPress={() => submitForm()}
                title="POST"
                disabled={!isValid || values.title === ""}
              />
            </>
          )}
        </Formik>
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
  formInput: {
    marginVertical: 10,
  },
  image: {
    width: 1280 / 4,
    height: 720 / 4,
    // Center
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#2855d8",
    elevation: 3,
    width: "40%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: { color: "white", fontSize: 16, flex: 1, textAlign: "center" },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
