<!--
 * @Description:
 *    筛选条件组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\PopupSelectTypeOfWork.vue
-->
<template>
  <div class="container">
    <div class="title">
      <div class="title-top">选择{{Utils.getWorkTypeName(popupTitle.workType)}}</div>
      <div class="title-bottom">已选择{{selectedNum}}/{{popupTitle.num}}人</div>
      <div class="title-right" @click="handleClick">完成</div>
    </div>
    <div class="content">
      <PopupSelectTypeOfWorkList :workType="popupTitle.workType" :popupList="popupList" />
    </div>
    <div>
      <!-- <div>以下为{{PopupSelectTeamCon.title}}</div> -->
      <div class="popup-sub-title">{{PopupSelectTeamCon.title}}</div>
      <PopupSelectTypeOfWorkList :workType="popupTitle.workType" :popupList="PopupSelectTeamCon.arr" />
    </div>
    <div class="bottom-btn">
      <van-button type="info" color="#4FA0F7" block @click="showPopup">其他组员工</van-button>
      <van-popup :overlay-style="{opacity: .2}" v-model:show="teamShow" position="bottom" :style="{height: '70%'}">
        <PopupSelectTeam :popupList="teamList.value" @handleClose="handleClose" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, defineComponent, computed, onMounted } from "vue";
import PopupSelectTypeOfWorkList from '../components/PopupSelectTypeOfWorkList.vue';
import PopupSelectTeam from '../components/PopupSelectTeam.vue';
import { getService } from '../service';
import Utils from '../utils';
export default defineComponent({
  name: 'PopupSelectTypeOfWork',
  components: {PopupSelectTypeOfWorkList, PopupSelectTeam},
  props: {
    popupList: {
      type: Array,
      default: () => []
    },
    popupTitle : {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const service = getService();
    const selectedNum = computed(() => {
      let arr = props.popupList.filter((item) => item.isSelect);
      let otherArr = PopupSelectTeamCon.arr?.filter((item) => item.isSelect) || [];
      return arr.length + otherArr.length;
    });
    const handleClick = () => { // 点击完成
      const params = {
        isShow: false,
        list: props.popupList,
        otherTeam: PopupSelectTeamCon
      }

      console.log(params,'params')
      emit('handleClick', params)
    }
    let teamList = reactive({ // 其他班组list
      arr: []
    })
    let teamShow = ref(false); // 选择工人弹出层展示
    const showPopup = () => {
      service.getTeamLeaderConfirmQuerySysUserlist({
        workType: props.popupTitle.workType
      }).then(res => {
        // console.log(res)
        teamList.value = res;
        // res.forEach(item => {
        //   // 弹窗中选中的
        //   let selectedWorker = v.workerList?.find(x => x.id === item.id);
        //   item.isSelect = selectedWorker ? true : false;
        // });
        // popupList.arr = res;
      })
      teamShow.value = true
    }
    let PopupSelectTeamCon = reactive({ // 选择的班组
      arr: [],
      title: ''
    });
    const handleClose = (v) => { // 点击返回
      console.log(v)
      teamShow.value = v.isShow;
      PopupSelectTeamCon.title = v.list.groupsName;
      v.list.sysUserList?.forEach(item => {
        // 弹窗中选中的
        // let selectedWorker = v.workerList?.find(x => x.id === item.id);
        // item.isSelect = selectedWorker ? true : false;
        item.isSelect = false;
        item.isOtherTeam = true;
      });
      PopupSelectTeamCon.arr = v.list.sysUserList;
    }
    onMounted(() => {
      console.log(props)
    })
    return {
      Utils,
      handleClick,
      teamShow,
      showPopup,
      PopupSelectTeamCon,
      handleClose,
      selectedNum,
      teamList
    }
  }
})
</script>

<style lang='scss' scoped>
.container {
  .title {
    // height: 1.2rem;
    padding: .24rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.1);
    position: fixed;
    z-index: 10;
    background-color: #fff;
    .title-top {
      font-size: .36rem;
      font-weight: 500;
      color: #000;
      margin-bottom: .12rem;
    }
    .title-bottom {
      font-size: .24rem;
      font-weight: 400;
      color: rgba(0,0,0,.5);
    }
    .title-right {
      position: absolute;
      top: .45rem;
      right: .3rem;
      font-size: .32rem;
      color: #045BB8;
    }
  }
  .content {
    padding-top: 1.5rem;
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
          background: #D8D8D8;
        }
      }
      .list-right {
        padding-right: .32rem;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,.1);
        .left-bottom {
          display: flex;
          justify-content: flex-start;
          .icon {
            width: .32rem;
            height: .32rem;
            border-radius: 50%;
            border: 1px solid #DDDDDD;
            margin-top: .12rem;
            margin-right: .16rem;
          }
        }
      }
    }
  }
  .popup-sub-title {
    margin: .48rem 0 .4rem .32rem;
    color: #8c8c8c;
    font-size: .24rem;
    text-align: left;
  }
  .bottom-btn {
    padding: .36rem .32rem .2rem;
  }
}
</style>