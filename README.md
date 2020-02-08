<div align="center">
  
# react-美团(React+Mongoose+koa2)

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
- [x] 找回密码,基本页面全部完成,接下来就是性能优化 :rainbow: 2020/2/8

> 为了方便以后自己学习,也方便看到的人更好的学习,我会把每一个步骤如何完成的方法写在里面 -> [文档](/STUDY.md)

## 计划

- [ ] 使用爬虫爬取数据
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

> 需要本地有mongoose和node

```js
// 两个都需要一直挂在才可以,如果麻烦可以使用pm2
npm run start
npm run server 
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

*=============分割线  下面是每个包的详细解释===============*

* 包展示

![图片](https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/meituan.png)

* 目录结构

```js
    // 项目结构
    ├─build                                   // 打包生成的文件结构
	├─config                                  // webpack配置文件
	├─public                                  // 默认渲染的模板
    ├─server  								  // 后台
    │  ├─model          					  // 数据库原型     
    │  ├─router          				  	  // 路由
	│  ├─utils          				 	  // 常用函数编写
	│  ├─config                               // 修改端口设置
	│  ├─index                                // 后台入口文件
	├─src                                     // 前台
    │  ├─app                                  // 首页容器组件
    │  ├─router                               // 路由配置
    │  ├─setupProxy                           // 代理配置
	│  ├─ScrollToTop                          // 路由返回顶部组件
	│  ├─interceptor                          // axios请求拦截
	│  ├─index                                // 入口文件
    │  ├─config                               // 默认的json数据
    │  │  ├─banner.json
	│  │  ├─banner-left.json
	│  │  ├─film.json
	│  │  ├─footer.json
	│  │  ├─footer-nav.json
	│  │  ├─header-title.json
	│  │  ├─header-right.json
	│  │  ├─offer.json
	│  │  ├─secenes.json
	│  │  ├─recommend.json
    │  ├─static                               // 静态文件
    │  │  ├─logo
	│  │  ├─img
    │  ├─utils                                // 工具函数
    │  │  ├─code                              // 生成随机验证码
	│  │  ├─imgReturn                         // 正则解决美团图片加密
	│  │  ├─dataChuli                         // 时间转换格式
    │  ├─store                                // store
    │  │  ├─reducer                           // 合并多个reducer文件
	│  │  ├─store                             // store入口文件
    │  ├─component                            // 全局组件
    │  │  ├─404
    │  │  ├─banner
    │  │  ├─Films
    │  │  ├─Home
    │  │  ├─left-banner
    │  │  ├─offer
    │  │  ├─recommend
    │  │  ├─right-banner
    │  │  ├─search
    │  │  ├─scenes
    │  │  ├─store
	│  │  ├─detail                            // 二级路由 包括 美食 酒店 旅游 等
	│  │  │  ├─jiudian
	│  │  │  ├─cate
	│  │  │  ├─jiudian
	│  │  │  ├─meishi
	│  │  │  ├─right
	│  │  │  ├─store
	│  │  │  ├─tail
    │  ├─component                            // 公共组件
    │  │  ├─footer
    │  │  ├─header
    │  │  ├─Login
    │  │  ├─Rigister
    │  │  ├─store
    │  │  ├─zhao
	├─.travis.yml							   // 可持续集成
	├─STUDY.md						           // 每一个完成任务的步骤
```

如果还有bug和建议,欢迎告诉我  (͏ ˉ ꈊ ˉ)✧˖°

![sh](https://studyit.club/Study/qq.jpg)

>  页面只是做了几个比较有代表性的,很多页面没有做,其实就是为了踩坑和学习,做别的页面感觉只是在复制粘贴,没有任何可以吸收的东西,则没有继续做下去,主要还是针对于移动端和APP开发
> 
> 感觉支持  喜欢的朋友记得给个star  