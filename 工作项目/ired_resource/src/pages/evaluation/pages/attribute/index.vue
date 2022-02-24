<!--
 * @Author: 一尾流莺
 * @Description:职业属性
 * @Date: 2021-10-15 10:04:49
 * @LastEditTime: 2021-11-22 17:47:04
 * @FilePath: \ired_resource\src\pages\evaluation\pages\attribute\index.vue
-->
<template>
  <div class="attribute-box">
    <div class="text">根据你的测试结果，我们为你推荐以下职业：</div>
    <div class="jobs">
      <div class="item"
           v-for='item in result'
           :key='item'>{{item}}</div>
    </div>
    <div class="choose">
      <div class="btn-1">
        <el-checkbox v-model="checked"
                     @change="changeCheck"></el-checkbox>
      </div>
      <div class="txt">是否允许企业查看我的测评结果，若允许应聘成功率更高哦</div>
    </div>
    <div class="btn-2">
      <div class="btn-content">
        <div class="explain"
             @click="router.push('/')">前往人力资源广场查看更多职位</div>
        <div class="icon">
          <div class="arraw">></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';
import useEvaluationDisplay from '../../apis/evaluationDisplay';
import useViewable from '../../apis/viewable';

const { evaluationDisplayResult, evaluationDisplay } = useEvaluationDisplay();
const { viewableResult, viewable } = useViewable();

const router = useRouter();

const route = useRoute();
// @ts-ignore
const result = computed(() => JSON.parse(route.params.result).split(','));

const checked = ref(false);

// 获取状态
const getStatus = async () => {
  await evaluationDisplay();
  checked.value = evaluationDisplayResult.value;
};

// 改变状态
const changeCheck = async (e:any) => {
  await viewable(e);
  getStatus();
};

onMounted(async () => {
  await getStatus;
});

</script>

<style lang='scss'>
.attribute-box {
  width: 1200px;
    max-height: calc(100vh - 180px);
    overflow: auto;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 140px 155px 85px 155px;
  box-sizing: border-box;
  background: #ffffff;
  font-family: PingFang SC-Regular, PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

&::-webkit-scrollbar {
      position: absolute;
      right: 30px;
      /*滚动条整体样式*/
      width: 3px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 3px;
      }

      &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          background-color: #D7DDE4;
          border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          /* 阴影 */
          -webkit-box-shadow: inset 0 0 5px #fff;
          background: #fff;
      }

  .text {
    width: 820px;
    text-align: left;
    font-size: 24px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
  }
  .jobs {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 200px;
      height: 67px;
      line-height: 67px;
      text-align: center;
      background: #f8f8f8;
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      border: 1px solid #e8e8e8;
    }
  }
  .choose {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    .btn-1 {
      .el-checkbox__input.is-checked .el-checkbox__inner{
          background-color: #ed263d;
          border-color: #ed263d;
          border-radius: 50%;
      }
      .el-checkbox__inner{
        background-color: #fff;
          border-color: #999999;
          border-radius: 50%;
      }
    }
    .txt {
      width: 820px;
      text-align: left;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 40px;
      margin-left: 10px;
    }
  }
  .btn-2 {
    width: 820px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    .btn-content {
      margin-top: 270px;
      width: 498px;
      height: 58px;
      background: #f8f8f8;
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      border: 1px solid #e8e8e8;
      line-height: 58px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .explain {
        font-size: 18px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ed263d;
      }
      .icon {
          margin-left: 10px;

         width: 18px;
          height: 18px;
          background-color: #ed263d;
          border-radius: 50%;
          position: relative;
        .arraw{
          height: 100%;
          position: absolute;
          top: -22px;
          left: 4px;
          color: #fff;
        }
      }
    }
  }
}
</style>
