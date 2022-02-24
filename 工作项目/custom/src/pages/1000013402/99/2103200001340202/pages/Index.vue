<!--
 * @Description:yili-舒化勋章馆
 * @Date: 2021-08-23 10:46:57
 * @FilePath: \custom\src\pages\1000087921\2108100008792101\App.vue
-->
<template>
  <div class="yili">
    <!-- banner -->
    <div class="banner">
      <img class="bg" src="../assets/home-banner.png"/>

      <!-- 返回勋章馆 -->
      <img @click="toMedalIndex" class="back-index" src="../assets/back-index.png"/>

      <!-- 当前成长值 -->
      <div class="grow-num">
        <div>当前成长值：</div>
        <div class="num">{{ baseDate.points }}</div>
        <img @click="$router.push('/GrowthDetails')" class="icon" src="../assets/question-icon.png"/>
      </div>

      <!-- 进度条 -->
      <div class="grow-progress">
        <div class="progress-bg">
          <div class="progress-active" :style="{ width: growNumWidthOf100+'%'}">
            <div class="progress-pointer">{{ baseDate.points }}</div>
          </div>
          <div class="toast-num" v-if="growNumWidthOf100 > 18">{{ baseDate.level }}</div>
        </div>
        <div class="between-num" v-if="baseDate.level - baseDate.points> 0">
          还差{{ baseDate.level - baseDate.points }}升至下一级
        </div>
        <div class="between-num" v-else>您已满级！</div>
      </div>
    </div>

    <!-- 查看全部权益 -->
    <img @click="$router.push('/AllRights')" class="all-equities" src="../assets/home-all-equities.png"/>

    <!-- 成长历程 -->
    <div class="grow-process">
      <!-- 标题 -->
      <img class="title" src="../assets/home-grow-title.png"/>
      <!-- 详细规则 -->
      <div @click="openDialog('ruleDialog')" class="detail-rule">详细规则></div>
      <!-- 内容 -->
      <div class="content">
        <!-- tab -->
        <div class="tab">
          <div v-for="(item,index) in tabList" :key="index" @click="changeTab(index + 1)"
               class="item" :class="{'item-active':tabIndex === index + 1}">
            {{ item }}
          </div>
        </div>
        <!-- 历程列表 -->
        <div class="process-list">
          <div class="process" :class="{'gray':item.status === '0'}" v-for="(item,index) in processList" :key="index">
            <img :src="item.icon" @click="$router.push(`/TaskDetails?${item.id}`)"/>
            <div class="process-content two-line-omit">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <van-popup class="popup" v-model:show="dialogShow" :close-on-click-overlay="false">
      <RuleDialog @closeDialog="closeDialog" :rule="rule" v-if="dialogName === 'ruleDialog'"></RuleDialog>
    </van-popup>
  </div>
</template>

<script lang='ts' setup>
import { ref, inject, computed } from 'vue';
import { Popup as vanPopup, Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

import RuleDialog from '../components/RuleDialog.vue';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 活动子品牌 - 伊利 舒化
const sonBrand = 'shuhua';
const cjwxPin = window.sessionStorage.getItem('LZ_JD_USER_PIN');
// 是否开卡表示是否注册
const isOpenCarded = inject('isOpenCard');
// 活动规则
const rule = ref('');

const baseDate = ref({});

const processList = ref([]);

// 满值是：100，当前是80，结果就是20%；
// 满值是：1000，当前是80,（80 / 1000）* 100
const growNumWidthOf100 = computed(() => 100 - ((baseDate.value.points / baseDate.value.level) * 100));

/* ---------------------------------  tab  ------------------------------- */
const tabList = ['全部', '历程', '消费'];
const tabIndex = ref(1);

/* ---------------------------------  dialog  ------------------------------- */
// 弹窗是否显示
const dialogShow = ref(false);
// 显示的弹窗标示位
const dialogName = ref('');

// 打开弹窗
const openDialog = (name: string) => {
  dialogName.value = name;
  dialogShow.value = true;
};

// 关闭弹窗
const closeDialog = () => {
  dialogShow.value = false;
};
/* --------------------------------------------------------------------------- */

// 获取成长历程;
const getGrowAchievement = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/growth/list', {
    brand: sonBrand,
    cjwxPin: window.sessionStorage.getItem('LZ_JD_USER_PIN'),
    type: tabIndex.value,
  }).then((res) => {
    if (res.success) {
      processList.value = res.data;
    }
  }).finally(() => {
    Toast.clear();
  });
};

const changeTab = (index: number) => {
  tabIndex.value = index || 1;
  getGrowAchievement();
};

// 用户初始化;
const getUserInit = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/init', {
    brand: sonBrand,
    cjwxPin,
  }).then((res) => {
    if (res.success) {
      baseDate.value = res.data;
      // 获取成长历程列表
      getGrowAchievement();
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 主接口 获取活动信息;
const getUserBasicMessage = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/base', {
    brand: sonBrand,
    cjwxPin: window.sessionStorage.getItem('LZ_JD_USER_PIN'),
  }).then((res) => {
    if (res.success) {
      if (res.data) {
        // 已初始化用户，直接赋值
        baseDate.value = res.data;
        // 获取是否有未领取礼品 -- 8.31版暂不上
        // getNowEnjoyEquities();
        // 获取成长历程列表
        getGrowAchievement();
      } else {
        // 未初始化用户，进行初始化
        getUserInit();
      }
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 跳转勋章馆首页
const toMedalIndex = () => {
  window.location.href = '/wx/dingzhi/yili/medal/index?activityId=2103200001340201';
  console.log(window.location.host);
};

// 获取用户基本信息
getUserBasicMessage();

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
      font-size: .24rem;
      color: #fefefe;
      display: flex;
      flex-direction: row;
      justify-content: center;

      .num {
        font-size: .32rem;
      }

      .icon {
        width: .3rem;
        margin-left: .1rem;
      }
    }

    .grow-progress {
      width: 100%;
      position: absolute;
      bottom: .2rem;

      .progress-bg {
        width: 5.34rem;
        height: .38rem;
        border-radius: .5rem;
        background: url("../assets/home-progress-bg.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        position: relative;

        .progress-active {
          width: 1rem;
          height: .38rem;
          border-radius: .5rem;
          background: #dbecff;
          position: absolute;
          top: 0;
          right: 0;

          .progress-pointer {
            width: .48rem;
            height: .48rem;
            line-height: .48rem;
            border-radius: .5rem;
            color: #1236aa;
            font-size: .25rem;
            font-weight: 900;
            background: url("../assets/point-icon.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: -.05rem;
            left: -.3rem;
            z-index: 1;
          }
        }

        .toast-num {
          position: absolute;
          top: .1rem;
          right: .2rem;
          font-size: .18rem;
          color: #012c7e;
        }
      }

      .between-num {
        margin-top: .1rem;
        font-size: .2rem;
        color: #1c2580;
      }
    }
  }

  .all-equities {
    width: 6.8rem;
  }

  .grow-process {
    position: relative;
    margin-top: .5rem;

    .title {
      width: 4.11rem;
    }

    .detail-rule {
      font-size: .19rem;
      color: #1c2580;
      position: absolute;
      right: .41rem;
      top: .44rem;
    }

    .content {
      background: url("../assets/home-grow-bg.png") no-repeat;
      background-size: 100% 100%;
      width: 6.8rem;
      height: 10.62rem;
      margin: 0 auto;
      margin-bottom: .6rem;
      padding: .43rem .46rem;
      box-sizing: border-box;

      .tab {
        width: 5.45rem;
        height: .5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 0 auto;
        line-height: .5rem;
        align-content: center;
        border-bottom: 2px #dcf2ff solid;

        .item {
          width: 1rem;
          height: .5rem;
          font-size: .21rem;
          color: #15449f;
          font-family: MicrosoftYaHei-Bold;
        }

        .item-active {
          font-weight: 900;
          color: #1d38a2;
          border-bottom: 2px #79acff solid;
        }
      }

      .process-list {
        float: left;
        margin-top: .05rem;

        .process {
          width: 1.7rem;
          height: 2.1rem;
          text-align: center;
          margin: .1rem .13rem;
          float: left;

          img {
            width: 1.7rem;
          }

          .process-content {
            width: 1.7rem;
            color: #3069d1;
            font-size: .17rem;
          }
        }
      }
    }
  }
}
</style>
