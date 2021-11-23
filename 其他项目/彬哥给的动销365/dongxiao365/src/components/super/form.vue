<template>
  <div class="page-content">
    <breadcrumb/>
    <div class="tool-box">
      <el-button @click="addForm">新增表单</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    created () {

    },
    methods: {
      addForm () {
        this.$router.push('/super/form/add')
      }
    }
  }
</script>
<style scoped></style>
