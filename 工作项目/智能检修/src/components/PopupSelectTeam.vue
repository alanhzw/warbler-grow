<!--
 * @Description:
 *    选择班组组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\PopupSelectTeam.vue
-->
<template>
  <div class="team-container">
    <div class="title">
      <div class="title-top">选择班组</div>
      <div class="title-left" @click="handleClose">{{btnTitie}}</div>
    </div>
    <div class="content">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item class="collapse-1" :title="item.factoryTeamName" :name="index" v-for="(item, index) in popupList" :key="item.factoryTeamId">
          <van-collapse v-model="activeNameInner" accordion>
            <van-collapse-item class="collapse-2" :title="item2.operationAreaName" :name="index2" v-for="(item2, index2) in item.operationAreaList" :key="item2.operationAreaId">
              <!-- <van-radio-group class="collapse-3" v-model="checked">
                <van-cell-group>
                  <van-cell v-for="(item3) in item2.groupsRsepList" :title="item3.groupsName" clickable @click="selectTeam(item3,)" :key="item3.groupsId">
                    <template #right-icon>
                      <van-radio :name="item3.groupsId">
                        <van-icon name="success" />
                        <template #icon="props">
                          <van-icon name="success" v-if="props.checked" />
                          <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
                        </template>
                      </van-radio>
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-radio-group> -->
              <ul class="collapse-3">
                <li v-for="(item3) in item2.groupsRsepList" :key="item3.groupsId" @click="selectTeam(item3,)">
                  <div class="info">
                    <p class="name">{{item3.groupsName}}</p>
                  </div>
                  <van-icon v-show="checked==item3.groupsId" name="success" />
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: 'PopupSelectTeam',
  components: {},
  props: {
    popupList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const btnTitie = "< 返回";
    const activeName = ref(0); // 第一次选中的
    const activeNameInner = ref(0); // 第二层选中的
    // let list = reactive([
    //   {
    //     title: "第一检修队",
    //     arr: [
    //       {
    //         title: "原料区",
    //         arr: [
    //           {
    //             title: "05001C-机械1班",
    //             id: 1,
    //           },
    //           {
    //             title: "05001C-机械2班",
    //             id: 2,
    //           },
    //           {
    //             title: "05001C-机械3班",
    //             id: 3,
    //           },
    //           {
    //             title: "05001C-机械4班",
    //             id: 4,
    //           }
    //         ]
    //       },
    //       {
    //         title: "其他区",
    //         arr: [
    //           {
    //             title: "05001C-机械1班",
    //             id: 11,
    //           },
    //           {
    //             title: "05001C-机械2班",
    //             id: 12,
    //           },
    //           {
    //             title: "05001C-机械3班",
    //             id: 13,
    //           },
    //           {
    //             title: "05001C-机械4班",
    //             id: 14,
    //           }
    //         ]
    //       }
    //     ]
    //   },
    // ])
    let checked = ref('');
    let selectedList = reactive({ //选中的班组员工列表
      arr: []
    })
    const selectTeam = (v) => { //选择班组
      console.log(v)
      checked.value = v.groupsId;
      selectedList.arr = v;
      handleClose();
    }
    const handleClose = () => { // 点击返回
      const params = {
        isShow: false,
        list: selectedList.arr
      }
      emit('handleClose', params)
    }
   
    return {
      btnTitie,
      activeName,
      activeNameInner,
      // list,
      checked,
      handleClose,
      selectTeam
    }
  }
})
</script>

<style lang='scss'>
.team-container {
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
    
    .collapse-1 > .van-cell {
      height: 1.12rem;
      padding: .42rem .32rem .42rem;
      background: #F7F9FD;
      .van-cell__title, .van-cell__value {
        text-align: left;
      }
    }
    .van-collapse-item__content {
      padding: 0;
    }
    .collapse-2 > .van-cell {
      height: 1.12rem;
      padding: .42rem .32rem .42rem .64rem;
      background: #F7F9FD;
      .van-cell__title, .van-cell__value {
        text-align: left;
      }
    }
    // .collapse-3 li {
    //   height: 1.12rem;
    //   padding: 0;
    //   padding: 0 .32rem 0 .64rem;
    //   // border-bottom: 1px solid red;
    //   align-items: center;
    //   // background: #F7F9FD;
    //   .van-cell__title, .van-cell__value {
    //     text-align: left;
    //   }
    //   .info {
    //   flex: 1;
    //   border-bottom: 0.01rem solid rgba(0,0,0,0.1);
    //   text-align: left;
    //   margin-left: 0.16rem;
    //   .name {
    //     font-size: 0.28rem;
    //   }
    //   .detail {
    //     font-size: 0.24rem;
    //     color: rgba(0,0,0,0.45);
    //   }
    // }

    // .van-icon {
    //   position: absolute;
    //   top: 50%;
    //   transform: translateY(-50%);
    //   right: 0.32rem;
    //   color: #108EE9;
    // }
    // }
    ul {
    border-top: 0.01rem solid rgba(0,0,0,0.1);
    list-style: none;

    li {
      height: 1.12rem;
      line-height: 1.12rem;
      position: relative;
      display: flex;
      align-items: center;
      padding-left: .32rem;
      // padding: 0.16rem 0 0.16rem 0.32rem;
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
        color: #000;
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
      font-size: .4rem;
    }
  }
  }
}
</style>