import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { Platform } from "react-native";
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      base64: true,
      // iOS only
      allowsMultipleSelection: false,
    });

    if (!result.cancelled && result.base64) {
      // Check if the image is less than 1MB
      if (result.uri.length > 3000000) {
        toast(
          "The image is too large. Your image must be less than 3MB in size.",
          "error"
        );
        return;
      }

      // Get extension from blob
      const blob = await fetch(result.uri).then((r) => r.blob());
      const blobExtension = blob.type.split("/").pop();
      // append blob extension to the base64 string
      const base64 = `data:image/${blobExtension};base64,${result.base64}`;
      console.log({
        blobExtension: blobExtension,
        imageFile: base64,
        imageFileName: `${Math.random()
          .toString(36)
          .substring(7)}.${blobExtension}`,
      });
      setFieldValue(
        "image.fileName",
        `${Math.random().toString(36).substring(7)}.${blobExtension}`
      );
      setFieldValue("image.file", base64);
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
    setFieldValue("image.file", "");
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
