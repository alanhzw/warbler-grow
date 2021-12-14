<!--
 * @Author: 一尾流莺
 * @Description:表格
 * @Date: 2021-11-10 10:28:22
 * @LastEditTime: 2021-11-19 16:02:46
 * @FilePath: \ired_resource\src\pages\business\hrManage\components\Table.vue
-->
<template>
  <div class="hrManage-table-content">
    <el-table :data="companyHrInfoList"
              border
              stripe
              style="width: 100%">
      <el-table-column type="index"
                       label="序号"
                       align="center"
                       width="180" />
      <el-table-column prop="name"
                       label="HR姓名"
                       align="center"
                       width="180" />
      <el-table-column label="头像"
                       align="center"
                       width="180">
        <template #default="scope">
          <img class="avatar"
               :src="scope.row.avatarUrl">
        </template>
      </el-table-column>
      <el-table-column prop="position"
                       align="center"
                       label="职位" />
      <el-table-column prop="phone"
                       align="center"
                       label="手机号" />
      <el-table-column align="center"
                       label="操作">
        <template #default="scope">
          <el-button type="text"
                     class="btn-option"
                     size="small"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text"
                     class="btn-option"
                     size="small"
                     @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button type="text"
                     class="btn-option"
                     size="small"
                     @click="handleDisabled(scope.row)">{{scope.row.status === '0' ? '启用' : '禁用'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, defineProps, onMounted, defineEmits,
} from 'vue';

const props = defineProps({
  companyHrInfoList: {
    type: Array,
    default: () => [{

    }],
  },
});

const emit = defineEmits(['handlerDeleteHr', 'editHr', 'handlerDisabled']);

// 删除
const handleDelete = (id:string) => {
  emit('handlerDeleteHr', id);
};
// 编辑
const handleEdit = (params:any) => {
  emit('editHr', params);
};
// 禁用
const handleDisabled = (params:any) => {
  emit('handlerDisabled', params);
};

</script>

<style lang='scss'>
.hrManage-table-content {
  .btn-option {
    font-size: 14px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #ed263d;
  }
  thead .el-table_1_column_2 {
    background-color: #ed263d;
  }
  thead .el-table_1_column_2 {
    color: #fff;
  }
  .avatar{
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
}
</style>
