import { fromJS } from "immutable";
import { GET_HOME_DATA } from "./bianLiang";
const defaultState = fromJS({
  data: [],
  have: []
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
    default:
      return state;
  }
};
