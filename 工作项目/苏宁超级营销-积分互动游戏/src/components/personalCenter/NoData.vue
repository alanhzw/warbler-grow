<!--
 * @Description:没有数据时候显示的内容
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 18:44:52
 * @LastEditTime: 2021-01-08 14:04:10
 * @FilePath: \SNActivity\src\components\personalCenter\NoData.vue
-->
<template>
  <div class="no-data-box">
    <div class="no-data" v-if="dataList.length === 0">
      <img class="no-data-image" :src="noDataImg">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    dataList: {
      default: () => ([]),
    },
  },
  data () {
    return {
      noDataImg: require('../../assets/img/no-data.png'), // 没有数据时候显示的图片
    };
  },
  methods: {

  }
};
</script>

<style lang="scss">
.no-data-box {
  .no-data {
    text-align: center;
    margin-top: 2rem;

    .no-data-image {
      width: 2rem;
      height: 2rem;
    }

    p {
      margin: 0;
      text-align: center;
      font-size: 0.25rem;
      color: #c9c9c9;
    }
  }
}
</style>