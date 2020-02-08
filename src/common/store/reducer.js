import { fromJS } from "immutable";
import {
  GET_PHONE_VALUE,
  USER_INFO,
  REGISTER_INFO,
  CHECK_CODE,
  CLEAR_EVERY
} from "./constant";

const defaultData = fromJS({
  isLogin: localStorage.getItem("isLogin") === "false" || localStorage.getItem("isLogin") === null ? false : true,
  city: "哈尔滨",
  message: "",
  code: "",
  userinfo: localStorage.getItem("userinfo") || null,
  re: false,
  yan: false
});

export default (state = defaultData, action) => {
  switch (action.type) {
    case GET_PHONE_VALUE:
      return state.set("code", action.pyload.data);
    case USER_INFO:
      if (action.pyload.code !== "1") {
        return state;
      } else {
        localStorage.setItem("meituanToken", action.pyload.token); // 存储token,以后每次发出请求都要验证
        localStorage.setItem("isLogin", true);
        localStorage.setItem(
          "userinfo",
          JSON.stringify(action.pyload.userinfo)
        );
        return state
          .set("isLogin", true)
          .set("userinfo", action.pyload.userinfo);
      }
    case REGISTER_INFO:
      return state.set("re", action.pyload);
    case CHECK_CODE:
      if (action.pyload.code === 1) {
        return state.set("yan", true);
      } else {
        return state.set("yan", false);
      }
    case CLEAR_EVERY:
      localStorage.setItem("isLogin", false);
      localStorage.setItem("userinfo", {});
      localStorage.setItem("meituanToken", "");
      return state.set("isLogin", false).set("userinfo", {});
    default:
      return state;
  }
};
