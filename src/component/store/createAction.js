import axios from "axios";
import { GET_HOME_DATA } from "./bianLiang";

export const getHomeData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/ptapi/getScenesList?theme=quality&tab=${pytho}&ci=1&limit=12`
    });
    const arr = {
      type: GET_HOME_DATA,
      pyload: data.data
    };
    dispatch(arr)
  };
};
