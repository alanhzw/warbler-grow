<template lang="">
  <wrapper class="footer-wrapper">
    <div class="footer-content">
      <div class="left">
        <img src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/ims_logo.png">
        <div class="contact-item">
          <img class="position" src="@/assets/icon-position.png">
          <div>
            <p>北京天下秀科技股份有限公司</p>
            <p style="margin-top: 10px;">北京市朝阳区三里屯西五街5号院</p>
          </div>
        </div>
        <div class="contact-item">
          <img class="phone" src="@/assets/icon-phone.png">
          <div>
            <p>010-64660106</p>
          </div>
        </div>
      </div>
      <div class="middle">
        <header class="footer-header">网站板块</header>
        <ul class="site-blocks">
          <li><a href="http://www.inmyshow.com//home/index" target="_blank">首页</a></li>
          <li><a href="http://www.inmyshow.com//home/linkInvestors" target="_blank">投资者关系</a></li>
          <li><a href="http://www.inmyshow.com//home/ims" target="_blank">走入IMS</a></li>
          <li><a href="http://www.inmyshow.com//home/contact" target="_blank">联系我们</a></li>
          <li><a href="http://www.inmyshow.com//home/news" target="_blank">新闻中心</a></li>
          <li><a href="http://www.inmyshow.com//home/join" target="_blank">加入我们</a></li>
          <li><a href="http://www.inmyshow.com//home/culture" target="_blank">企业文化</a></li>
          <li><a href="http://www.inmyshow.com//home/ired" target="_blank">证书查询</a></li>
        </ul>
      </div>
      <div class="right">
        <header class="footer-header">关于我们</header>
        <div>
          <div class="qrcode-item">
            <img src="@/assets/qrcode-wechat.png">
            <div>
              <p>IMS（天下秀）</p>
              <p>官方微信</p>
            </div>
          </div>
          <div class="qrcode-item">
            <img src="@/assets/qrcode-weibo.png">
            <div>
              <p>IMS（天下秀）</p>
              <p>官方微博</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </wrapper>
</template>
<script lang="ts" setup>
import Wrapper from './Wrapper.vue';
</script>

<style lang="scss" scoped>
.footer-wrapper {
  border-top: 1px solid #f8f8f8;
  background-color: #ffffff;
  .footer-content {
    padding-top: 50px;
    padding-bottom: 85px;
    display: flex;
    justify-content: space-between;
  }
  .contact-item {
    margin-top: 35px;
    display: flex;
    line-height: 12px;
    color: #999999;
    img {
      margin-right: 7px;
      &.position {
        width: 11px;
        height: 16px;
      }
      &.phone {
        width: 12px;
        height: 12px;
      }
    }
    font-size: 12px;
  }
  .site-blocks {
    margin-top: 27px;
    font-size: 14px;
    color: #000000;
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #b5b5b5;
      width: 101px;
    }
  }
  .footer-header {
    font-size: 22px;
    color: #000000;
    font-weight: 600;
  }
  .qrcode-item {
    margin-top: 23px;
    display: flex;
    align-items: center;
    color: #999999;
    font-size: 14px;
    line-height: 22px;
    img {
      margin-right: 20px;
    }
  }
}

</style>
