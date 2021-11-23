<template>
  <el-input :placeholder="placeholder"
            :clearable="clearable"
            v-model="keyword"
            class="input-with-select"
            @keydown.native.enter="handleSearch">
    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
  </el-input>
</template>

<script>
  export default {
    name: "search",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      clearable: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: '请输入关键字进行检索'
      }
    },
    data() {
      return {
        keyword: ''
      }
    },
    methods: {
      handleSearch() {
        this.$emit('search', this.keyword);
        this.$emit('click', this.keyword);
      }
    },
    watch: {
      keyword: {
        handler(val) {
          this.$emit('change', val);
        }
      },
      value: {
        handler(val) {
          this.keyword = val;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-with-select {
    width: 300px;
  }
</style>
