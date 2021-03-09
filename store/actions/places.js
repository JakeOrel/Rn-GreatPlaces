export const ADD_PLACE = "ADD_PLACE";
export const GET_PLACES = "GET_PLACES";

import ENV from "../../env";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import * as FileSystem from "expo-file-system";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleAPIKey}`
    );

    if (!res.ok) {
      throw new Error("something went wrong");
    }

    const resData = await res.json();
    if (!resData.results) {
      throw new Error("something went wrong");
    }

    const address = resData.results[0].formatted_address;
    const fileName = image.split("/").pop();
    const newpath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newpath,
      });
      const dbRes = await insertPlace(
        title,
        newpath,
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          title: title,
          image: newpath,
          id: dbRes.insertId,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const getPlaces = () => {
  return async (dispatch) => {
    try {
      const dbRes = await fetchPlaces();
      dispatch({ type: GET_PLACES, places: dbRes.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
