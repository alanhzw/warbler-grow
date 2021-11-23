<!--
 * @Description:
 *    筛选条件组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\PopupSelectTypeOfWorkList.vue
-->
<template>
  <div class="container">
    <div class="list" v-for="(item) in popupList" :key="item.id">
      <div class="list-left">
        <!-- <div class="img"></div> -->
        <img class="img" :src="item.avatar == null || item.avatar == '' ? avatar : imgPath + item.avatar" alt="">
      </div>
      <div class="list-right">
        <div class="list-right-left">
          <div class="left-top">{{item.realname}}</div>
          <div class="left-bottom">
            <img class="icon" :src="workTypes[workType]">
          </div>
        </div>
        <van-checkbox :disabled="item.noDelete" v-model="item.isSelect"></van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, defineComponent } from "vue";
import { getService,imgPath } from '../service';
import iconDG from '../assets/icon-DG.png';
import iconFZ from '../assets/icon-FZ.png';
import iconGD from '../assets/icon-GD.png';
import iconHJ from '../assets/icon-HJ.png';
import iconLW from '../assets/icon-LW.png';
import iconQZ from '../assets/icon-QZ.png';
import iconQG from '../assets/icon-QG.png';
import iconYJ from '../assets/icon-YJ.png';
import iconWD from '../assets/icon-WD.png';
import iconYB from '../assets/icon-YB.png';
import iconLZ from '../assets/icon-LZ.png';
import iconQT from '../assets/icon-QT.png';
import avatar from '../assets/default-member.png';
export default defineComponent({
  name: 'PopupSelectTypeOfWorkList',
  props: {
    popupList: {
      type: Array,
      default: () => []
    },
    workType: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const workTypes = reactive({
    'YJ': iconYJ,
    'QG': iconQG,
    'LW': iconLW,
    'FZ': iconFZ,
    'YB': iconYB,
    'HJ': iconHJ,
    'WD': iconWD,
    'DG': iconDG,
    'QZ': iconQZ,
    'GD': iconGD,
    'TJ': iconYJ,
    'LZ': iconLZ,
    'QT': iconQT
  });
    return {
      imgPath,
      workTypes,
      avatar
    }
  }
})
</script>

<style lang='scss'>
.container {
  .list {
    display: flex;
    height: 1.11rem;
    .list-left {
      width: 1.36rem;
      height: 1.11rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        // background: #D8D8D8;
      }
    }
    .list-right {
      padding-right: .32rem;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0,0,0,.1);
      .left-top {
        font-size: .28rem;
        color: #000;
      }
      .left-bottom {
        display: flex;
        justify-content: flex-start;
        .icon {
          width: .33rem;
          height: .33rem;
          // border-radius: 50%;
          // border: 1px solid #DDDDDD;
          margin-top: .12rem;
          margin-right: .16rem;
        }
      }
    }
  }
}
</style>