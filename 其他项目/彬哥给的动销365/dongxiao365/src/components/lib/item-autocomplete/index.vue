<template>
  <el-autocomplete
    v-model="value"
    :fetch-suggestions="querySearch"
    :placeholder="placeholder"
    :trigger-on-focus="false"
    :value-key="valueKey"
    @select="handleSelect">
    <div slot-scope="{ item }" class="results">
      <div class="name">{{ item.name }}</div>
      <div class="code">{{ item.code }}</div>
    </div>
  </el-autocomplete>
</template>

<script>
  export default {
    name: "item-autocomplete",
    model: {
      prop: 'item',
      event: 'change'
    },
    props: {
      'valueKey': {
        type: String,
        default: 'code'
      },
      item: {
        type: Object,
        default: null
      },
      data: {
        type: [Object, Number, String, Array]
      },
      placeholder: {
        type: String,
        default: '请输入商品名称、编码'
      },
      exclude: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      excludeIdList() {
        if (this.exclude !== null && this.exclude.length > 0) {
          const ids = [];
          this.exclude.forEach(vo => {
            if (typeof vo === 'object') {
              if (vo && vo.id) {
                ids.push(vo.id);
              }
            } else {
              if (vo) {
                ids.push(vo);
              }
            }
          });
          if (ids.length > 0) { return JSON.stringify(ids); }
        }
        return null;
      },
      querySearch(val, cb) {
        this.$http.get('/psi/item/search/simple', {keyword: val, excludeIdList: this.excludeIdList()}, r => {
          cb(r.data);
        });
      },
      handleSelect(item) {
        this.$emit('change', item);
        this.$emit('select', item, this.data);
      }
    },
    watch: {
      item: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val) {
            this.value = val[this.valueKey];
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-autocomplete {
    width: 100%;
  }

  .results {
    line-height: 1.2;
    margin: 0 -5px;
    word-break: break-all;
    white-space: normal;
    .code {
      color: #909399;
    }
    .name {
      font-weight: bold;
    }
    padding: 5px 0;
  }
</style>
