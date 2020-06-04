import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import pathsReducer from "./pathsReducer";
import mapLayersReducer from "./mapLayersReducer";

const appReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  paths: pathsReducer,
  mapLayers: mapLayersReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
};

export default rootReducer;