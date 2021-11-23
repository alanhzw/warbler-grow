<!--
 * @Description:
 *    筛选条件组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\PopupFilterLeader.vue
-->
<template>
  <div>
    <van-row class="van-row">
      <van-col :span="3" class="left" @click="onCancel">取消</van-col>
      <van-col :span="18" class="center">筛选</van-col>
      <van-col :span="3" class="right" @click="onReset">重置</van-col>
    </van-row>
    <div class="content">
      <span>委托单位</span>
      <van-field
        v-model="entrustCompany"
        is-link
        readonly
        placeholder="请选择委托单位"
        @click="onChooseEntrust"
        class="filed-item"
      />
      <van-popup v-model:show="entrustCompanyShow" position="bottom" :style="{ height: '95%' }" :overlay="false">
        <van-cascader
          v-model="entrustCompanyValue"
          title="选择委托单位"
          active-color="#044A91"
          :options="data.trustOptions"
          :field-names="data.fieldNames"
          @close="entrustCompanyShow = false"
          @finish="onEntrustCompanyFinish"
          @change="onChange"
        />
      </van-popup>
      <span>施工单位</span>
      <van-field
        v-model="constructionUnit"
        is-link
        readonly
        placeholder="请选择施工单位"
        @click="onChooseConstructionUnit"
        class="filed-item"
      />
      <van-popup v-model:show="constructionUnitShow" position="bottom" :style="{ height: '95%' }" :overlay="false">
        <van-cascader
          v-model="constructionUnitValue"
          title="选择施工单位"
          active-color="#044A91"
          :options="data.constructionUnit"
          :field-names="data.departNames"
          style="height: '95%' "
          @close="constructionUnitShow = false"
          @finish="onConstructionUnitFinish"
          @change="onChangeUnit"
        />
      </van-popup>
      <!-- <van-popup v-model:show="defaultTeamShow" position="bottom" :style="{ height: '95%' }" :overlay="false">
        <div class="team-item-header">
          <div>选择班组</div>
          <div>共有{{ data.teamList.length }}个班组可以选择</div>
          <div @click="onTeamFinish">完成</div>
        </div>
        <div class="team-item-content" v-for="(item,index) in data.teamList" :key="index" @click="onSelectTeam(index)">
          <div>
            <img :src="item.avatar == null || item.avatar == '' ? '../../src/assets/default-team.png' : imgPath + item.avatar"/>
            <div>
              <div>{{ item.departName }}</div>
              <div>{{ item.groupsLeaderName }}</div>
              <div>组员{{ item.memberCount }}人</div>
            </div>
          </div>
          <van-icon v-if="teamListArr.selectedArr[index]" name="success" />
        </div>
      </van-popup> -->
      <span>预计施工日期</span>
      <van-field
        v-model="expectDate"
        right-icon="notes-o"
        readonly
        placeholder="请选择施工日期"
        @click="expectDateShow = true"
        class="filed-item"
      />
      <van-calendar v-model:show="expectDateShow" :default-date="new Date()" color="#1989fa" @confirm="onConfirm" />
      <span>质量层级</span>
      <div class="mass">
        <div :class="!buttonFlg.massArr[0]?'button1':'button1-blue'" @click="onMassSelect('0')">A级</div>
        <div :class="!buttonFlg.massArr[1]?'button1':'button1-blue'" @click="onMassSelect('1')">B级</div>
        <div :class="!buttonFlg.massArr[2]?'button1':'button1-blue'" @click="onMassSelect('2')">C级</div>
        <div :class="!buttonFlg.massArr[3]?'button1':'button1-blue'" @click="onMassSelect('3')">重要</div>
        <div :class="!buttonFlg.massArr[4]?'button1':'button1-blue'" @click="onMassSelect('4')">无</div>
      </div>
      <span>施工类别</span>
      <div class="type">
        <div :class="!buttonFlg.typeArr[0]?'button2':'button2-blue'" @click="onTypeSelect('0')">年修</div>
        <div :class="!buttonFlg.typeArr[1]?'button2':'button2-blue'" @click="onTypeSelect('1')">定修</div>
        <div :class="!buttonFlg.typeArr[2]?'button2':'button2-blue'" @click="onTypeSelect('2')">日修</div>
        <div :class="!buttonFlg.typeArr[3]?'button2':'button2-blue'" @click="onTypeSelect('3')">抢修</div>
      </div>
      <span>高危等级</span>
      <div class="level">
        <div :class="!buttonFlg.levelArr[0]?'button4':'button4-blue'" @click="onLevelSelect('0')">一级高危项目</div>
        <div :class="!buttonFlg.levelArr[1]?'button4':'button4-blue'" @click="onLevelSelect('1')">二级高危项目</div>
        <div :class="!buttonFlg.levelArr[2]?'button4':'button4-blue'" @click="onLevelSelect('2')">三级高危项目</div>
      </div>
      <van-button type="primary" @click="onFilterConfirm">确定</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmit, defineProps, onMounted } from 'vue';
import { getService, imgPath } from '../service';

const props = defineProps({
  type: {
    default: '0'
  }
})

const buttonFlg = reactive({
  massArr:[false,false,false,false,false],
  typeArr:[false,false,false,false],
  levelArr:[false,false,false]
})

const teamListArr = reactive({
  selectedArr:[],
  typeValueArr: [3,2,1,4],
  levelValueArr: [1,2,3],
  massValueArr: ['A','B','C','4','W']
})

// const orderData = reactive({
//   list: [],
//   page: {
//     pageNo: 1,
//     pageSize: 10,
//     total: 0
//   }
// })

const entrustCompany = ref('')
const entrustCompanyValue = ref('')
const entrustCompanyShow = ref(false)
const constructionUnit = ref('')
const constructionUnitValue = ref('')
const constructionUnitShow = ref(false)

const defaultTeam = ref('')
const defaultTeamShow = ref(false)
const defaultTeamId = ref('')

const expectDate = ref('')
const expectDateShow = ref(false)

const emit = defineEmit()

const data = reactive({
  fieldNames: {
    text: 'name',
    value: 'id',
    children: 'children',
  },
  departNames: {
    text: 'departName',
    value: 'departId',
    children: 'children',
  },
  trustOptions: [],
  teamList: [],
  constructionUnit:[]
})

const service = getService();
const getTrustUnitTree = () => {
  service.getTrustUnitTree().then(res => {
    data.trustOptions = res
    data.trustOptions = handleData(data.trustOptions)
  })
}
const getConstructionUnitTree = () => {
  service.getConstructionUnit().then(res => {
    data.constructionUnit = res
    data.constructionUnit = handleData(data.constructionUnit)
  })
}

const handleData = (data) => {
  if (data) {
    data.map(item => {
      if (item.children) {
        if (!item.children.length) {
          delete item.children
        } else {
          handleData(item.children)
        }
      }
    })
  }
  return data
}

const onChooseConstructionUnit = () => {
  constructionUnitShow.value = true
  getConstructionUnitTree()
}
const onChooseEntrust = () => {
  entrustCompanyShow.value = true
  getTrustUnitTree()
}

const getForemanList = () => {
  service.getForemanList().then(res => {
    data.teamList = res
    for(var i=0;i<data.teamList.length;i++){
      teamListArr.selectedArr[i] = false
    }
  })
}
onMounted(() => {
  getForemanList()
})

const onEntrustCompanyFinish = (obj) => {
  entrustCompanyShow.value = false
  entrustCompany.value = obj.selectedOptions.map((option) => option.name).join('/');
}
const onConstructionUnitFinish = (obj) => {
  constructionUnitShow.value = false
  constructionUnit.value = obj.selectedOptions.map((option) => option.departName).join('/');
}
const onChange = (obj) =>{
  console.log(obj)
  if(obj.selectedOptions.length>1){
    entrustCompany.value = obj.selectedOptions.map((option) => option.name).join('/');
  }else{
    entrustCompany.value = obj.selectedOptions.map((option) => option.name);
  }
}
const onChangeUnit = (obj) =>{
  console.log(obj)
  if(obj.selectedOptions.length>1){
    constructionUnit.value = obj.selectedOptions.map((option) => option.departName).join('/');
  }else{
    constructionUnit.value = obj.selectedOptions.map((option) => option.departName);
  }
}
const onTeamFinish = () => {
  defaultTeamShow.value = false
  const index = teamListArr.selectedArr.findIndex(item => item == true)
  if(index > -1){
    defaultTeam.value = data.teamList[index].departName
    defaultTeamId.value = data.teamList[index].departId
  }
}
const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
const onConfirm = (date) => {
  expectDateShow.value= false;
  expectDate.value = formatDate(date);
}

const onCancel = () => {
  emit('close')
  onReset()
}
const onReset = () => {
  entrustCompany.value = ''
  entrustCompanyValue.value = ''
  constructionUnitValue.value = ''
  defaultTeam.value = ''
  defaultTeamId.value = ''
  expectDate.value = ''
  buttonFlg.massArr = [false,false,false,false,false]
  buttonFlg.typeArr = [false,false,false,false]
  buttonFlg.levelArr = [false,false,false]
  teamListArr.selectedArr = teamListArr.selectedArr.map(item => item = false)
}
const onMassSelect = (e) => {
  selectValues(e, buttonFlg.massArr)
}
const onTypeSelect = (e) => {
  selectValues(e, buttonFlg.typeArr)
}
const onLevelSelect = (e) => {
  selectValues(e, buttonFlg.levelArr)
}
const onSelectTeam = (index) => {
  selectValue(index, teamListArr.selectedArr)
}
const selectValue = (e, arr) => {
  for (var i in arr) {
    if ( i == e ) {
      arr[i] = !arr[i]
    } else {
      arr[i] = false
    }
  }
}
const selectValues = (e, arr) => {
  for (var i in arr) {
    if ( i == e ) {
      arr[i] = !arr[i]
    }
  }
}
const filterArr = (arr,valueArr) => {
  const list = []
  arr.forEach((item,index) => {
    if(item == true) {
      list.push(valueArr[index])
    }
  })
  return list
}

const onFilterConfirm = () => {

  const params = {
    clientId: entrustCompanyValue.value,
    constCategory: filterArr(buttonFlg.typeArr,teamListArr.typeValueArr),
    foreman:constructionUnitValue.value,
    highDangerGrade: filterArr(buttonFlg.levelArr,teamListArr.levelValueArr),
    planConstDate: expectDate.value,
    qualityGrade: filterArr(buttonFlg.massArr,teamListArr.massValueArr)
  }
  if(constructionUnitValue.value !=''){
    let param = {departId:constructionUnitValue.value}
     service.getOrgCodeByDepartId(param).then(res => {
      params.foreman = res
      emit('changeData',params)
      emit('close')
    })
  }else{
    emit('changeData',params)
    emit('close')
  }
  // service.getOrders({
  //   type: props.type,
  //   clientId: entrustCompanyValue.value,
  //   constCategory: filterArr(buttonFlg.typeArr,teamListArr.typeValueArr),
  //   deportId: defaultTeamId.value,
  //   highDangerGrade: filterArr(buttonFlg.levelArr,teamListArr.levelValueArr),
  //   planConstDate: expectDate.value,
  //   qualityGrade: filterArr(buttonFlg.massArr,teamListArr.massValueArr),
  //   ...orderData.page,
  // }).then(res => {
  //   orderData.list = res.records
  //   emit('changeData',orderData.list)
  //   emit('close')
  // })
}

</script>


<style lang='scss' scoped>
.van-row {
  padding: .2rem .3rem;
  border-bottom: .01rem solid rgba(0,0,0,.1);
  .left {
    font-size: .32rem;
    color: #044A91;
  }
  .center {
    font-size: .36rem;
    color: #000000;
    font-weight: 500;
  }
  .right {
    font-size: .32rem;
    color: #044A91;
  }
}
.content {
  padding: 0.3rem;
  text-align: left;
  .filed-item {
    border: .01rem solid #DDDDDD;
    border-radius: .07rem;
    margin: .2rem 0;
  }
  span {
    font-size: .24rem;
    color: #000000;
  }
  .team-item-header {
    text-align: center;
    padding: .3rem;
    border-bottom: .01rem solid rgba(0,0,0,.1);
    >:nth-child(1) {
      font-size: .36rem;
      color: #000000;
      font-weight: 500;
    }
    >:nth-child(2) {
      font-size: .24rem;
      color: #000000;
      opacity: .45;
      margin-top: .1rem;
      display: inline-block;
    }
    >:nth-child(3) {
      display: inline-block;
      position: absolute;
      color: #045BB8;
      font-weight: 500;
      font-size: .32rem;
      top: .5rem;
      right: .3rem;
    }
  }
  .team-item-content {
    margin: .2rem 0;
    padding: 0 .3rem .2rem .3rem;
    border-bottom: .01rem solid rgba(0,0,0,.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    >:nth-child(1) {
      img {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        margin-right: .2rem;
      }
      div:nth-child(2) {
        display: inline-block;
        div:nth-child(1) {
          font-size: .3rem;
        }
        div:nth-child(2), :nth-child(3) {
          display: inline-block;
          margin-right: .2rem;
          font-size: .24rem;
          color: #000000;
          opacity: .45;
        }
      }
    }
    // >:nth-child(2)::before {
    //     content: '\2714';
    //     color: #108EE9;
    // }
    >:nth-child(2) {
      color: #108EE9;
    }
  }
  .mass, .type, .level {
    display: flex;
    justify-content: space-between;
    margin: .2rem 0;
    > div {
      height: .92rem;
      background: #FFFFFF;
      border-radius: .08rem;
      border: .01rem solid #DDDDDD;
      font-size: .28rem;
      line-height: .92rem;
      text-align: center;
    }
    .button1 {
      width: 1.2rem;
    }
    .button1-blue {
      width: 1.2rem;
      background-color: #1989fa;
      color: #FFFFFF;
    }
    .button2 {
      width: 1.5rem;
    }
    .button2-blue{
      width: 1.5rem;
      background-color: #1989fa;
      color: #FFFFFF;
    }
    .button4 {
      width: 2.1rem;
    }
    .button4-blue{
      width: 2.1rem;
      background-color: #1989fa;
      color: #FFFFFF;
    }
  }
  button {
    width: 100%;
    border-radius: .08rem;
    margin-top: 0.2rem;
  }
}
</style>