<template>
  <div id="main">
    <div class="prize-Kv">
      <div class="rule-btn" @click="popupIndex = 1"></div>
      <div class="userInfo">
        <div class="totalCount">
          <span>{{ point }} </span>
          积分
        </div>
        <div class="expireCount">本月底即将到期积分 {{ expirePoints }}</div>
      </div>
      <van-list
        class="prize-content"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getDataArr"
      >
        <van-cell
          class="prize-item"
          v-for="(it, index) in pointDetails"
          :key="index"
        >
          <div class="date">
            {{ dayjs(it.occurTime).format("YYYY-MM-DD") }}
          </div>
          <nobr class="type">
            {{ it.content }}
          </nobr>
          <div class="points" v-show="it.type == 1">{{ it.pointInc }}</div>
          <div class="points" v-show="it.type == 2">+{{ it.pointInc }}</div>
        </van-cell>
      </van-list>
      <!-- <div class="prize-content">
        <div v-if="pointDetails.length > 0">
          <div v-for="(it, index) in pointDetails" :key="index" class="prize-item">
            <div class="date">
              {{ dateChange(it.occurTime) }}
            </div>
            <div class="type">
              {{ it.content }}
            </div>
            <div class="points" v-show="it.type == 1">-{{ it.pointInc }}</div>
            <div class="points" v-show="it.type == 2">+{{ it.pointInc }}</div>
          </div>
        </div>
        <div style="margin-top: -0.3rem" v-else>暂无获奖记录</div>
      </div> -->
      <!--      活动规则弹窗-->
      <div class="popup-mask" v-show="popupIndex == 1">
        <div class="popup rule">
          <pre
            style="white-space: pre-wrap"
            class="context"
            v-html="rule"
          ></pre>
          <div class="closeBtn" @click="popupIndex = 0"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { inject, ref, reactive } from 'vue';
import { Toast, List as vanList, Loading } from 'vant';
import dayjs from 'dayjs';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// 获取基本信息
const {
  activityId,
  actName,
  pin,
  venderId,
} = baseInfo;
// 奖品页切换
const prizeShow = ref(false);
// 店铺ID
const shopId = ref<string>(baseInfo.venderId).value;
// 用户Pin
const userPin = ref<string>(baseInfo.pin).value;
// 奖品列表
const pointDetails = ref<any>([]);
const datas = ref([]);
const loading = ref(false);
const finished = ref(false);
const pageNo = ref(0); // 页码
// const pageNo = ref('');
// const pageSize = ref('');
// 总积分
const point = ref('');
// 过期积分
const expirePoints = ref('');
// 规则
const rule = ref('');
// 弹窗控制
const popupIndex = ref(0);
// 日期补零
const appendZero = (obj: number) => {
  if (obj < 10) {
    return `0${obj}`;
  }
  return obj;
};
// 日期转换  yyy-mm-dd hh:mm
const dateChange = (date: any) => {
  // var _this = this;
  if (date == null) {
    return '';
  }
  // 日期转换
  const time = date;
  const now = new Date(time);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  // var hour = now.getHours();
  // var minute = now.getMinutes();
  const day = now.getDate();
  const dateStr = `${year}.${appendZero(month)}.${appendZero(day)}`;
  return dateStr;
};
// 当前时间
const nowTime = dateChange(Date.parse(String(new Date())));
// 主接口
const getActivityInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/schwarzkopf/point/activityContent', {
    activityId,
    pin,
  })
    .then((data) => {
      if (data.result) {
        console.log(data);
        // debugger;
        point.value = data.data.point;
        expirePoints.value = data.data.expirePoints;
        rule.value = data.data.rule;
      } else {
        Toast(data.errorMessage);
      }
    })
    .finally(() => {
      Toast.clear();
    });
};

// 列表触底加载方法
const getDataArr = () => {
  pageNo.value += 1;
  cjwxRequest.post('/crm/schwarzkopf/point/getPointDetail', {
    activityId,
    pin,
    pageNo: pageNo.value,
    pageSize: 10,
  })
    .then((data) => {
      if (data.result) {
        pointDetails.value.push(...data.data.pointDetails);
        setTimeout(() => {
          loading.value = false;
        }, 1000);
        if (data.data.pointDetails.length === 0) {
          finished.value = true;
        }
      } else {
        Toast(data.errorMessage);
      }
    });
};

// 执行主接口
getActivityInfo();
// 执行查询接口
// getPointDetails();
</script>

<style scoped>
#main {
  width: 100%;
  max-width: 7.5rem;
  margin: 0 auto;
  min-height: 100vh;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/219759/8/9972/168848/61d420acEf641d64d/096617bfe37495c5.png")
    repeat-y;
  background-size: 100%;
}

.prize-Kv {
  width: 100%;
  max-width: 7.5rem;
  margin: 0 auto;
  min-height: 100vh;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/223399/24/8109/541404/61d3c466Eeb441fe0/f388271239ab91a1.png")
    no-repeat;
  background-size: 100%;
  position: relative;
}

.rule-btn {
  width: 1.9rem;
  height: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 0.17rem;
  /* background-color: #fff; */
  /*background: url("//img10.360buyimg.com/imgzone/jfs/t1/201762/17/20341/3083/61cac65eE37fc254c/9f0f8d825b0cb55d.png") no-repeat;*/
  background-size: 100%;
}

.totalCount {
  color: #ddc696;
  position: absolute;
  top: 0.6rem;
  left: 0.3rem;
  font-size: 0.25rem;
}

.totalCount span {
  color: #fffbef;
  font-weight: bold;
  font-size: 1rem;
}

.expireCount {
  color: #757575;
  position: absolute;
  top: 1.7rem;
  left: 0.3rem;
  font-size: 0.25rem;
}

.prize-content {
  width: 7rem;
  height: 8rem;
  position: absolute;
  top: 4.2rem;
  left: 0.25rem;
  display: flex;
  align-content: start;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  /* background-color: rgba(99, 99, 77, 0.5); */
  /* color: #80591e; */
}

.prize-item {
  display: flex;
  text-align: start;
  margin-left: 0rem;
  margin-bottom: 0.2rem;
  height: 0.6rem;
  width: 7rem;
}

.date {
  width: 1.9rem;
  text-align: left;
  line-height: 0.6rem;
  font-size: 0.27rem;
  margin-left: 0.1rem;
  /* flex: 1; */
}

.type {
  width: 3rem;
  text-align: center;
  line-height: 0.6rem;
  font-size: 0.27rem;
  overflow-x: auto;
  /* overflow: hidden;
  text-overflow:; */
  /* flex: 1; */
}

.type::-webkit-scrollbar {
  display: none;
}

.points {
  width: 1.7rem;
  text-align: center;
  line-height: 0.6rem;
  font-size: 0.27rem;
  margin-left: 0.3rem;
  /* flex: 1; */
}

.rule {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/214279/33/10417/15075/61dd50c8Eaafa6c01/92397fe2edd52aa8.png")
    no-repeat;
  background-size: 100%;
  margin-left: 0.15rem;
}

/*弹窗样式*/
.popup {
  width: 6.8rem;
  height: 6.5rem;
  /*background: #fff;*/
  /*border: 0.08rem solid #fff;*/
  border-radius: 0.3rem;
  position: fixed;
  top: calc(50% - 7.9rem / 2);
  left: calc(50% - 7.06rem / 2);
}

.popup-mask {
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.popup .closeBtn {
  width: 4rem;
  height: 0.8rem;
  background-size: 100% 100%;
  position: absolute;
  top: 5.3rem;
  right: 1.5rem;
  border: none;
}

.popup .context {
  position: relative;
  padding: 0.2rem 0 0 0.2rem;
  width: 5.8rem;
  margin-top: 1rem;
  margin-left: 0.5rem;
  height: 4.3rem;
  overflow-y: scroll;
  overflow-x: hidden;
  color: #000;
  /* background-color: #0a4a39; */
  /* word-break: keep-all; */
  /* white-space: pre-wrap; */
  font-size: 0.24rem;
  font-family: sans-serif;
}
</style>
