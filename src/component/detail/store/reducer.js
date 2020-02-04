import { fromJS } from "immutable";
import { GET_DATA } from "./constant";
const defaultState = fromJS({
  tags: [],
  comments: [],
  total: 0
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_DATA:
      return state
        .set("tags", action.pyload.tags)
        .set("comments", action.pyload.comments)
        .set("total", action.pyload.total);
    default:
      return state;
  }
};
