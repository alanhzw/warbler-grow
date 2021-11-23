<!--
 * @Description:
 *      安全确认页面
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-02
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Security.vue
-->
<template>
  <div class="security">
    <common-title title='检修安全确认事项' v-if="identity==='1' || identity==='3' || isSecurity"></common-title>
    <common-title title='请选择检修安全确认事项' v-if="identity==='2' && !isSecurity"></common-title>
    <security-list :list='list' :editing="editing" @clickBox="clickBox" @changeEditing='changeEditing' ref='SecurityList' :readonly='readonly'></security-list>
    <div class="btn" @click="add()" v-if='!readonly'>
      <van-icon name="add" color="#1989fa" size="0.4rem" />
      <span style="margin-left: 0.16rem">添加</span>
    </div>
    <edit-options :editing="editing" @cancle='cancle' @confirm='confirm'></edit-options>
    <bottom-button v-if="editing < 0 && !readonly">
      <van-button type="info" color="#ffffff" @click='reset()' class="whiteBtn">重置</van-button>
      <van-button type="info" color="#4FA0F7" :disabled="!canSubmit" @click='submit()'>提交</van-button>
    </bottom-button>
  </div>
</template>
<script>
import BottomButton from '../../components/BottomButton.vue';
import CommonTitle from '../../components/CommonTitle.vue';
import EditOptions from '../../components/EditOptions.vue';
import SecurityList from '../../components/SecurityList.vue'
import { reactive, toRefs, ref, onMounted, computed } from 'vue';
import { getService } from '../../service';
import { useStore } from 'vuex';
import { useRouter, useRoute } from "vue-router";
import { Dialog, Toast } from 'vant';

// 工单详情页面
export default {
  components: { SecurityList, EditOptions, CommonTitle, BottomButton },

  name: 'Security',


  setup (props) {
    const SecurityList = ref(null);
    const service = getService();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const canSubmit = ref(false);
    const state = reactive({
      //当前身份 作业长1  班组长2  组员3
      identity: computed(() => store.state.user.info.userType),
      //各个阶段的状态
      status: {},
      list: [],
      //是否进行过安全确认
      isSecurity: computed(() => {
        if (state.status.statusTwo && state.status.statusTwoDate) {
          return true
        } else {
          return false
        }
      }),
      //正在修改的项
      editing: -1,
      //是否只读
      readonly: computed(() => {
        //组员,作业长身份不可编辑
        if (state.identity !== '2') {
          return true
        }
        //提交过再次进入也不可编辑
        //if (state.isSecurity) {
        //  return true
        //}
        return false
      }),
    });
    //切换正在修改的项
    const changeEditing = (index) => {
      state.editing = index
    }
    
    const clickBox = () => {
      canSubmit.value = true;
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
      if (SecurityList.value.title.trim()) {
        state.list[state.editing].confirmContent = SecurityList.value.title
        if (state.list[state.editing].isSaved === '1') {
          state.list[state.editing].isSaved = '2'
        }
        state.list[state.editing].checked = true;
        SecurityList.value.title = ''
        state.editing = -1
        canSubmit.value = true;
      } else {
        Toast.fail({
          message: '安全确认内容填写不完整'
        })
      }
    }
    //重置
    const reset = () => {
      getSecurityList()
    }
    //提交
    const submit = () => {
      let submitArr = state.list.filter((item) => {
        return item.checked
      })
      if (submitArr.length === 0) {
        Toast.fail({
          message: '请至少选择一条安全确认事项进行提交'
        })
        return false
      }
      service.submitSecurity({
        znjxBsnSafeConfirmMatterList: submitArr
      }).then(() => {
        Toast.success({
          message: '提交成功'
        })
        getSecurityList();
      })
    }
    //添加安全确认
    const add = () => {
      if (state.editing === -1) {
        state.list.push({
          confirmContent: "",
          createBy: '',
          createTime: '',
          id: "",
          sysOrgCode: '',
          trustFormMainTableId: route.params.id,
          updateBy: '',
          updateTime: '',
          isSaved: '1'
        })
        state.editing = state.list.length - 1
      } else {
        Toast.fail({
          message: '请完成后进行添加'
        })
      }
    }
    //获取安全确认列表
    const getSecurityList = () => {
      service.getSecurityList({
        trustFormMainTableId: route.params.id
      }).then((data) => {
        state.status = data.progressStatus
        state.list = data.znjxBsnSafeConfirmMatters
        if(state.isSecurity){
          canSubmit.value = false;
          for(var i in state.list){
            state.list[i].checked = true;
          }
        }else{
          canSubmit.value = true;
          state.list.forEach((item) => {
            item = {
              ...item,
              checked: false
            }
          })
        }
        
       
      })
    }

    //初始化
    onMounted(() => [
      getSecurityList()
    ])


    return {
      ...toRefs(state),
      changeEditing,
      cancle,
      confirm,
      reset,
      submit,
      SecurityList,
      add,
      canSubmit,
      clickBox
    }
  }


}
</script>
<style lang="scss">
.security {
  padding: 0.32rem;
  padding-bottom: 2rem;

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