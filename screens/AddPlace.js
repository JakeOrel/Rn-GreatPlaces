import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import ImageSelector from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

import * as placesActions from "../store/actions/places";

const AddPlace = (props) => {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLoc, setSelectedLoc] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title, selectedImage, selectedLoc));
    props.navigation.navigate("PlacesOverview");
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const locationPickedhandled = useCallback((loc) => {
    setSelectedLoc(loc);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedhandled}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

AddPlace.navigationOptions = {
  headerTitle: "New Place",
};

export default AddPlace;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  buttonContainer: {
    marginTop: 15,
  },
});
