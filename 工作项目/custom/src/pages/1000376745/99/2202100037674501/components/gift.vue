/**
 * @Description:caoshijie
 * @Date: 2022/1/17
 * @Description: 雅诗兰黛复购礼 2月
 * @FilePath:src\pages\1000376745\99\2202100037674501\components\gift.vue
*/
<template>
  <div class='gift'>
    <slot><img style='width: 100%;display: block;border-radius: 0.1rem;' src='../assets/gift.png' /></slot>
    <!--    <div class="title" v-html="title"></div>-->
    <!--    <div class="tips">-->
    <!--      <div class="tip">-->
    <!--        <p class="tipName">&nbsp;小棕瓶精华 &nbsp;</p>-->
    <!--        1.5mlx2-->
    <!--      </div>-->
    <!--      <div class="tip">-->
    <!--        +-->
    <!--        <p class="tipName lin2">&nbsp;樱花微精华液 &nbsp;</p>-->
    <!--        1.5ml+-->
    <!--        <p class="tipName">&nbsp;DW粉底液 &nbsp;</p>-->
    <!--        1ml-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script lang='ts' setup>
const title = '恭喜您获得复购有礼资格</br>购买正装产品即享明星试用4件套！';
</script>

<style lang='scss'>
.gift {
  position: relative;
  overflow: hidden;
  border-radius: .5rem;
}

.title {
  position: absolute;
  right: 1rem;
  top: 0.1rem;
  text-align: center;
  font-size: 0.2rem;
  font-weight: 600;
  color: #fff;
}

.tips {
  position: absolute;
  right: 0.9rem;
  bottom: 0.2rem;
  text-align: center;
  font-size: 0.16rem;
  font-weight: 600;
  color: #fff;
  line-height: 0.3rem;

  .tipName {
    font-weight: 300;
    display: inline-block;
    position: relative;

    &::after {
      content: "Ⅰ";
      position: absolute;
      right: -0.03rem;
      top: -0.05rem;
    }

    &:nth-child(1).lin2::after {
      content: "Ⅳ";
    }

    &:nth-child(2)::after {
      content: "Ⅸ";
    }
  }
}
</style>
