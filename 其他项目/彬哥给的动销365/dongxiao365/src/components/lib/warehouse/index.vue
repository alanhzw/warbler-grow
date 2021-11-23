<template>
  <el-select
    value-key="id"
    v-model="selectedValue"
    :placeholder="placeholder"
    :size="size"
    :clearable="clearable"
    @change="change"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
    @clear="clear"
    @blur="blur"
    @focus="focus"
  >
    <el-option
      v-for="item in items"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: "warehouse",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      clearable: Boolean,
      size: {
        type: String,
        default: 'small'
      },
      value: {
        type: [String, Number],
        default: null
      },
      placeholder: {
        type: String,
        default: '请选择仓库'
      }
    },
    data() {
      return {
        selectedValue: null,
        items: []
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      /* 获取单位*/
      loadData() {
        this.items = [];
        this.$http.get('/psi/warehouse/list/all', {}, r => {
          this.items = r.data;

        });
      },
      // 选中值发生变化时触发	目前的选中值
      change(val) {
        this.$emit('change', val);
      },
      // 下拉框出现/隐藏时触发	出现则为 true，隐藏则为 false
      visibleChange(val) {
        this.$emit('visible-change', val);
      },
      // 多选模式下移除tag时触发	移除的tag值
      removeTag(val) {
        this.$emit('remove-tag', val);
      },
      // 可清空的单选模式下用户点击清空按钮时触发	—
      clear() {
        this.$emit('clear');
      },
      // 当 input 失去焦点时触发	(event: Event)
      blur(event) {
        this.$emit('blur', event);
      },
      // 当 input 获得焦点时触发	(event: Event)
      focus(event) {
        this.$emit('focus', event);
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (val) { this.selectedValue = val; } else { this.selectedValue = null; }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
