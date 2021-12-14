<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-04 15:54:53
 * @LastEditTime: 2020-12-22 18:49:15
 * @FilePath: \SNActivity\src\components\common\ShowGoods.vue
-->
<template>
  <div class="show-goods-box">
    <div v-if=" wareList.length> 0" style="margin-top:0.3rem;">
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['wareList'])
  },
  methods: {

  },
  mounted () {

  }
};
</script>

<style>
</style>