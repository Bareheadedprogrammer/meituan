import { fromJS } from "immutable";
import { GET_PHONE_VALUE, USER_INFO, REGISTER_INFO } from "./constant";

const defaultData = fromJS({
  isLogin: false,
  city: "哈尔滨",
  message: "",
  code: "",
  userinfo: null,
  re: false
});

export default (state = defaultData, action) => {
  switch (action.type) {
    case GET_PHONE_VALUE:
      return state.set("code", action.pyload.data);
    case USER_INFO:
      if (action.pyload.code !== "1") {
        return state;
      } else {
        return state
          .set("isLogin", true)
          .set("userinfo", action.pyload.userinfo);
      }
    case REGISTER_INFO:
      return state.set("re", action.pyload);
    default:
      return state;
  }
};
