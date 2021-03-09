import React, { useState } from "react";
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

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

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
    } catch (err) {
      Alert.alert(
        "could not fetch location",
        "please try again later or pick a location on the app",
        [{ text: "okay" }]
      );
    }
    setIsFetching(false);
    // props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.locPicker}>
      <View style={styles.mapPrev}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No Location Chosen yet</Text>
        )}
      </View>
      <Button
        title="Get my location"
        color={Colors.primary}
        onPress={getlocHandler}
      />
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
});
