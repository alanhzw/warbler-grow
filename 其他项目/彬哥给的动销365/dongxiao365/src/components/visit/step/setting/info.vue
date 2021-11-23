<template>
  <div>  
      <com-info :id="infoId"></com-info>
      <el-row>
        <el-col :span="2">
          <div class="tool-box"></div>
        </el-col>
        <el-col :span="22">
          <el-button @click="returnBack" class="text-primary">返回</el-button>
        </el-col>
      </el-row>   
  </div>
</template>

<script>
import ComInfo from './inc/info'
  export default {
    props: {
      infoId: {
        type: String,
        default: ''
      }
    },
    components: {
      ComInfo
    },
    data() {
      return {
        title: ''
      };
    },
    created() {
    },
    methods: {
      info(query) {
      },
      returnBack() {
        this.$emit('closeDia')
      }
    },
    watch: {}
  }
</script>

<style scoped>
.text-primary{
  float: right;
}
</style>
