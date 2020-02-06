const config = require("./config");
const Koa = require("koa");
const router = require("koa-router")();
const app = new Koa();

// 加载爬虫路由
router.use('/reptile/reptile',require("./router/reptile.js")); 
// 注册登录路由加载
router.use('/reptile/code',require("./router/code.js"));

// 加载所有路由
app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

app.listen(config.port, () => {
  console.log(`服务器运行在${config.port}端口上`);
});
