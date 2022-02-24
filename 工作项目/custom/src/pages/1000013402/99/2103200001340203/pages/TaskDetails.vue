<template>
  <div class="yili">
    <!-- banner -->
    <div class="banner">
<!--      <img class="bg" src="../assets/home-banner.png"/>-->
      <!-- 返回勋章馆 -->
      <img @click="$router.push('/')" class="back-index" src="../assets/detail-back-index.png"/>
<!--      勋章图标-->
      <img style="width: 1.78rem;height: 1.89rem;margin: 1.6rem auto 0px;" :src="taskObj.icon"/>
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
<!--        <img :src="taskObj.icon"/>-->
        <div class="num">{{ taskObj.points }}</div>
      </div>

      <div class="content">
        <div style="height: 6rem;overflow-y: scroll;">
          <div class="task" :class="{'gray':item.status === '0'}" v-for="(item,index) in taskObj.sonTasks" :key="index">
            <!-- 名次 icon -->
            <div class="task-ranking-icon"><div style="margin: 0.04rem 0.04rem 0 0;">{{ index + 1 }}</div></div>
            <!-- 成长任务 icon -->
            <div style="position: relative;margin-left: .3rem;">
              <!-- 状态按钮 -->
              <div class="task-info">{{ item.status === '0' ? '未达成' : '已达成' }}</div>
              <img class="task-img" :src="item.icon"/>
            </div>
            <!-- 成长任务 信息 -->
            <div class="task-message">
              <div class="name one-line-omit">{{ item.name }}</div>
              <div style="border: 1px solid #ff5a7d;width: 3.15rem;margin: .1rem 0 .1rem -2.7rem;"></div>
              <div class="detail one-line-omit">{{ item.message }}</div>
            </div>

          </div>
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
const sonBrand = 'yousuanru';
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
    // eslint-disable-next-line no-param-reassign
    /* res = {
      msg: '调用成功！',
      success: true,
      total: 1,
      data: {
        achievePoints: null,
        content: null,
        createTime: null,
        equityIcon: null,
        gmv: null,
        icon: '//img10.360buyimg.com/imgzone/jfs/t1/188561/29/315/35662/6088250dEa2640b7f/cddbef0772e58b7e.png',
        id: null,
        isEffective: null,
        isLock: null,
        jingdou: null,
        level: null,
        medalId: null,
        message: null,
        name: '加入会员1年',
        percent: null,
        points: 0,
        process: '0/4',
        rightsId: null,
        skinId: null,
        sonEquities: null,
        sonTasks: [
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
          {
            achievePoints: null,
            content: null,
            createTime: null,
            equityIcon: null,
            gmv: null,
            icon: '//img10.360buyimg.com/imgzone/jfs/t1/171355/13/11776/5189/604974d6Ec528a134/5ae9d737cfec80ee.png',
            id: null,
            isEffective: null,
            isLock: null,
            jingdou: null,
            level: null,
            medalId: null,
            message: null,
            name: '1年',
            percent: null,
            points: 5,
            process: null,
            rightsId: null,
            skinId: null,
            sonEquities: null,
            sonTasks: null,
            status: '0',
            type: null,
          },
        ],
      },
    }; */

    if (res.success) {
      taskObj.value = res.data;
      growthIcon.value = res.data.sonTasks[0].icon;
    }
  }).finally(() => {
    Toast.clear();
  });
};

const getTaskId = () => {
  taskId.value = String(window.location.hash.split('=')[1]);
};

getTaskId();
getTaskList();

</script>

<style lang='scss' scoped>
  html{
    background: url('../assets/home-bg-y.png') repeat-y;
    background-size: 100%;
  }
  .yili {
    position: relative;
    text-align: center;
    background: url('../assets/task-main.png') no-repeat;
    background-size: cover;
    height: 13.35rem;

    .banner {
      position: relative;

      .bg {
        width: 7.5rem;
      }

      .back-index {
        width: 1.64rem;
        position: absolute;
        top: 1.5rem;
        left: 0.34rem;
      }

      .grow-num {
        width: 100%;
        line-height: .3rem;
        text-align: center;
        position: absolute;
        top: 4.7rem;
        font-size: .26rem;
        color: #fefefe;
        display: flex;
        flex-direction: row;
        justify-content: center;
        white-space: nowrap;

        .num {
          font-size: .21rem;
          /*color: #07d3f8;*/
        }
      }
    }

    .grow-list {
      position: relative;
      margin-top: .93rem;

      .title {
        width: 4.11rem;
        position: absolute;
        right: 1.8rem;
        top: .5rem;
      }

      .growth-num {
        width: 1rem;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        top: 0.6rem;
        right: 2.5rem;

        img {
          width: .38rem;
        }

        .num {
          width: 1.3rem;
          text-align: center;
          font-size: .5rem;
          margin-left: .1rem;
          color: #084b39;
        }
      }

      .content {
        width: 6.8rem;
        height: 6.3rem;
        margin: 0 auto;
        padding: 1.5rem 0 0;
        background: url("../assets/detail-grow-bg.png") no-repeat;
        background-size: cover;
        /*overflow-y: scroll;*/

        .task {
          width: 5.8rem;
          height: 1.5rem;
          margin: 0 auto;
          /* margin-top: 0.2rem; */
          padding: 0.16rem 0.2rem 0.16rem 0.5rem;
          align-items: center;
          background-color: #ffffff;
          /* box-shadow: 5px 5px 5px #def4ff; */
          border-radius: 0.12rem;
          position: relative;
          display: flex;
          flex-direction: row;
          box-sizing: border-box;

          .task-ranking-icon {
            width: 0.4rem;
            height: 0.4rem;
            position: absolute;
            top: 0.65rem;
            left: .1rem;
            color: #ff5a7d;
            font-size: .3rem;
            background: url("../assets/detail-ranking-icon.png") no-repeat;
            background-size: 100% 100%;
          }

          .task-img {
            position: absolute;
            width: 1rem;
            top: -.45rem;
            z-index: 1;
          }

          .task-message {
            width: 3rem;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            margin-left: 4.2rem;

            .name {
              font-family: MicrosoftYaHei;
              font-size: 0.3rem;
              font-weight: bold;
              color: #ff5a7d;
              width: 1rem;
              margin-left: -.5rem;
              text-align: end;
            }

            .detail {
              font-family: MicrosoftYaHei;
              font-size: 0.22rem;
              color: #ff5a7d;
              margin-left: -2.5rem;
              text-align: end;
              width: 3rem;
            }
          }

          .task-info {
            width: 1.25rem;
            height: .45rem;
            line-height: .3rem;
            text-align: center;
            color: #FFFFFF;
            font-size: 0.2rem;
            font-family: MicrosoftYaHei;
            /*background-image: linear-gradient(-90deg,
              #0b4fbb 0%,
              #1279f7 100%);
            border-radius: 0.23rem;*/
            background: url('../assets/detail-icon-foot.png') no-repeat;
            background-size: 100%;
            position: absolute;
            left: -0.15rem;
            top: .1rem;
            z-index: 5;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
