<!--
 * @Description:pointPK
 * @Autor: hanzhiwei
 * @Date: 2020-12-02 18:15:17
 * @LastEditTime: 2021-01-13 16:32:11
 * @FilePath: \SNActivity\src\views\pointsInteract\PointPK.vue
-->
<template>
  <div class="point-pk-box" :class='{maxHeight:isShowSunCode}'>
    <!-- 太阳码 小程序跳转 -->
    <img :src="form.sunCode" v-if="isShowSunCode" class="sun-code">
    <!-- 未开始 -->
    <NotStart />
    <!-- 进行中 -->
    <OnGoing />
    <!-- 已结束 -->
    <Finished />
    <!-- 曝光商品 -->
    <!-- <ShowGoods /> -->
    <!-- 活动规则 -->
    <Rule />
    <!-- 开卡 -->
    <OpenCard />
  </div>
</template>

<script>

import getSn from '@/assets/js/suning.js';
const { galaxie, isSnApp, isMiniApp } = getSn();

import Toast from '@/utils/toast';
// 引入axios配置文件
import axios from '@/axios/index';
import Rule from '@/components/pointsInteract/Rule.vue';
import OpenCard from '@/components/pointsInteract/OpenCard.vue';
import NotStart from '@/components/pointsInteract/NotStart.vue';
import OnGoing from '@/components/pointsInteract/OnGoing.vue';
import Finished from '@/components/pointsInteract/Finished.vue';
// import ShowGoods from "@/components/pointsInteract/ShowGoods.vue";
// 调用map辅助函数
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
  components: {
    Rule,
    NotStart,
    OnGoing,
    Finished,
    OpenCard,
    // ShowGoods
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapState(['form']),
    ...mapState('pointPK', ['pointPkForm']),
    isShowSunCode () {
      if (process.env.NODE_ENV === 'loacl') {
        return false;
      }
      if (!isSnApp && !isMiniApp) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions('pointPK', ['getActivityContent', 'getRule']),
    ...mapActions(['getSunCode', 'getOpenCard', 'getShopInfo']),
    ...mapMutations('pointPK', ['']),
    ...mapMutations(['setActivityId', 'setPin', 'setShareInfo']),

    /**
       * @description: 埋点
       */
    async accessLog () {
      let subType = '';
      if (isSnApp) {
        subType = 'app';
      } else if (isMiniApp) {
        subType = 'wx';
      }
      let res = await axios({
        method: 'post',
        url: '/api/common/accessLog',
        data: {
          activityId: this.form.activityId, // 活动id
          code: 48, // 业务类型
          mixPin: this.form.pin, // 用户pin
          pageUrl: window.location.href, // 当前无线页面地址
          pin: this.form.pin, // 用户pin
          subType: subType, // 子类型
          venderId: this.form.userId, // 店铺id
        },
      });
    },
    init () {
      galaxie.user.getUnionId(async (err, unionld) => {
        if (process.env.NODE_ENV === 'loacl') {
          unionld = process.env.VUE_APP_PIN;
        }
        console.log(unionld);
        if (err) {
          // eslint-disable-next-line new-cap
          Toast(err);
        } else if (unionld) {
          // 保存活动id
          this.setActivityId(this.$route.params.activityId);
          // 保存pin
          this.setPin(unionld);
          // 获取活动规则
          await this.getRule();
          // 获取太阳码
          this.getSunCode();
          // 获取店铺信息
          this.getShopInfo();
          // 获取活动信息
          this.getActivityContent();
          // 判断是否开卡
          this.getOpenCard();
          // 触发埋点
          this.accessLog();
        } else {
          // eslint-disable-next-line new-cap
          Toast('获取pin失败');
        }

      }, true);
    }

  },
  mounted () {
    // 初始化
    this.$nextTick(() => {
      this.init();
      // 保存分享信息
      this.setShareInfo({
        posterUrl: 'https://uimgproxy.suning.cn/uimg1/sop/commodity/PlJO93jhXjf9LOC0KdIF0g.jpg',
        iconUrl: 'https://uimgproxy.suning.cn/uimg1/sop/commodity/6ylWgZVCRKX_4eREPZWLlg.jpg',
        title: '积分打call',
        baseUrl: `${process.env.VUE_APP_BASEURL}activity/pointPK/`,
      });
    });
    // let openCard = document.querySelecter('.opencard-img');
    // openCard.style.top = '-8rem';
  }
};
</script>


<style lang="scss">
.point-pk-box {
  .maxHeight {
    min-height: 5vh;
    max-height: 95vh;
    overflow: hidden;
  }
  .sun-code {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999999;
  }
  [v-cloak] {
    display: none;
  }
  .el-checkbox__inner {
    border-radius: 50%;
  }
  .f-fr {
    float: right;
    margin-bottom: 0.1rem;
  }
  .f-fl {
    float: left;
    margin-top: 0.1rem;
  }
  .banner {
    width: 100%;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    background: url(//img10.360buyimg.com/imgzone/jfs/t26314/37/1465569605/76294/6e9dbb03/5be43daeNe0fb8201.png)
      no-repeat;
    background-size: 100%;
    font-size: 0.3rem;
    color: #fff;
    position: relative;
  }
  .ruler {
    width: 0.88rem;
    height: 0.6rem;
    background: url(//img10.360buyimg.com/imgzone/jfs/t27460/332/1459099524/1754/9047fe07/5be43da0N3db1156e.png)
      no-repeat;
    background-size: 100%;
    position: absolute;
    right: 0.4rem;
    top: -0.1rem;
  }
  .imgCon {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem;
    border-bottom: 1px solid #f2f2f2;
    background: #fff;
    position: relative;
  }
  .flexCon {
    width: 3.45rem;
    height: 2.8rem;
    position: relative;
    background: #fff;
  }
  .check1 {
    position: absolute;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    color: #333;
    background: #f66cff;
    width: 50%;
    font-size: 0.2rem;
  }
  .flexCon .check1 {
    position: absolute;
    left: 0rem;
    bottom: 0rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    color: #333;
    background: #f66cff;
    width: 100%;
    font-size: 0.2rem;
  }
  /*改变checkbox的样式*/
  .check1 .input_check1 {
    position: absolute;
    width: 0.35rem;
    height: 0.35rem;
    visibility: hidden;
    background: #e92333;
  }

  .check1 span {
    position: relative;
  }

  .check1 .input_check1 + label {
    display: inline-block;
    width: 0.48rem;
    height: 0.23rem;
    background: url('//img10.360buyimg.com/imgzone/jfs/t1/16864/36/6919/798/5c64da62E85bbc1f3/b6c8f808ad128c9f.png')
      no-repeat center;
    background-size: 100%;
    float: left;
    margin-top: 0.21rem;
    margin-left: 0.455rem;
  }

  .check1 .input_check1:checked + label {
    width: 0.26rem;
    height: 0.19rem;
    background: url('//img10.360buyimg.com/imgzone/jfs/t1/8708/29/14463/267/5c64da6aE68d9ad32/903fa6f6006ac6b3.png')
      no-repeat center;
    background-size: 100%;
    margin-top: 0.25rem;
    margin-left: 0.55rem;
  }
  .pool {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #f23c3c;
    font-size: 0.48rem;
    font-weight: 600;
    font-weight: 700;
    display: flex;
    justify-content: center;
  }
  .callPk {
    width: 6.9rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: url(//img10.360buyimg.com/imgzone/jfs/t27685/3/1493203937/38303/b5d50e09/5be43da0Nc4446ed0.png)
      no-repeat;
    background-size: 100%;
    text-align: center;
    font-size: 0.24rem;
    color: #fff;
  }
  .shareFriend {
    width: 6.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.4rem;
    text-align: center;
    font-size: 0.36rem;
    border: 1px solid #0083ff;
    color: #0083ff;
    background: #fff;
    margin-bottom: 0.5rem;
  }
  .common-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.85);
    height: 100%;
    z-index: 1024;
  }
  .common-content {
    position: fixed;
    top: 20%;
    left: 1.25rem;
    width: 5rem;
    height: 3.2rem;
    /*margin-left: -3.1rem;*/
    /*margin-top: -2.75rem;*/
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 1026;
    /*transform: translate(-50%);*/
  }

  .common-content-close {
    position: absolute;
    bottom: -1rem;
    left: 50%;
    width: 0.6rem;
    height: 0.6rem;
    right: 0rem;
    font-size: 0.3rem;
    color: #4fb1a4;
    z-index: 1;
    background: url(//img10.360buyimg.com/imgzone/jfs/t27415/305/1477320091/1709/6abdcd6/5be43da0N6b275f58.png)
      no-repeat;
    background-size: 100%;
    transform: translateX(-50%);
  }
  .common-content.noPointCon {
    background: url('//img10.360buyimg.com/imgzone/jfs/t26404/4/1509714361/12794/b390c95d/5be43da0Nff9c2c0c.png')
      no-repeat center;
    background-size: 100%;
  }
  .shareGg {
    display: inline-block;
    height: 1rem;
    width: 2.5rem;
    position: absolute;
    left: 0rem;
    top: 2rem;
  }
  .callPked {
    width: 6.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #478cfe;
    text-align: center;
    font-size: 0.36rem;
    color: #fff;
    border-radius: 0.4rem;
    margin-left: 0.3rem;
  }
  .draw-sign-list {
    padding: 0.4rem;
  }

  .draw-sign-list li {
    float: left;
    width: 48%;
    margin-bottom: 3%;
    background: #fff;
  }

  .draw-sign-list li:nth-child(even) {
    margin-left: 3%;
  }

  .draw-sign-list li .title {
    height: 0.7rem;
    line-height: 0.35rem;
    padding: 0 0.1rem;
    margin-top: 0.1rem;
    font-size: 0.26rem;
    overflow: hidden;
  }

  .draw-sign-list li .detail {
    padding: 0.1rem;
    font-size: 0.28rem;
  }

  .draw-sign-list li .detail .price {
    color: #f23c3c;
  }

  .draw-sign-list li .detail .oldprice {
    text-decoration: line-through;
    font-size: 0.24rem;
    color: #999;
  }

  .draw-sign-list li .detail .detail-btn {
    display: inline-block;
    margin-top: 0.1rem;
    background: #f56264;
    border-radius: 3px;
    padding: 0.05rem 0.15rem;
    color: #fff;
    text-decoration: none;
  }
  .pkImgs {
    position: absolute;
    top: 0.9rem;
    left: 45%;
    height: 0.88rem;
    width: 0.88rem;
  }
  .per {
    width: 3.45rem;
    height: 2.2rem;
    position: absolute;
    left: 0rem;
    top: 0rem;
    line-height: 2.2rem;
    text-align: center;
    color: #fff;
  }
  .pkImgs {
    position: absolute;
    left: 45%;
    top: 29%;
  }
  .draw-sidebar-content {
    padding: 0.25rem;
    font-size: 0.3rem;
    color: #fff;
  }

  .draw-tabs li {
    width: 50%;
    text-align: center;
    border-bottom: 1px solid #fff;
    line-height: 0.8rem;
  }

  .draw-tabs li a {
    color: #fff;
    text-decoration: none;
  }

  .draw-tabs li.active {
    border-color: red;
  }

  .draw-tabs li.active a {
    color: red;
  }

  .draw-tabs-content {
    padding: 0.4rem 0;
    overflow: auto;
    height: 88%;
  }

  .draw-tabs-content .draw-tabs-item {
    display: none;
  }

  .draw-tabs-content .draw-tabs-item.active {
    display: block;
  }
  .goback {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 1.4rem;
    height: 0.4rem;
    /*background-image: url(https://img10.360buyimg.com/imgzone/jfs/t17563/71/464197912/2669/9b732e4b/5a7c711aN7a2683a4.png);*/
    /*background-size: 100%;*/
    background-repeat: no-repeat;
    z-index: 10;
    font-size: 0.2rem;
    color: #fff;
    border-radius: 0.2rem;
    text-align: center;
    line-height: 0.4rem;
    border: 1px solid #f2f2f2;
  }
  .bg {
    background: rgba(0, 0, 0, 0.5);
  }
  .couponlistitem .itemImg .imgDivEnd {
    width: 48%;
    position: relative;
    height: 1rem;
  }
  .couponlistitem .itemImg .imgDivEnd .details {
    background: #cccccc;
    height: 1rem;
    color: #fff;
    width: 2.1rem;
    position: relative;
  }
  .guaFenPool {
    text-align: center;
    color: #666;
    font-size: 0.24rem;
    margin: 0.4rem 0rem;
    text-align: center;
  }
  .tiket {
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    font-size: 0.28rem;
  }
  .descri {
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    font-size: 0.24rem;
    height: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .blueBg {
    background: #0199fa !important;
  }
  .pinkBg {
    background: #ff5070 !important;
  }
  .winImg {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    width: 0.6rem;
    height: 0.6rem;
  }
  html {
    background: #f2f2f2;
  }
  [v-cloak] {
    display: none;
  }
  .buttons-tab {
    height: 0.9rem;
    line-height: 0.87rem;
    background: #fff;
    display: flex;
    font-size: 0.24rem;
  }
  .tab-link {
    flex: 1;
    text-align: center;
  }

  .getPoints {
    color: #f23c3c;
    font-size: 0.3rem;
    width: 1.3rem;
    margin: 0 auto;
  }
  .activeR {
    background: #f23c3c;
    height: 3px;
    width: 0.7rem;
    margin: 0 auto;
  }
  .activeB {
    background: #0083ff;
    height: 3px;
    width: 0.7rem;
    margin: 0 auto;
  }
  .couponul {
    margin: 0rem 0.3rem;
    padding: 0;
    li {
      list-style: none;
    }
  }

  .couponlistitem {
    /*height:5.6rem;*/
    border-bottom: 1px solid #eee;
    background: #fff;
    margin-bottom: 0.2rem;
    position: relative;
  }
  .couponlistitem .itemTitle {
    height: 0.7rem;
    line-height: 1.1rem;
    font-size: 0.3rem;
    /*border-bottom:1px solid #f2f2f2;*/
    padding: 0rem 0.3rem;
    font-family: '微软雅黑';
    text-align: center;
    color: #333;
  }
  .couponlistitem .itemImg {
    display: flex;
    padding: 0rem 0.2rem;
    height: 3.8rem;
    margin-top: 0.3rem;
    position: relative;
    justify-content: space-between;
  }
  .couponlistitem .itemImg .imgDiv {
    width: 48%;
    position: relative;
    height: 2.6rem;
  }
  .couponlistitem .itemImg .imgDiv img {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .couponlistitem .itemImg .imgDiv div {
    position: absolute;
    left: 0.3rem;
    bottom: -0.3rem;
    border-radius: 3.25rem;
    height: 0.65rem;
    text-align: center;
    line-height: 0.65rem;
    color: #ffffff;
    background: #0199fa;
    width: 2.6rem;
    padding: 0rem 0.1rem;
    font-size: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .couponlistitem .itemImg .imgDiv div.descYjs {
    color: #333;
    background: #fff;
  }
  .couponlistitem .pkImgs {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translate(-50%);
    width: 0.57rem;
    height: 0.62rem;
  }

  .couponKind {
    float: left;
    width: 3.6rem;
    height: 1rem;
  }
  .couponKind img {
    height: 0.7rem;
    margin-top: 0.15rem;
    float: left;
  }
  .couponKind .adiv {
    float: left;
    width: 2.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 0.2rem;
    margin-top: 0.32rem;
    font-size: 0.28rem;
    color: #333;
  }
  .jf-mid {
    float: left;
    width: 1.2rem;
    color: #f23c3c;
    font-size: 0.24rem;
    height: 1rem;
    line-height: 1rem;
    text-align: right;
  }
  .time {
    float: left;
    width: 1.9rem;
    font-size: 0.24rem;
    height: 1rem;
    line-height: 1rem;
  }
  .point {
    color: #f23c3c;
    font-size: 0.3rem;
    margin-top: 0.2rem;
  }

  .list-block ul {
    background: #fff;
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
  }
  .list-block li {
    box-sizing: border-box;
    position: relative;
  }
  .inline-block {
    display: inline-block;
  }
  .list-block {
    margin: 0;
    font-size: 0.24rem;
  }
  .item-subtitle {
    font-size: 0.3rem !important;
  }
  .list-block .item-media-top {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }
  .list-block .item-link.list-button {
    padding: 0 0.37rem;
    text-align: center;
    color: #0894ec;
    display: block;
    line-height: 0.85rem;
  }

  .list-block .item-link {
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    display: block;
    color: inherit;
  }
  .list-block ul:before {
    background-color: #e6e6e6;
  }
  .list-block ul:after {
    background-color: #e6e6e6;
  }
  .list-block .item-text {
    font-size: 0.3rem;
  }
  .over {
    height: 1.2rem;
    line-height: 1.2rem;
    width: 100%;
    text-align: center;
  }
  .descYjs {
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    color: #333;
    background: #fff;
    width: 50%;
    padding: 0rem 0.1rem;
    font-size: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title {
    color: #666;
    font-size: 0.24rem;
    text-align: center;
  }
  html {
    background: #f2f2f2;
  }
  [v-cloak] {
    display: none;
  }
  .buttons-tab {
    height: 0.9rem;
    line-height: 0.87rem;
    background: #fff;
    display: flex;
    font-size: 0.24rem;
  }
  .tab-link {
    flex: 1;
    text-align: center;
  }

  .getPoints {
    color: #f23c3c;
    font-size: 0.3rem;
    width: 1.3rem;
    margin: 0 auto;
  }
  .activeR {
    background: #f23c3c;
    height: 3px;
    width: 0.7rem;
    margin: 0 auto;
  }
  .activeB {
    background: #0083ff;
    height: 3px;
    width: 0.7rem;
    margin: 0 auto;
  }
  .couponul {
    margin: 0rem 0.3rem;
  }

  .couponlistitem {
    /*height:5.6rem;*/
    border-bottom: 1px solid #eee;
    background: #fff;
    margin-bottom: 0.2rem;
    position: relative;
  }
  .couponlistitem .itemTitle {
    height: 0.7rem;
    line-height: 1.1rem;
    font-size: 0.3rem;
    /*border-bottom:1px solid #f2f2f2;*/
    padding: 0rem 0.3rem;
    font-family: '微软雅黑';
    text-align: center;
  }
  .couponlistitem .itemImg {
    display: flex;
    padding: 0rem 0.2rem;
    height: 3.8rem;
    margin-top: 0.3rem;
    position: relative;
    justify-content: space-between;
  }
  .couponlistitem .itemImg .imgDiv {
    width: 48%;
    position: relative;
    height: 2.6rem;
  }
  .couponlistitem .itemImg .imgDiv img {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .couponlistitem .itemImg .imgDiv div {
    position: absolute;
    left: 0.3rem;
    bottom: -0.3rem;
    border-radius: 3.25rem;
    height: 0.65rem;
    text-align: center;
    line-height: 0.65rem;
    color: #ffffff;
    background: #0199fa;
    width: 2.6rem;
    padding: 0rem 0.1rem;
    font-size: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .couponlistitem .itemImg .imgDiv div.descYjs {
    color: #333;
    background: #fff;
  }
  .couponlistitem .pkImgs {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translate(-50%);
    width: 0.57rem;
    height: 0.62rem;
  }

  .couponKind {
    float: left;
    width: 3.6rem;
    height: 1rem;
  }
  .couponKind img {
    height: 0.7rem;
    margin-top: 0.15rem;
    float: left;
  }
  .couponKind .adiv {
    float: left;
    width: 2.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 0.2rem;
    margin-top: 0.32rem;
    font-size: 0.28rem;
    color: #333;
  }
  .jf-mid {
    float: left;
    width: 1.2rem;
    color: #f23c3c;
    font-size: 0.24rem;
    height: 1rem;
    line-height: 1rem;
    text-align: right;
  }
  .time {
    float: left;
    width: 1.9rem;
    font-size: 0.24rem;
    height: 1rem;
    line-height: 1rem;
  }
  .point {
    color: #f23c3c;
    font-size: 0.3rem;
    margin-top: 0.2rem;
  }

  .list-block ul {
    background: #fff;
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
  }
  .list-block li {
    box-sizing: border-box;
    position: relative;
  }
  .inline-block {
    display: inline-block;
  }
  .list-block {
    margin: 0;
    font-size: 0.24rem;
  }
  .item-subtitle {
    font-size: 0.3rem !important;
  }
  .list-block .item-media-top {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }
  .list-block .item-link.list-button {
    padding: 0 0.37rem;
    text-align: center;
    color: #0894ec;
    display: block;
    line-height: 0.85rem;
  }

  .list-block .item-link {
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    display: block;
    color: inherit;
  }
  .list-block ul:before {
    background-color: #e6e6e6;
  }
  .list-block ul:after {
    background-color: #e6e6e6;
  }
  .list-block .item-text {
    font-size: 0.3rem;
  }
  .over {
    height: 1.2rem;
    line-height: 1.2rem;
    width: 100%;
    text-align: center;
  }
  .descYjs {
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    color: #333;
    background: #fff;
    width: 50%;
    padding: 0rem 0.1rem;
    font-size: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title {
    color: #666;
    font-size: 0.24rem;
    text-align: center;
  }
  .couponlistitem .itemImg .imgDivEnd {
    width: 48%;
    position: relative;
    height: 1rem;
  }
  .couponlistitem .itemImg .imgDivEnd .details {
    background: #cccccc;
    height: 1rem;
    color: #fff;
    width: 2.1rem;
    position: relative;
  }
  .guaFenPool {
    text-align: center;
    color: #666;
    font-size: 0.24rem;
    margin: 0.4rem 0rem;
    text-align: center;
  }
  .tiket {
    display: inline-block;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    font-size: 0.28rem;
  }
  .descri {
    display: inline-block;
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    font-size: 0.16rem;
    height: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 3.2rem;
  }
  .blueBg {
    background: #0199fa !important;
  }
  .pinkBg {
    background: #ff5070 !important;
  }
  .winImg {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    width: 0.6rem;
    height: 0.6rem;
  }
  .imgDEsr {
    position: absolute;
    width: 3.2rem;
    height: 2.6rem;
    line-height: 2.6rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    /*opacity: 0.6;*/
    color: #fff;
    border-radius: 5px;
  }
  .imgDes {
    text-align: center;
    font-size: 0.3rem;
    color: #0199fa;
    height: 0.5rem;
    line-height: 0.5rem;
    float: left;
    width: 50%;
  }
  .orangeF {
    color: #ffa033;
  }
  .choose {
    width: 0.83rem;
    position: absolute;
    left: -0.1rem;
    top: -0.1rem;
  }
  .detailT {
    background: #cccccc;
    height: 1rem;
    color: #fff;
    width: 3.2rem;
    position: relative;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .suBtn {
    background: url(//img10.360buyimg.com/imgzone/jfs/t1/26742/35/6863/41816/5c63b919Ea9e8289e/6ab32d9b2bd43034.png)
      no-repeat;
    background-size: 100%;
    width: 6.3rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    color: #fff;
    margin-bottom: 0.2rem;
  }
  .pools {
    height: 1.1rem;
    text-align: center;
    color: #666;
    font-size: 0.24rem;
    line-height: 1.1rem;
  }
  .ruler {
    background: url(//img10.360buyimg.com/imgzone/jfs/t1/28226/23/6784/29885/5c653d69Ebd7c62c6/30314ae8b6513723.png)
      no-repeat;
    background-size: 100%;
    width: 6rem;
    height: 7.44rem;
    left: 0.75rem;
  }
  .rulerContent {
    margin-top: 1.2rem;
    padding: 0rem 0.37rem;
    font-size: 0.2rem;
    line-height: 0.4rem;
    height: 4.7rem;
    overflow-y: auto;
    word-break: break-all;
  }
  .ruler-close {
    display: inline-block;
    width: 3rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0rem;
  }
}
</style>