<!--
 * @Author: 一尾流莺
 * @Description:左侧公司列表
 * @Date: 2021-09-28 17:28:03
 * @LastEditTime: 2021-11-17 18:19:35
 * @FilePath: \ired_resource\src\pages\public\overall\components\OverallList.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="overall-list">
    <!-- 标题 -->
    <div class="title">招聘企业</div>
    <empty-div height="20px"></empty-div>

    <!-- 公司列表 -->
    <div class="list">
      <!-- 单个公司 -->
      <div class="item"
           :class="{'bgcolor':index === currentIndex}"
           @click='changePosition(item.companyId,index)'
           v-for="(item,index) in companyList"
           :key="index">
        <!-- 图标 -->
        <div class="icon">
          <img :src="item.logoUrl" />
        </div>
        <!-- 名称 -->
        <div class="name">{{ item.fullName }}</div>
        <!-- 招聘职位数量 -->
        <div class="quantity">招聘职位 ({{ item.recruitmentCount }})</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted,defineProps,ref,defineEmits } from 'vue';
import EmptyDiv from './EmptyDiv.vue';
import emitter from '@/utils/mitt'

// 当前索引
const currentIndex = ref(0)

const props = defineProps({
  companyList: {
    default: () => [{
      logoUrl:"",
      fullName:"",
      recruitmentCount:""
    }],
  },
});

const emit = defineEmits(['getPostDataByCompanyId'])

// 切换公司
const changePosition = async (companyId:any,index:number)=>{
  currentIndex.value = index;
  emit('getPostDataByCompanyId',companyId)
  emitter.emit('change-tab');
}
</script>

<style lang='scss'>
.overall-list {
  .title {
    font-size: 24px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: bold;
    color: #222222;
  }
  .list {
    width: 386px;
    max-height: 480px;
    border: 1px solid #e8e8e8;
    overflow: auto;
    box-sizing: border-box;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      position: absolute;
      right: 30px;
      /*滚动条整体样式*/
      width: 6px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 0px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background-color: #999999;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      /* 阴影 */
      background: transparent;
    }

    .item {
      width: 384px;
      height: 80px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      background-color: #fff;
      cursor: pointer;

      .icon {
        margin-left: 20px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border:1px solid #F9F9F9;
        }
      }
      .name {
        margin-left: 10px;
        width: 165px;
        color: #222222;
        font-size: 18px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .quantity {
        margin-left: 30px;
        color: #999999;
        font-size: 12px;
        font-family: PingFang SC-Regular, PingFang SC;
      }
    }
    .bgcolor{
      background-color: #F8F8F8;
    }
  }
}
</style>
