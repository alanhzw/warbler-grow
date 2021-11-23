<!--
 * @Description:
 *     权限委托
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\Premission\Reason.vue
-->
<template>
    <div class="reason-container">
      <div class="title">
        <div class="title-top">委任理由</div>
        <div class="title-left" @click="handleClose">{{btnTitie}}</div>
      </div>
      <div class="content">
        <div class="collapse" v-for="item in popupList" :key="item.value" @click="clickItem(item)">
            <div class="list-right">
              <div class="list-right-left">
                <div class="left-top">{{item.text}}</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, ref, toRefs, defineComponent } from "vue";
  export default defineComponent({
    name: 'Reason',
    components: {},
    props: {
      popupList: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { emit }) {
      console.log(props.popupList)
      const btnTitie = "< 返回";
      // let checked = '1';
      const handleClose = () => { // 点击返回
        emit('handleCloseSelectReason')
      }
      const clickItem = (v) => {
        emit('selectReason', v.text)
      }
      return {
        btnTitie,
        // checked,
        handleClose,
        clickItem
      }
    }
  })
  </script>
  
  <style lang='scss'>
  .reason-container {
    .title {
      height: .88rem;
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
      }
      .title-left {
        position: absolute;
        left: .3rem;
        font-size: .32rem;
        color: #045BB8;
      }
    }
    .content {
      padding-top: .88rem;
      
      
      .van-collapse-item__content {
        padding: 0;
      }
      .collapse {
        display: flex;
        height: 1.12rem;
        padding-left: .4rem;
      }
      .collapse {
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
          text-align: left;
          padding-right: .32rem;
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0,0,0,.1);
          .left-bottom {
            font-size: .24rem;
          }
        }
      }
    }
  }
  </style>