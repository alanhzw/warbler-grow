<!--
 * @Description:
 *      交底的页面
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-06
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Clarification.vue
-->
<template>
  <div class="clarificaiton">
    <common-title title='安全技术交底及对策措施' v-if="identity==='1' || identity==='3' || isClar"></common-title>
    <common-title title='请确认安全技术交底及对策措施' v-if="identity==='2' && !isClar"></common-title>
    <clarification-list :showSelecter="false" :showInputer="false" :list='list' :editing="editing" @changeEditing='changeEditing' @deleteItem='deleteItem' ref='clarificationList' :readonly='readonly'></clarification-list>
    <div class="btn" @click="add()" v-if='identity==="2"'>
      <van-icon name="add" color="#1989fa" size="0.4rem" />
      <span style="margin-left: 0.16rem">添加</span>
    </div>
    <edit-options :editing="editing" @cancle='cancle' @confirm='confirm'></edit-options>
    <bottom-button v-if='editing < 0 && identity==="2"'>
      <van-button type="info" color="#fff" @click='reset()' class="whiteBtn">重置</van-button>
      <van-button type="info" color="#4FA0F7" :disabled="!canSubmit" @click='submit()'>提交</van-button>
    </bottom-button>
    <bottom-button v-if='identity==="3" && showButton==true'>
      <van-button type="info" color="#4FA0F7" v-if='disabled' :disabled='disabled' :class="{disabled:disabled}">确认 ({{countdown}}秒)</van-button>
      <van-button type="info" color="#4FA0F7" v-else @click='submitRecord'>确认</van-button>
    </bottom-button>
  </div>
</template>
<script>
import BottomButton from '../../components/BottomButton.vue'
import ClarificationList from '../../components/ClarificationList.vue'
import CommonTitle from '../../components/CommonTitle.vue'
import EditOptions from '../../components/EditOptions.vue'
import { reactive, toRefs, ref, onMounted, computed } from 'vue'
import { getService } from '../../service';
import { useStore } from 'vuex';
import { useRouter, useRoute } from "vue-router";
import { Dialog, Toast } from 'vant';

// 交底
export default {
  components: { CommonTitle, EditOptions, ClarificationList, BottomButton },
  name: 'Clarification',
  setup (props) {
    const clarificationList = ref(null);
    const canSubmit = ref(false);
    const service = getService();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      //当前身份 作业长1  班组长2  组员3
      identity: computed(() => store.state.user.info.userType),
      list: [],
      showButton: true, //是否展示确认按钮
      editing: -1,//正在修改的项
      //是否只读
      readonly: computed(() => {
        //组员,作业长身份不可编辑
        if (state.identity !== '2') {
          return true
        }
        //提交过再次进入也不可编辑
        //if (state.isClar) {
        //  return true
        //}
        return false
      }),
      disabled: computed(() => state.countdown > 0),//底部button是否可以点击
      countdown: 20,//倒计时
      //各个阶段的状态
      status: {},
      //是否进行过安全确认
      isClar: computed(() => {
        if (state.status.statusThree && state.status.statusThreeDate) {
          return true
        } else {
          return false
        }
      }),
    });
    //切换正在修改的项
    const changeEditing = (index) => {
      state.editing = index
    }
    //删除某一项
    const deleteItem = (index) => {
      if (state.list[index].id) {
        service.deleteClarification({
          ids: state.list[index].id
        }).then(() => {
          state.list.splice(index, 1)
        })
      } else {
        state.list.splice(index, 1)
      }
    }
    //取消修改
    const cancle = () => {
      state.editing = -1
      state.list.forEach((item, index) => {
        if (item.isSaved && item.isSaved === '1') {
          state.list.splice(index, 1)
        }
      })

    }
    //完成修改
    const confirm = () => {
      if (clarificationList.value.dangerRoot.trim() && clarificationList.value.countermeasureMeasure.trim()) {
        state.list[state.editing].dangerRoot = clarificationList.value.dangerRoot
        state.list[state.editing].countermeasureMeasure = clarificationList.value.countermeasureMeasure
        if (state.list[state.editing].isSaved === '1') {
          state.list[state.editing].isSaved = '2'
        }
        state.editing = -1
        canSubmit.value = true
        clarificationList.value.dangerRoot = ''
        clarificationList.value.countermeasureMeasure = ''
      } else {
        Toast.fail({
          message: '交底内容填写不完整'
        })
      }
    }
    //重置
    const reset = () => {
      getClarificationList()
    }
    //提交
    const submit = () => {
      if (state.list.length > 0) {
        service.submitClarification({
          znjxBsnSafeDetailsMouldList: state.list
        }).then(() => {
          Toast.success({
            message: '提交成功'
          })
          getClarificationList()
        })
      } else {
        Toast.fail({
          message: '请至少保留一条交底信息'
        })
        // service.submitNoClarification({
        //   trustFormMainTableId: route.params.id
        // }).then(() => {
        //   Toast.success({
        //     message: '提交成功'
        //   })
        //   getClarificationList()
        // })
      }


    }
    //获取交底列表
    const getClarificationList = () => {
      service.getClarificationList({
        trustFormMainTableId: route.params.id
      }).then((data) => {
        state.list = data.znjxBsnSafeDetailsMoulds
        state.list.forEach((item) => {
          item = {
            ...item,
            checked: false
          }
        })
        state.status = data.progressStatus 
        if(state.isClar){
          canSubmit.value = false
        }else{
          canSubmit.value = true
        }
        // 获取 安全交底记录
        service.getSecurityClarificationRecord({
          trustFormMainTableId: route.params.id
        }).then((res) => {
          res.forEach((ele)=>{
            if(store.state.user.info.transferToUserId){
              if(ele.sysUserId == store.state.user.info.transferToUserId && ele.clarificationFlg == '1'){
                state.showButton=false
              }
            }else{
              if(ele.sysUserId == store.state.user.info.userId && ele.clarificationFlg == '1'){
                state.showButton=false
              }
            }
          })
        })
      })
    }

    const submitRecord = () =>{
      service.editRecord({
        trustFormMainTableId: route.params.id,
        clarificationFlg: '1'
      }).then((res) => {
        state.showButton=false
      })
    }

    //初始化
    onMounted(() => {
      getClarificationList()
      const timer = setInterval(() => {
        state.countdown -= 1
        if (state.countdown < 0) {
          window.clearInterval(timer)
        }
      }, 1000);
    })
    //添加交底
    const add = () => {
      if (state.editing === -1) {
        state.list.push({
          countermeasureMeasure: "",
          createBy: store.state.user.info.userName,
          createTime: "",
          dangerRoot: "",
          id: "",
          sort: 0,
          stopUse: "",
          sysOrgCode: store.state.user.info.orgCode,
          trustFormMainTableId: route.params.id,
          updateBy: "",
          updateTime: "",
          znjxBsnSafeDetailsMouldList: [
            {}
          ],
          isSaved: '1'
        })
        state.editing = state.list.length - 1
      } else {
        Toast.fail({
          message: '请完成后进行添加'
        })
      }
    }
    return {
      ...toRefs(state),
      clarificationList,
      changeEditing,
      deleteItem,
      cancle,
      confirm,
      reset,
      submit,
      add,
      submitRecord,
      canSubmit
    }
  }


}
</script>
<style lang="scss" scoped>
.clarificaiton {
  padding: 0.32rem 0.32rem 2rem 0.32rem;
  .disabled {
    background-color: #dddddd !important;
    color: #bbbbbb !important;
    border: none !important;
    border-radius: 4px !important;
  }
  .btn {
    width: 6.86rem;
    height: 0.92rem;
    line-height: 0.92rem;
    border: 1px dashed #bbbbbb;
    border-radius: 0.08rem;
    font-size: 0.32rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.32rem;
  }
}
</style>