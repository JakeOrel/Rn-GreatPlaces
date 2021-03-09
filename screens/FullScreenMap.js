import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const FullScreenMap = (props) => {
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return <MapView region={mapRegion} style={styles.map} />;
};

export default FullScreenMap;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
});
