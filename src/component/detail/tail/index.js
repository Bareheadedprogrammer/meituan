import React, { PureComponent } from "react";

export default class index extends PureComponent {
  render() {
    return (
      <div className="details clear">
        <div className="d-left">
          <div className="name">
            <span>
              <b></b>
              食品安全档案
            </span>
            CAKE BOSS 蛋糕老板（崇文门国瑞城店）
          </div>
          <div className="score clear">
            <div className="star-cont">
              <ul className="stars-ul">
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
              </ul>
              <ul className="stars-ul stars-light">
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
                <li>
                  <i className="iconfont icon-star_full"></i>
                </li>
              </ul>
            </div>
            <p>4.4分人均￥196</p>
          </div>
          <div className="address">
            <p>地址: 东城区崇文门国瑞购物中心LG层中岛-27号（电梯旁边）</p>
            <p>电话：13161756671</p>
            <p>营业时间：周一至周日 10:00-22:00</p>
            <p>技术有限,数据抓取的不全面</p>
          </div>
          <ul className="tags clear">
            <li>
              <img
                src="https://p0.meituan.net/codeman/551290739062eda37e52999e2315f50c1887.png"
                alt="wifi"
              />
              提供wifi
            </li>
          </ul>
        </div>
        <div className="d-right">
          <div className="big">
            <div className="imgbox">
              <img
                src="https://p0.meituan.net/bbia/da8d5295207d1fd0b32d2b06e99bb73d162795.jpg@380w_214h_1e_1c"
                alt="图"
              />
            </div>
          </div>
          <ul>
            <li>
              <div className="imgbox">
                <img
                  src="https://p1.meituan.net/msmerchant/e71c056bf73e76d9d955ee74b8c765a7437856.jpg@92w_50h_1e_1c"
                  alt="图"
                />
              </div>
            </li>
            <li>
              <div className="imgbox">
                <img
                  src="https://p0.meituan.net/msmerchant/8dffcbafc01180f4a4dedce449ec7c4a671220.jpg@92w_50h_1e_1c"
                  alt="图"
                />
              </div>
            </li>
            <li>
              <div className="imgbox">
                <img
                  src="https://img.meituan.net/msmerchant/51773475a9b8a536a223945966bffabc334370.jpg@92w_50h_1e_1c"
                  alt="图"
                />
              </div>
            </li>
            <li>
              <div className="imgbox">
                <img
                  src="https://p0.meituan.net/dpmerchantalbum/78382692794c845e4a3b0b35714a05e71229547.jpg@92w_50h_1e_1c"
                  alt="图"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
