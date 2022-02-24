<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-02 18:15:17
 * @LastEditTime: 2021-01-05 17:03:05
 * @FilePath: \SNActivity\src\views\pointsInteract\preview\PointPkPreview.vue
-->
<template>
  <div class="point-pk">
    <!-- 未开始 -->
    <div v-if="activityStatus==1">
      <div style="margin-bottom:0.3rem;margin-top:0.3rem;">
        <ul class="couponul">
          <li class="couponlistitem">
            <div class="itemTitle">
              {{actName}}
            </div>
            <div class="itemImg" style="height:3.3rem;">
              <div class="imgDiv">
                <img style="width:100%;height:100%" :src="showImageLeftSrc" />

                <div class="descJx" style="background:#ccc">{{leftImgDesc}}</div>
              </div>
              <div class="imgDiv">
                <img style="width:100%;height:100%" :src="showImageRightSrc" />

                <div class="descJx" style="background:#ccc">{{rightImgDesc}}</div>
              </div>
              <img class="pkImgs" src="//img10.360buyimg.com/imgzone/jfs/t1/26709/15/6555/2983/5c53efd1Ec4da660f/77b6c0805a65406f.png" />
            </div>
            <div class="title" style="margin-bottom: 0.3rem;">
              <van-count-down :time="time" format="距离开始还有 DD 天 HH 时 mm 分 ss 秒" @finish="window.location.reload()"></van-count-down>
            </div>
            <div style="display: flex;justify-content:space-between;font-size:0.24rem;margin:0rem 0.3rem;color:#666;margin-bottom: 0.5rem;">
              <a style="color:#666" :href="`https://shop.m.suning.com/${shopId}.html`">
                &lt; 进店逛逛</a>
              <div @click="isShowRule=true"> 活动规则 &gt; </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 进行中 -->
    <div v-if="activityStatus==2">
      <div>
        <div style="margin-bottom:0.3rem;margin-top:0.3rem;">
          <ul class="couponul">
            <!-- 未参加 -->
            <li class="couponlistitem" v-if="joinStatus==0">
              <div class="itemTitle">
                {{actName}}
              </div>
              <div class="itemImg" style="height:3rem">
                <div class="imgDiv">
                  <img style="width:100%;height:100%" :src="showImageLeftSrc" />
                  <div class="check1" style="left:0.9rem;width:1.4rem;background: rgba(1,153,250,0.8)">
                    <span><input type="radio" name="vote" class="input_check1" id="check2" value="1"><label for="check2"></label></span>
                  </div>
                </div>
                <div class="imgDiv">
                  <img style="width:100%;height:100%" :src="showImageRightSrc" />
                  <div class="check1" style="left:0.9rem;width:1.4rem;background: rgba(255,80,112,0.6)">
                    <span><input type="radio" class="input_check1" name="vote" id="check3" value="2"><label for="check3"></label></span>
                  </div>
                </div>
                <img class="pkImgs" src="//img10.360buyimg.com/imgzone/jfs/t1/26709/15/6555/2983/5c53efd1Ec4da660f/77b6c0805a65406f.png" />
              </div>
              <div style="overflow: hidden;padding: 0rem 0.2rem;">
                <p class="imgDes">{{leftImgDesc}}</p>
                <p class="imgDes" style="color:#ff5070">{{rightImgDesc}}</p>
              </div>
              <div style="margin-left:0.3rem;padding: 0rem 0.2rem;margin-top: 0.4rem;">
                <div style="text-align: center;font-size:0.24rem;color:#666">
                  {{showResultDays}}开奖
                </div>
                <div style="text-align: center;color:#666;font-size:0.24rem;margin:0.1rem 0rem 0.35rem 0rem;">
                  {{costPoint}}积分/票,胜方瓜分<span class="orangeF">{{totalPoints}}</span>积分
                </div>
              </div>
              <div style="display:flex;justify-content: center;">
                <div class="callPked" @click="joinStatus = 1">
                  {{costPoint}}积分打call
                </div>
              </div>
              <div style="display:flex;justify-content: center;margin-top:0.3rem">
                <div class="shareFriend">
                  邀请好友一起玩
                </div>
              </div>
              <template>
                <div style="display: flex;align-items: center;justify-content: center;margin: 0.2rem 0rem;" @click="followShop()">
                  <el-checkbox v-model="followShopChecked">
                    <span style="color:rgb(102, 102, 102)">同时关注{{shopName}}</span>
                  </el-checkbox>
                </div>
              </template>
              <div style="display: flex;justify-content:space-between;font-size:0.2rem;margin:0rem 0.3rem;color:#666;margin-bottom: 0.5rem;">
                <a style="color:#666" :href="`https://shop.m.suning.com/${shopId}.html`">
                  &lt; 进店逛逛</a>
                <div @click="isShowRule = true"> 活动规则 &gt; </div>
              </div>
            </li>
            <!-- 已参加 -->
            <li class="couponlistitem" v-if="joinStatus==1">
              <div class="itemTitle">
                {{actName}}
              </div>
              <div class="itemImg" style="height:3rem">
                <div class="imgDiv">
                  <img style="width:100%;height:100%" :src="showImageLeftSrc" />
                  <p class="imgDEsr" style="left:0rem;bottom:0rem">{{leftPercent}}%</p>
                  <div v-if="voteChoice==1" class="descJx" style="left:0.9rem;width:1.4rem;background: rgba(1,153,250,0.8)">已选</div>
                </div>
                <div class="imgDiv">
                  <img style="width:100%;height:100%" :src="showImageRightSrc" />
                  <p class="imgDEsr" style="right:0rem;bottom:0rem">{{rightPercent}}%</p>
                  <div v-if="voteChoice==2" class="descJx" style="left:0.9rem;width:1.4rem;background: rgba(255,80,112,0.6)">已选</div>
                </div>
                <img class="pkImgs" src="//img10.360buyimg.com/imgzone/jfs/t1/26709/15/6555/2983/5c53efd1Ec4da660f/77b6c0805a65406f.png" />
              </div>
              <div style="overflow: hidden;padding: 0rem 0.2rem;">
                <p class="imgDes">{{leftImgDesc}}</p>
                <p class="imgDes" style="color:#ff5070">{{rightImgDesc}}</p>
              </div>
              <div style="margin-left:0.3rem;padding: 0rem 0.2rem;margin-top: 0.3rem">
                <div class="orangeF" style="text-align: center;font-size:0.24rem;">
                  打call成功，等待揭晓
                </div>
                <div style="text-align: center;color:#666;font-size:0.4rem;margin:0rem 0rem 0.2rem 0rem;">
                  胜方瓜分<span class="orangeF">{{totalPoints}}</span>积分
                </div>
                <div style="text-align: center;color:#666;font-size:0.24rem;margin-bottom: 0.3rem;">
                  {{showResultDays}}开奖
                </div>
              </div>
              <div class="share-box" style="margin-top:0.2rem;">
                <div class="shareFriend">
                  邀请好友一起玩
                </div>
              </div>
              <div style="display: flex;justify-content:space-between;font-size:0.24rem;margin:0rem 0.3rem;color:#666;margin-bottom: 0.5rem;">
                <a style="color:#666" :href="`https://shop.m.suning.com/${shopId}.html`">
                  &lt; 进店逛逛</a>
                <div @click="isShowRule = true"> 活动规则 &gt;</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 活动结束 -->
    <div v-if="activityStatus==4||activityStatus==3">
      <div style="margin-bottom:0.3rem;margin-top:0.3rem;">
        <ul class="couponul">
          <li class="couponlistitem">
            <div class="itemTitle">
              {{actName}}
            </div>
            <div class="itemImg">
              <div class="imgDiv">
                <img style="width:100%;border-bottom-left-radius:0rem;border-bottom-right-radius:0rem;" :src="showImageLeftSrc" />
                <img class="choose" v-if="voteChoice==1" src="//img10.360buyimg.com/imgzone/jfs/t1/14809/22/6867/2338/5c63d250Ee2ba549d/85eb7de45be81bba.png" />
                <p class="detailT" :class="{ 'blueBg': pkResult==1||pkResult==3}">
                  <span class="tiket">{{choseLeftMans}}票</span>
                  <span class="descri">{{leftImgDesc}}</span>
                  <img v-if="pkResult==1&&voteChoice==1||pkResult==1&&voteChoice==0" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/32588/26/1563/1882/5c53efd1E22b10b07/9cdad669b0e1bd63.png" />
                  <!-- <img v-if="pkResult==1&&voteChoice==2" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/14243/23/6877/1899/5c63c0a8E84a881f2/7c3f81779164ba42.png"/> -->
                  <img v-if="pkResult==2&&voteChoice==1" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/14243/23/6877/1899/5c63c0a8E84a881f2/7c3f81779164ba42.png" />
                  <img v-if="pkResult==3" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/29236/12/7000/1816/5c63de43Ebcb382a9/42d4eaa49d5b53e1.png" />
                </p>

              </div>
              <div class="imgDiv">
                <img style="width:100%;border-bottom-left-radius:0rem;border-bottom-right-radius:0rem;" :src="showImageRightSrc" />
                <img class="choose" style="width:0.83rem;" src="//img10.360buyimg.com/imgzone/jfs/t1/14809/22/6867/2338/5c63d250Ee2ba549d/85eb7de45be81bba.png" v-if="voteChoice==2" />
                <p class="detailT" :class="{ 'pinkBg': pkResult==2||pkResult==3}">
                  <span class="tiket">{{choseRightMans}}票</span>
                  <span class="descri">{{rightImgDesc}}</span>
                  <img v-if="pkResult==2&&voteChoice==2||pkResult==2&&voteChoice==0" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/32588/26/1563/1882/5c53efd1E22b10b07/9cdad669b0e1bd63.png" />
                  <img v-if="pkResult==1&&voteChoice==2" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/14243/23/6877/1899/5c63c0a8E84a881f2/7c3f81779164ba42.png" />
                  <!-- <img v-if="pkResult==2&&voteChoice==1" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/14243/23/6877/1899/5c63c0a8E84a881f2/7c3f81779164ba42.png"/> -->
                  <img v-if="pkResult==3" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/29236/12/7000/1816/5c63de43Ebcb382a9/42d4eaa49d5b53e1.png" />
                </p>
              </div>
            </div>
            <div style="margin:0 0.3rem;">
              <div v-if="joinStatus==0">
                <div class="pools" style="line-height:0.5rem;" v-if="pkResult==3">
                  活动已结束<br>
                  <!-- 胜方已经瓜分 <span class="orangeF">{{showApiecePointOfJoins}}</span>积分 -->
                </div>
                <div class="pools" style="line-height:0.5rem;" v-else>
                  活动已结束<br>
                  胜方已经瓜分 <span class="orangeF">{{totalPoints}}</span>积分
                </div>
              </div>
              <div v-if="joinStatus==1">
                <div v-if="activityStatus==3" class="pools">
                  活动已结束
                </div>
                <div v-if="activityStatus==4">
                  <div v-if="winPrizeStatus==1">
                    <div class="orangeF" style="font-size: 0.24rem;text-align: center;margin-top:0.2rem">恭喜PK获胜</div>
                    <div style="text-align: center;color:#666;font-size:0.4rem;margin:0rem 0rem 0.15rem 0rem;">
                      获得<span class="orangeF">{{showApiecePointOfJoins}}</span>积分
                    </div>
                    <div style="text-align: center;color:#666;font-size:0.24rem;margin-bottom: 0.2rem;" v-if="getPointStatus==0">
                      {{canTakePrizeDays}}通道关闭
                    </div>
                    <div v-if="getPointStatus==0">
                      <div class="suBtn">
                        猛戳领取
                      </div>
                    </div>
                    <div class="orangeF" style="text-align: center;font-size:0.24rem;margin-bottom: 0.3rem;margin-top:0.3rem;" v-if="getPointStatus==2">
                      奖品已领取
                    </div>
                    <!-- <div class="suBtn" v-if="takePrizeDaysLimit==0">过领取时间，未领取</div> -->
                  </div>
                  <div v-else-if="winPrizeStatus==2" class="pools">
                    很遗憾，PK失败
                  </div>
                  <div v-else-if="winPrizeStatus==3" class="pools">
                    {{costPoint}}积分已返还
                  </div>
                </div>
              </div>

              <div style="display: flex;justify-content:space-between;font-size:0.24rem;color:#666;margin-bottom: 0.3rem;">
                <a style="color:#666" :href="`https://shop.m.suning.com/${shopId}.html`">
                  &lt; 进店逛逛</a>
                <div @click="isShowRule = true"> 活动规则 &gt; </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 活动规则 -->
    <div>
      <transition name="fase">
        <div class="common-mask" v-show="isShowRule" style="display: none"></div>
      </transition>
      <transition name="ease">
        <div class="common-content ruler" v-show="isShowRule" style="display: none">
          <div class="rulerContent">

            <p>1、活动时间：2021-01-05 15:07 至 2021-02-04 15:07；</p>
            <p> 2、参加本次活动消耗1积分；</p>
            <p> 3、PK结束后，选择人数多的一方为胜方，瓜分积分池中全部积分；若双方人数相同，则为平局，返还每个ID参与时消耗的积分；</p>
            <p>4、活动结束后1天内可领奖，超过时限未领取则视为自动放弃，不可再进行领取；</p>
            <p>5、【活动参与主体资格】</p>
            <p>（1）每位自然人用户仅能使用一个苏宁账号参与活动，微信号、QQ、苏宁帐号、手机号码等任一信息一致或指向同一用户的，视为同一个用户，则第一个参与本活动的账号参与结果有效，其余账号参与结果均视为无效。</p>
            <p>（2）若发现同一位用户使用不同账号重复参与活动，承办方有权取消其获奖资格。</p>

          </div>
          <a href="javascript:;" class="ruler-close" @click="isShowRule=false"></a>
        </div>
      </transition>
    </div>

    <!-- 曝光商品 -->
    <!-- <div v-if="wareList.length > 0" style="margin-top:0.3rem;">
      <div style="text-align: center ">
        <img style="height:0.31rem;" src="//img10.360buyimg.com/imgzone/jfs/t24745/278/2383924173/3420/d3a1fda4/5be43da0N8e36700a.png" />
      </div>
      <div>
        <ul class="draw-sign-list f-cb">
          <li v-for="(it,index) in wareList" :key="index">
            <div class="pic">
              <a>
                <img alt="" :src="it.logo" style="width: 100%">
              </a>
            </div>
            <div class="title">{{it.skuName}}</div>
            <div class="detail f-cb">
              <div class="f-fl">
                <div v-if="it.showType == 1" class="price">￥{{it.jdPrice}}</div>
                <div v-if="it.showType == 2" class="price">
                  <template v-if="it.promoPrice == '' || it.promoPrice == null">￥{{it.jdPrice}}</template>
                  <template v-else>￥{{it.promoPrice}}</template>
                </div>
              </div>
              <div class="f-fr">
                <a class="detail-btn">购买</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div> -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      shopId: this.$route.query.shopId || '', // 店铺id
      shopName: this.$route.query.shopName || '', // 店铺名字
      time: 30 * 60 * 60 * 1000,
      followShopChecked: false,
      isShowRule: false,
      activeTab: 0,
      rule: '',
      shopInfo: {
        shopName: '大连泊源科技有限公司测试店铺',
      }, // 店铺信息
      wareList: [{
        logo: 'https://img10.360buyimg.com/imgzone/jfs/t1/130245/4/18178/78084/5fc75f74Ef7fea4ed/c2a9ca608b4cc2df.png',
        showType: '1',
        skuName: '阿桑大事大撒旦',
        jdPrice: '50',
        promoPrice: '80'
      }, {
        logo: 'https://img10.360buyimg.com/imgzone/jfs/t1/130245/4/18178/78084/5fc75f74Ef7fea4ed/c2a9ca608b4cc2df.png',
        showType: '1',
        skuName: '阿桑大事大撒旦',
        jdPrice: '50',
        promoPrice: '80'
      }, {
        logo: 'https://img10.360buyimg.com/imgzone/jfs/t1/130245/4/18178/78084/5fc75f74Ef7fea4ed/c2a9ca608b4cc2df.png',
        showType: '1',
        skuName: '阿桑大事大撒旦',
        jdPrice: '50',
        promoPrice: '80'
      }, {
        logo: 'https://img10.360buyimg.com/imgzone/jfs/t1/130245/4/18178/78084/5fc75f74Ef7fea4ed/c2a9ca608b4cc2df.png',
        showType: '1',
        skuName: '阿桑大事大撒旦',
        jdPrice: '50',
        promoPrice: '80'
      }],
      actName: '猫可爱还是狗可爱',
      showImageRightSrc: 'https://img10.360buyimg.com/imgzone/jfs/t1/14045/40/6978/138035/5c668788E8abcaae6/7c7ae791c61399f4.png',
      showImageLeftSrc: 'https://img10.360buyimg.com/imgzone/jfs/t1/21063/32/6952/132931/5c66876bEb010b2c2/31782cbd69ac81f2.png',
      rightImgDesc: '猫可爱',
      leftImgDesc: '狗可爱',
      apiecePoint: '',
      costPoint: '100',
      noPoint: false,
      shareInfo: {
        title: '积分打call',
        content: '为你支持的一方打call，胜者瓜分积分',
        logoUrl: '/images/share/jfVS.png'
      },
      joinStatus: 0,
      voteChoice: '2',
      activityStatus: 2,
      winPrizeStatus: '3',
      leftPercent: '80',
      rightPercent: '20',
      pkResult: '3',
      canTakePrizeDays: '',
      chooseOne: '',
      showResultDays: '明天17:00',
      getPointStatus: '',
      takePrizeDaysLimit: '',
      showApiecePointOfJoins: '',
      choseLeftMans: '100',
      choseRightMans: '200',
      startTime: '',
      totalPoints: '800'
    };
  },
  methods: {
    followShop () {

    }
  }
};
</script>

<style lang="scss">
body {
  font-size: 0.32rem;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
html {
  background: #f2f2f2;
  font-size: 50px;
}
.point-pk {
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
  .share-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    width: 3.2rem;
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
    width: 3.2rem;
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
    width: 3.2rem;
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
    width: 3.2rem;
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
    left: 50%;
    transform: translateX(-50%);
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