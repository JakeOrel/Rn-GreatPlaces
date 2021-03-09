import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import GreatPlacesNavigator from "./navigation/GreatPlacesNavigator";
import placesReducer from "./store/reducers/places";
import { init, dropTable } from "./helpers/db";

/* 
uncomment if need to recreate table

 dropTable()
   .then(() => {
     console.log("table dropped");
     init().then(() => {
       console.log("initialized table");
     });
   })
   .catch((err) => {
     console.log(err);
   });
*/

init()
  .then(() => {
    console.log("initialized db");
  })
  .catch((err) => {
    console.log("init failed", err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <GreatPlacesNavigator />
    </Provider>
  );
}
