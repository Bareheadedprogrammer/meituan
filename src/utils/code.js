// 生成随机验证码,num代表生成的位数
export const getCode = num => {
  let code = "";
  for (let i = 0; i < num; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};
