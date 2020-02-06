const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/ptapi", {
      target: "https://www.meituan.com", //搜索跨域
      changeOrigin: true
    })
  );
  app.use(
    proxy("/server", {
      target: "http://localhost:4000/", // 后台数据请求
      changeOrigin: true
    })
  );
  app.use(
    proxy("/code", {
      target: "http://localhost:4000/", //爬虫跨域
      changeOrigin: true
    })
  );
  app.use(
    proxy("/meishi", {
      target: "https://www.meituan.com", //美食跨域
      changeOrigin: true
    })
  );
  app.use(
    proxy("/group", {
      target: "https://ihotel.meituan.com", //酒店代理
      changeOrigin: true
    })
  );
  app.use(
    proxy("/detailapi", {
      target: "https://ihotel.meituan.com", //酒店代理
      changeOrigin: true
    })
  );
};
