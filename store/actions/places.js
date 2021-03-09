export const ADD_PLACE = "ADD_PLACE";
export const GET_PLACES = "GET_PLACES";

import { insertPlace, fetchPlaces } from "../../helpers/db";
import * as FileSystem from "expo-file-system";

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "dummyAddres",
        15.6,
        12.3
      );
      dispatch({
        type: ADD_PLACE,
        placeData: { title: title, image: newpath, id: dbRes.insertId },
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
