<!--
 * @Description:
 *      施工情况页面
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Summary.vue
-->
<template>
  <div class="summary">
    <p class="title">人员及工时情况</p>
    <table frame="void" cellspacing=0>
      <thead>
        <tr>
          <th align="left">序号</th><th align="left">姓名</th><th align="left">状态</th><th align="right">工时</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in summary.list" :key="`summary-item${data.id}`">
          <td align="left">{{index + 1}}</td><td align="left">{{data.sysuseridName}}</td><td align="left">{{stateMap[data.state]}}</td><td align="right">{{data.times===''||data.times===null?'--':data.times}}</td>
        </tr>
        <tr v-for="(data, index) in summary.list2" :key="`summary-item${data.id}`">
          <td align="left">{{index + 1}}</td><td align="left">{{data}}</td><td align="left">未开工</td><td align="right">--</td>
        </tr>
      </tbody>
    </table>
    <p class="blank-tip" v-if="summary.list.length == 0 && summary.list2.length==0">暂无记录</p>
  </div>
</template>
<script setup>
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { getService } from '../../service';
const stateMap = {
  '01': '开工',
  '02': '暂停',
  '03': '继续',
  '04': '完工',
  '05':'未开工'
}
const service = getService();
const route = useRoute();
console.log(route.params.id)
const summary = reactive({
  list: [],
  list2:[],
  notFinihsh:{},
})
service.getSummary({
  trustFormMainTableId: route.params.id
}).then(res => {
  if(res.length>0){
    summary.list = res
    service.getConstructionPersonnelList({
      trustFormMainTableId: route.params.id
    }).then(response => {
      for(let m in response){
        var have = false;
        for(let n in summary.list){
            if(response[m].sysUserId == summary.list[n].sysuserid){
              have = true;
              break;
            }
        }
        if(!have){
          summary.notFinihsh = {}
          summary.notFinihsh.sysuseridName = response[m].realname
          summary.notFinihsh.times= ''
          summary.notFinihsh.state = '05'
          summary.list.push(summary.notFinihsh)
        }
      }
    })
  }else{
    service.getConstructionPersonnelList({
      trustFormMainTableId: route.params.id
    }).then(res => {
      for(let i in res){
        summary.list2.push(res[i].realname)
      }
    })
  }
})

</script>
<style lang="scss" scoped>
.summary {
  padding: 0.4rem 0.32rem;

  .title {
    font-size: 0.28rem;
    font-weight: 500;
    text-align: left;
    margin-bottom: 0.32rem;
  }
  .blank-tip {
    font-size: 0.28rem;
    margin-top: 0.4rem;
    color: #8c8c8c;
    margin-bottom: 0.32rem;
  }
  table {
    width: 100%;
    font-size: 0.28rem;
    * {
      border: 0!important;
    }
    thead {
      background-color: #f2f2f2;
    }
    tr {
      height: 0.92rem;
    }
    th {
      font-weight: 500;
      padding: 0 0.24rem;
    }
    td {
      font-weight: 400;
      padding: 0 0.24rem;
    }
    tbody {
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>