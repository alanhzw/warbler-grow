<!--
 * @Author: 一尾流莺
 * @Description:搜索框
 * @Date: 2021-11-10 10:28:22
 * @LastEditTime: 2021-11-19 15:39:19
 * @FilePath: \ired_resource\src\pages\business\hrManage\components\Search.vue
-->
<template>
  <div class="hrManage-search-content">
    <div class="serach">
      <div class="serach-input">
        <el-input placeholder="搜索姓名/职位"
                  v-model='inputValue'></el-input>
        <div class="serach-btn"
             @click="handleSearch">搜索</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, defineProps, onMounted, defineEmits,
} from 'vue';

const props = defineProps({
  companyInfo: {
    type: Object,
    default: () => ({
      companyId: '',
    }),
  },
});
const emit = defineEmits(['getCompanyHrInfoList']);

const inputValue = ref('');

const handleSearch = () => {
  emit('getCompanyHrInfoList', {
    companyId: props.companyInfo.companyId,
    name: inputValue.value,
    position: inputValue.value,
  });
};

</script>

<style lang='scss'>
.hrManage-search-content {
  .serach {
    width: 750px;
    .serach-input {
      height: 46px;
      position: relative;
      .el-input {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 120px);
        .el-input__inner {
          width: 630px;
          height: 46px;
          background: #ffffff;
          border-radius: 8px 8px 8px 8px;
          opacity: 1;
          border: 1px solid #e8e8e8;
        }
      }
    }

    .serach-btn {
      position: absolute;
      top: 0;
      right: 6px;
      width: 120px;
      background-color: #ed263d;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      line-height: 46px;
      height: 46px;
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
    }
  }
}
</style>
