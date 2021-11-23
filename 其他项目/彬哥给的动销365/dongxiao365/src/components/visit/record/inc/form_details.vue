<template>
  <div class="page-content">
    <el-form v-model="form">
      <form-item-view v-model="form"></form-item-view>
      <el-form-item v-show="finish">
        <span> 总结 </span>
        <span> : </span>
        <span>{{finish}}</span>
      </el-form-item>
    </el-form>
    <br/>
  </div>
</template>

<script>
  import FormItemView from '../../../lib/form-item-view'

  export default {
    components: {FormItemView},
    props: {
      id: [Number, String]
    },
    data() {
      return {
        form: [],
        finish: ''
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.form = [];
        this.$http.get("/crm/visit/record/step/detail", {formId: this.id}, res => {
          this.form = JSON.parse(res.data.formDetail);
        });
      }
    },
    watch: {
      id(val) {
        this.loadData();
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
