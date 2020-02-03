import axios from "axios";
import {
  GET_HOME_DATA,
  CHEAP_GET_HOME_DATA,
  RE_GET_HOME_DATA,
  FILM_GET_HOME_DATA
} from "./bianLiang";
import { imgReturn, getFilmDatas } from "../../utils/imgReturn";

// 获取quality的数据
export const getHomeData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/ptapi/getScenesList?theme=quality&tab=${pytho}&ci=1&limit=12`
    });
    const myData = imgReturn(data.data);
    const arr = {
      type: GET_HOME_DATA,
      pyload: myData
    };
    dispatch(arr);
  };
};

// 获取cheap的数据
export const getCheapHomeData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/ptapi/getScenesList?theme=cheap&tab=${pytho}&ci=1&limit=20`
    });
    const myData = imgReturn(data.data);
    const arr = {
      type: CHEAP_GET_HOME_DATA,
      pyload: myData
    };
    dispatch(arr);
  };
};

// 获取recommends的数据
export const getReData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/ptapi/recommends`
    });
    const myData = imgReturn(data);
    const arr = {
      type: RE_GET_HOME_DATA,
      pyload: myData
    };
    dispatch(arr);
  };
};

// 处理电影数据
export const getFilmData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `ptapi/${pytho}?ci=1&limit=10`
    });
    const myData = getFilmDatas(data.data.data,pytho);
    myData.tab = pytho;
    const arr = {
      type: FILM_GET_HOME_DATA,
      pyload: myData
    };
    dispatch(arr);
  };
};
