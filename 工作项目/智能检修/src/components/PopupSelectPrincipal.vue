<!--
 * @Description:
 *    筛选条件组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\PopupSelectPrincipal.vue
-->
<template>
  <div class="principal-container">
    <div class="title">
      <div class="title-top">选择班组</div>
      <div class="title-left" @click="handleClose">{{btnTitie}}</div>
    </div>
    <div class="content">
      <van-collapse v-model="activeName1" accordion>
        <van-collapse-item class="collapse-1" :title="item.departName" :name="index" v-for="(item, index) in popupList" :key="item.id">
          <!-- {{item}} -->
          <van-collapse v-model="activeName2" accordion>
            <van-collapse-item class="collapse-2" :title="item2.departName" :name="index2" v-for="(item2, index2) in item.allDepartTreeListList" :key="item2.id">
              <div v-if="item2.allDepartTreeListList.length==0" class="collapse-5" v-for="item3 in item2.userList" :key="item3.id" @click="clickItem(item3,item2.departName)">
                <div class="list-left">
                  <img class="img" :src="item3.avatar==null||item3.avatar==''?avatar:imgPath+item3.avatar">
                </div>
                <div class="list-right">
                  <div class="list-right-left">
                    <div class="left-top">{{item3.realname}}</div>
                    <div class="left-bottom">{{item3.roleName}}</div>
                  </div>
                </div>
              </div>
              <van-collapse v-else v-model="activeName3" accordion>
                <van-collapse-item class="collapse-3" :title="item3.departName" :name="index3" v-for="(item3, index3) in item2.allDepartTreeListList" :key="item3.id">
                  <div v-if="item3.allDepartTreeListList.length==0" class="collapse-5" v-for="item4 in item3.userList" :key="item4.id" @click="clickItem(item4,item3.departName)">
                    <div class="list-left">
                      <img class="img" :src="item4.avatar==null||item4.avatar==''?avatar:imgPath+item4.avatar">
                    </div>
                    <div class="list-right">
                      <div class="list-right-left">
                        <div class="left-top">{{item4.realname}}</div>
                        <div class="left-bottom">{{item4.roleName}}</div>
                      </div>
                    </div>
                  </div>
                  <van-collapse v-else v-model="activeName4" accordion>
                    <van-collapse-item class="collapse-4" :title="item4.departName" :name="index4" v-for="(item4, index4) in item3.allDepartTreeListList" :key="item4.id">
                      <div v-if="item4.allDepartTreeListList.length==0" class="collapse-5" v-for="item5 in item4.userList" :key="item5.id" @click="clickItem(item5,item4.departName)">
                        <div class="list-left">
                          <img class="img" :src="item5.avatar==null||item5.avatar==''?avatar:imgPath+item5.avatar">
                        </div>
                        <div class="list-right">
                          <div class="list-right-left">
                            <div class="left-top">{{item5.realname}}</div>
                            <div class="left-bottom">{{item5.roleName}}</div>
                          </div>
                        </div>
                      </div>
                    </van-collapse-item>
                  </van-collapse>
                </van-collapse-item>
              </van-collapse>
            </van-collapse-item>
          </van-collapse>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, defineComponent } from "vue";
  import { getService,imgPath } from '../service';
import avatar from '../assets/default-member.png';
export default defineComponent({
  name: 'PopupSelectPrincipal',
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
    const activeName1 = ref(0); // 第一次选中的
    const activeName2 = ref(0); // 第二层选中的
    const activeName3 = ref(0); // 第三层选中的
    const activeName4 = ref(0); // 第三层选中的
    // let checked = '1';
    const handleClose = () => { // 点击返回
      emit('handleCloseSelectWorker')
    }
    const clickItem = (v,name) => {
      v.title = name;
      emit('selectWorker', v)
    }
    return {
      btnTitie,
      activeName1,
      activeName2,
      activeName3,
      activeName4,
      // checked,
      handleClose,
      clickItem,
      imgPath,
      avatar
    }
  }
})
</script>

<style lang='scss'>
.principal-container {
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
    
    .collapse-2 > .van-cell {
      height: 1.12rem;
      padding: .42rem .32rem .42rem .64rem;
      background: #F7F9FD;
      .van-cell__title, .van-cell__value {
        text-align: left;
      }
    }
    .van-collapse-item__content {
      padding: 0;
    }
    .collapse-3 > .van-cell {
      height: 1.12rem;
      padding: .42rem .32rem .42rem .96rem;
      background: #F7F9FD;
      .van-cell__title, .van-cell__value {
        text-align: left;
      }
    }

    .collapse-4 > .van-cell {
      height: 1.12rem;
      padding: .42rem .32rem .42rem 1.28rem;
      background: #F7F9FD;
      .van-cell__title, .van-cell__value {
        text-align: left;
      }
    }

    .collapse-5 {
      display: flex;
      height: 1.12rem;
      padding-left: .4rem;
    }
    .collapse-5 {
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
        text-align: left;
        padding-right: .32rem;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,.1);
        .left-top {
          font-size: .28rem;
          color: #333;
        }
        .left-bottom {
          font-size: .24rem;
          color: #8c8c8c;
        }
      }
    }
  }
}
</style>