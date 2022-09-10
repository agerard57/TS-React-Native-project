import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";

import { postTodo } from "../services";
import { FormTypes } from "../types";
import { useToast } from "./useToast";

export const useTodoForm = () => {
  const { toast } = useToast();
  const navigation = useNavigation();

  /////////////////////////////
  // Image picker
  const pickImage = async ({
    setFieldTouched,
    setFieldValue,
  }: FormTypes["pickImage"]) => {
    // No permissions needed to launch the library
    const result = await ImagePicker.launchImageLibraryAsync({
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

  /////////////////////////////
  // Image remover
  const removeImage = ({
    setFieldTouched,
    setFieldValue,
  }: FormTypes["pickImage"]) => {
    setFieldValue("image.fileName", "");
    setFieldTouched("image", false);
  };

  /////////////////////////////
  // Form validation schema
  const formValidationSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .max(30, ({ max, value }) => `${value.length} / ${max}`),
    content: yup
      .string()
      .max(300, ({ max, value }) => `${value.length} / ${max}`),
    list: yup.string().required("List is required"),
    author: yup
      .string()
      .required("Author is required")
      .max(20, ({ max, value }) => `${value.length} / ${max}`),
  });

  /////////////////////////////
  // Submit form handler
  const handleSubmit = (values: FormTypes["values"]) => {
    postTodo(values).then((res) => {
      if (res) {
        toast(res, "success");
        navigation.navigate("todo-list");
      } else {
        toast("Something went wrong", "error");
      }
    });
  };

  return {
    pickImage,
    removeImage,
    handleSubmit,
    formValidationSchema,
  };
};
