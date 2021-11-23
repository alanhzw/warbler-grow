<!--
 * @Description:
 *      维修作业标准页面
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Standard.vue
-->
<template>
  <div class="standard-box">
    <common-title title='无维修作业标准'></common-title>
    <div class="img-box">
      <div class="standard-item" v-for='(item,index) in list' :key='index'>
        <a :href="item">
          <div class="left-top-icon">
            <img :src="magnifier" class="magnifier">
          </div>
        </a>
        <img :src="testImg" class="real-img">
      </div>
    </div>
  </div>
</template>
<script>
import CommonTitle from '../../components/CommonTitle.vue';
import testImg from '../../assets/docwork.png'
import magnifier from '../../assets/magnifier.png'
import { useStore } from 'vuex';
import { useRouter, useRoute } from "vue-router";
import { toRefs, reactive, onMounted } from 'vue'
import { getService, imgPath } from '../../service';
// 工单摘牌页面
export default {
  name: 'Standard',
  components: {
    CommonTitle
  },
  setup (props) {
    const service = getService();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      testImg: testImg,
      magnifier: magnifier,
      urlLink: "123213123",//下载链接
      list: []//文件列表
    });
    const getRepairWorkCriterion = () => {
      service.getRepairWorkCriterion({
        criterionItemCode: store.state.order.current.standardItemCode
      }).then((data) => {
        state.list = data.accessory.split(',')
        state.list = state.list.map((ele) => {
          return imgPath + ele
        })
        console.log('🚀🚀~state.list :', state.list);
      })
    }
    onMounted(() => {
      getRepairWorkCriterion()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss">
.standard-box {
  padding: 0.32rem;
  text-align: left;
  .img-box {
    margin: 0.32rem 0 0 0;
    position: relative;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .real-img {
      width: 1.58rem;
      height: 1.58rem;
      border-radius: 2px;
      border: 1px solid #dddddd;
      margin: 0 8px 8px 0;
    }
    .left-top-icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 0.32rem;
      height: 0.32rem;
      border-radius: 2px 0px 8px;
      background-color: #4fa0f7;
      display: flex;
      justify-content: center;
      align-items: center;
      .magnifier {
        width: 0.16rem;
        height: 0.16rem;
      }
    }
  }
  .standard-item {
    position: relative;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>