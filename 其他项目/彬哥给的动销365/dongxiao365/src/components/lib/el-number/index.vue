<template>
  <div class="el-input el-input--small">
    <input type="number"
           class="el-input__inner el-number__inner"
           :class="align"
           autocomplete="off"
           v-model.number="data"
           @keydown="onKeydown"
           :maxlength="maxlength"
           :placeholder="placeholder"
           @input="oninput"
    >
  </div>
</template>

<script>
  export default {
    name: "el-number",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      clearable: Boolean,
      maxlength: {
        type: Number,
        default: 11
      },
      align: {
        type: String,
        default: 'left'
      },
      value: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        data: null
      }
    },
    methods: {
      oninput(e) {
        let value = e.srcElement.value;
        if (value.length > this.maxlength) { value = value.slice(0, this.maxlength); }
        this.data = value;
        this.$emit('change', value);
      },
      onKeydown(e) {
        if (e.keyCode === 69) {
          e.preventDefault();
          return false;
        }
        let value = e.srcElement.value;
        if (e.keyCode === 190) {
          if (value.indexOf('.') >= 0) {
            e.preventDefault();
          }
        }
        if (value.length > this.maxlength) { value = value.slice(0, this.maxlength); }
        this.data = value;
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          this.data = value;
        }
      },
      data: {
        immediate: true,
        handler(value) {
          this.$emit('change', value);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-number__inner.right {
    text-align: right;
  }

  .el-number__inner.left {
    text-align: left;
  }

  .el-number__inner.center {
    text-align: center;
  }

  .el-number__inner::-webkit-outer-spin-button,
  .el-number__inner::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
</style>
