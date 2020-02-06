const code = require("koa-router")();
const axios = require("axios");
// 加载mongodb数据库
const model = require("../model/mongoose");
const Meituan = model.getNames("meituan");

// 这个是我个人的一个验证码平台,资金有限,如果大家使用尽量就是用来自己测试,不要随意使用,短信低于一定数量之后我会停掉这个接口
const PHONECODE = "80a1580da2040d43e6aa990d78a203d1";

/* params
   	将value替换成你发送的内容，
    如：content={"code":"测试0"}
    mobile 改为 发送的手机号
*/
code.get("/phone", async (ctx, next) => {
  const params = ctx.query;
  // 进行url编码转换
  const content = encodeURI(
    `你好,你的验证码是${params.code},欢迎你来到全栈练习项目美团,请在30分钟内完成验证`
  );
  const result = await axios.get(
    `http://api.sms.cn/sms/?ac=send&uid=sunhang&pwd=${PHONECODE}&mobile=${params.tel}&content=${content}`
  );
  ctx.cookies.set("code", params.code, {
    maxAge: 30 * 60 * 1000, // cookie有效时长
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: true // 是否允许重写
  });
  ctx.body = result.data;
});

code.get("/register", async (ctx, next) => {
  const params = ctx.query;
  if (ctx.cookies.get("code") === params.code) {
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
  }
});

module.exports = code.routes();
