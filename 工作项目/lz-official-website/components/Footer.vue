<template>
  <div class="footer-wrapper">
    <div class="container">
      <div class="content-top">
        <div class="column1">
          <img src="/images/foot-logo.png"
               alt=""
               class="footer-logo">
          <div class="barcode">
            <img src="/images/barcode.jpg"
                 alt="陆泽科技">
          </div>
        </div>
        <div class="column2">
          <ul>
            <li><a href="/solution/operate">全域数字资产</a></li>
            <li><a href="/product/cjwx">产品介绍</a></li>
            <li><a href="/brand/service">品牌服务</a></li>
            <li><a href="/college/businessCollege">鹿研院</a></li>
            <li><a href="/about/us">关于我们</a></li>
          </ul>
        </div>
        <div class="column3 ">
          <ul>
            <li class="contact-us">联系我们</li>
            <li><i class="icon icon-phone"></i>+86-411-84174867</li>
            <li class="email-message">
              <i class="icon icon-inbox"></i>
              <div>
                合作：<a href="mailto:marketing@lucidata.cn">marketing@lucidata.cn</a><br>招聘：<a href="mailto:hrhiring@lucidata.cn">hrhiring@lucidata.cn</a>
              </div>
            </li>
            <li class="company-city">
              <i class="icon icon-location"></i>
              <div>
                大连·沙河口区软件园东路2号C1座401<br>北京·通州区天通泰科技金融谷D座1202-04
                <br>上海·虹口区西江湾路388号2808
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="split-line"></div>
      <div class="row2">
        版权所有© 2021 陆泽科技有限公司
        <a href="https://beian.miit.gov.cn/"
           target="_blank">辽ICP备12003970号-1</a>已通过ISO27001信息安全管理体系认证
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  height: 468px;
  background-color: #2e3f52;
  padding-top: 78px;
  box-sizing: border-box;
  font-size: 16px;

  .container {
    max-width: 18rem;
    .content-top {
      display: flex;
      .column1 {
        width: 1.74rem;
        height: 2rem;
        margin-left: 2rem;
        margin-right: 3.35rem;
        .footer-logo {
          width: 1.38rem;
          height: 0.39rem;
          margin-bottom: 0.3rem;
        }
        .barcode {
          width: 150px;
          height: 150px;
          background: white;
          box-sizing: border-box;
          img {
            width: 100%;
          }
        }
      }
      .column2 {
        li {
          margin-bottom: 0.3rem;
          a {
            line-height: 1;
            font-size: 0.2rem;
            font-weight: normal;
            font-stretch: normal;
            color: $--color-white;
          }
        }
      }
      .column3 {
        margin-left: 2.55rem;
        li {
          margin-bottom: 0.33rem;
          color: #9ca7b6;
          line-height: 0.24rem;
        }
        .icon-phone {
          margin-right: 0.14rem;
        }
        .contact-us {
          color: #ffffff;
          font-size: 0.2rem;
        }
        .email-message {
          display: flex;
          i {
            margin-right: 0.14rem;
          }
        }
        .company-city {
          display: flex;
          i {
            margin-right: 0.14rem;
          }
        }
      }
    }
    .row2 {
      color: #9ca7b6;
      line-height: 70px;
      border-top: dashed 1px #657180;
      margin-left: 2rem;
    }
  }
}
</style>
