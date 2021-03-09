import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLoc = props.navigation.getParam("pickedLocation");

  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLoc) {
      setPickedLocation(mapPickedLoc);

      props.onLocationPicked(mapPickedLoc);
    }
  }, [mapPickedLoc, onLocationPicked]);

  const getPerms = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "insufficient Permissions!",
        "You need to grant Location Permissions to Utilize the Location Features",
        [{ text: "Okay" }]
      );

      return false;
    }
    return true;
  };

  const getlocHandler = async () => {
    const hasPerms = await getPerms();
    if (!hasPerms) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "could not fetch location",
        "please try again later or pick a location on the app",
        [{ text: "okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locPicker}>
      <MapPreview
        style={styles.mapPrev}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        <View style={styles.mapPrev}>
          {isFetching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Text>No Location Chosen yet</Text>
          )}
        </View>
      </MapPreview>
      <View style={styles.ButtonContainer}>
        <Button
          title="Get my location"
          color={Colors.primary}
          onPress={getlocHandler}
        />
        <Button
          title="pick On map"
          onPress={pickOnMapHandler}
          color={Colors.primary}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locPicker: {
    marginBottom: 15,
  },
  mapPrev: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
