import axios from "axios";
import { Toast } from "antd-mobile";
// const codeMessage = {
//   202: "一个请求已经进入后台排队（异步任务）。",
//   401: "用户没有权限（令牌、用户名、密码错误）。",
//   404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
//   500: "服务器发生错误，请检查服务器。"
// };

//拦截请求
axios.interceptors.request.use(function(config) {
  const searchReg = /^ptapi/;
  //  不拦截搜索内容
  if (searchReg.test(config.url)) {
    Toast.loading("加载中", 0);
  }
  return config;
});

//拦截响应
axios.interceptors.response.use(function(config) {
  Toast.hide();
  return config;
});
