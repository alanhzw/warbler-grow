<template>
  <!-- 必购码弹窗 -->
  <div class="box">
    <img v-if="isCourse" src="../assets/img/dialog/dialog-course.png" class="popup">
    <img v-else src="../assets/img/dialog/dialog-uncourse.png" class="popup">

    <div v-if="isCourse" class="course-tip">今天还剩{{ buycode.todayBgmCount }}/{{ buycode.totalCount }}个必购码</div>

    <div class="view" :style="{top:isCourse?'':'1.4rem'}">
      <img v-if="status!=='win'" class="icon" src="../assets/img/dialog/fail.png"/>
      <img v-else class="icon" src="../assets/img/dialog/win.png"/>

      <template v-if="isCourse">
        <div v-if="status==='fail'" class="title">很遗憾!还差一点点哦!<br/>分享给好友额外获得一次机会</div>
        <div v-else-if="status==='none'" class="title">很遗憾!<br/>今天的必购码抢光了~</div>
        <div v-else class="title">恭喜全部回答正确!<br/>获得后预计24小时内到账哦~</div>

        <div v-if="status==='fail'" @click="share()" class="btn-bg" style="margin-top: .07rem">立即分享</div>
        <div v-else-if="status==='none'" @click="share()" class="btn-bg" style="margin-top: .07rem">
          分享给好友一起蹲守
        </div>
        <div v-if="status!=='win'" class="btn-bg" @click="closeDialog()">返回首页</div>
        <div v-else style="margin-top: .4rem" class="btn-bg" @click="closeDialog('scroll')">抽英雄联盟盲盒</div>
      </template>
      <template v-else>
        <div v-if="status==='fail'" class="title">很遗憾!<br/>今天您的答题机会已经用光了</div>
        <div v-else-if="status==='none'" class="title">很遗憾!<br/>今天的必购码抢光了~</div>
        <div v-else class="title">您已经获得必购码<br/>获得后预计24小时内到账哦~</div>

        <div v-if="status==='none'" @click="share()" class="btn-bg" style="margin-top: .07rem">分享给好友一起蹲守</div>
        <div style="margin-top: .07rem" class="btn-bg" @click="closeDialog()">返回首页</div>
      </template>
    </div>

    <div v-if="status==='win'" class="check-tip">查看路径：我的-更多工具-我的必购码</div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, inject, ref } from 'vue';

// 数据
const emit = defineEmits(['close', 'share']);
const props = defineProps({
  isCourse: {
    type: Boolean,
    default: true,
    // 用户开始答题之前 false ，用户正在答题中 true;
  },
  status: {
    type: String,
    default: 'none',
    // win 回答正确 fail 回答错误 none 抢光了
  },
  buycode: Object,
});

const closeDialog = (str: string) => {
  emit('close', str);
};

const share = () => {
  emit('share');
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  img {
    margin: 0 auto;
  }

  .popup {
    width: 5.5rem;
  }

  .course-tip {
    width: 100%;
    position: absolute;
    top: .6rem;
    text-align: center;
    font-size: .16rem;
  }

  .view {
    width: 100%;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    position: absolute;
    top: 1.6rem;

    .icon {
      width: 1.39rem;
    }

    .title {
      text-align: center;
      height: .88rem;
      font-size: .3rem;
      font-weight: 800;
      line-height: .5rem;
      margin: .27rem;
    }

    .btn-bg {
      width: 2.75rem;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      color: #0b0442;
      margin: .05rem auto;
      font-size: .28rem;
      font-weight: 800;
      background: {
        image: url("../assets/img/dialog/btn-format.png");
        repeat: no-repeat;
        size: cover;
      };
    }
  }

  .check-tip {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: .55rem;
    font-size: 0.15rem;
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
