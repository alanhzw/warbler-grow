<template>
  <div class="yili">
    <!-- banner -->
    <div class="banner">
      <img class="bg" src="../assets/home-banner.png"/>

      <!-- 返回勋章馆 -->
      <img @click="$router.back(-1)" class="back-index" src="../assets/detail-back-index.png"/>

      <!-- 当前成长值 -->
      <div class="grow-num">
        <div>{{ taskObj.name }}</div>
        <div class="num">（当前进度：{{ taskObj.process }}）</div>
      </div>
    </div>

    <!-- 成长值列表 -->
    <div class="grow-list">
      <img class="title" src="../assets/detail-grow-title.png"/>

      <div class="growth-num">
        <img :src="growthIcon"/>
        <div class="num">+ {{ taskObj.points }}</div>
      </div>

      <div class="content">
        <div class="task" :class="{'gray':item.status === '0'}" v-for="(item,index) in taskObj.sonTasks" :key="index">
          <!-- 名次 icon -->
          <div class="task-ranking-icon">{{ index + 1 }}</div>
          <!-- 成长任务 icon -->
          <img class="task-img" :src="item.icon"/>
          <!-- 成长任务 信息 -->
          <div class="task-message">
            <div class="name one-line-omit">{{ item.name }}</div>
            <div class="detail one-line-omit" @click="Toast(item.message)">{{ item.message }}</div>
          </div>
          <!-- 状态按钮 -->
          <div class="task-btn">{{ item.status === '0' ? '未达成' : '已达成' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';

// 活动子品牌 - 伊利 舒化
const sonBrand = 'shuhua';
const cjwxPin = window.sessionStorage.getItem('LZ_JD_USER_PIN');

const taskId = ref('');
const taskObj = ref({});
const growthIcon = ref('');

// 获取任务列表;
const getTaskList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/taskWindow', {
    cjwxPin,
    brand: sonBrand,
    parentTaskId: taskId.value,
  }).then((res) => {
    if (res.success) {
      taskObj.value = res.data;
      growthIcon.value = res.data.sonTasks[0].icon;
    }
  }).finally(() => {
    Toast.clear();
  });
};

const getTaskId = () => {
  taskId.value = String(window.location.hash.split('?')[1]);
};

getTaskId();
getTaskList();

</script>

<style lang='scss' scoped>
.yili {
  position: relative;
  text-align: center;

  .banner {
    position: relative;

    .bg {
      width: 7.5rem;
    }

    .back-index {
      width: 1.64rem;
      position: absolute;
      top: .21rem;
      left: .34rem;
    }

    .grow-num {
      width: 100%;
      line-height: .3rem;
      text-align: center;
      position: absolute;
      bottom: 1.7rem;
      font-size: .26rem;
      color: #fefefe;
      display: flex;
      flex-direction: row;
      justify-content: center;
      white-space: nowrap;

      .num {
        font-size: .21rem;
        color: #07d3f8;
      }
    }
  }

  .grow-list {
    position: relative;
    margin-top: -1rem;

    .title {
      width: 4.11rem;
    }

    .growth-num {
      width: 1rem;
      text-align: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: absolute;
      top: .13rem;
      right: 2.5rem;

      img {
        width: .38rem;
      }

      .num {
        width: .5rem;
        text-align: center;
        font-size: .2rem;
        color: #FFFFFF;
      }
    }

    .content {
      width: 6.8rem;
      height: 6.86rem;
      margin: 0 auto;
      padding: .6rem 0;
      background: url("../assets/detail-grow-bg.png") no-repeat;
      background-size: 100% 100%;

      .task {
        width: 5.8rem;
        height: 1rem;
        margin: 0 auto;
        margin-top: .2rem;
        padding: .16rem .2rem .16rem .5rem;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 5px 5px 5px #def4ff;
        border-radius: 0.12rem;
        position: relative;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;

        .task-ranking-icon {
          width: .25rem;
          height: .3rem;
          position: absolute;
          top: 0;
          left: .1rem;
          color: #FFFFFF;
          font-size: .19rem;
          background: url("../assets/detail-ranking-icon.png") no-repeat;
          background-size: 100% 100%;
        }

        .task-img {
          width: .64rem;
        }

        .task-message {
          width: 3rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: .2rem;

          .name {
            font-family: MicrosoftYaHei;
            font-size: 0.3rem;
            font-weight: bold;
            color: #3d83e6;
          }

          .detail {
            font-family: MicrosoftYaHei;
            font-size: 0.22rem;
            color: #fdb531;
          }
        }

        .task-btn {
          width: 1.25rem;
          height: .45rem;
          line-height: .45rem;
          text-align: center;
          color: #FFFFFF;
          font-size: 0.24rem;
          font-family: MicrosoftYaHei;
          background-image: linear-gradient(-90deg,
            #0b4fbb 0%,
            #1279f7 100%);
          border-radius: 0.23rem;
        }
      }
    }
  }
}
</style>
