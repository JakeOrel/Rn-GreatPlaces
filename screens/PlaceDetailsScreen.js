import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetailsScreen = (props) => {
  return (
    <View style={styles.centered}>
      <Text>Places List Screen</Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

export default PlaceDetailsScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
