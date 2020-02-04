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
export const imgReturn = data => {
  const prev = "http://p0.meituan.net/";
  const next = "@460w_260h_1e_1c";
  data.data.forEach(v => {
    // eslint-disable-next-line no-useless-escape
    let bbb = v.imgUrl.replace(/.*\/([^\/]+\/[^\/]+)$/, "$1");
    // eslint-disable-next-line no-useless-escape
    const tu = bbb.replace(/(.*\.[png|jpg]{3}).*/, "$1");
    v.imgUrl = prev + tu + next;
    v.iUrl = v.iUrl && v.iUrl.substr(17);
  });
  return data;
};

export const getFilmDatas = (data, pytho) => {
  const prev = "http://p1.meituan.net/";
  const next = "@267w_371h_1e_1c"; //电影后缀必须使用这个
  let flag = "hot";
  if (pytho === "getComingFilms") {
    flag = "coming";
  }
  data[flag].forEach(v => {
    // eslint-disable-next-line no-useless-escape
    var bbb = v.img.replace(/.*\/([^\/]+\/[^\/]+)$/, "$1");
    const tu = bbb.replace(/(.*\.[png|jpg]{3}).*/, "$1");
    v.img = prev + tu + next;
  });
  return data;
};
