import cartReducer from "./cartReducers";
import userReducer from "./userReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cartReducer,
  userReducer,
});

export default rootReducer;
