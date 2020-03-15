import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import pathsReducer from "./pathsReducer";
import mapLayersReducer from "./mapLayersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  paths: pathsReducer,
  mapLayers: mapLayersReducer
});
