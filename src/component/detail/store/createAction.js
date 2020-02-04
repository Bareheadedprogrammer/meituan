import axios from "axios";
import { GET_DATA, CATE_DATA } from "./constant";

// 获取quality的数据
export const getMeiShi = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/meishi/api/poi/getMerchantComment?uuid=090c9d40dc8d46dca69c.1580619143.1.0.0&platform=1&partner=126&originUrl=https%3A%2F%2Fwww.meituan.com%2Fmeishi%2F40353086%2F&riskLevel=1&optimusCode=10&id=${pytho}&userId=&offset=0&pageSize=10&sortType=1`
    });
    const arr = {
      type: GET_DATA,
      pyload: data.data.data
    };
    dispatch(arr);
  };
};

export const getCateData = pytho => {
  return async dispatch => {
    const data = await axios({
      method: "get",
      url: `/ptapi/poi/getcomment?id=${pytho}&offset=0&pageSize=10&mode=0&sortType=1`
    });
    const arr = {
      type: CATE_DATA,
      pyload: data.data
    };
    dispatch(arr);
  };
};
