<!--
 * @Author: 一尾流莺
 * @Description:测评结果
 * @Date: 2021-10-15 11:06:22
 * @LastEditTime: 2021-11-27 18:13:01
 * @FilePath: \ired_resource\src\pages\evaluation\pages\selfResult\index.vue
-->
<template>
  <div class="self-result-box">
    <div class="title">测评结果</div>
    <div class="explain">
      <div class="style">{{result.code}}</div>
      <div class="result">{{result.title}}</div>
    </div>
    <div class="table">
      <result-item title="个性特征描述："
                   :content='result.description'></result-item>
      <result-item title="可能存在的盲点："
                   :content='result.blindSpot'></result-item>
      <result-item title="对组织的贡献："
                   :content='result.contributionOrganization'></result-item>
      <result-item title="个人发展建议："
                   :content='result.developmentSuggestions'></result-item>
      <result-item title="功能运用："
                   :content='result.functionApplication'></result-item>
      <result-item title="领导风格："
                   :content='result.leadershipStyle'></result-item>
      <result-item title="适合的岗位："
                   :content='result.tags'></result-item>
      <result-item title="职业类型----您适合的职业："
                   :content='result.occupationType'></result-item>
      <result-item title="适合的岗位特质："
                   :content='result.postCharacteristics'></result-item>
      <result-item title="潜在缺陷："
                   :content='result.potentialDefects'></result-item>
      <result-item title="性格类型："
                   :content='result.shortName'></result-item>
      <result-item title="问题解决方式："
                   :content='result.solution'></result-item>
      <result-item title="工作中的优势："
                   :content='result.workAdvantages'></result-item>
      <result-item title="工作中的劣势："
                   :content='result.workDisadvantages'></result-item>
      <result-item title="适合的工作环境："
                   :content='result.workEnvironment'></result-item>

    </div>
    <div class="btn-div">
      <div class="left-btn"
           @click="router.push('/evaluation')">重新测评</div>
      <div class="right-btn"
           @click="submit()">职业属性</div>
    </div>
  </div>
  <empty-div></empty-div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import EmptyDiv from '../../components/EmptyDiv.vue';
import ResultItem from '../../components/ResultItem.vue';

const router = useRouter();
const route = useRoute();

// @ts-ignore
const result = computed(() => JSON.parse(route.params.result));
console.log('🚀🚀~ result:', result.value);
// 提交
const submit = async () => {
  router.push({
    name: 'SelfAttribute',
    params: {
      result: JSON.stringify(result.value.tags),
    },
  });
};

</script>

<style lang='scss'>
.self-result-box {
  width: 1200px;
  max-height: calc(100vh - 180px);
  overflow: auto;
  margin: 0 auto;
  margin-top: 40px;
  padding: 40px 60px 100px 60px;
  box-sizing: border-box;
  background: #ffffff;
  font-family: PingFang SC-Regular, PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

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

  * {
    margin: 0;
    padding: 0;
    line-height: 1;
    box-sizing: border-box;
  }
  .title {
    font-size: 24px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #ed263d;
    line-height: 28px;
    text-align: left;
    width: 820px;
  }
  .explain {
    margin-top: 35px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 820px;
    height: 80px;
    background: #ED263D;
    border-radius: 0px 0px 0px 0px;
    padding: 20px 30px;
    opacity: 1;
    .style {
      font-size: 50px;
      font-family: Alibaba PuHuiTi-Heavy, Alibaba PuHuiTi;
      font-weight: 800;
      color: #ffffff;
      margin-right: 20px;
    }
    .result {
      font-size: 18px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .btn-div {
    display: flex;
    justify-content: center;
    margin-top: 70px;
    position: fixed;
    bottom: 0px;
    padding: 30px 0 30px 0;
    left: 50%;
    transform: translateX(-50%);
    min-width: 1200px;
    background-color: #fff;
    div {
      width: 120px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      cursor: pointer;
    }
    .left-btn {
      font-size: 14px;
      color: #999999;
      border: 1px solid #e8e8e8;
      margin-right: 30px;
    }
    .right-btn {
      border: 1px solid #ed263d;
      background: #ed263d;
      color: #ffffff;
    }
  }
}
</style>
