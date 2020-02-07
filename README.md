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
- [x] koa-cookie,koa-router等koa2的基本使用
- [x] mongoose操作数据库
- [x] 页面注册,验证码发送,密码加盐
- [x] 页面登录,jwt鉴权
- [x] 找回密码,基本页面全部完成 :rainbow: 接下来就是性能优化

> 为了方便以后自己学习,也方便看到的人更好的学习,我会把每一个步骤如何完成的方法写在里面 -> [文档](/STUDY.md)

## 计划

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
npm run start
npm run server // 需要本地有mongodb数据库,并且已经启动即可
```

默认启动在3001端口上

> 如果想要build之后可以访问,需要加上代理,推荐使用nginx,

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

	location /meishi {
			proxy_pass https://www.meituan.com;
	}

	location /group {
			proxy_pass https://ihotel.meituan.com;
	}

	location /detailapi {
			proxy_pass https://ihotel.meituan.com;
	}

	location /server {
			proxy_pass http://localhost:4000;
	}

}
```
