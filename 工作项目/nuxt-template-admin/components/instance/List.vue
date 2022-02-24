<!--
 * @Author: 一尾流莺
 * @Description:模板列表组件
 * @Date: 2021-12-15 16:45:23
 * @LastEditTime: 2021-12-18 15:45:47
 * @FilePath: \nuxt-template-admin\components\instance\List.vue
-->
<template>
  <div class='component-instance-list'>
    <div class="list-item header">
      <div class="table-item">实例id</div>
      <div class="table-item">实例名称</div>
      <div class="table-item">parentId</div>
      <div class="table-item">是否通用</div>
      <div class="table-item">是否可用</div>
      <div class="table-item">配置信息</div>
      <div class="table-item">创建时间</div>
      <div class="table-item">更新时间</div>
      <div class="table-item">操作</div>
    </div>
    <div v-for="item in instanceList"
         class="list-item"
         :key='item.instanceId'>
      <div class="table-item">{{item.instanceId}}</div>
      <div class="table-item">{{item.instanceName}}</div>
      <div class="table-item">{{item.parentId}}</div>
      <div class="table-item">{{item.isGeneral}}</div>
      <div class="table-item">{{item.isOpen}}</div>
      <div class="table-item">{{item.configJson}}</div>
      <div class="table-item">{{item.createTime}}</div>
      <div class="table-item">{{item.updateTime}}</div>
      <div class="table-item option">
        <div class="color"
             @click="$router.push(`/instance/update/${item.instanceId}`)">编辑</div>
        <div class="color"
             @click="$router.push(`/instance/create/${item.instanceId}`)">复制</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { InstanceList } from '~~/server/api/instance/getlist'

const props = defineProps<{
  instanceList: InstanceList
}>()
</script>

<style lang='scss' scoped>
.component-instance-list {
  // border: 1px solid #dcdfe6;
  .list-item {
    display: flex;
    justify-content: space-between;

    .table-item {
      padding: 20px 20px;
      border: 1px solid #dcdfe6;
      // width: 150px;
      text-align: center;
      flex: 1;
    }
    .option {
      display: flex;
      justify-content: space-evenly;
    }

    .color {
      cursor: pointer;
      color: #39f;
      &:hover {
        color: #5daeff;
      }
    }
  }
  .header {
    background-color: #f0f2f5;
    font-weight: 700;
  }
}
</style>
