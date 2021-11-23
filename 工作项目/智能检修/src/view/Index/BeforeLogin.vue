<!--
 * @Description:
 *     多部门，多角色登录页
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-20
 * @FilePath: \intelligent-overhaul-app\src\view\Index\BeforeLogin.vue
-->
<template>
  <div class="container flex fdc ">
    <div class="c_1 fdc flex alic jusc " :style="[
        {marginTop:(list.departShow && list.roleShow) === true ? '51px' : '107px'}
    ]">
    
      <img src="../../assets/MCC.png"/>
      <div>中冶宝钢智能检修系统</div>
    </div>
    <div class="b_v_o flex fdc alic">
      <div v-if="list.departShow" class="common_card_w flex alic c_c_1" @click="onDepart">
        <img src="../../assets/default-team.png"/>
        <span v-if="departName">{{ departName }}</span>
        <span v-else>请选择部门</span>
      </div>
      <div v-if="list.roleShow" class="common_card_w flex alic c_c_2" @click="onRole">
        <img src="../../assets/default-member.png"/>
        <span v-if="roleName">{{ roleName }}</span>
        <span v-else>请选择角色</span>
      </div>
      <div style="height:16px"></div>
      <div class="init_btn flex alic jusc" @click="open">进入</div>
      <div class="footer">Copyright @ 2000-2021 中软国际 版权所有</div>
    </div>
  </div>
  <van-popup v-model:show="departShow2" position="bottom" :style="{ height: '80%' }" :overlay="false">
    <div class="list-title">请选择部门</div>
    <div class="list-item" v-for="(item,index) in list.departList" :key="index" @click="onChooseDepart(item,index)">
      <div>{{ item.departName }}</div>
      <van-icon v-if="list.departListArr[index]" name="success"/>
    </div>
  </van-popup>
  <van-popup v-model:show="roleShow2" position="bottom" :style="{ height: '80%' }" :overlay="false">
    <div class="list-title">请选择角色</div>
    <div class="list-item" v-for="(item,index) in list.roleList" :key="index" @click="onChooseRole(item,index)">
      <div>{{ item.roleName }}</div>
      <van-icon v-if="list.roleListArr[index]" name="success"/>
    </div>
  </van-popup>
</template>
<script setup>
import {ref, reactive, computed} from 'vue';
import {useStore} from 'vuex';
import Axios from 'axios'
import {Toast} from 'vant';
import {baseURL} from '../../service';
import {useRouter} from 'vue-router';

const setUserInfo = (info) => store.commit('user/setInfo', info);
const setToken = (token) => store.commit('user/setToken', token);
const setBeforeInfo = (beforeInfo) => store.commit('user/setBeforeInfo', beforeInfo);

const store = useStore()
const router = useRouter();
const departList = computed(() => store.state.user.departList)
const roleList = computed(() => store.state.user.roleList)
const beforeInfo = computed(() => store.state.user.beforeInfo)

const departName = ref('')
const roleName = ref('')
const list = reactive({
  departList: departList.value,
  departListArr: departList.value.map((item) => {
    return false
  }),
  roleList: roleList.value,
  roleListArr: roleList.value.map((item) => {
    return false
  }),
  userInfoFrom4A: {},
  departShow: departList.value.length > 1 ? true : false,
  roleShow: roleList.value.length > 1 ? true : false,
})

const departShow2 = ref(false)
const roleShow2 = ref(false)

const onDepart = ()=>{
    departShow2.value = true
} 
const onRole = ()  =>{
    roleShow2.value = true
}

const onChooseDepart = (item, index) => {
  selectValue(index, list.departListArr)
  departShow2.value = false
  departName.value = item.departName
  list.userInfoFrom4A.depart = item
}

const onChooseRole = (item, index) => {
  selectValue(index, list.roleListArr)
  roleShow2.value = false
  roleName.value = item.roleName
  list.userInfoFrom4A.role = item
}

const selectValue = (e, arr) => {
  for (var i in arr) {
    if (i == e) {
      arr[i] = !arr[i]
    } else {
      arr[i] = false
    }
  }
}

const open = () => {

  if (list.departShow && !list.userInfoFrom4A.depart) {
    Toast.fail("请选择部门");
    return
  }
  if (list.roleShow && !list.userInfoFrom4A.role) {
    Toast.fail("请选择角色");
    return
  }
  
  Axios.post(`${baseURL}mobile/api/doSelectedRoleAndDepart`, {
    userId: beforeInfo.value.userId,
    userName: beforeInfo.value.userName,
    realName: beforeInfo.value.realName,
    phoneNumer: beforeInfo.value.phoneNumer,
    workTypeName: beforeInfo.value.workTypeName,
    avatar: beforeInfo.value.avatar,
    depart: list.userInfoFrom4A.depart ? list.userInfoFrom4A.depart : list.departList[0],
    role: list.userInfoFrom4A.role ? list.userInfoFrom4A.role : list.roleList[0]
  }).then((res) => {
    console.log(res)
    if (res.data.success) {
      beforeInfo.value.loginFlg = 2
      setUserInfo(res.data.result.userInfo);
      setToken(res.data.result.authToken);
      setBeforeInfo(beforeInfo.value)

      if(beforeInfo.value.openTypeFlag){
        router.push(`${beforeInfo.value.openPage}`)
      }else{
        router.push(`/h5`)
      }
    } else {
      Toast.fail(res.data.message)
      return
    }
  })
}
</script>
<style lang="scss" scoped>
@import '../../style/_variable.scss';

.flex {
  display: flex;
}

.alic {
  align-items: center;
}

.jusc {
  justify-content: center;
}

.fdc {
  flex-direction: column;
}

.fdr {
  flex-direction: row;
}

.container {
  justify-content: space-between;
  overflow: hidden;
  height: 100vh;
  background-image: url(/src/assets/login-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0 5vw;
}

.c_1 {
  width: 100%;
  height: auto;
}

.c_1 > img {
  width: 92px;
  height: 92px;
}

.c_1 > div {
  font-size: 18px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 54px;
}

.footer{
  font-size: 11px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 17px;
  margin-bottom: 60px;
}

.init_btn{
  width: 343px;
  height: 46px;
  background: #FFFFFF;
  border-radius: 4px;
  font-size: 16px;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #000000;
  line-height: 24px;
  margin-bottom: 65px;
}


.common_card_w{
  width: 343px;
  height: 100px;
  background: #FFFFFF;
  border-radius: 4px;
  margin-bottom: 8px;
}

.common_card_w > img{
  width: 60px;
  height: 60px;
  border-radius: 100%;
  overflow: hidden;
  margin-left: 28px;
}

.common_card_w > span{
  font-size: 18px;
  font-family: SourceHanSansCN-Light, SourceHanSansCN;
  font-weight: 300;
  color: #000000;
  line-height: 27px;
  margin-left: 40px;
}

//.container{
//    height: 100vh;
//    background-image: url(/src/assets/login-bg.png);
//    background-size: cover;
//    background-repeat: no-repeat;
//    background-position: center;
//    padding: 0 5vw;
//    div:nth-child(1){
//        height: 40vh;
//        div{
//            display: flex;
//            justify-content: center;
//            height: 30vh;
//        }
//        p{
//            font-weight: 600;
//            color: $WHITE;
//            font-size: .36rem;
//        }
//        img{
//            width: 2rem;
//            height: 2rem;
//            border-radius: 50%;
//            margin-top: 10vh;
//        }
//    }
//    div:nth-child(2),:nth-child(3){
//        display: flex;
//        align-items: center;
//        height: 15vh;
//        width: 90vw;
//        border-radius: 4px;
//        margin-bottom: 2vh;
//        background-color: $WHITE;
//        img{
//            width: 1.3rem;
//            height: 1.3rem;
//            border-radius: 50%;
//            margin-left: 5vw;
//        }
//    }
//    div:nth-child(3){
//        margin-bottom: 4vh;
//    }
//    div:nth-child(4){
//        height: 6vh;
//        border-radius: 4px;
//        line-height: 6vh;
//        font-weight: 600;
//        background-color: $WHITE;
//    }
//    div:nth-child(5){
//        display: flex;
//        align-items: center;
//        justify-content: center;
//        height: 18vh;
//        font-size: .12rem;
//    }
//    span{
//        margin-left: 12vw;
//    }
//}
//}

.list-title{
  font-size: .36rem;
  color: #000000;
  font-weight: 500;
  padding: .3rem;
}
.list-item {
  margin: .3rem 0;
  padding: 0 .3rem .3rem;
  border-bottom: .01rem solid rgba(0, 0, 0, .1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  > :nth-child(2) {
    color: #108EE9;
  }
}
</style>
