<!--
 * @Author: 一尾流莺
 * @Description:默认页面----模板列表页面
 * @Date: 2021-12-15 11:34:45
 * @LastEditTime: 2021-12-27 11:15:35
 * @FilePath: \nuxt-template-admin\pages\home.vue
-->
<template>
  <div class='template-list'>
    <CommonTitle title='模板列表'></CommonTitle>
    <h-form ref='form'
            class="form">
      <h-input type="text"
               label='模板名称'
               v-model="templateName"
               placeholder="请输入模板名称"></h-input>
      <h-input type="text"
               v-model="templateKey"
               label='templateKey'
               placeholder="请输入templateKey"></h-input>
      <h-select v-model="type"
                :options="options"
                label='模板类型'
                placeholder="请选择模板类型"></h-select>
    </h-form>
    <div class="btns">
      <h-button title='查询'
                @click='handleGetList'></h-button>
      <h-button title='新建模板'
                @click="$router.push('/template/000/CreateOrUpdate')"
                style="margin-left:30px"></h-button>
    </div>
    <TemplateList :template-list='templateList'></TemplateList>

  </div>
</template>

<script lang='ts' setup>
import { Options } from "~~/components/h-select.vue";
import type { TemplateList } from "~~/server/api/template/getlist";

// 获取模板类型接口
const { data: templateTypes } = await useFetch("/api/types/gettypes");

// 把模板类型转换成指定结构
const options: Options = templateTypes.value.map((type) => {
  return {
    value: type.tType,
    label: type.tTypeName,
  };
});
options.unshift({
  value: -1,
  label: "全部",
});

// 模板名称
const templateName = ref("");

// 模板类型
const type = ref(-1);

// templateKey
const templateKey = ref("");

// 模板列表
const templateList = ref<TemplateList>([]);

// 获取模板列表
const handleGetList = async () => {
  const { data } = await useFetch("/api/template/getlist", {
    params: {
      templateName: templateName.value,
      tType: type.value,
      templateKey: templateKey.value,
    },
  });
  templateList.value = data.value;
};
handleGetList();
</script>

<style lang='scss' scoped>
.template-list {
  width: 100%;
  padding: 30px;
  overflow: auto;
  .form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .btns {
    text-align: right;
    margin-bottom: 20px;
  }
}
</style>
