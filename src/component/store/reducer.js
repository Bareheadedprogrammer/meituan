import { fromJS } from "immutable";
import {
  GET_HOME_DATA,
  CHEAP_GET_HOME_DATA,
  RE_GET_HOME_DATA
} from "./bianLiang";
const defaultState = fromJS({
  data: [],
  have: [],
  cheap: [],
  cheapHave: [],
  reData: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_HOME_DATA:
      return state
        .set("have", state.get("have").push(action.pyload.tab.tab))
        .set(
          "data",
          state
            .get("data")
            .push({ url: action.pyload.tab.tab, data: action.pyload.data })
        );
    case CHEAP_GET_HOME_DATA:
      return state
        .set("cheapHave", state.get("cheapHave").push(action.pyload.tab.tab))
        .set(
          "cheap",
          state
            .get("cheap")
            .push({ url: action.pyload.tab.tab, data: action.pyload.data })
        );
    case RE_GET_HOME_DATA:
      return state
        .set(
          "reData",
          state
            .get("reData")
            .push({ data: action.pyload.data })
        );
    default:
      return state;
  }
};
