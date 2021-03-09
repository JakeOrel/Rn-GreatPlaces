import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetailsScreen = (props) => {
  return (
    <View style={styles.centered}>
      <Text>Places List Screen</Text>
    </View>
  );
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
