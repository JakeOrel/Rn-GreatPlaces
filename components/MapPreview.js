import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";

import ENV from "../env";

const MapPreview = (props) => {
  let imagePrviewUrl;

  if (props.location) {
    imagePrviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleAPIKey}`;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePrviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
