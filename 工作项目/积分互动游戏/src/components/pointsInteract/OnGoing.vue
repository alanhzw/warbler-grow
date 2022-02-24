<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-04 15:53:52
 * @LastEditTime: 2021-01-13 16:56:29
 * @FilePath: \SNActivity\src\components\pointsInteract\OnGoing.vue
-->
<template>
  <div v-if="pointPkForm.activityContent.activityStatus==2">
    <div>
      <div style="margin-bottom:0.3rem;margin-top:0.3rem;">
        <ul class="couponul">
          <!-- 未参加 -->
          <li class="couponlistitem" v-if="pointPkForm.activityContent.joinStatus==0">
            <div class="itemTitle">
              {{pointPkForm.activityContent.actName}}
            </div>
            <div class="itemImg" style="height:3rem">
              <div class="imgDiv">
                <img style="width:100%;height:100%" :src="pointPkForm.activityContent.showImageLeftSrc" />
                <div class="check1" style="left:0.9rem;width:1.4rem;background: rgba(1,153,250,0.8)">
                  <span><input type="radio" name="vote" class="input_check1" id="check2" value="1"><label for="check2"></label></span>
                </div>
              </div>
              <div class="imgDiv">
                <img style="width:100%;height:100%" :src="pointPkForm.activityContent.showImageRightSrc" />
                <div class="check1" style="left:0.9rem;width:1.4rem;background: rgba(255,80,112,0.6)">
                  <span><input type="radio" class="input_check1" name="vote" id="check3" value="2"><label for="check3"></label></span>
                </div>
              </div>
              <img class="pkImgs" src="//img10.360buyimg.com/imgzone/jfs/t1/26709/15/6555/2983/5c53efd1Ec4da660f/77b6c0805a65406f.png" />
            </div>
            <div style="overflow: hidden;padding: 0rem 0.2rem;">
              <p class="imgDes">{{pointPkForm.activityContent.leftImgDesc}}</p>
              <p class="imgDes" style="color:#ff5070">{{pointPkForm.activityContent.rightImgDesc}}</p>
            </div>
            <div style="margin-left:0.3rem;padding: 0rem 0.2rem;margin-top: 0.4rem;">
              <div style="text-align: center;font-size:0.24rem;color:#666">
                {{pointPkForm.activityContent.showResultDays}}开奖
              </div>
              <div style="text-align: center;color:#666;font-size:0.24rem;margin:0.1rem 0rem 0.35rem 0rem;">
                {{pointPkForm.activityContent.costPoint}}积分/票,胜方瓜分<span class="orangeF">{{pointPkForm.activityContent.totalPoints}}</span>积分
              </div>
            </div>
            <div class="callPked" @click="joinActivity()">
              {{pointPkForm.activityContent.costPoint}}积分打call
            </div>
            <div style="margin-top:0.15rem;">
              <div class="shareFriend" @click="share()">
                邀请好友一起玩
              </div>
            </div>
            <template>
              <div style="display: flex;align-items: center;justify-content: center;margin: 0.2rem 0rem;">
                <div @click="followShop()">
                  <el-checkbox v-model="pointPkForm.activityContent.followShopChecked" @change="changeFollowShopChecked()">
                    <span style="color:rgb(102, 102, 102)">同时关注{{form.shopInfo.shopName}}</span>
                  </el-checkbox>
                </div>
              </div>
            </template>
            <div style="display: flex;justify-content:space-between;font-size:0.2rem;margin:0rem 0.3rem;color:#666;margin-bottom: 0.5rem;">
              <a style="color:#666" :href="`https://shop.m.suning.com/${form.shopInfo.sid}.html`">
                &lt; 进店逛逛</a>
              <div @click="pointPkForm.isShowRule = true"> 活动规则 &gt; </div>
            </div>
          </li>
          <!-- 已参加 -->
          <li class="couponlistitem" v-if="pointPkForm.activityContent.joinStatus==1">
            <div class="itemTitle">
              {{pointPkForm.activityContent.actName}}
            </div>
            <div class="itemImg" style="height:3rem">
              <div class="imgDiv">
                <img style="width:100%;height:100%" :src="pointPkForm.activityContent.showImageLeftSrc" />
                <p class="imgDEsr" style="left:0rem;bottom:0rem">{{pointPkForm.activityContent.leftPercent}}%</p>
                <div v-if="pointPkForm.activityContent.voteChoice==1" class="descJx" style="left:0.9rem;width:1.4rem;background: rgba(1,153,250,0.8)">已选</div>
              </div>
              <div class="imgDiv">
                <img style="width:100%;height:100%" :src="pointPkForm.activityContent.showImageRightSrc" />
                <p class="imgDEsr" style="right:0rem;bottom:0rem">{{pointPkForm.activityContent.rightPercent}}%</p>
                <div v-if="pointPkForm.activityContent.voteChoice==2" class="descJx" style="left:0.9rem;width:1.4rem;background: rgba(255,80,112,0.6)">已选</div>
              </div>
              <img class="pkImgs" src="//img10.360buyimg.com/imgzone/jfs/t1/26709/15/6555/2983/5c53efd1Ec4da660f/77b6c0805a65406f.png" />
            </div>
            <div style="overflow: hidden;padding: 0rem 0.2rem;">
              <p class="imgDes">{{pointPkForm.activityContent.leftImgDesc}}</p>
              <p class="imgDes" style="color:#ff5070">{{pointPkForm.activityContent.rightImgDesc}}</p>
            </div>
            <div style="margin-left:0.3rem;padding: 0rem 0.2rem;margin-top: 0.3rem">
              <div class="orangeF" style="text-align: center;font-size:0.24rem;">
                打call成功，等待揭晓
              </div>
              <div style="text-align: center;color:#666;font-size:0.4rem;margin:0rem 0rem 0.2rem 0rem;">
                胜方瓜分<span class="orangeF">{{pointPkForm.activityContent.totalPoints}}</span>积分
              </div>
              <div style="text-align: center;color:#666;font-size:0.24rem;margin-bottom: 0.3rem;">
                {{pointPkForm.activityContent.showResultDays}}开奖
              </div>
            </div>
            <div style="margin-top:0.2rem;">
              <div class="shareFriend" @click="share()">
                邀请好友一起玩
              </div>
            </div>
            <div style="display: flex;justify-content:space-between;font-size:0.24rem;margin:0rem 0.3rem;color:#666;margin-bottom: 0.5rem;">
              <a style="color:#666" :href="`https://shop.m.suning.com/${form.shopInfo.sid}.html`">
                &lt; 进店逛逛</a>
              <div @click="setIsShowRule(true)"> 活动规则 &gt;</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 调用map辅助函数
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  props: {},
  methods: {
    ...mapActions(['followShop', 'joinActivity', 'share']),
    ...mapActions('pointPK', ['joinActivity']),
    ...mapMutations(['changeFollowShopChecked']),
    ...mapMutations('pointPK', ['setIsShowRule']),
  },
  computed: {
    ...mapState(['form']),
    ...mapState('pointPK', ['pointPkForm'])
  },
  mounted () { }
};
</script>

<style lang = "scss">
.shareFriend {
  margin: 0 auto;
}
.callPked {
  margin: 0 auto !important;
}
</style>