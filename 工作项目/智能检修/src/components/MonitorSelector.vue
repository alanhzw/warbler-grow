<!--
 * @Description:
 *    选择班组组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-15
 * @FilePath: \intelligent-overhaul-app\src\components\MonitorSelector.vue
-->
<template>
  
    <section class='send-box'>
      <header>
        <div>选择班组</div>
        <div class="subtitle">共有{{monitors.list.length}}个班组可供选择</div>
        <span class="close" @click="ctx.emit('selected', monitors.selected)">完成</span>
      </header>
      <ul>
        <li v-for="monitor in monitors.list" :key="`monitor-${monitor.groupsLeaderId}`" @click="monitors.selected=monitor">
          <img class="avatar" :src="`${monitor.avatar==null ||monitor.avatar==''?avatar:imgPath + monitor.avatar}`">
          <div class="info">
            <p class="name">{{monitor.departName}}</p>
            <p class="detail">{{monitor.groupsLeaderName}} 组员{{monitor.memberCount}}人</p>
          </div>
          <van-icon v-show="monitors.selected.groupsLeaderId==monitor.groupsLeaderId" name="success" />
        </li>
      </ul>
    </section>
</template>
<script setup>
import { defineProps, reactive, getCurrentInstance, onMounted } from 'vue';
import { getService,imgPath } from '../service';
import avatar from '../../src/assets/default-team.png';

const service  = getService();

const ctx = getCurrentInstance();

const monitors = reactive({
  list: [],
  selected: {}
})
onMounted(() => {
  service.getForemanList().then((res) => {
    monitors.list = res;
  })
})



</script>

<style lang="scss" scoped>

.send-box {
  header {
    position: relative;
    padding: 0.24rem 0.32rem;
    .close {
      color: #045BB8;
      font-size: 0.32rem;
      position: absolute;
      top: 50%;
      right: 0.32rem;
      transform: translateY(-50%);
    }
  }
  .subtitle {
    font-size: 0.24rem;
    color: rgba(0,0,0,0.45);
  }
  ul {
    border-top: 0.01rem solid rgba(0,0,0,0.1);
    list-style: none;

    li {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0.16rem 0 0.16rem 0.32rem;
    }

    .avatar {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      border-bottom: 0.01rem solid rgba(0,0,0,0.1);
      text-align: left;
      margin-left: 0.16rem;
      .name {
        font-size: 0.28rem;
      }
      .detail {
        font-size: 0.24rem;
        color: rgba(0,0,0,0.45);
      }
    }

    .van-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.32rem;
      color: #108EE9;
    }
  }
}

</style>