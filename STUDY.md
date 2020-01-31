# 学习文档

## 自动部署到服务器

使用webhooks

1. 先去项目的setting中选择webhooks,然后添加一个新的  设置的path和secert和服务端保持一致

2. 去服务器上使用pm2挂载这个node程序,然后当每次push的时候,都会执行这个node程序,让他执行`deploy.sh`这个shell脚本即可

```js
var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/meituan', secret: 'xxx' })
// 上面的 secret 保持和 GitHub 后台设置的一致

function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function () { callback(resp) });
}

http.createServer(function (req, res) {

    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(5001,() =>{
    console.log('WebHooks Listern at 5001');
})

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
        // 分支判断
        if(event.payload.ref === 'refs/heads/master'){
            console.log('deploy master..')
            run_cmd('sh', ['./deploy.sh'], function(text){ console.log(text) });
        }
})
```

## 配置支持less

1. 先要去暴露配置`npm run eject`

2. 安装loader`npm install --save-dev less-loader less`

3. 在webpack.config.js中设置

```js
module: {
    rules: [{
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
    }]
}
```

> 其实react本身就支持node-sass,只要安装就能运行

## 二级表单使用json数据动态渲染

这个就不多说了 使用map遍历 注意jsx别使用if表达式

1. 使用管道符 `xxxx && yy`

2. 使用三目运算符`true?x:y` 

> 具体可以看`src/common/header/header-right`

## 使用http-proxy-middleware

在src下面创建`setupProxy.js`

```js
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/ptapi", {
      target: "https://www.meituan.com", //跨域地址
      changeOrigin: true
    })
  );
};
```

设置之后需要重新启动项目才能生效

> 坑: 在package.json中设置proxy新版本只能设置字符串

