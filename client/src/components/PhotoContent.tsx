import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, View } from "react-native";

import { useToast } from "../hooks";

export const PhotoContent = () => {
  const [image, setImage] = useState<string>("");

  const pickImage = async () => {
    const { toast } = useToast();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
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
      // Check if the image is square
      if (result.width !== result.height) {
        toast("The image must be square.", "error");
        return;
      }

      setImage(result.uri);
      toast("Your image has been uploaded!", "success");
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <>{image && <Image source={{ uri: image }} style={styles.image} />}</>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
