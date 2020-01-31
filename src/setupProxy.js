const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/ptapi", {
      target: "https://www.meituan.com", //跨域地址
      changeOrigin: true
    })
  );
};
