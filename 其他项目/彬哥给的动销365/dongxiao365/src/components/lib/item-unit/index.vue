<template>
  <el-select
    v-model="selectedValue"
    :placeholder="placeholder"
    @change="itemcChange"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
    @clear="clear"
    @blur="blur"
    @focus="focus"
    value-key="id"
    :size="size"
    :clearable="clearable"
  >
    <el-option
      v-for="item in units"
      :key="item.id"

      :label="item.name"
      :value="item.id">
      <span>{{ item.name }}</span>
      <span v-if="item.unitType===1">(基础单位)</span>
      <span v-if="item.unitType===2">(辅助单位)</span>
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: "item-unit",
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
      showAll: Boolean,
      itemId: {
        type: [Number, String],
        default: 0
      },
      placeholder: {
        type: String,
        default: '单位'
      }
    },
    data() {
      return {
        selectedValue: '',
        units: []
      }
    },
    mounted() {
      this.loadUnit();
    },
    methods: {
      /* 获取单位*/
      loadUnit() {
        this.units = [];
        if (this.showAll) {
          this.$http.get('/psi/item/unit/all', {}, r => {
            this.units = r.data;
            this.selectedValue = '';
            if (this.units.length > 0) {
              this.selectedValue = this.units[0].id;
              this.$emit('change', this.units[0].name);
            }
          });
        } else {
          if (this.itemId.length > 1 || this.itemId > 0) {
            this.$http.get('/psi/item/units', {itemId: this.itemId}, r => {
              this.units = r.data;
              this.selectedValue = '';
              if (this.units.length > 0) {
                this.selectedValue = this.units[0].id;
              }
            });
          }
        }
      },
      // 选中值发生变化时触发	目前的选中值
      itemcChange(val) {
        this.units.map(item => {
          if (item.id === val) {
            this.$emit('change', item.name);
          }
        })
        
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
      showAll() {
        this.loadUnit();
      },
      itemId() {
        this.loadUnit();
      },
      value(val) {
        this.selectedValue = val;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
