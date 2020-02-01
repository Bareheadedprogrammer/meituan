import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import data from "../../config/footer.json";
import "./index.less";

class Footer extends PureComponent {
  render() {
    return (
      <Fragment>
        <footer className="com-footer">
          <div className="footer-content">
            <div className="footer-link clearfix">
              {data.data.map((item, index) => {
                return (
                  <div key={index} className="footer-column">
                    {item.dd.map((it, dex) => {
                      return (
                        <dl key={dex}>
                          <dt>{it.title}</dt>
                          {it.children&&it.children.map((i, d) => {
                            return (
                              <dd key={d}>
                                <Link to={i.url}>{i.title}</Link>
                              </dd>
                            );
                          })}
                        </dl>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </footer>
        <div id="footer">
          <address>
            <div className="copyright">
              Copyright&nbsp;&nbsp;©&nbsp;2019-2020{" "}
              <a
                href="http://shtodream.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                SH'S BLOG
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <img
                alt=""
                src="https://cdn.jsdelivr.net/gh/TRHX/CDN-for-itrhx.com@2.0.4/images/icp.png"
              />
              <a
                href="http://www.beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                冀ICP备19013084号-1
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <img
                alt=""
                src="https://cdn.jsdelivr.net/gh/TRHX/CDN-for-itrhx.com@2.0.9/images/12377.png"
              />
              <a
                href="http://www.12377.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                中国互联网违法和不良信息举报中心
              </a>
            </div>
            <div className="yule">
              搭建使用
              <a
                href="https://react.docschina.org/docs/getting-started.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 托管于
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 域名解析于
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://cloud.tencent.com/?fromSource=gwzcw.2212127.2212127.2212127&utm_medium=cpd&utm_id=gwzcw.2212127.2212127.2212127"
              >
                腾讯云服务器
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 仿照
              <a
                target="_blank"
                href="https://hrb.meituan.com/"
                rel="noopener noreferrer"
              >
                美团
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 支持996ICU
              <a
                target="_blank"
                href="https://996.icu/#/zh_CN"
                rel="noopener noreferrer"
              >
                996ICU
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 提交次数
              <a target="_blank" href="/" rel="noopener noreferrer">
                168
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 文字总数
              <a target="_blank" href="/" rel="noopener noreferrer">
                67.3k
              </a>
            </div>
            <div className="yule">
              推荐使用Chrome谷歌浏览器1920*1080分辨率&nbsp;&nbsp;|&nbsp;&nbsp;本网站搭建纯属个人爱好,很多样式并非本人所写,如果有问题随时可以留言给我,会在第一时间内即使处理&nbsp;&nbsp;|&nbsp;&nbsp;坚持自己选择计算机的道路!!!
            </div>
          </address>
        </div>
      </Fragment>
    );
  }
}

export default Footer;
