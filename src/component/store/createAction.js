import axios from "axios";
import { GET_HOME_DATA } from "./bianLiang";
import imgReturn from '../../utils/imgReturn';

export const getHomeData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/ptapi/getScenesList?theme=quality&tab=${pytho}&ci=1&limit=12`
    });
    const myData = imgReturn(data.data)
    const arr = {
      type: GET_HOME_DATA,
      pyload: myData
    };
    dispatch(arr)
  };
};
