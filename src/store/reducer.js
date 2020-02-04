import { combineReducers } from "redux-immutable";
import Header from "../common/header/reducer";
import Error from "../component/404/reducer";
import Home from "../component/store/reducer";
import Detail from "../component/detail/store/reducer";

export default combineReducers({
  Header,
  Error,
  Home,
  Detail
});
