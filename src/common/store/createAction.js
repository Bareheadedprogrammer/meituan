import { GET_PHONE_VALUE, USER_INFO, REGISTER_INFO } from "./constant";
import { getCode } from "../../utils/code";
import { message } from "antd";
import axios from "axios";

export const getPhoneValue = phone => {
  return async dispatch => {
    const code = getCode(6);
    const data = await axios.get(
      `/server/code/phone?tel=${phone}&code=${code}`
    );
    const arr = {
      type: GET_PHONE_VALUE,
      pyload: data
    };
    if (data.data.stat === "100") {
      message.success(data.data.message);
    } else {
      message.error(data.data.message);
    }
    dispatch(arr);
  };
};

export const getUserInfo = obj => {
  return async dispatch => {
    const data = await axios.get(
      `/server/code/register?phone=${obj.tel}&password=${obj.password}&code=${obj.code}`
    );
    const arr = {
      type: USER_INFO,
      pyload: data.data
    };
    if (data.data.code !== "1") {
      message.error(data.data.message);
    }
    dispatch(arr);
  };
};

export const getPhoneRe = phone => {
  return async dispatch => {
    const data = await axios.get(`/server/code/re?phone=${phone}`);
    const arr = {
      type: REGISTER_INFO,
      pyload: data.data
    };
    dispatch(arr);
  };
};

// 登录设置
export const userLoginClick = Values => {
  return async dispatch => {
    const data = await axios({
      method: "post",
      url: "/server/code/login",
      data: {
        phone: Values.tel,
        password: Values.password
      }
    });
    if (data.data.code !== "1") {
      message.error(data.data.message);
    }
    const arr = {
      type: USER_INFO,
      pyload: data.data
    };
    dispatch(arr);
  };
};
