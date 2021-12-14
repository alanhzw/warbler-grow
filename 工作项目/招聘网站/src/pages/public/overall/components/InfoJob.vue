<!--
 * @Author: 一尾流莺
 * @Description:招聘岗位
 * @Date: 2021-09-28 17:29:15
 * @LastEditTime: 2021-12-03 15:50:59
 * @FilePath: \ired_resource\src\pages\public\overall\components\InfoJob.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="info-job">
    <el-tabs type="border-card"
             v-model='tabValue'
             @tab-click='changeTab'>
      <el-tab-pane v-for="item in postData"
                   :key="item.classificationValue"
                   :name='item.classifyName'
                   :label="item.classifyName">
        <div class="job-list">
          <div v-for="(job, jIndex) in item.postDatas"
               class="job-item"
               @click="changePosition(job,jIndex)"
               :class="{'currentItem':currentIndex === jIndex}"
               :key="job.recruitmentInfoId">{{ job.postName }}({{ job.recruitmentCount }})</div>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, computed,ref ,defineEmits, onMounted,watch} from 'vue';
import emitter from '@/utils/mitt'
const emit = defineEmits(['handleGetJobDetails'])


const currentIndex = ref(0)

const props = defineProps({
  postData: {
    default: () => ([]),
  },
  tabIndex:{
    default: () => 0,
  },
});



const currentTabIndex = ref(0)

const tabValue = computed(()=>{
  return props.postData[currentTabIndex.value]?.classifyName
})



// 切换职位
const changePosition = (info:any,index:number)=>{
  currentIndex.value = index;
  emit("handleGetJobDetails",info.recruitmentInfoId)
}

// 切换岗位
const changeTab = (e:any)=>{
  currentTabIndex.value = Number(e.index)
  currentIndex.value = 0
  emit("handleGetJobDetails",props.postData[Number(e.index)].postDatas[0].recruitmentInfoId)
}


const changeTabIndex = ()=>{
  currentTabIndex.value =0
  currentIndex.value = 0
  emit("handleGetJobDetails",props.postData[0].postDatas[0].recruitmentInfoId)

}
// 监听事件,更新数据
emitter.on('change-tab', changeTabIndex);

let n = 0

watch(props,
  ({tabIndex}) => {
    if(n<2){
      currentTabIndex.value = tabIndex
    }
    n++
  },
  {deep: true}
)

onMounted(()=>{
})
</script>

<style lang='scss'>
@import "styles/_variables.scss";

.info-job {
  * {
    transition: none !important;
  }
  .el-tabs--border-card {
    border: none;
    box-shadow: none;
  }
  .el-tabs--border-card > .el-tabs__header {
    background-color: transparent;
    border: none;
  }
  .el-tabs__nav-scroll {
    background-color: #f8f8f8;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item + .el-tabs__item {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    color: #222222;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    border: none;
    color: $MAIN_COLOR !important;
    font-size: 16px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: bold;
  }
  .el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:not(.is-disabled):hover {
    color: $MAIN_COLOR !important;
  }
  .is-top {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    color: #222222 !important;
  }
  .job-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .job-item {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #656565;
    margin: 15px;
    cursor: pointer;

    // &:hover{
    //   color: #ED263D;
    //   text-decoration: underline;
    // }
  }
  .currentItem{
      color: #ED263D;
      text-decoration: underline;
  }
}
</style>
