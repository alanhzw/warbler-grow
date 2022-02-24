<template>
  <div class="question-view">
    <div class="title">问题:{{ data.content }}</div>

    <div class="answer">
      <div class="answer-content" :class="{'gray':currentAs?.id===item.id}" @click="changeAs(item)"
           v-for="(item,index) in data.vivoComedyAnswerInfoList" :key="item.id">
        {{ String.fromCharCode(65 + parseInt(index)) }}.{{ item.content }}
      </div>
    </div>
    <div class="submit-btn" @click="submit()"></div>
    <div class="close-btn" @click="closeDialog"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps, inject } from 'vue';
import { Toast } from 'vant';

const props = defineProps({ qaData: Object });
const data = computed(() => props.qaData);
const emit = defineEmits(['closeMem', 'getAnswer']);
const closeDialog = () => {
  emit('closeChance', 'chanceDialog');
};

// 选择的当前答案
const currentAs = ref(null);
// 切换答案
const changeAs = (item: any) => {
  currentAs.value = item;
};
// 提交答案
const submit = () => {
  if (currentAs.value?.id) {
    const obj = {
      questionId: data.value.id,
      answerId: currentAs.value.id,
      isRightKey: currentAs.value.isRightKey,
    };
    emit('getAnswer', obj);
  } else {
    Toast('请先选择选项!');
  }
};
</script>

<style lang='scss'>

.gray {
  /*grayscale(val):val值越大灰度就越深*/
  -webkit-filter: grayscale(100%) brightness(1);
  -moz-filter: grayscale(100%) brightness(1);
  -ms-filter: grayscale(100%) brightness(1);
  -o-filter: grayscale(100%) brightness(1);
  filter: grayscale(100%) brightness(1);
  filter: gray brightness;
}

.question-view {
  width: 5.8rem;
  height: 8rem;
  padding: 2.5rem 0.5rem 1.5rem;
  box-sizing: border-box;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/210308/20/11534/78998/61add135E7004ddce/75d7fa6c27ccd1bb.png") no-repeat;
  background-size: 100%;

  .title {
    width: 100%;
    height: 1rem;
    margin: .2rem auto;
    align-items: center;
    color: #FFFFFF;
    font-size: .3rem;
  }

  .answer {

    .answer-content {
      margin: .1rem auto;
      font-size: .25rem;
      line-height: .2rem;
      background: #ffc50b;
      border-radius: .5rem;
      border: solid 2px #000000;
      padding: .1rem;
      box-sizing: border-box;
    }
  }

  .submit-btn {
    width: 4.4rem;
    height: 1rem;
    position: absolute;
    bottom: 1.2rem;
  }

  .goOpen-btn {
    position: absolute;
    top: 3.4rem;
    left: 0.4rem;
    height: .6rem;
    width: 2.5rem;
  }

  .attention-btn {
    position: absolute;
    top: 3.4rem;
    left: 3rem;
    height: .6rem;
    width: 2.5rem;
  }
  .close-btn {
    width: 0.42rem;
    height: 0.42rem;
    position: relative;
    margin: 2rem auto;
    background: url("../assets/closeBtn.png") no-repeat;
    background-size: 100%;
  }
}
</style>
