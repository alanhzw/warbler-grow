<!--
 * @Author: 一尾流莺
 * @Description:模板列表组件
 * @Date: 2021-12-15 16:45:23
 * @LastEditTime: 2021-12-20 16:44:39
 * @FilePath: \nuxt-template-admin\components\template\List.vue
-->
<template>
  <div class='component-template-list'>
    <div class="list-item header">
      <div class="table-item">模板id</div>
      <div class="table-item"
           style="min-width:200px">templateKey</div>
      <div class="table-item">模板名称</div>
      <div class="table-item">模板描述</div>
      <div class="table-item">模板类型</div>
      <div class="table-item">创建时间</div>
      <div class="table-item">更新时间</div>
      <div class="table-item">操作</div>
    </div>
    <div v-for="item in templateList"
         class="list-item"
         :key='item.templateId'>
      <div class="table-item">{{item.templateId}}</div>
      <div class="table-item"
           style="min-width:200px">{{item.templateKey}}</div>
      <div class="table-item">{{item.templateName}}</div>
      <div class="table-item">{{item.templateDesc || "- -"}}</div>
      <div class="table-item">{{item.tType}}</div>
      <div class="table-item">{{item.createTime}}</div>
      <div class="table-item">{{item.updateTime || "- -"}}</div>
      <div class="table-item option">
        <div class="color"
             @click='$router.push(`/template/${item.templateId}/Detail`)'>查看</div>
        <div class="color"
             @click='$router.push(`/template/${item.templateId}/CreateOrUpdate`)'>编辑</div>
        <div class="color"
             @click='$router.push(`/template/${item.templateId}/Copy`)'>复制</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { TemplateList } from '~~/server/api/template/getlist'

const props = defineProps<{
  templateList: TemplateList
}>()
</script>

<style lang='scss' scoped>
.component-template-list {
  // border: 1px solid #dcdfe6;
  .list-item {
    display: flex;
    justify-content: space-between;

    .table-item {
      padding: 20px 20px;
      border: 1px solid #dcdfe6;
      text-align: center;
      flex: 1;
      min-width: 150px;
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
