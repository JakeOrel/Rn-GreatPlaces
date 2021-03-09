import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import Colors from "../constants/Colors";
import PlacesOverviewScreen from "../screens/PlacesOverviewScreen";
import AddPlace from "../screens/AddPlace";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import FullScreenMap from "../screens/FullScreenMap";

const GreatPlacesNavigator = createStackNavigator(
  {
    PlacesOverview: PlacesOverviewScreen,
    PlaceDetails: PlaceDetailsScreen,
    AddPlace: AddPlace,
    Map: FullScreenMap,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(GreatPlacesNavigator);
