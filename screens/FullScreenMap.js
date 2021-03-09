import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import Colors from "../constants/Colors";

const FullScreenMap = (props) => {
  const initalLoc = props.navigation.getParam("initialLoc");
  const readOnly = props.navigation.getParam("readonly");

  const [selectedLoc, setSelectedLoc] = useState(initalLoc);

  const mapRegion = {
    latitude: initalLoc ? initalLoc.lat : 37.78,
    longitude: initalLoc ? initalLoc.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readOnly) {
      return;
    }

    setSelectedLoc({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocHandler = useCallback(() => {
    if (!selectedLoc) {
      Alert.alert(
        "No Location Selected",
        "Please select a location before saving",
        [{ text: "okay" }]
      );
      return;
    }
    props.navigation.navigate("AddPlace", { pickedLocation: selectedLoc });
  }, [selectedLoc]);

  useEffect(() => {
    props.navigation.setParams({
      savedLocation: savePickedLocHandler,
    });
  }, [savePickedLocHandler]);

  let markerCoordinates;

  if (selectedLoc) {
    markerCoordinates = {
      latitude: selectedLoc.lat,
      longitude: selectedLoc.lng,
    };
  }

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="picked location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

FullScreenMap.navigationOptions = (navData) => {
  const saveFunc = navData.navigation.getParam("savedLocation");
  const readOnly = navData.navigation.getParam("readonly");

  if (readOnly) {
    return {};
  }

  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFunc}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
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
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});
