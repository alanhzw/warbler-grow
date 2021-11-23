<template>
  <div>
    <router-view v-if="logined" />
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import QS from 'qs'
import { useStore } from 'vuex'
import { baseURL, authUrl, sysCode } from './service'
import Axios from 'axios'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'

const store = useStore()
const setUserInfo = (info) => store.commit('user/setInfo', info)
const setToken = (token) => store.commit('user/setToken', token)
const setAuth = (auth) => store.commit('user/setAuth', auth)
// changed by sxw 20210619 todolist No.29
const setDepartList = (departList) =>
  store.commit('user/setDepartList', departList)
const setRoleList = (roleList) => store.commit('user/setRoleList', roleList)
const setBeforeInfo = (beforeInfo) =>
  store.commit('user/setBeforeInfo', beforeInfo)
const router = useRouter()

// const logined =ref('development' === import.meta.env.MODE);
const logined = ref(false)
const openTypeFlag = ref(false)

if (!logined.value) {
  const searchParams = QS.parse(window.location.search.slice(1))

  if (searchParams.openPage) {
    openTypeFlag.value = true
  }
  Axios.post(`${baseURL}mobile/api/doAuth4ALogin`, {
    code: searchParams.code,
    openPage: searchParams.openPage || '',
    anntId: searchParams.anntId || '',
  })
    .then((res) => {
      console.log('res>>>>>>')
      console.log(res)
      if (res.data.code == 500) {
        Toast.fail(res.data.message)
        return
      }
      Axios.post(
        `${authUrl}sys/permission/getUserPermissionByTokenAndSysCode?sysCode=${sysCode}&userId=${res.data.result.userName}`,
        {},
      ).then((authRes) => {
        console.log('authRes>>>>>')
        console.log(authRes)

        if (authRes.data.result) {
          setAuth(authRes.data.result.auth)
        }
      })
      // changed by sxw 20210619 todolist No.29
      const tmpResult = res.data.result
      const before = {
        userId: tmpResult.userId,
        userName: tmpResult.userName,
        realName: tmpResult.realName,
        phoneNumer: tmpResult.phoneNumer,
        workTypeName: tmpResult.workTypeName,
        avatar: tmpResult.avatar,
      }
      if (tmpResult.departs.length > 1 || tmpResult.roles.length > 1) {
        setDepartList(tmpResult.departs)
        setRoleList(tmpResult.roles)

        if (openTypeFlag.value) {
          before.openTypeFlag = true
          before.openPage = searchParams.openPage
        }
        setBeforeInfo(before)
        router.push(`/h5/login`)
        nextTick(() => {
          console.log('before redirect login!!')
          logined.value = true
        })
      } else {
        Axios.post(`${baseURL}mobile/api/doSelectedRoleAndDepart`, {
          userId: tmpResult.userId,
          userName: tmpResult.userName,
          realName: tmpResult.realName,
          phoneNumer: tmpResult.phoneNumer,
          workTypeName: tmpResult.workTypeName,
          avatar: tmpResult.avatar,
          depart: tmpResult.departs[0],
          role: tmpResult.roles[0],
        }).then((response) => {
          console.log('response>>>>>>>>>>>> ')
          console.log(response)

          if (response.data.success) {
            console.log('do user set! ')
            before.loginFlg = 1
            setUserInfo(response.data.result.userInfo)
            setToken(response.data.result.authToken)
            setBeforeInfo(before)

            if (openTypeFlag.value) {
              router.push(`${searchParams.openPage}`)
            }
            nextTick(() => {
              console.log('before redirect index!!')
              logined.value = true
            })
          } else {
            Toast.fail(response.data.message)
            return
          }
        })
      }
      // setToken(res.data.result.authToken);
    })
    .catch((e) => {
      //console.log(e)
      alert('请联系管理员')
    })
}

Axios.post(`${baseURL}qingtui/api/doSignature`, {
  currentPageUrl: window.location.href,
}).then((res) => {
  qt &&
    qt.config({
      ...res.data.result,
      debug: 'development' === import.meta.env.MODE, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      jsApiList: ['scanQRCode'], // 必填，需要使用的JS接口列表
    })
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body,
html {
  overflow-x: hidden;
}
p {
  margin-top: 0;
  margin-bottom: 0;
}

.van-button--info {
  background-color: #6796dd !important;
  border-color: #6796dd !important;
}
</style>
