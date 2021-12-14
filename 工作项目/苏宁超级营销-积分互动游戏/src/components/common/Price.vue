<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-22 10:54:13
 * @LastEditTime: 2020-12-22 14:57:39
 * @FilePath: \SNActivity\src\components\common\Price.vue
-->
<template>
  <div class="price-box">
    <!-- 中奖弹窗 -->
    <div class="price-modal">
      <div class="black-shadow"></div>
      <div class="price-content">
        <div class="price-wrap">
          <div class="header">
            <p class="shopName">测试店铺</p>
            <img class="points-img" src="@/assets/img/price-point.png">
          </div>
          <div class="body">
            <div class="text1">恭喜您中了</div>
            <div class="text2">20积分</div>
            <div class="text3">积分已放到您的账户中，可在<span class="text4">店铺会员页</span>中查看</div>
          </div>
          <div class="footer">
            <a class="share" href="#">立即分享</a>
            <a class="toShop" href="#">进店逛逛</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang='scss'>
.price-box{
  .price-wrap {
        width: 5.27rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10%;

        .header {
          background-image: url('../assets/img/price-bg.png');
          width: 5.27rem;
          height: 4.42rem;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;

          .shopName {
            margin-top: 0.6rem;
            font-size: 0.2rem;
            color: rgb(51, 51, 51);
            z-index: 5;
            position: absolute;
            bottom: 1.9rem;
            left: 50%;
            transform: translateX(-50%);
          }

          .points-img {
            position: absolute;
            top: 1.7rem;
            border: 0;
            max-width: 100%;
          }
        }

        .body {
          margin-top: -1px;
          padding: 0.36rem;
          text-align: center;
          background: #fff;

          .text1 {
            color: rgb(242, 60, 60);
            font-size: 0.3rem;
          }

          .text2 {
            color: rgb(242, 60, 60);
            font-size: 0.48rem;
          }

          .text3 {
            margin-top: 0.2rem;
            color: rgb(153, 153, 153);
            font-size: 0.2rem;
          }

          .text4 {
            color: rgb(242, 60, 60);
          }
        }

        .footer {
          padding: 0 0.36rem 0.86rem 0.36rem;
          border-radius: 0 0 10px 10px;
          text-align: center;
          background: #fff;

          .share {
            float: left;
          }

          .toShop {
            float: right;
          }

          .toShop,
          .share {
            width: 50%;
            color: #666;
            font-size: 0.3rem;
            text-decoration: none;
          }
        }
      }
    }
  }
}

</style>