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
      // Check if the photo is less than 1MB
      if (result.uri.length > 3000000) {
        toast(
          "The photo is too large. Your photo must be less than 3MB in size.",
          "error"
        );
        return;
      }
      // Check if the photo is square
      if (result.width !== result.height) {
        toast("The photo must be square.", "error");
        return;
      }

      setImage(result.uri);
      toast("Your photo has been uploaded!", "success");
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
