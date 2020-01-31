const config = require('config');
const Koa = require('koa');
const koaRouter = require('koa-router');
const app = new Koa();



app.listen(config.port,()=>{
    console.log(`服务器运行在${config.port}端口上`)
})