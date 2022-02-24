<!--
 * @Author: 一尾流莺
 * @Description:自我评价页面
 * @Date: 2021-10-15 11:06:22
 * @LastEditTime: 2021-11-27 17:23:17
 * @FilePath: \ired_resource\src\pages\evaluation\pages\self\index.vue
-->
<template>
  <div class="self-box">
    <div class="title">开始自我测评：</div>
    <div class="explain-t">在 MBTI 性格类型测试问卷结果分析中有对四个纬度八种偏好的详细描述，认真地自我评估一下，选择更接近你的选项做进一步评测。</div>
    <div class="table">
      <self-item :options='questionInfo[0]'></self-item>
      <self-item :options='questionInfo[1]'></self-item>
    </div>
    <div class="choose">
      <div class="choose-item">
        <el-radio v-model="selfTestList[map[number]].isSelect"
                  @change='select'
                  label="1"></el-radio>
      </div>
      <div class="choose-item">
        <el-radio v-model="selfTestList[map[number]].isSelect"
                  @change='select'
                  label="2"></el-radio>
      </div>
    </div>
    <div class="btn-div">
      <div class="left-btn"
           @click="router.push('/evaluation')"
           v-if="number === 0">退出测评</div>
      <div class="left-btn"
           @click="number -= 1"
           v-else>上一题</div>
      <div class="right-btn"
           v-if="number === 3"
           @click="submit">下一题</div>
      <div class="right-btn"
           @click="nextQues"
           v-else>下一题</div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import SelfItem from '../../components/SelfItem.vue';
import useGetSelfTestList from '../../apis/getSelfTestList';
import useSaveSelfTestAdd from '../../apis/saveSelfTestAdd';

const router = useRouter();

const { selfTestList, getSelfTestList } = useGetSelfTestList();

const { saveSelfTestAddResult, saveSelfTestAdd } = useSaveSelfTestAdd();

const map = ['firstDimension', 'secondDimension', 'thirdDimension', 'fourthDimension'];

// 当前题号
const number = ref(0);

// 当前题目详情
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
const questionInfo = computed(() => selfTestList.value[map[number.value]]);

// 选择题目
const select = (value:any) => {
  if (value === '1') {
    // @ts-ignore
    selfTestList.value[map[number.value]][0].isSelect = '1';
    // @ts-ignore
    selfTestList.value[map[number.value]][1].isSelect = '0';
  }
  if (value === '2') {
    // @ts-ignore
    selfTestList.value[map[number.value]][0].isSelect = '0';
    // @ts-ignore
    selfTestList.value[map[number.value]][1].isSelect = '1';
  }
};

// 提交保存
const submit = async () => {
  if (selfTestList.value[map[number.value]][0].isSelect === '0' && selfTestList.value[map[number.value]][1].isSelect === '0') {
    ElMessage({
      message: '请选择答案',
      type: 'error',
    });
    return;
  }
  const submitDate = JSON.parse(JSON.stringify(selfTestList.value));
  map.forEach((item) => {
    if (submitDate[item][0].isSelect === '1') {
      submitDate[item].splice(1, 1);
    } else {
      submitDate[item].splice(0, 1);
    }
  });
  await saveSelfTestAdd(submitDate);
  router.push({
    name: 'SelfLast',
    params: {
      result: JSON.stringify(saveSelfTestAddResult.value),
    },
  });
};

// 下一题
const nextQues = () => {
  if (selfTestList.value[map[number.value]][0].isSelect === '0' && selfTestList.value[map[number.value]][1].isSelect === '0') {
    ElMessage({
      message: '请选择答案',
      type: 'error',
    });
    return;
  }

  number.value += 1;
};

onMounted(async () => {
  await getSelfTestList();
});

</script>

<style lang='scss'>
.self-box {
  width: 1200px;
    max-height: calc(100vh - 180px);
    overflow: auto;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 40px 60px 30px 60px;
  box-sizing: border-box;
  background: #ffffff;
  font-family: PingFang SC-Regular, PingFang SC;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  .explain-t {
    margin-top: 10px;
    width: 820px;
    font-size: 18px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 27px;
  }
  .table {
    display: flex;
    width: 820px;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
  }
  .choose {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .choose-item {
      width: 410px;
      display: flex;
      justify-content: center;
    }
    .el-radio__label {
      visibility: hidden;
    }
    .el-radio__inner {
      width: 20px;
      height: 20px;
    }
    .el-radio__input.is-checked {
      background-color: #fff;
      .el-radio__inner {
        background-color: #fff;
        border-color: #ed263d;
      }
    }
    .el-radio__inner::after {
      width: 14px;
      height: 14px;
      background-color: #ed263d;
    }
    .el-radio__inner {
      background-color: #fff;
      border-color: #999999;
    }
  }
  .btn-div {
    display: flex;
    justify-content: center;
    margin-top: 30px;
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
           &:hover {
        border: 1px solid #ed263d;
      }
    }
    .right-btn {
      border: 1px solid #ed263d;
      background: #ed263d;
      color: #ffffff;
    }
  }
}
</style>
