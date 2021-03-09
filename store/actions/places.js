export const ADD_PLACE = "ADD_PLACE";

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
    } catch (err) {
      console.log(err);
      throw err;
    }

    dispatch({ type: ADD_PLACE, placeData: { title: title, image: newpath } });
  };
};
