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

在axios里面这样

```js
const data = await axios({
    method: "get",
    url: `/ptapi/suggest?keyword=${this.state.key}`
});
```

设置之后需要重新启动项目才能生效

> 坑: 在package.json中设置proxy新版本只能设置字符串

## 历史记录完成,存储到localStroge

注意: 由于数据存储为数组,必须转为JSON才可以

1. 存储数据

```js
localStorage.setItem("meituan_search", JSON.stringify(arr));
```

2. 读取数据

```js
historyArr: JSON.parse(localStorage.getItem("meituan_search")) || []
```

坑: 由于点击历史记录不能继续存储,只有新点击的才能存储

## 错误页面路由搭建

使用switch让路由只选择一个,把错误页面的路由放在最后面即可

```js
<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/s/:content" component={Search}></Route>
    <Route path="*" component={Error} />
</Switch>
```

## 服务器做代理

```conf
# 美团项目
server {
    listen       3002;

    server_name  shtodream.cn;
    location / {
        root   html/meituan/build;
        index  index.html index.htm;
    }

    location /ptapi {
        proxy_pass https://www.meituan.com;
    }

    location /reptile {
        proxy_pass http://shtodream.cn:4000/;
    }

}
```

## 使用immutable数组

在reducer中,不引入redux,而是改为redux-immutable

```js
import { combineReducers } from 'redux-immutable';
```

在每个reducer中,数组全部使用fromJS()函数

```js
import { fromJS } from 'immutable';

const defaultData = fromJS({
    error_message: "错误信息:服务器找不到请求的网页"
})

export default ( state = defaultData, action ) =>{
    switch(action.type){
        default: 
            return state;
    }
}
```

immutable常用API

1. fromJS会把js对象转为Map,数组转为List
    * immutable.fromJS([1,2,3,4,5])    //将原生array  --> List
    * immutable.fromJS({name:'danny', age:18})   //将原生object  --> Map
2. toJS() 会把immutable转为js
3. var data1 = immutableData.get('a') //  data1 = 1  
4. var data2 = immutableData.getIn(['c', 'd']) // data2 = 3   getIn用于深层结构访问
5. var data3 = immutableData.set('a' , 2);   // data3中的 a = 2
6. var data4 = immutableData.setIn(['c', 'd'], 4);   //data4中的 d = 4
7. var data5 = immutableData.update('a',function(x){return x+4})   //data5中的 a = 5
8. var data6 = immutableData.updateIn(['c', 'd'],function(x){return x+4})   //data6中的 d = 7
9. var data7 = immutableData.delete('a')   //data7中的 a 不存在
10. var data8 = immutableData.deleteIn(['c', 'd'])   //data8中的 d 不存在
