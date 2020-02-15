const mongoose = require("mongoose");

//数据库的地址
const DB_URL = "mongodb://localhost:27017/meituanPC";
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
    salt: { type: String, require: true }
  }
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getNames: function(name) {
    return mongoose.model(name);
  }
};
