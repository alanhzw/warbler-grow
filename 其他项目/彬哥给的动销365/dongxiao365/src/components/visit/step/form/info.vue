<template>
  <div class="page-content" style="height:450px;overflow:auto;">
    <el-form :model="form" label-position="top">
      <el-form-item label="步骤名称：" prop="name">
        <el-input v-model="form.name" max="100" disabled></el-input>
      </el-form-item>
      <el-form-item label="步骤描述：" prop="description">
        <el-input
          disabled type="textarea" v-model="form.description" :maxlength="500" aria-placeholder="长度在500字以内"></el-input>
      </el-form-item>
      <form-item-view v-model="form.components"></form-item-view>
    </el-form>
  </div>
</template>

<script>
  import FormItemView from './inc/form-item-view'

  export default {
    props: ["id"],
    components: {FormItemView},
    data() {
      return {
        form: {}
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.$http.get("/crm/visit/form/info", {id: this.id}, res => {
          this.form = res.data;
        });
      }
    },
    watch: {
      id() {
        this.loadData();
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
