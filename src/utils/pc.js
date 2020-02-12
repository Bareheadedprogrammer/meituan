export default function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  
  const fang = window.localStorage.getItem('meituanAn');
  
  console.log(fang);
  if (fang === '1') {
    // 手机端
    window.location.href = 'http://react.shtodream.cn/';
  } else if (fang === '2') {
    // 电脑端
    window.location.href = 'http://mt.shtodream.cn/';
  } else {
    // 没有本地缓存
    const flag = IsPC();
    if (flag) {
      window.localStorage.setItem('meituanAn', 2);
      window.location.href = 'http://mt.shtodream.cn/';
    } else {
      window.localStorage.setItem('meituanAn', 1);
      window.location.href = 'http://react.shtodream.cn/';
    }
  }
  