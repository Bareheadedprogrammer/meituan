const code = require("koa-router")();
const axios = require("axios");
const jwt = require("jsonwebtoken");
// 加载mongodb数据库
const model = require("../model/mongoose");
const Meituan = model.getNames("meituan");
// 密码加盐
const hashCode = require("../utils/hashCode");
// 这个是我个人的一个验证码平台,资金有限,如果大家使用尽量就是用来自己测试,不要随意使用,短信低于一定数量之后我会停掉这个接口
const PHONECODE = "80a1580da2040d43e6aa990d78a203d1";

/* params
   	将value替换成你发送的内容，
    如：content={"code":"测试0"}
    mobile 改为 发送的手机号
*/
// 获取验证码
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

// 用来注册
code.get("/register", async (ctx, next) => {
  const params = ctx.query;
  if (params.gai == 1) {
    let result = {};
    // 改密码
    console.log(params.phone);
    const obj = await Meituan.findOne({ phone: params.phone });
    // 获取盐
    const salt = obj.salt;
    const newPassword = hashCode(params.password, salt);
    console.log(params.phone);
    const a = await Meituan.updateOne(
      { phone: params.phone },
      { $set: { password: newPassword.passwordHash } }
    );
    console.log(a);
    obj.password = ""; //保护密码不背查看到
    obj.salt = "";
    result.userinfo = obj;
    result.code = "1";
    // 生成加密token
    const token = jwt.sign(
      {
        name: obj.name,
        _id: obj._id
      },
      "sh",
      { expiresIn: "2h" }
    );
    result.token = token;
    ctx.body = JSON.stringify(result);
  } else {
    if (ctx.cookies.get("code") === params.code) {
      // 操作数据库
      const createTime = new Date().getTime();
      const newPassword = hashCode(params.password);
      const userModel = new Meituan({
        createTime,
        password: newPassword.passwordHash,
        phone: params.phone,
        name: params.phone,
        salt: newPassword.salt
      });
      let result = {};
      try {
        let obj = await userModel.save();
        obj.password = ""; //保护密码不背查看到
        obj.salt = "";
        result.userinfo = obj;
        result.code = "1";
        // 生成加密token
        const token = jwt.sign(
          {
            name: obj.name,
            _id: obj._id
          },
          "sh",
          { expiresIn: "2h" }
        );
        result.token = token;
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
  }
});

// 判断手机号是否被注册过
code.get("/re", async ctx => {
  const params = ctx.query;
  const obj = await Meituan.findOne({ phone: params.phone });
  if (obj) {
    ctx.body = true;
  } else {
    ctx.body = false;
  }
});

// 判断验证码是否正确
code.get("/yan", async ctx => {
  const params = ctx.query;
  let result = {};
  if (ctx.cookies.get("code") === params.code) {
    result = { code: 1, message: "验证码正确" };
  } else {
    result = { code: 2, message: "验证码错误" };
  }
  ctx.body = JSON.stringify(result);
});

// 进行登录
code.post("/login", async ctx => {
  let postData = ctx.request.body;
  const obj = await Meituan.findOne({ phone: postData.phone });
  let result = {};
  if (obj) {
    const data = await Meituan.findOne({ _id: obj._id });
    const salt = data.salt;
    const newMiMa = hashCode(postData.password, salt);
    if (newMiMa.passwordHash === data.password) {
      data.password = ""; //保护密码不背查看到
      data.salt = "";
      result.userinfo = data;
      result.code = "1";
      // 生成加密token
      const token = jwt.sign(
        {
          name: data.name,
          _id: data._id
        },
        "sh",
        { expiresIn: "2h" }
      );
      result.token = token;
    } else {
      result = {
        code: 2,
        message: "密码不正确"
      };
    }
  } else {
    result = {
      code: 2,
      message: "手机号不存在"
    };
  }
  ctx.body = JSON.stringify(result);
});

module.exports = code.routes();
