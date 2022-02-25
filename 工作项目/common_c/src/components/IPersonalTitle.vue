<template>
  <div class="IPersonalTitle">
    <!-- 曼伦专用背景 -->
    <img v-if='+shopId === 1000002791' alt="" class="black_bg1" src="../assets/images/green.png">
    <img v-else-if='+shopId === 1000102783' alt="" class="black_bg" src="../assets/images/20220119_bg.png">
    <img v-else alt="" class="black_bg" src="../assets/images/black.png">
    <div class="IPersonalTitle_container">
      <img v-if='+shopId === 1000002791' alt="" class="card_bg" src="../assets/images/1000002791bg.png">
      <img v-else-if='+shopId === 1000102783' alt="" class="card_bg" src="../assets/images/20220119_top.png">
      <img v-else alt="" class="card_bg" src="../assets/images/center.png">
      <div class="title_top">
        <img v-if='msg.imageUrl' :src="msg.imageUrl" class="card_t">
        <img v-else :src="imageUrl" alt="" class="card_t">
        <div class="card_p">
          <p class="p_1" @click="goPeopleCenter">{{ msg.nickname }}
<!--            16731 C端，个人中心，不能再继续跳转，建议去掉导向符号＞-->
<!--            <van-icon name="arrow" size="0.24rem"/>-->
          </p>
          <p v-if="msg.grade" :class="`p_2 ${+shopId === 1000002791? 'p_Ml_bg': +shopId === 1000102783? 'p_2_bg1' :'p_2_bg'}`">
            <img :src="vImages[msg.grade]" alt="" class="card_v">
            {{ msg.gradeName }}
          </p>
          <p v-else class="p_3">
            非会员
            <span  class="p_3_color" v-if='+shopId === 1000102783' @click="toMemeber">立刻成为会员></span>
            <span v-else @click="toMemeber">立刻成为会员></span>
          </p>
        </div>
      </div>
      <div v-if='+shopId === 1000002791' class="title_bottom1" @click="toHistory">
        <p>{{ msg.curPoint }}</p>
        <img alt="" class="card_bg" src="../assets/images/money.png">
        <van-icon class="icon_history" name="arrow" size="0.24rem"/>
      </div>
      <div v-else class="title_bottom" @click="toHistory">
        <p>{{ msg.curPoint }}</p>
        <img alt="" class="card_bg" src="../assets/images/money.png">
        <van-icon class="icon_history" name="arrow" size="0.24rem"/>
      </div>

    </div>
  </div>
</template>
<script>
import { PointsService } from '@/http';

const defaultLevels = ['非会员', '一星会员', '二星会员', '三星会员', '四星会员', '五星会员'];
export default {
  name: 'IPersonalTitle',
  // msg数据格式
  // {
  //   nickname: '',
  //   curPoint: '',
  //   imageUrl: '',
  //   grade: 1,
  // }
  props: ['msg', 'shopId'],
  data() {
    return {
      // msg: {
      //   nickname: '121',
      //   curPoint: '1',
      //   imageUrl: '12345',
      //   grade: 1,
      //   gradeName: 'hahah',
      // },
      // shopId: 1000102783,
      imageUrl: require('../assets/images/avatar.png'),
      vImages: ['', require('../assets/images/v1.png'), require('../assets/images/v2.png'), require('../assets/images/v3.png'), require('../assets/images/v4.png'), require('../assets/images/v5.png')],
      levels: [...defaultLevels],
    };
  },
  async created() {
    const { data } = await PointsService.getRules();
    try {
      this.levels = data.pointRule.levelPointData.map((level) => levelName) || [...defaultLevels];
    } catch (e) {
      this.levels = [...defaultLevels];
    }
  },
  methods: {
    goPeopleCenter() {
      if (this.$route.name === 'PersonalCenter') {
        return;
      }
      this.$router.push({
        name: 'PersonalCenter',
        params: {
          shopId: sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId') || null,
        },
      });
    },
    toMemeber() {
      this.$toast('二期开发内容');
      // return;
      // this.$router.push({
      //   name: '',
      // });
    },
    toHistory() {
      this.$router.push({
        name: 'PointsHistory',
      });
    },
    // 默认图片
    failImgShow(event) {
      event.currentTarget.src = this.imageUrl;
    },
  },
};
</script>
<style scoped>
.IPersonalTitle {
  width: 100%;
  height: 3.58rem;
  background: #ffffff;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.black_bg {
  width: 100%;
  position: absolute;
  left: 0;
  top: -1.5rem;
  z-index: 1;
}

.black_bg1 {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.IPersonalTitle_container {
  position: absolute;
  top: 0.31rem;
  left: 0.3rem;
  right: 0.3rem;
  z-index: 2;
}

.card_bg {
  width: 100%;
  border-radius: 10px;
}

.title_top {
  width: 100%;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-start;
}

.card_t {
  width: 0.7rem;
  height: 0.7rem;
  /* border: 1px solid #ffffff; */
  border-radius: 50%;
}

.card_p {
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 0.2rem;
  height: 0.8rem;
  /* display: flex;
  flex-direction: column; */
  position: relative;
}

.p_1 {
  margin: 0;
  font-size: 0.30rem;
  color: #ffffff;
  text-align: left;
  margin-bottom: 0.02rem;
  display: flex;
  line-height: 0.4rem;
}

.p_1 >>> .van-icon {
  margin-top: 0.08rem;
  margin-left: 0.1rem;
}

.p_2 {
  height: 0.38rem;
  font-size: 0.24rem;
  line-height: 0.38rem;
  color: #ffffff;
  padding: 0.01rem 0.12rem 0.01rem 0.02rem;
  box-sizing: border-box;
  border-radius: 0.17rem;
  display: flex;
  position: absolute;
  top: 0.38rem;
  /* left: -0.05rem; */
}

.p_2_bg {
  background: #96a4b3;
}
.p_2_bg1 {
  background: #003292;
}

.p_Ml_bg {
  background: #ceb372;
}

.p_3 {
  height: 0.38rem;
  font-size: 0.24rem;
  line-height: 0.38rem;
  color: #ffffff;
  box-sizing: border-box;
  border-radius: 0.17rem;
  display: flex;
}

.p_3 span {
  margin-left: 0.3rem;
  color: #357fc8;
}
.p_3 .p_3_color {
  margin-left: 0.3rem;
  color: #ffffff!important;
}
.card_v {
  width: 0.31rem;
  height: 0.31rem;
  margin-top: 0.01rem;
  margin-left: 0.01rem;
  margin-right: 0.1rem;
}

.title_bottom {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 1rem;
  top: 1.5rem;
  color: #ffffff;
}

.title_bottom1 {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 0.5rem;
  top: 1.9rem;
  color: #ffffff;
}

.title_bottom1 p, .title_bottom p {
  font-size: 0.7rem;
}

.title_bottom1 img, .title_bottom img {
  width: 0.5rem;
  height: 0.6rem;
  padding-top: 0.08rem;
  padding-left: 0.24rem;
}

.icon_history {
  top: 0.3rem;
  left: 0.2rem;
}
</style>
