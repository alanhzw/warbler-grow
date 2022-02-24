<template>
  <!-- 我的好友弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/my-friend-dialog.png"
         class="popup">

    <div class="friend">
      <div class="tab-all">
        <div class="tab" :class="{'active': tabIndex === 1}" @click="tabIndex=1,handle()">
          <div class="format" style="font-size: .24rem">助力成功好友</div>
          <div style="font-size: .16rem">（已完成订单好友）</div>
        </div>
        <div class="tab" :class="{'active': tabIndex === 2}" @click="tabIndex=2,handle()">接受邀请好友</div>
      </div>
      <div class="friend-arr">
        <template v-if="arr.length > 0">
          <div v-for="(item,index) in arr" :key="index" class="box">
            <img class="icon" v-if="item.noFlag === '1'" src="../assets/img/crown-icon.png"/>
            <img style="width: .9rem;border-radius: 1rem" :src="item.userImg?item.userImg:defaultAvatar"
                 :class="{'gray':!item.assistOtherTime}"/>
            <div>{{ item.userName }}</div>
          </div>
        </template>
        <div style="width: 100%;text-align: center" v-else>暂无数据</div>
      </div>
    </div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('confirmDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import {
  defineEmits, defineProps, ref, computed,
} from 'vue';

const props = defineProps({ receiveFriendArr: Array, successFriendArr: Array });
const emit = defineEmits(['closeDialog']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
};

const defaultAvatar = '//img10.360buyimg.com/imgzone/jfs/t1/197790/28/4283/12773/6120f1fcE446d4692/bd22d401ff947bc2.png';

const tabIndex = ref(1);
const arr = ref(props.successFriendArr);
const handle = () => {
  arr.value = tabIndex.value === 1 ? props.successFriendArr : props.receiveFriendArr;
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .friend {
    width: 100%;
    padding: 0 .75rem;
    position: absolute;
    top: 1.88rem;
    box-sizing: border-box;

    .tab-all {
      display: flex;
      justify-content: space-between;
      font-size: .24rem;
      height: .9rem;
      text-align: center;

      .tab {
        width: 50%;
        height: 0.9rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        background-color: #f7f7f7;
      }

      .active {
        border-bottom: 2px solid #fdd22e;
        background-color: #FFFFFF;
      }
    }

    .friend-arr {
      display: flex;
      flex-flow: row wrap;
      margin-top: .3rem;
      height: 4.2rem;
      overflow-y: auto;

      .box {
        display: flex;
        flex-direction: column;
        width: 1rem;
        margin: .12rem .24rem;
        font-size: .18rem;
        text-align: center;
        align-items: center;
      }

      .icon {
        width: 0.34rem;
        position: absolute;
        left: 0rem;
        top: -.1rem;
      }
    }
  }

  .close-btn {
    position: absolute;
    top: .2rem;
    right: 0.3rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}

img {
  margin: unset;
}
</style>
