<!--
 * @Author: 一尾流莺
 * @Description:模板详情页面
 * @Date: 2021-12-15 15:46:54
 * @LastEditTime: 2021-12-20 17:23:02
 * @FilePath: \nuxt-template-admin\pages\template\[templateId]\Detail.vue
-->
<template>
  <div class='template-detail'>
    <CommonTitle title='模板信息'></CommonTitle>
    <div class="template-info">
      <div class="info-item">
        <div class="label">模版Id :</div>
        <div style="margin-left:10px">{{templateId}}</div>
      </div>
      <div class="info-item">
        <div class="label">templateKey :</div>
        <div style="margin-left:10px">{{templateDetail.templateKey  || "- -"}}</div>
      </div>
      <div class="info-item">
        <div class="label">模版名称 :</div>
        <div style="margin-left:10px">{{templateDetail.templateName  || "- -"}}</div>
      </div>
      <div class="info-item">
        <div class="label">模板类型 :</div>
        <div style="margin-left:10px">{{templateDetail.tType  || "- -"}}</div>
      </div>
      <div class="info-item">
        <div class="label">模板描述 :</div>
        <div style="margin-left:10px">{{templateDetail.templateDesc || "- -"}}</div>
      </div>
    </div>
    <CommonTitle title='实例列表'></CommonTitle>
    <InstanceList :instance-list="instanceList"></InstanceList>
    <div class="btns">
      <h-button title='新建实例'
                @click='goCreateInstance'></h-button>
      <h-button title='返回模板列表'
                style="margin-left: 30px;"
                @click='returnTemplateList'></h-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
const router = useRouter();
const route = useRoute();

// 模板ID
const templateId = computed(() => route.params.templateId);

// 获取模板详情
const { data: templateDetail } = await useFetch("/api/template/getdetail", {
  params: {
    templateId: templateId.value,
  },
});

// 获取实例列表
const { data: instanceList } = await useFetch("/api/instance/getlist", {
  params: {
    templateId: templateId.value,
  },
});

// 返回模板列表
const returnTemplateList = () => {
  router.push("/home");
};

// 去新建实例页面
const goCreateInstance = () => {
  router.push(`/instance/create/000`);
};
</script>

<style lang='scss' scoped>
.template-detail {
  width: 100%;
  padding: 30px;
  .template-info {
    margin-bottom: 20px;
    margin-left: 20px;
    .info-item {
      padding: 10px 0;
      display: flex;
      justify-content: flex-start;
    }
    .label {
      width: 100px;
      text-align: center;
      text-align-last: justify;
    }
  }
  .btns {
    margin-top: 20px;
    text-align: left;
  }
}
</style>
