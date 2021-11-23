<template>
  <div class="dragArea preview" :options="options">
    <div class="item" v-for="(element, index) in items" :key="index">
      <el-form-item :label="element.label" :required="element.required">
        <div v-if="element.type==='group'" v-model="element.children" class="dragArea-group">
          <form-item v-model="element.children" :options="options"></form-item>
          <div class="text-right">
            <el-button type="text" v-if="element.dynamicAdd">增加</el-button>
          </div>
        </div>
        <!--单行文本,多行文本-->
        <el-input
          disabled
          v-if="element.type==='text' || element.type==='textarea'"
          :type="element.type"
          v-model="element.value"
          :placeholder="element.placeholder"/>
        <!--计数器-->
        <el-input-number
          disabled
          v-if="element.type==='number'"
          v-model="element.value"
          controls-position="right"
          :min="element.min"
          :max="element.max"
          :placeholder="element.placeholder"/>
        <!--日期选择,日期时间选择-->
        <el-date-picker
          disabled
          v-if="element.type==='year'||
                          element.type==='month'||
                          element.type==='date'||
                          element.type==='week'||
                          element.type==='datetime'||
                          element.type==='datetimerange'||
                          element.type==='daterange'"
          :type="element.type"
          v-model="element.value"
          :placeholder="element.placeholder"/>
        <!--时间选择-->
        <el-time-select
          disabled
          v-if="element.type==='time'"
          v-model="element.value"
          :picker-options="element.options"
          :placeholder="element.placeholder"/>
        <!--下拉选-->
        <el-select
          disabled v-if="element.type==='select'"
          :multiple="element.multiple"
          v-model="element.value">
          <el-option
            v-for="item in element.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--单选框-->
        <!--单选框组-->
        <el-radio-group
          disabled v-if="element.type==='radio'" v-model="element.value">
          <el-radio v-for="vo in element.options" :label="vo.value" :key="vo.value">{{vo.label}}</el-radio>
        </el-radio-group>
        <!--多选框-->
        <!--多选框组-->
        <el-checkbox-group
          disabled v-if="element.type==='checkbox'" v-model="element.value">
          <el-checkbox v-for="vo in element.options" :label="vo.value" :key="vo.value">{{vo.label}}</el-checkbox>
        </el-checkbox-group>
        <!--开关-->
        <el-switch
          disabled v-if="element.type==='switch'"
          v-model="element.value"
          :active-text="element.activeText"
          :inactive-text="element.inactiveText"/>
        <!--滑块-->
        <el-slider
          disabled v-if="element.type==='slider'"
          v-model="element.value"
          :min="element.min"
          :max="element.max"
          :step="element.step"
          :show-stops="element.showStops"
          :range="element.range"
          :vertical="element.vertical"
          :height="element.height"
        />
        <!--评分-->
        <el-rate
          disabled v-if="element.type==='rate'"
          v-model="element.value"></el-rate>
        <!--文件上传-->
        <el-upload
          disabled
          v-if="element.type==='upload'"
          action="/"
          :drag="true"
          :multiple="element.multiple"
          :limit="element.multipleLimit">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="tip" v-text="element.description"></div>
      </el-form-item>
    </div>
  </div>
</template>

<script>

  export default {
    name: "form-item",
    model: {
      prop: 'items',
      event: 'change'
    },
    props: {
      items: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data() {
      return {
        options: {
          sort: false
        }
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../../assets/css/form-design";

</style>
