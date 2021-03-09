import React, { useEffect } from "react";
import { StyleSheet, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/actions/places";

const PlacesOverviewScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.getPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          image={itemData.item.imageUri}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate("PlaceDetails", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

PlacesOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("AddPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesOverviewScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
