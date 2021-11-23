<template>
  <div class="tag-list">
    <div :key="tag.id" v-for="(tag,index) in value" :class="'tag tag-'+tag.labelColor">
      {{tag.labelName}}
    </div>
  </div>
</template>
<script>
  export default {
    loading: true,
    name: "tag",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    mounted() {

    },
    methods: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/tag";

  .tag-list {
    .tag {
      display: inline-block;
      padding: 6px 12px;
      line-height: 100%;
      margin-right: 10px;
      border-radius: 4px;
      color: #606266;
      font-size: 12px;
      margin-bottom: 5px;
      border: 1px solid rgba(0,0,0,0);
    }
    .tag-1 {
      background-color: $--color-tag-1;
      border-color: $--color-tag-border-1;
    }
    .tag-2 {
      background-color: $--color-tag-2;
      border-color: $--color-tag-border-2;
    }
    .tag-3 {
      background-color: $--color-tag-3;
      border-color: $--color-tag-border-3;
    }
    .tag-4 {
      background-color: $--color-tag-4;
      border-color: $--color-tag-border-4;
    }
    .tag-5 {
      background-color: $--color-tag-5;
      border-color: $--color-tag-border-5;
    }
    .tag-6 {
      background-color: $--color-tag-6;
      border-color: $--color-tag-border-6;
    }
  }
</style>
