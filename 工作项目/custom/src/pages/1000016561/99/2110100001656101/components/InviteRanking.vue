<template>
  <div class="ranking">
    <div class="title" style="text-align: center">
      成功邀请75人以上且打榜TOP10<br/>获得BC超级礼包
    </div>

    <div class="line">
      <div v-for="(item,index) in top3" :key="index" class="column">
        <img :class="{'top-icon':index === 1}" class="top-icon" :src="getTopIcon(index)"/>
        <img :class="{'head-img-first':index === 1 && top3.length > 2}" class="head-img"
             :src="item.userImg?item.userImg:defaultAvatar"
             onerror="this.src='https://img10.360buyimg.com/imgzone/jfs/t1/197790/28/4283/12773/6120f1fcE446d4692/bd22d401ff947bc2.png'"/>
        <div style="font-size: .24rem;margin-top: .05rem">{{ item.userName }}</div>
        <div style="font-size: .15rem;margin-top: .05rem">邀请人数: {{ item.assistCount }}</div>
      </div>
    </div>

    <div style="margin-top: .53rem">
      <div v-for="(item,index) in  otherArr" :key="index" class="other-rank">
        <div>第 {{ index + 4 }} 名: {{ item.userName }}</div>
        <div style="width: 1.2rem;text-align: left">邀请人数: {{ item.assistCount }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';

const defaultAvatar = '//img10.360buyimg.com/imgzone/jfs/t1/197790/28/4283/12773/6120f1fcE446d4692/bd22d401ff947bc2.png';

const top3 = ref([]);
const otherArr = ref([]);
const props = defineProps({ inviteRankingArr: Array });

// eslint-disable-next-line vue/no-setup-props-destructure
const { inviteRankingArr } = props;

if (inviteRankingArr.length >= 3) {
  const thirdArr = inviteRankingArr?.slice(2, 3);
  top3.value = inviteRankingArr?.slice(0, 2).reverse().concat(thirdArr);
  otherArr.value = inviteRankingArr?.slice(3);
} else if (inviteRankingArr.length === 2) {
  top3.value = inviteRankingArr?.slice(0, 2);
} else if (inviteRankingArr.length === 1) {
  top3.value = inviteRankingArr;
}

const getTopIcon = (index: number) => {
  let topIconUrl = '';
  if (inviteRankingArr.length >= 3) {
    if (index === 0) {
      topIconUrl = '//img10.360buyimg.com/imgzone/jfs/t1/158990/36/25180/938/6167fe36Ee3daf611/e07bdd805e44ccbf.png';
    } else if (index === 1) {
      topIconUrl = '//img10.360buyimg.com/imgzone/jfs/t1/91806/5/18044/851/6167fe36Edf8575e6/5429f07fefe238b6.png';
    } else if (index === 2) {
      topIconUrl = '//img10.360buyimg.com/imgzone/jfs/t1/206257/24/11615/1037/6167fe36E2a727778/bcfa5b138def3e28.png';
    }
  } else if (inviteRankingArr.length === 2) {
    if (index === 0) {
      topIconUrl = '//img10.360buyimg.com/imgzone/jfs/t1/91806/5/18044/851/6167fe36Edf8575e6/5429f07fefe238b6.png';
    } else {
      topIconUrl = '//img10.360buyimg.com/imgzone/jfs/t1/158990/36/25180/938/6167fe36Ee3daf611/e07bdd805e44ccbf.png';
    }
  } else if (inviteRankingArr.length === 1) {
    topIconUrl = '//img10.360buyimg.com/imgzone/jfs/t1/91806/5/18044/851/6167fe36Edf8575e6/5429f07fefe238b6.png';
  }
  return topIconUrl;
};

</script>

<style scoped lang="scss">
.ranking {
  width: 6.28rem;
  height: 9.62rem;
  background-color: #ffffff;
  border-radius: 0.15rem;
  margin: .5rem auto;

  .title {
    text-align: center;
    font-family: FZLTHJW--GB1-0;
    font-size: 0.3rem;
    line-height: 0.44rem;
    color: #000000;
    padding-top: .56rem;
  }

  .line {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: .45rem;

    .column {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 1.6rem;
      height: 2.71rem;
      text-align: center;

      .top-icon {
        width: .74rem;
        margin-bottom: .12rem;
      }

      .top-icon-first {
        width: .62rem;
      }

      .head-img {
        width: 1.32rem;
        border-radius: 50%;
        background-color: #999999;
      }

      .head-img-first {
        width: 1.6rem;
      }
    }
  }

  .other-rank {
    width: 5.03rem;
    height: 0.4rem;
    line-height: .4rem;
    background-color: #f5f5f5;
    border-radius: 0.15rem;
    font-size: 0.16rem;
    margin: .11rem auto;
    padding: 0 .27rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

img {
  margin: 0 auto;
}
</style>
