<!--
 * @Description:京东国际-造梦计划
 * @Date: 2021-09-08 10:46:57
 * @FilePath: \custom\src\pages\599119\99\210959911901\App.vue
-->
<template>
  <div class="jd">
    <!-- banner -->
    <img src="./assets/page-banner.png"/>

    <!-- search -->
    <div class="search">
      <!-- search-input -->
      <input v-model.trim="searchHostName" placeholder="输入你心仪的主播"/>
      <!-- search-btn -->
      <div class="search-btn" @click="searchHost"></div>
    </div>

    <!-- list -->
    <div class="host">
      <!-- 顶部标识线 -->
      <img src="./assets/line-top.png"/>

      <!--主播列表-->
      <div class="host-list">
        <!-- 前三名列表 -->
        <div class="top-of-three">
          <div v-for="(item,index) in topOfThreeList" :key="index" class="border-bg"
               :class="{'border-first':index === 1}">
            <!-- 第一名在中间，所以索引位改变 -->
            <div class="head-view" style="position:relative;">
              <!-- 头像 -->
              <img :src="item.portrait"/>
              <!-- 头像边框 -->
              <img :src="getHeadBg(index)" class="head-bg"/>
            </div>
            <!-- 名字 -->
            <div class="top-third-name" :style="[index === 1?'marginTop:.08rem':'']">{{ item.userName }}</div>
            <!-- 总票数 -->
            <div class="top-third-vote">
              <span style="color: #FFFFFF">总票数:</span>
              <span style="color: #ffc778;">{{ item.vote }}</span>
            </div>
            <!--投票按钮-->
            <div @click="setVote(item.id)" class="vote-btn">
              <img :src="getVoteBtnBg(item.signed)" class="vote-bg"/>
              <div class="small-font">已获得{{ item.vote }}</div>
              <img class="ani" :class="{'action': item.piao }" src="./assets/ani.png"/>
            </div>
          </div>
        </div>

        <!-- 第四名-后续 -->
        <div class="other-ranking" v-if="otherRankingList.length > 0">
          <div class="head-view" v-for="(item,index) in otherRankingList" :key="index">
            <!-- call icon -->
            <img class="call-icon" src="./assets/call-icon.png"/>
            <!-- 头像 -->
            <img :src="item.portrait"/>
            <!--投票按钮-->
            <div @click="setVote(item.id)" class="vote-btn position">
              <img :src="getVoteBtnBg(item.signed)" class="vote-bg" style="left: .2rem"/>
              <div class="small-font">已获得{{ item.vote }}</div>
              <img class="ani" :class="{'action': item.piao }" src="./assets/ani.png"/>
            </div>
          </div>
        </div>
        <div v-else class="none-data">没有主播数据~</div>
      </div>

      <!-- 底部标识线 -->
      <img src="./assets/line-bottom.png"/>
    </div>
  </div>

</template>

<script lang='ts' setup>
import { ref, inject, computed } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);

// 全部主播数据
const allHostList = ref([]);
// 前三名数据
const topOfThreeList = ref([]);
// 第四名开始到后续数据
const otherRankingList = ref([]);

// 搜索框输入主播姓名
const searchHostName = ref('');
const searchHost = () => {
  if (searchHostName.value) {
    otherRankingList.value = allHostList.value.filter((i) => i.userName.match(searchHostName.value));
  } else {
    otherRankingList.value = allHostList.value.slice(3);
  }
};

// 获取前三名头像边框
const getHeadBg = (index: number) => {
  let url = '';
  if (index === 0) {
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/62992/34/16637/5201/61386d12E5e2c0267/c7d3ab6d796f8996.png';
  } else if (index === 1) {
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/200642/34/6105/5173/61386d12E14fbdb26/6c2cf38e8a9987fb.png';
  } else {
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/199960/23/7306/5209/61386d12Ef691f7eb/8854a8ef721ce9b8.png';
  }
  return url;
};

// 获取投票按钮背景图片
const getVoteBtnBg = (signed: number) => {
  let url = '';
  if (signed === 0) {
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/65570/16/16882/5914/6139ca0bEaec117df/aaf3de027b99e1d6.png';
  } else {
    url = 'https://img10.360buyimg.com/imgzone/jfs/t1/52194/8/17210/5737/6139ca0bEb19bc728/8b0979e708c52a9e.png';
  }
  return url;
};

// 获取所有主播用户数据
const getAllHostContent = (num: number) => {
  if (num !== 0) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
  }
  cjwxRequest.post('/common/vote/queryCandidateList', {
    activityId: activityId.value,
    // userName: searchHostName.value,
  }).then((res) => {
    if (res.result) {
      console.log(res);
      try {
        allHostList.value = res.data; // 全部主播数据
        topOfThreeList.value = res.data.slice(0, 2).reverse(); // 截取排名前三
        topOfThreeList.value.push(res.data[2]);

        otherRankingList.value = res.data.slice(3); // 截取剩下的排名

        Toast.clear();
      } catch (e) {
        console.error(e);
      }
    } else {
      Toast(res.errorMessage);
    }
  });
  // .finally(() => {
  // Toast.clear();
  // });
};
// 投票
const setVote = (userId: number) => {
  cjwxRequest.post('/common/vote/updateCandidateVote', {
    userId,
    activityId: activityId.value,
  }).then((res) => {
    if (res.result) {
      // 前端处理 数据变为已投票，
      let obj = {
        id: 0,
        vote: 0,
        signed: 0,
        piao: false,
      };
      obj = allHostList.value.find((o) => o.id === userId);
      if (obj) {
        obj.vote = Number(obj.vote) + 1;
        obj.signed = 1;
        obj.piao = true;
      }
      setTimeout(() => {
        getAllHostContent(0);
      }, 500);
      searchHostName.value = '';
    } else {
      Toast(res.errorMessage);
    }
  });
};

getAllHostContent(1);

</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #9d79ff;
}

img {
  width: 100%;
}

.jd {
  width: 100%;
  margin: 0 auto;
  text-align: center;

  .search {
    width: 4.77rem;
    height: .74rem;
    margin: 0 auto;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: .3rem;
    padding-right: .15rem;
    box-sizing: border-box;
    background: url("./assets/search.png") no-repeat;
    background-size: 100% 100%;

    input {
      width: 3.4rem;
      height: .36rem;
      color: #000000;
      font-size: .26rem;
      line-height: .36rem;
      border: transparent;
      background: transparent;
    }

    .search-btn {
      width: .55rem;
      height: .5rem;
    }
  }

  .host {
    margin-top: .3rem;
    font-size: 0;

    .host-list {
      background: url("./assets/page-bg-y.png") repeat-y;
      background-size: 100% 100%;

      min-height: 5rem;

      .top-of-three {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-end;
        padding: .8rem .2rem 0 .2rem;

        .border-first {
          width: 2.24rem !important;
          height: 2.7rem !important;
        }

        .border-bg {
          width: 2.16rem;
          height: 2.6rem;
          background: url("./assets/ranking-bg.png") no-repeat;
          background-size: 100% 100%;

          .head-view {
            width: 1.44rem;
            height: 1.7rem;
            margin: 0 auto;
            position: relative;
            margin-top: - .57rem;
            padding-top: .27rem;
            box-sizing: border-box;

            .head-bg {
              position: absolute;
              top: 0;
              left: 0;
            }
          }

          .top-third-name {
            font-size: .28rem;
            color: #FFFFFF;
            font-family: SourceHanSansCN-Medium;
          }

          .top-third-vote {
            margin-top: .1rem;
            font-size: .24rem;
            font-family: SourceHanSansCN-Regular;
          }
        }
      }

      .other-ranking {
        display: flex;
        flex-wrap: wrap;
        padding: .3rem .2rem;
        font-weight: 900;

        .head-view {
          width: 1.68rem;
          height: 1.98rem;
          margin: .2rem .04rem;
          position: relative;
        }
      }

      .none-data {
        font-size: .28rem;
        color: #FFFFFF;
        margin-top: 1rem;
      }

      .vote-btn {
        width: 100%;
        height: 0.48rem;
        margin: 0 auto;
        padding-bottom: .05rem;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column-reverse;

        .vote-bg {
          position: absolute;
          bottom: 0;
          left: .42rem;
          width: 1.29rem
        }

        .small-font {
          font-size: 12px;
          transform: scale(0.6);
          position: relative;
          display: inline-block;
          line-height: 1;
          font-weight: 400;
          transform-origin: bottom;
          white-space: nowrap;
          margin-bottom: .02rem;
        }
      }

      .is-vote {
        background: url("./assets/is-vote-btn.png") no-repeat;
        background-size: 100% 100%;
      }

      .vote {
        background: url("./assets/vote-btn.png") no-repeat;
        background-size: 100% 100%;
      }

      .position {
        position: absolute;
        bottom: 0;
        left: 0;
      }

      .call-icon {
        width: .83rem;
        position: absolute;
        top: -.1rem;
        left: .15rem;
      }
    }
  }

  .ani {
    width: 1.8rem;
    opacity: 0;
    transform: translate(-10%, 0)
  }

  .action {
    animation-duration: 1.4s;
    animation-name: ani-piao;
    animation-timing-function: ease
  }

  @keyframes ani-piao {
    0% {
      opacity: 0;
      transform: translate(0%, 0)
    }
    70% {
      opacity: 1;
      transform: translate(0%, -300%)
    }
    99% {
      opacity: 0;
      transform: translate(0%, -300%)
    }
    100% {
      opacity: 0;
      transform: translate(0, 0)
    }
  }
}
</style>
