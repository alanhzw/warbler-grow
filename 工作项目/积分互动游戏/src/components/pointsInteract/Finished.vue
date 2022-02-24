<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-04 15:54:07
 * @LastEditTime: 2020-12-23 13:47:44
 * @FilePath: \SNActivity\src\components\pointPK\Finished.vue
-->
<template>
  <div class="finished-box">
    <div v-if="pointPkForm.activityContent.activityStatus==4||pointPkForm.activityContent.activityStatus==3">
      <div style="margin-bottom:0.3rem;margin-top:0.3rem;">
        <ul class="couponul">
          <li class="couponlistitem">
            <div class="itemTitle">
              {{pointPkForm.activityContent.actName}}
            </div>
            <div class="itemImg">
              <div class="imgDiv">
                <img style="width:100%;height:100%;border-bottom-left-radius:0rem;border-bottom-right-radius:0rem;" :src="pointPkForm.activityContent.showImageLeftSrc" />
                <img class="choose" v-if="pointPkForm.activityContent.voteChoice==1" src="//img10.360buyimg.com/imgzone/jfs/t1/14809/22/6867/2338/5c63d250Ee2ba549d/85eb7de45be81bba.png" />
                <p class="detailT" :class="{ 'blueBg': pointPkForm.activityContent.pkResult==1||pointPkForm.activityContent.pkResult==3}">
                  <span class="tiket">{{pointPkForm.activityContent.choseLeftMans}}票</span>
                  <span class="descri">{{pointPkForm.activityContent.leftImgDesc}}</span>
                  <img v-if="pointPkForm.activityContent.pkResult==1&&pointPkForm.activityContent.voteChoice==1||pointPkForm.activityContent.pkResult==1&&pointPkForm.activityContent.voteChoice==0" class="winImg"
                    src="//img10.360buyimg.com/imgzone/jfs/t1/32588/26/1563/1882/5c53efd1E22b10b07/9cdad669b0e1bd63.png" />
                  <img v-if="pointPkForm.activityContent.pkResult==2&&form.voteChoice==1" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/14243/23/6877/1899/5c63c0a8E84a881f2/7c3f81779164ba42.png" />
                  <img v-if="pointPkForm.activityContent.pkResult==3" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/29236/12/7000/1816/5c63de43Ebcb382a9/42d4eaa49d5b53e1.png" />
                </p>
              </div>
              <div class="imgDiv">
                <img style="width:100%;height:100%;border-bottom-left-radius:0rem;border-bottom-right-radius:0rem;" :src="pointPkForm.activityContent.showImageRightSrc" />
                <img class="choose" style="width:0.83rem;" src="//img10.360buyimg.com/imgzone/jfs/t1/14809/22/6867/2338/5c63d250Ee2ba549d/85eb7de45be81bba.png" v-if="pointPkForm.activityContent.voteChoice==2" />
                <p class="detailT" :class="{ 'pinkBg': pointPkForm.activityContent.pkResult==2||pointPkForm.activityContent.pkResult==3}">
                  <span class="tiket">{{pointPkForm.activityContent.choseRightMans}}票</span>
                  <span class="descri">{{pointPkForm.activityContent.rightImgDesc}}</span>
                  <img v-if="pointPkForm.activityContent.pkResult==2&&pointPkForm.activityContent.voteChoice==2||pointPkForm.activityContent.pkResult==2&&pointPkForm.activityContent.voteChoice==0" class="winImg"
                    src="//img10.360buyimg.com/imgzone/jfs/t1/32588/26/1563/1882/5c53efd1E22b10b07/9cdad669b0e1bd63.png" />
                  <img v-if="pointPkForm.activityContent.pkResult==1&&pointPkForm.activityContent.voteChoice==2" class="winImg"
                    src="//img10.360buyimg.com/imgzone/jfs/t1/14243/23/6877/1899/5c63c0a8E84a881f2/7c3f81779164ba42.png" />
                  <img v-if="pointPkForm.activityContent.pkResult==3" class="winImg" src="//img10.360buyimg.com/imgzone/jfs/t1/29236/12/7000/1816/5c63de43Ebcb382a9/42d4eaa49d5b53e1.png" />
                </p>
              </div>
            </div>
            <div style="margin:0 0.3rem;margin-top:1rem">
              <div v-if="pointPkForm.activityContent.joinStatus==0">
                <div class="pools" style="line-height:0.5rem;margin-top: 2rem" v-if="pointPkForm.activityContent.pkResult==3">
                  活动已结束<br>
                </div>
                <div class="pools" style="line-height:0.5rem;" v-else>
                  活动已结束<br>
                  胜方已经瓜分 <span class="orangeF">{{pointPkForm.activityContent.totalPoints}}</span>积分
                </div>
              </div>
              <div v-if="pointPkForm.activityContent.joinStatus==1">
                <div v-if="pointPkForm.activityContent.activityStatus==3" class="pools">
                  活动已结束
                </div>
                <div v-if="pointPkForm.activityContent.activityStatus==4">
                  <div v-if="pointPkForm.activityContent.winPrizeStatus==1">
                    <div class="orangeF" style="font-size: 0.24rem;text-align: center;margin-top:0.2rem">恭喜PK获胜</div>
                    <div style="text-align: center;color:#666;font-size:0.4rem;margin:0rem 0rem 0.15rem 0rem;">
                      获得<span class="orangeF">{{pointPkForm.activityContent.showApiecePointOfJoins}}</span>积分
                    </div>
                    <div style="text-align: center;color:#666;font-size:0.24rem;margin-bottom: 0.2rem;" v-if="pointPkForm.activityContent.getPointStatus==0">
                      {{pointPkForm.activityContent.canTakePrizeDays}}通道关闭
                    </div>
                    <div v-if="pointPkForm.activityContent.getPointStatus==0">
                      <div class="suBtn" @click="getPoint()">
                        猛戳领取
                      </div>
                    </div>
                    <div class="orangeF" style="text-align: center;font-size:0.24rem;margin-bottom: 0.3rem;margin-top:0.3rem;" v-if="pointPkForm.activityContent.getPointStatus==2">
                      奖品已领取
                    </div>
                  </div>
                  <div v-else-if="pointPkForm.activityContent.winPrizeStatus==2" class="pools">
                    很遗憾，PK失败
                  </div>
                  <div v-else-if="pointPkForm.activityContent.winPrizeStatus==3" class="pools">
                    {{pointPkForm.activityContent.costPoint}}积分已返还
                  </div>
                </div>
              </div>
              <div style="display: flex;justify-content:space-between;font-size:0.24rem;color:#666;margin-bottom: 0.3rem;">
                <a style="color:#666" :href="`https://shop.m.suning.com/${form.shopInfo.sid}.html`">
                  &lt; 进店逛逛</a>
                <div @click="setIsShowRule(true)"> 活动规则 &gt; </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  props: {

  },
  data () {
    return {
    };
  },
  methods: {
    ...mapActions('pointPK', ['getPoint', 'joinActivity']),
    ...mapMutations('pointPK', ['setIsShowRule']),

  },
  computed: {
    ...mapState(['form']),
    ...mapState('pointPK', ['pointPkForm']),
  },
  mounted () {
  }
};
</script>

<style lang = "scss">
.suBtn {
  margin: 0 auto;
}
</style>