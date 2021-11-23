<template>
  <el-dialog title="选择标签" :visible="visible" width="40%" @close="handleCloseDialog">
    <div style="height:300px;overflow:auto;overflow-x:hidden;" v-loading="loading">
      <el-card class="box-card tag-group" :class="'tag-group-'+item.labelColor" v-for="item in tags" :key="item.id">
        <div slot="header">
          <span class="tag-color"></span>{{item.labelName}}
        </div>
        <div v-if="multiple">
          <el-checkbox-group v-if="item" v-model="item.checkedList"  class="tag-choose-list">
            <el-checkbox-button :label="o.id" :key="index" v-for="(o,index) in item.children" class="tag-choose-item">{{o.labelName}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div v-else>
          <el-radio-group v-if="item" v-model="item.checkedList"  class="tag-choose-list">
            <el-radio-button :label="o.id" :key="index" v-for="(o,index) in item.children" size="mini" class="tag-choose-item"> {{o.labelName}}</el-radio-button>
          </el-radio-group>
        </div>
      </el-card>
      <br/>
    </div>
    <div slot="footer" class="dialog-footer text-right">
        <el-button  type="warning" @click="handleReset">清 空</el-button>
        <el-button  type="primary" @click="handleOk">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

  export default {
    name: "tag",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      visible: Boolean,
      multiple: Boolean,
      value: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data() {
      return {
        loading: false,
        tags: [],
        values: {}
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      loadData() {
        this.loading = true;
        this.$http.get('/crm/customer/label/list', {}, r => {
          this.bind(r.data);
          this.loading = false;
        })
      },
      handleOk() {
        const value = this.getValue();
        console.log('value', value.keys)

        this.$emit('change', value.keys);
        this.$emit('onOk', value.values);
        this.$emit('update:visible', false);
      },
      handleCloseDialog() {
        this.$emit('update:visible', false);
      },
      // 重置
      handleReset() {
        this.tags.forEach(tag => {
          if (this.multiple) {
            tag.checkedList = [];
          } else {
            tag.checkedList = 0;
          }
        });
      },
      getValue() {
        let idList = [];
        const valueList = [];
        for (const i in this.tags) {
          const tag = this.tags[i];
          const children = tag.children;
          if (this.multiple) {
            if (tag.checkedList && tag.checkedList.length > 0) { idList = idList.concat(tag.checkedList); }
          } else {
            if (tag.checkedList) { idList.push(tag.checkedList); }
          }
          if (children) {
            children.forEach(c => {
              if (this.multiple) {
                for (let i = 0, len = tag.checkedList.length; i < len; i++) {
                  const id = tag.checkedList[i];
                  if (c.id === id) {
                    valueList.push(c);
                  }
                }
              } else {
                if (c.id === tag.checkedList) {
                  valueList.push(c);
                }
              }
            });
          }
        }
        return {keys: idList, values: valueList};
      },
      bind(list) {
        list.forEach(tag => {
          const children = tag.children;
          const checkedList = [];
          for (let i = 0, len = this.value.length; i < len; i++) {
            const id = this.value[i];
            if (children) {
              children.forEach(c => {
                if (c.id === id) {
                  checkedList.push(id);
                }
              });
            }
          }
          if (this.multiple) {
            tag.checkedList = checkedList;
          } else {
            if (checkedList.length > 0) { tag.checkedList = checkedList[0]; } else { tag.checkedList = 0; }
          }
        });
        this.tags = list;
      }
    },
    watch: {
      visible: function (val) {
        if (val) {
          this.loadData();
        }
      }
    }
  }
</script>
<style lang="scss">
  .tag-choose-list {
    .tag-choose-item {
      background-color: rgba(64,158,255,0.1);
      border: 1px solid rgba(64,158,255,0.2);

      .el-radio-button__inner, .el-checkbox-button__inner {
        border: none;
        background-color: rgba(0,0,0,0);
        height: 32px;
        color: #409EFF !important;
        line-height: 10px!important;
        font-size: 12px!important;
        font-weight: normal;
        box-shadow: inherit !important;
        word-break: inherit !important;
        white-space: inherit !important;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../assets/css/tag";

  .box-card {
    margin-bottom: 15px;
  }

  .tag-list {
    .tag {
      border: solid 1px #E4E7ED;
      margin-bottom: 5px;
    }
  }

  .tag-choose-list {
    display: flex;
    flex-wrap: wrap;
    .tag-choose-item {
      // border: 1px solid #dcdfe6;
      margin: 5px;
      border-radius: 4px;
      overflow: hidden;
      word-break: break-all;
      white-space: normal;
    }
  }

  .tag-group {
    .tag-color {
      width: 12px;
      height: 12px;
      border-radius: 100%;
      display: inline-block;
      margin-right: 5px;
      border: solid 1px;
    }

    &.tag-group-1 .tag-color {
      background-color: $--color-tag-1;
      border-color: $--color-tag-border-1;
    }

    &.tag-group-2 .tag-color {
      background-color: $--color-tag-2;
      border-color: $--color-tag-border-2;
    }

    &.tag-group-3 {
      .tag-color {
        background-color: $--color-tag-3;
        border-color: $--color-tag-border-3;
      }
    }

    &.tag-group-4 {
      .tag-color {
        background-color: $--color-tag-4;
        border-color: $--color-tag-border-4;
      }
    }

    &.tag-group-5 {
      .tag-color {
        background-color: $--color-tag-5;
        border-color: $--color-tag-border-5;
      }
    }

    &.tag-group-6 {
      .tag-color {
        background-color: $--color-tag-6;
        border-color: $--color-tag-border-6;
      }
    }

    &.tag-group-1 {
      .tag-choose-item.is-active, .tag-choose-item.is-checked {
        background-color: $--color-tag-1;
        border-color: $--color-tag-border-1;
      }
    }

    &.tag-group-2 {
      .tag-choose-item.is-active, .tag-choose-item.is-checked {
        background-color: $--color-tag-2;
        border-color: $--color-tag-border-2;
      }
    }

    &.tag-group-3 {
      .tag-choose-item.is-active, .tag-choose-item.is-checked {
        background-color: $--color-tag-3;
        border-color: $--color-tag-border-3;
      }
    }

    &.tag-group-4 {
      .tag-choose-item.is-active, .tag-choose-item.is-checked {
        background-color: $--color-tag-4;
        border-color: $--color-tag-border-4;
      }
    }

    &.tag-group-5 {
      .tag-choose-item.is-active, .tag-choose-item.is-checked {
        background-color: $--color-tag-5;
        border-color: $--color-tag-border-5;
      }
    }

    &.tag-group-6 {
      .tag-choose-item.is-active, .tag-choose-item.is-checked {
        background-color: $--color-tag-6;
        border-color: $--color-tag-border-6;
      }
    }




  }






</style>
