<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-04 15:53:19
 * @LastEditTime: 2020-12-23 14:18:30
 * @FilePath: \SNActivity\src\components\pointPK\NotStart.vue
-->
<template>
  <div class="not-start-box">
    <div v-if="pointPkForm.activityContent.activityStatus==1">
      <div style="margin-bottom:0.3rem;margin-top:0.3rem;">
        <ul class="couponul">
          <li class="couponlistitem">
            <div class="itemTitle">
              {{pointPkForm.activityContent.actName}}
            </div>
            <div class="itemImg" style="height:3.3rem;">
              <div class="imgDiv">
                <img style="width:100%;height:100%" :src="pointPkForm.activityContent.showImageLeftSrc" />
                <div class="descJx" style="background:#ccc">{{pointPkForm.activityContent.leftImgDesc}}</div>
              </div>
              <div class="imgDiv">
                <img style="width:100%;height:100%" :src="pointPkForm.activityContent.showImageRightSrc" />
                <div class="descJx" style="background:#ccc">{{pointPkForm.activityContent.rightImgDesc}}</div>
              </div>
              <img class="pkImgs" src="//img10.360buyimg.com/imgzone/jfs/t1/26709/15/6555/2983/5c53efd1Ec4da660f/77b6c0805a65406f.png" />
            </div>
            <div class="title" style="margin-bottom: 0.3rem;">
              <van-count-down :time="pointPkForm.activityContent.startTime" format="距离开始还有 DD 天 HH 时 mm 分 ss 秒" @finish="frash()"></van-count-down>
            </div>
            <div style="display: flex;justify-content:space-between;font-size:0.24rem;margin:0rem 0.3rem;color:#666;margin-bottom: 0.5rem;">
              <a style="color:#666" :href="`https://shop.m.suning.com/${form.shopInfo.sid}.html`">
                &lt; 进店逛逛</a>
              <div @click="setIsShowRule(true)"> 活动规则 &gt; </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props: {

  },
  methods: {
    ...mapMutations('pointPK', ['setIsShowRule']),
    frash () {
      window.location.reload();
    }
  },
  computed: {
    ...mapState(['form']),
    ...mapState('pointPK', ['pointPkForm'])
  },
  mounted () {
  }
};
</script>

<style lang="scss">
.not-start-box {
}
</style>