import { reactive } from 'vue';
import { getService, baseURL } from '../../../service';
import store from 'vuex'
import Axios from 'axios'

const service = getService()

export const statData = reactive({
  mouthNumber: 0,
  pendingNumber: 0,
  selfCheckNumber: 0,
  totalMoney: 0,
  totalNumber: 0,
  weekNumber: 0,
})

export const getStatData = () => {
  var myStore = store.useStore();

  var url = '';
  if (myStore) {

    var type = myStore.state.user.info.userType;
    var token = myStore.state.user.token;

    if (type) {
      if (type == 1) {
        url = `${baseURL}mobile/api/groupLeaderHomePage/platform`;
      } else if (type == 2) {
        url = `${baseURL}mobile/api/teamLeaderHomePage/platform`;
      } else if (type == 3) {
        url = `${baseURL}mobile/api/teamMembersPage/platform`;
      } else {
        url = `${baseURL}mobile/api/groupLeaderData/platform`;
      }
      Axios.get(url, { headers: { 'token': token } }).then(res => {
        Object.assign(statData, res.data.result)
      })
    } else {
      service.getStatData().then(res => {
        Object.assign(statData, res)
      });
    }
  } else {
    service.getStatData().then(res => {
      Object.assign(statData, res)
    });
  }
}
export default () => ({
  statData,
  getStatData
})
