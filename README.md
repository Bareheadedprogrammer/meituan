# react-美团

> 基于React学习和制作一个美团官网

## 完成

- [x] 自动部署到服务器
- [x] 配置支持less
- [x] 二级表单使用json数据动态渲染
- [x] 使用http-proxy-middleware做中间代理调用美团官网 **报错主要是官网api不稳定**
- [x] 历史记录完成,存储到localStroge
- [x] 错误页面路由搭建

> 为了方便以后自己学习,也方便看到的人更好的学习,我会每一个完成的目标写在 -> [文档](/STUDY.md) 里

## 计划

- [ ] 静态页面完成
- [ ] 使用爬虫爬取数据
- [ ] mongodb数据存储
- [ ] 登录
- [ ] 页面鉴权
- [ ] SSR
- [ ] 性能优化

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
