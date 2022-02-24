<!--
 * @Author: 一尾流莺
 * @Description:模板创建/编辑页面
 * @Date: 2021-12-15 15:46:02
 * @LastEditTime: 2021-12-18 16:44:32
 * @FilePath: \nuxt-template-admin\pages\template\[templateId]\CreateOrUpdate.vue
-->
<template>
  <div class='template-create'>
    <CommonTitle :title='title'></CommonTitle>
    <div class="template-form">
      <h-form ref='form'
              class="form">
        <div v-if='templateId !== "000" '
             style="display: flex;">
          <div style="width:150px;text-align:right;">模板id :</div>
          <span style="margin-left: 10px;">{{templateId}}</span>
        </div>
        <h-input type="text"
                 width="600px"
                 label-width="150px"
                 label='模板名称'
                 style="margin: 20px 0;"
                 v-model="templateName"
                 placeholder="请输入模板名称"></h-input>
        <h-input type="text"
                 width="600px"
                 label-width="150px"
                 style="margin: 20px 0;"
                 v-model="templateKey"
                 label='templateKey'
                 placeholder="请输入templateKey"></h-input>
        <h-select v-model="type"
                  width="600px"
                  label-width="150px"
                  style="margin: 20px 0;"
                  :options="options"
                  label='模板类型'
                  placeholder="请选择模板类型"></h-select>
        <h-input type="textarea"
                 width="600px"
                 label-width="150px"
                 style="margin: 20px 0;"
                 v-model="templateDesc"
                 label='模板描述'
                 placeholder="请输入模板描述"></h-input>
      </h-form>
    </div>
    <div class="btns">
      <h-button title='确定'
                @click="submit"></h-button>
      <h-button title='返回模板列表'
                @click='returnTemplateList'
                style="margin-left:30px"></h-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Options } from '~~/components/h-select.vue'
import createMessage from '~~/components/typescript/message'
const router = useRouter()
const route = useRoute()
const { data: templateTypes } = await useFetch('/api/types/gettypes')
const options: Options = templateTypes.value.map((type) => {
  return {
    value: type.type,
    label: type.typeName,
  }
})

// 模板id
const templateId = computed(() => route.params.templateId)

// 新建还是编辑
const isCreate = computed(() => templateId.value === '000')

// 页面标题
const title = computed(() => {
  if (isCreate.value) {
    return '新建模板'
  } else {
    return '编辑模板'
  }
})

// 模板名称
const templateName = ref('')

// 模板类型
const type = ref(501)

// templateKey
const templateKey = ref('')

// 模板描述
const templateDesc = ref('')

// 获取模板详情
const getTemplateDetail = async () => {
  const { data: templateDetail } = await useFetch('/api/template/getdetail', {
    params: {
      templateId: templateId.value,
    },
  })
  // 赋初始值
  templateName.value = templateDetail.value.templateName
  type.value = templateDetail.value.type
  templateKey.value = templateDetail.value.templateKey
  templateDesc.value = templateDetail.value.templateDesc
}

// 如果是编辑就付初始值
if (!isCreate.value) {
  getTemplateDetail()
}

// 返回模板列表
const returnTemplateList = () => {
  router.push('/home')
}

// 提交创建
const submit = async () => {
  if (isCreate.value) {
    handleCreate()
  } else {
    handleUpdate()
  }
}

// 执行创建操作
const handleCreate = async () => {
  const { data } = await useFetch('/api/template/create', {
    method: 'POST',
    body: {
      templateName: templateName.value,
      type: type.value,
      templateKey: templateKey.value,
      templateDesc: templateDesc.value,
    },
  })
  if (data.value.result) {
    createMessage(data.value.message)
    // 返回模板列表
    router.push('/home')
  }
}

// 执行编辑操作
const handleUpdate = async () => {
  const { data } = await useFetch('/api/template/update', {
    method: 'POST',
    body: {
      templateId: templateId.value,
      templateName: templateName.value,
      type: type.value,
      templateKey: templateKey.value,
      templateDesc: templateDesc.value,
    },
  })
  if (data.value.result) {
    createMessage(data.value.message)
    // 返回模板列表
    router.push('/home')
  }
}
</script>

<style lang='scss' scoped>
.template-create {
  width: 100%;
  padding: 30px;
  .btns {
    margin-left: 75px;
    margin-top: 10px;
  }
}
</style>
