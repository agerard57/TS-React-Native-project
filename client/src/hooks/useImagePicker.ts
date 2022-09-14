import * as ImagePicker from "expo-image-picker";

import { FormTypes } from "../types";
import { useToast } from "./useToast";

export const useImagePicker = () => {
  /////////////////////////////
  // Image picker
  const pickImage = async ({
    setFieldTouched,
    setFieldValue,
  }: FormTypes["fieldValues"]) => {
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
        useToast(
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

      setFieldValue(
        "image.fileName",
        `${Math.random().toString(36).substring(7)}.${blobExtension}`
      );
      setFieldValue("image.file", base64);
      setFieldTouched("image", true);

      useToast("Your image has been uploaded!", "success");
    }
  };

  /////////////////////////////
  // Image remover
  const removeImage = ({
    setFieldTouched,
    setFieldValue,
  }: FormTypes["fieldValues"]) => {
    setFieldValue("image.fileName", "");
    setFieldValue("image.file", "");
    setFieldTouched("image", false);
  };

  return { pickImage, removeImage };
};
