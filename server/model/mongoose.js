const mongoose = require("mongoose");

//数据库的地址
const DB_URL = "mongodb://localhost:27017/meituan";
mongoose.connect(DB_URL);

const models = {
  meituan: {
    // 注册时间
    createTime: { type: String, require: true },
    // 手机号
    phone: { type: String, require: true },
    // 密码
    password: { type: String, require: true },
    // 性别
    sex: { type: String },
    // 昵称
    name: { type: String },
    // 地区
    address: { type: String },
    // 密码的盐
    salt: { type: String, require: true },
    // 第一次注册密码是否被修改
    firstPas: { type: Boolean },
    // 美团会员等级
    level: { type: Number },
    // 收藏列表
    collections: { type: Array },
    // 抵用券列表
    quans: { type: Array },
    // 抽奖券
    chous: { type: Array },
  },
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getNames: function(name) {
    return mongoose.model(name);
  }
};
