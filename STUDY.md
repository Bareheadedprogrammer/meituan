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

## 使用正则解决美团图片加密

在每次派发action之后,我们对图片进行处理,再给reducer

```js
// 解密美团图片
/* 
加密后 
1. http://p0.meituan.net/dpmerchantpic/894a230555aedd63c423a454b48e5842180576.jpg%40240w_180h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D2%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20@460w_260h_1e_1c
2. https://img.meituan.net/w.h/msmerchant/3ef69a0c07ea97d666dccdd68f0c0abb485331.jpg
 
正常的
http://p0.meituan.net/dpmerchantpic/894a230555aedd63c423a454b48e5842180576.jpg%40240w_180h_1e_1c
分析 加密分了很多种,那么我们的思路是分为三步
1. 匹配倒数第二个字符串后面的内容
2. 继续匹配以.jpg或者.png前面的内容
3. http://p0.meituan.net/ + 我们得到的字符串 + @460w_260h_1e_1c
*/
export default function(data) {
  const prev = "http://p0.meituan.net/";
  const next = "@460w_260h_1e_1c";
  data.data.forEach(v => {
    var bbb = v.imgUrl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1');
    const tu = bbb.replace(/(.*\.[png|jpg]{3}).*/,"$1");
    v.imgUrl = prev + tu + next
  });
  return data;
}
```

## 自定义axios拦截器

在src下面创建interceptor

```js
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
```

在每次发出和接受请求之前都可以做一些事情,这里面我使用了antd-mobile的Toast

> 注意: 如果想要某些请求不被拦截,可以先在interceptor中判断,再return

最后在index.js中引入即可

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import "./interceptor.js";
import App from './route';

ReactDOM.render(<App />, document.getElementById('root'));
```

## react-redux的connect装饰器配置

1. `npm install -D @babel/plugin-proposal-decorators`

2. 配置.babelrc 文件或package.json文件的 babel 字段值（两者二选一，不要都配置，否者会报找到两个配置文件的错

（1）配置 .babelrc 文件

```js
 "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ]
```

（2）配置 package.json 文件的 babel 字段值

```js
babel: {
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ]
}
```

## 路由跳转之后没有返回页面顶部

在src下面创建`ScrollToTop.js` 组件

```js
import React from "react";
import { withRouter } from "react-router-dom";

@withRouter
class ScrollToTop extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}
export default ScrollToTop;
```

在router.js中引入并且使用

```js
<ScrollToTop>
    <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/s/:content" component={Search}></Route>
            <Route path="/meishi/:id" component={Meishi}></Route>
            <Route path="/cate/:id" component={Cate}></Route>
            <Route path="/jiudian/:id" component={Jiudian}></Route>
            <Route path="*" component={Error} />
        </Switch>
    <FooterNav />
    <Footer />
</ScrollToTop>
```

## 在react中使用百度地图API

1. 在public下面的index.html中追加

```js
<script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
```

2. 在react中使用的时候需要注意**BMap等前面必须添加window**

```js
componentDidMount() {
  var map = new window.BMap.Map('address'); 
  var point = new window.BMap.Point(116.404, 39.915);
  map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 10);
  var marker = new window.BMap.Marker(point);  // 创建标注
  map.addControl(new window.BMap.MapTypeControl()); 
  map.setCurrentCity("北京"); 
  map.enableScrollWheelZoom();
  map.addOverlay(marker);               // 将标注添加到地图中
  marker.setAnimation(window.BMAP_ANIMATION_BOUNCE); //跳动的动画
  var label = new window.BMap.Label("欢迎前来入住",{offset:new window.BMap.Size(20,-10)});
  marker.setLabel(label)
}
```

## koa-cookie,koa-router

本项目中把路由进行了抽离

```js
const router = require("koa-router")();
// 加载爬虫路由
router.use('/server/reptile',require("./router/reptile.js")); 
// 注册登录路由加载
router.use('/server/code',require("./router/code.js"));

// 加载所有路由
app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
```

## mongoose操作数据库

独立创建一个model文件,把每个数据库的模型存储在里面,对外暴露一个方法,这个方法用来获取`Schema`

在操作的时候
  
1. 导入模型
2. 通过对外暴露的函数得到Schema
3. new 实例化
4. 调用mongoose的方法即可

```js
// 加载mongodb数据库
const model = require("../model/mongoose");
const Meituan = model.getNames("meituan");
// 操作数据库
const createTime = new Date().getTime(); 
const userModel = new Meituan({
  createTime,
    password: params.password,
    phone: params.phone,
    name: params.phone
  });
let result = {};
try {
  let obj = await userModel.save();
  obj.password = ""; //保护密码不背查看到
  result.userinfo = obj;
  result.code = "1";
} catch (err) {
  result = { code: "2", message: "服务器发生了错误" };
}
   ctx.body = JSON.stringify(result);
} else {
 ctx.body = JSON.stringify({
  code: "3",
  message: "验证码填写错误,请重新查看或者重新获取"
});
```

> 需要注意的是他的操作方法都是异步的,最好使用async/await

## 密码加盐

1. 编写函数

```js
var crypto = require("crypto");
// 生成salt盐
var genRandomString = function(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};
/**
 * 加密函数
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  var value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value
  };
};

// 生成加密字符串
module.exports = function saltHashPassword(userpassword, salt = genRandomString(16)) {
  var passwordData = sha512(userpassword, salt);
  return passwordData;
};
```

2. 把获取的密码调用saltHashPassword这个函数

```js
saltHashPassword(123) => 就会获得密码和盐
```

3. 盐需要存储在数据库中,下一次登录的时候,要获取这个盐

## jwt鉴权

在koa中,需要用到两个中间件

1. 当注册或者登录的时候,服务器生成token

```js
const jwt = require("jsonwebtoken");
const token = jwt.sign(
  {
    name: obj.name,
    _id: obj._id
  },
  "sh",
  { expiresIn: "2h" }
);
// 并且把token返回给客户端
```

2. 在前端获取到token

```js
localStorage.setItem("meituanToken", action.pyload.token); // 存储token,以后每次发出请求都要验证
```

3. 每次发出请求之前携带token

```js
const token = localStorage.getItem('meituanToken');
config.headers.common['Authorization'] = 'Bearer ' + token;
```

4. 服务器验证token

```js
const koa = require('koa');
const koajwt = require('koa-jwt');
const app = new koa();

app.use(koajwt({
 secret: 'zhangnan'
}).unless({
  path: [/\/register/, /\/login/]
}));
```