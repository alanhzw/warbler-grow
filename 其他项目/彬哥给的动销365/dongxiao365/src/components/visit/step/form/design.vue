<template>
  <div class="page-content">
    <el-container>
      <el-aside width="250px" class="panel s-l">
        <div class="panel-header">工具箱</div>
        <div class="panel-body">
          <draggable v-model="componentsKit" class="moveArea" :options="moveAreaOptions" :clone="onClone">
            <div class="drag-item" v-for="(element, index) in componentsKit" :key="'c_'+index" :disabled="true">
              <label v-text="element.label"></label>
              <div class="item-sample" :class="element.type"></div>
            </div>
          </draggable>
        </div>
      </el-aside>
      <el-main class="panel">
        <div class="panel-header">任务设计</div>
        <div class="panel-body">
          <el-form :rules="rules" ref="form" :model="form" label-position="left" label-width="110px">
            <el-form-item label="任务名称：" prop="name">
              <el-input v-model="form.name" max="100"></el-input>
            </el-form-item>
            <el-form-item label="任务描述：" prop="description">
              <el-input type="textarea" v-model="form.description" :maxlength="500" placeholder="请输入任务描述,长度在500字以内"></el-input>
            </el-form-item>
            <h3>拖动左侧组件到下面区域</h3>
            <form-item v-model="form.components" @showProp="showProp" :options="dragAreaOptions"></form-item>
            <br>
            <el-form-item>
              <el-button type="success" @click="handleClose">取消</el-button>
              <el-button type="primary" @click="onSubmit">保存设计</el-button>
            </el-form-item>
          </el-form>
          <br>
          <br>
          <!--<pre>{{list2String}}</pre>-->
          <br>
        </div>
      </el-main>
      <el-aside width="400px" class="panel s-r animated slideInRight" :class="{'lock':propPanelLock}" v-show="propPanelVisible">
        <div class="panel-header">
          <el-row>
            <el-col :span="12">
              <div class="header-text">
                字段属性
                <a class="close" v-if="propPanelLock" @click="propPanelLock=false">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </a>
                <a class="close" v-else @click="propPanelLock=true">
                  <i class="fa fa-unlock" aria-hidden="true"></i>
                </a>
              </div>
            </el-col>
            <el-col :span="12" class="text-right">
              <a class="close" @click="propPanelVisible=false" v-if="!propPanelLock"><i class="fa fa-remove"></i></a>
            </el-col>
          </el-row>
        </div>
        <div class="panel-body">
          <el-form v-if="component.type" ref="component" :model="component" label-position="top">
            <el-form-item label="组件名称：">
              <el-input v-model="component.label"/>
            </el-form-item>
            <el-form-item
              v-if="component.type==='text'||component.type==='number'||component.type==='textarea'||component.type==='time'||component.type==='select'||component.type==='year'||component.type==='month'||component.type==='date'||component.type==='week'||component.type==='datetime'||component.type==='datetimerange'||component.type==='daterange'"
              label="提示文字">
              <el-input v-model="component.placeholder"/>
            </el-form-item>
            <el-form-item label="组件描述：">
              <el-input type="textarea" v-model="component.description" :maxlength="100" aria-placeholder="长度在100个字符以内"></el-input>
            </el-form-item>
            <el-form-item label="是否必填：">
              <el-switch
                v-model="component.required"
                :active-value=true
                :inactive-value=false
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
            <el-form-item v-if="component.type==='number'" label="取值范围">
              <el-col :span="10">
                <el-input-number v-model="component.min" controls-position="right"></el-input-number>
              </el-col>
              <el-col class="line" :span="4" style="text-align: center;">-</el-col>
              <el-col :span="10">
                <el-input-number v-model="component.max" controls-position="right"></el-input-number>
              </el-col>
            </el-form-item>
            <el-form-item
              v-if=" component.type==='year'||component.type==='month'||component.type==='date'||component.type==='week'||component.type==='datetime'||component.type==='datetimerange'||component.type==='daterange'"
              label="日期格式">
              <el-select v-model="component.type" placeholder="请选择">
                <el-option
                  v-for="item in datePickerTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="component.type==='time'" label="开始时间">
              <el-input v-model="component.options.start"></el-input>
            </el-form-item>
            <el-form-item v-if="component.type==='time'" label="结束时间">
              <el-input v-model="component.options.end"></el-input>
            </el-form-item>
            <el-form-item v-if="component.type==='time'" label="时间间隔">
              <el-input v-model="component.options.step"></el-input>
            </el-form-item>

            <el-form-item v-if="component.type==='select'||component.type==='upload'" label="是否多选">
              <el-switch
                v-model="component.multiple"
                :active-value=true
                :inactive-value=false
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
            <el-form-item v-if="(component.type==='select'||component.type==='upload') && component.multiple" label="最多可选几项（0表示不限制）">
              <el-input-number v-model="component.multipleLimit" :min="0" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item v-if="component.type==='select'|| component.type==='radio'|| component.type==='checkbox'" label="下拉选的选项">
              <el-button type="text" @click="component.options.push({value: '', label: ''})">增加选项</el-button>
              <el-table
                empty-text="点击<增加选项>增加选项"
                :data="component.options" style="width: 100%">
                <el-table-column
                  label="显示文字">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.label" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="选项的值">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.value" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="50px">
                  <template slot-scope="scope">
                    <el-button
                      @click="component.options.splice(scope.$index,1)"
                      type="text"
                    >
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item v-if="component.type==='switch'" label="打开时的文字描述">
              <el-input v-model="component.activeText" clearable/>
            </el-form-item>
            <el-form-item v-if="component.type==='switch'" label="关闭时的文字描述">
              <el-input v-model="component.inactiveText" clearable/>
            </el-form-item>

            <el-form-item v-if="component.type==='slider'" label="最小值">
              <el-input-number v-model="component.min" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item v-if="component.type==='slider'" label="最大值">
              <el-input-number v-model="component.max" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item v-if="component.type==='slider'" label="步长">
              <el-input-number v-model="component.step" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item v-if="component.type==='slider'" label="是否显示间断点">
              <el-switch
                v-model="component.showStops"
                :active-value=true
                :inactive-value=false
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
            <el-form-item v-if="component.type==='slider'" label="是否为范围选择">
              <el-switch
                v-model="component.range"
                :active-value=true
                :inactive-value=false
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
            <el-form-item v-if="component.type==='slider'" label="是否竖向模式">
              <el-row>
                <el-col :span="8">
                  <el-switch
                    v-model="component.vertical"
                    :active-value=true
                    :inactive-value=false
                    active-text="是"
                    inactive-text="否">
                  </el-switch>
                </el-col>
                <el-col :span="4" v-if="component.vertical">高度：</el-col>
                <el-col :span="8" v-if="component.vertical">
                  <el-input v-model="component.height"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="是否可以动态增加：" v-if="component.type==='group'">
              <el-switch
                v-model="component.dynamicAdd"
                :active-value=true
                :inactive-value=false
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import FormItem from './inc/form-item'

  export default {
    props: ['defaultValue'],
    components: {
      draggable, FormItem
    },
    data() {
      return {
        componentsKit: [
          {value: '', label: "分组", type: 'group', children: [], required: false, description: '', placeholder: ''},
          {value: '', label: "单行文本", type: 'text', required: false, description: '', placeholder: ''},
          {value: '', label: "计数器", type: 'number', required: false, description: '', placeholder: '', min: 0, max: 99},
          {value: '', label: "多行文本", type: 'textarea', required: false, description: '', placeholder: ''},
          {value: '', label: "日期选择", type: 'date', required: false, description: '', placeholder: ''},
          {value: '', label: "时间选择", type: 'time', required: false, description: '', placeholder: '', options: {start: '08:00', step: '00:30', end: '20:00'}},
          {
            value: '', label: "下拉选", type: 'select', required: false, description: '', placeholder: '', multiple: false, multipleLimit: 0, options: [{
              "label": "选项1",
              "value": "1"
            },
              {
                "value": "2",
                "label": "选项2"
              }]
          },
          {
            value: '', label: "单选框", type: 'radio', required: false, description: '', placeholder: '', options: [{
              "label": "选项1",
              "value": "1"
            },
              {
                "value": "2",
                "label": "选项2"
              }]
          },
          {
            value: '', label: "多选框", type: 'checkbox', required: false, description: '', placeholder: '', options: [{
              "label": "选项1",
              "value": "1"
            },
              {
                "value": "2",
                "label": "选项2"
              }]
          },
          {value: false, label: "开关", type: 'switch', required: false, description: '', placeholder: '', activeText: '是', inactiveText: '否'},
          {value: [], label: "滑块", type: 'slider', required: false, description: '', placeholder: '', min: 0, max: 100, step: 5, showStops: false, range: false, vertical: false, height: '50px'},
          {value: 0, label: "评分", type: 'rate', required: false, description: '', placeholder: ''},
          {value: '', label: "图片上传", type: 'upload', required: false, description: '', placeholder: '', multiple: false, multipleLimit: 0, accept: ''},
          {value: '', label: "拍照组件", type: 'camera', required: false, description: '', placeholder: ''},
          {value: '', label: "扫码组件", type: 'scan', required: false, description: '', placeholder: ''},
          {value: '', label: "定位组件", type: 'location', required: false, description: '', placeholder: ''},
          {value: '', label: "用户组件", type: 'users', required: false, description: '', placeholder: ''},
          {value: '', label: "部门组件", type: 'department', required: false, description: '', placeholder: ''},
          {value: '', label: "客户组件", type: 'customer', required: false, description: '', placeholder: ''},
          {value: '', label: "商品组件", type: 'good', required: false, description: '', placeholder: ''},
          {value: '', label: "区域组件", type: 'area', required: false, description: '', placeholder: ''},
          {value: '', label: "标签组件", type: 'tag', required: false, description: '', placeholder: ''}
        ],
        component: {},
        moveAreaOptions: {
          sort: false,
          group: {
            name: 'component',
            pull: 'clone',
            put: false,
            revertClone: true
          }
        },
        dragAreaOptions: {
          sort: true,
          group: 'component',
          ghostClass: 'ghost'
        },
        form: null,
        rules: {
          name: [
            {required: true, message: '请输入任务名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ],
          description: [
            // {required: true, message: '请填写任务描述', trigger: 'blur'},
            {min: 0, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
          ]
        },
        propPanelVisible: false,
        propPanelLock: false,
        datePickerTypeList: [
          {value: 'year', label: '年'},
          {value: 'month', label: '年月'},
          {value: 'date', label: '年月日(默认)'},
          {value: 'week', label: '周/年'},
          {value: 'datetime', label: '日期+时间'},
          {value: 'daterange', label: '日期范围'},
          {value: 'datetimerange', label: '日期时间范围'}
        ]
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        if (this.defaultValue) {
          this.form = this.defaultValue;
        } else {
          this.form = {
            name: '',
            description: '',
            components: []
          };
        }
      },
      showProp($event, element) {
        this.component = element;
        this.propPanelVisible = true;
        $event.preventDefault();
        $event.cancelBubble = true;
        return false;
      },
      onSubmit() {
        const f = this.$refs.form;
        f.validate((valid) => {
          if (valid) {
            this.$emit('onSubmit', this.$util.extend(this.form));
            f.resetFields();
          } else {
            return false;
          }
        });
        //
      },
      onClone(obj) {
        // 利用json 实现深度克隆对象
        if (obj) { return JSON.parse(JSON.stringify(obj)); }
        return false;
      },
      handleClose() {
        this.$refs.form.resetFields();
        this.$emit('onClose', false);
      }
    },
    computed: {
      listString() {
        return JSON.stringify(this.componentsKit, null, 2);
      },
      list2String() {
        return JSON.stringify(this.form.components, null, 2);
      }
    },
    watch: {
      defaultValue() {
        this.init();
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../../assets/css/form-design";

  .el-container {
    position: absolute !important;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: solid 1px #DCDFE6;
    border-bottom: solid 1px #DCDFE6;
    border-left: solid 1px #DCDFE6;
    .s-l {
      border-right: solid 1px #DCDFE6;
      background-color: white;
    }
    .s-r {
      border-left: solid 1px #DCDFE6;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      -webkit-animation-duration: .2s;
      -webkit-animation-delay: 0s;
      background-color: #fbfbfb;
      box-shadow: -5px 0 30px #eeeeee;
      &.lock {
        position: relative;
        box-shadow: none;
        background: none;
      }
    }
  }

  .view-area {
    border: dashed 1px #D8DCE5;
    padding: 20px;
  }
</style>
