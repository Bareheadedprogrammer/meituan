<div align="center">
  
# react-美团

</div>

> **说明** <br/>
> 自己为何要去尝试写一个这么多页面的网页:100:,本人是纯粹的小白一枚,在各大论坛不停的刷着Vue,React,RN,微信小程序等方面的教程,虽然不停的学习,但是发现自己的技术并没有实质上的提高,就是不停的重复着同样的任务,每个地方都学到了一点,只要混合在一起,马上就全都不会了,:tada:所以第一次尝试使用最新的技术去制作一个大型网站---->至于为何选择了美团,主要是每次看的教程都是做**饿了么**,这次就打算做一个和饿了么类似的美团,数据的话用了美团官网的一部分API,自己写了一部分

[![Build Status](https://www.travis-ci.org/2662419405/meituan.svg?branch=master)](https://www.travis-ci.org/2662419405/meituan)

## 完成

- [x] 自动部署到服务器
- [x] 配置支持less
- [x] 二级表单使用json数据动态渲染
- [x] 使用http-proxy-middleware做中间代理调用美团官网 **报错主要是官网api不稳定**
- [x] 历史记录完成,存储到localStroge
- [x] 错误页面路由搭建
- [x] 服务器nginx做代理
- [x] 数据整理使用immutable管理
- [x] 使用正则解决美团图片加密
- [x] 自定义axios拦截器
- [x] 首页完成 :tada: 2020/2/3
- [x] react-redux的connect装饰器配置
- [x] 路由跳转之后没有返回顶部
- [x] 在react中使用百度地图API

> 为了方便以后自己学习,也方便看到的人更好的学习,我会把每一个步骤如何完成的方法写在里面 -> [文档](/STUDY.md)

## 计划

- [ ] 静态页面完成
- [ ] 使用爬虫爬取数据
- [ ] mongodb数据存储
- [ ] 登录
- [ ] 页面鉴权
- [ ] SSR
- [ ] 性能优化
- [ ] 骨架屏

## 使用

```js
git clone https://github.com/2662419405/meituan.git
cd meituan && npm install
```

> 如果npm安装不上可以试一下yarn

## 运行

```js
// 两个都需要一直挂在才可以,如果麻烦可以使用pm2
npm run server 
npm run start
```

默认启动在3001端口上

> 如果想要build之后可以访问,需要加上代理,推荐使用nginx,

```conf
# 美团项目
server {
    listen       3000; // 这里面改成自己服务器端口即可

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

    location /meishi {
            proxy_pass https://www.meituan.com;
    }

}
```
