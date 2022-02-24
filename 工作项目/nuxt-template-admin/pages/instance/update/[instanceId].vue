<!--
 * @Author: 一尾流莺
 * @Description:编辑实例页面
 * @Date: 2021-12-15 15:46:54
 * @LastEditTime: 2021-12-18 15:46:25
 * @FilePath: \nuxt-template-admin\pages\instance\update\[instanceId].vue
-->
<template>
  <div class='instance-update'>
    <CommonTitle :title='title'></CommonTitle>
    <div class="instance-form">
      <h-form ref='form'
              class="form">
        <div style="display: flex;">
          <div style="width:150px;text-align:right;">实例id :</div>
          <span style="margin-left: 10px;">{{instanceId}}</span>
        </div>
        <h-input type="text"
                 width="600px"
                 label-width="150px"
                 label='实例名称'
                 style="margin: 20px 0;"
                 v-model="instanceName"
                 placeholder="请输入实例名称"></h-input>
        <h-input type="text"
                 width="600px"
                 label-width="150px"
                 style="margin: 20px 0;"
                 v-model="parentId"
                 label='父级Id'
                 placeholder="请输入父级Id"></h-input>
        <h-select v-model="isGeneral"
                  width="600px"
                  label-width="150px"
                  style="margin: 20px 0;"
                  :options="options"
                  label='是否通用'></h-select>
        <h-select v-model="isOpen"
                  width="600px"
                  label-width="150px"
                  style="margin: 20px 0;"
                  :options="options"
                  label='是否可用'></h-select>
        <h-input type="textarea"
                 width="600px"
                 label-width="150px"
                 style="margin: 20px 0;"
                 v-model="configJson"
                 label='实例配置'
                 placeholder="请输入实例配置"></h-input>
      </h-form>
    </div>
    <div class="btns">
      <h-button title='确定'></h-button>
      <h-button title='返回实例列表'
                @click='returnInstanceList'
                style="margin-left:30px"></h-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Options } from '~~/components/h-select.vue'

const router = useRouter()
const route = useRoute()
const title = ref('编辑实例')
// 实例id
const instanceId = computed(() => route.params.instanceId)

// 实例名称
const instanceName = ref('')

// 父级id
const parentId = ref('')

const options: Options = [
  {
    value: 1,
    label: '是',
  },
  {
    value: 0,
    label: '否',
  },
]

// 是否通用
const isGeneral = ref(1)
// 是否可用
const isOpen = ref(1)

// 实例配置
const configJson = ref()
// 返回实例列表
const returnInstanceList = () => {
  router.push(`/template/${parentId.value}/Detail`)
}

// 获取实例详情
const getTemplateDetail = async () => {
  const { data: templateDetail } = await useFetch('/api/instance/getdetail', {
    params: {
      instanceId: instanceId.value,
    },
  })
  // 赋初始值
  instanceName.value = templateDetail.value.instanceName
  parentId.value = templateDetail.value.parentId
  isGeneral.value = templateDetail.value.isGeneral
  isOpen.value = templateDetail.value.isOpen
  configJson.value = templateDetail.value.configJson
}

// 如果是编辑就付初始值
getTemplateDetail()
</script>

<style lang='scss' scoped>
.instance-update {
  width: 100%;
  padding: 30px;
  .btns {
    margin-left: 75px;
    margin-top: 10px;
  }
}
</style>
