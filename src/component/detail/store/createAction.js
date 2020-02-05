import axios from "axios";
import {
  GET_DATA,
  CATE_DATA,
  JIU_CATE_DATA
} from "./constant";

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

async function getJiuData(pytho) {
  const data = await axios({
    method: "get",
    url: `/group/v1/poi/${pytho}/imgs?utm_medium=touch&version_name=999.9&classified=true&X-FOR-WITH=H5dK4Iyf8eGZ7CaQQ3hNU2l2xBJoa1UR6luGuzChoqyme57uXebvtkIQPkPoXawAKaWZUTRbBuxHeCffH%2FYdW6tzmdhEJ6v3jwWNMDwopT9QA%2FWnY3CD5Hv2xJtit%2FHgmOr6Ky7TIlH2gvP2BJ40nbpYuD1%2BxYxcd29hqPCf%2Ba5bAdYanI%2B27a%2BTITHKzOeNNFYjDG6R1ENXuqT4RGwGWaZ2lLCRlYCoW6ysmezLOI8%3D`
  });
  return data;
}

async function getJiuDataTwo(pytho) {
  const data = await axios({
    method: "get",
    url: `/detailapi/api/around/info?poiCategory=6&poiid=${pytho}&cityId=1&X-FOR-WITH=IzAdLjVbMomynQo%2BgebFzSXJ4yHkvTx3D8vKsHVbt8w37ATlg6iYMjZQhmu6Ul%2B9oujh0JqdEH5o2PWD3iWw9%2BVLD5mLxJccNKVmcvFS5FRSCsKh4OG%2BOdnYDssI%2BBOcKyw%2Bn2caQM0oRESLsZOUvzVktobS0E3j536RXtwjEDXp98dXAKvSziFJpXKK5n6g0djgl%2BJ%2B7nMuojcaLi7ndw%3D%3D`
  });
  return data;
}

//获取酒店数据
export const getJiuCateData = pytho => {
  return async dispatch => {
    const obj = {};
    obj.list = await getJiuData(pytho);
    obj.data = await getJiuDataTwo(pytho);
    const arr = {
      type: JIU_CATE_DATA,
      pyload: obj
    };
    dispatch(arr);
  };
};
