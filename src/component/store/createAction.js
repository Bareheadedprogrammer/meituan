import axios from "axios";
import { GET_HOME_DATA, CHEAP_GET_HOME_DATA, RE_GET_HOME_DATA } from "./bianLiang";
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

export const getCheapHomeData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/ptapi/getScenesList?theme=cheap&tab=${pytho}&ci=1&limit=20`
    });
    const myData = imgReturn(data.data)
    const arr = {
      type: CHEAP_GET_HOME_DATA,
      pyload: myData
    };
    dispatch(arr)
  };
};

export const getReData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/ptapi/recommends`
    });
    const myData = imgReturn(data)
    const arr = {
      type: RE_GET_HOME_DATA,
      pyload: myData
    };
    dispatch(arr)
  };
};

