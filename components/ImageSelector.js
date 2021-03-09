import React from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const ImageSelector = (props) => {
  const getPerms = async () => {
    const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    if (result.status !== "granted") {
      Alert.alert(
        "insufficient Permissions!",
        "You need to grant Camera Permissions to Utilize the camera",
        [{ text: "Okay" }]
      );

      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPerms = await getPerms();
    if (!hasPerms) {
      return;
    }

    ImagePicker.launchCameraAsync();
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No Image Selected</Text>
        <Image style={styles.image} />
        <Button
          title="take image"
          color={Colors.primary}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
