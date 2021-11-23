<template>
  <div class="page-content">
    <breadcrumb/>
    <el-container>
      <el-aside width="250px" class="panel s-l">
        <div class="panel-header">工具箱</div>
        <div class="panel-body">
          <draggable v-model="componentsKit" class="moveArea" :options="moveAreaOptions" :clone="onClone">
            <div class="drag-item" v-for="(element, index) in componentsKit" :key="index" :disabled="true">
              <label v-text="element.label"></label>
              <div class="item-sample" :class="element.type"></div>
            </div>
          </draggable>
        </div>
      </el-aside>
      <el-main class="panel">
        <div class="panel-header">表单设计</div>
        <div class="panel-body">
          <el-form :rules="rules" ref="form" :model="form" label-position="top">
            <el-form-item label="表单名称：" prop="name">
              <el-input v-model="form.name" max="100"></el-input>
            </el-form-item>
            <el-form-item label="表单描述：" prop="description">
              <el-input type="textarea" v-model="form.description" :maxlength="100" aria-placeholder="长度在100个字符以内"></el-input>
            </el-form-item>
            <h3>拖动左侧组件到下面区域</h3>
            <draggable v-model="components" class="dragArea" :options="dragAreaOptions">
              <div class="item" v-for="(element, index) in components" :key="index" @click="showProp($event,element)"
                   v-if="element">
                <el-form-item :label="element.label" :required="element.required">
                  <!--单行文本,多行文本-->
                  <el-input
                    v-if="element.type==='text' || element.type==='textarea'"
                    :type="element.type"
                    v-model="element.value"
                    :placeholder="element.placeholder"/>
                  <!--计数器-->
                  <el-input-number
                    v-if="element.type==='number'"
                    v-model="element.value"
                    controls-position="right"
                    :min="element.min"
                    :max="element.max"
                    :placeholder="element.placeholder"/>
                  <!--日期选择,日期时间选择-->
                  <el-date-picker
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
                    v-if="element.type==='time'"
                    v-model="element.value"
                    :picker-options="element.options"
                    :placeholder="element.placeholder"/>
                  <!--下拉选-->
                  <el-select v-if="element.type==='select'"
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
                  <el-radio-group v-if="element.type==='radio'" v-model="element.value">
                    <el-radio v-for="vo in element.options" :label="vo.value" :key="vo.value">{{vo.label}}</el-radio>
                  </el-radio-group>
                  <!--多选框-->
                  <!--多选框组-->
                  <el-checkbox-group v-if="element.type==='checkbox'" v-model="element.value">
                    <el-checkbox v-for="vo in element.options" :label="vo.value" :key="vo.value">{{vo.label}}
                    </el-checkbox>
                  </el-checkbox-group>
                  <!--开关-->
                  <el-switch v-if="element.type==='switch'"
                             v-model="element.value"
                             :active-text="element.activeText"
                             :inactive-text="element.inactiveText"/>
                  <!--滑块-->
                  <el-slider v-if="element.type==='slider'"
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
                  <el-rate v-if="element.type==='rate'"
                           v-model="element.value"
                  ></el-rate>
                  <!--文件上传-->
                  <el-upload
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
                <a class="close" @click="removeEle(index)"><i class="el-icon-close"></i></a>
              </div>
            </draggable>
            <br>
            <el-form-item>
              <el-button @click="$router.back()">取消</el-button>
              <el-button type="primary" @click="onSubmit">保存设计</el-button>
            </el-form-item>
          </el-form>
          <el-row v-if="true">
            <el-col :span="11">
              <h2>List 1 v-for</h2>
              <div class="view-area">
                <pre>{{listString}}</pre>
              </div>
            </el-col>
            <el-col :span="2"><br></el-col>
            <el-col :span="11">
              <h2>List 2 v-for</h2>
              <div class="view-area">
                <pre>{{list2String}}</pre>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-aside width="400px" class="panel s-r animated slideInRight" :class="{'lock':propPanelLock}"
                v-show="propPanelVisible">
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
            <!--<el-form-item label="名字">-->
            <!--<el-input v-model="component.name"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="组件名称：">
              <el-input v-model="component.label"/>
            </el-form-item>
            <el-form-item
              v-if="component.type==='text'||component.type==='number'||component.type==='textarea'||component.type==='time'||component.type==='select'||component.type==='year'||component.type==='month'||component.type==='date'||component.type==='week'||component.type==='datetime'||component.type==='datetimerange'||component.type==='daterange'"
              label="提示文字">
              <el-input v-model="component.placeholder"/>
            </el-form-item>
            <el-form-item label="组件描述：">
              <el-input type="textarea" v-model="component.description" :maxlength="100" placeholder="长度在100个字符以内"></el-input>
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
            <el-form-item v-if="(component.type==='select'||component.type==='upload') && component.multiple"
                          label="最多可选几项（0表示不限制）">
              <el-input-number v-model="component.multipleLimit" :min="0" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item v-if="component.type==='select'|| component.type==='radio'|| component.type==='checkbox'"
                          label="下拉选的选项">
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
                <el-table-column label="操作" width="50px">
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
          </el-form>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {

    components: {
      draggable
    },
    data() {
      return {
        componentsKit: [
          {value: '', label: "单行文本", type: 'text', required: false, description: '', placeholder: ''},
          {value: '', label: "计数器", type: 'number', required: false, description: '', placeholder: '', min: 0, max: 99},
          {value: '', label: "多行文本", type: 'textarea', required: false, description: '', placeholder: ''},
          {value: '', label: "日期选择", type: 'date', required: false, description: '', placeholder: ''},
          {
            value: '',
            label: "时间选择",
            type: 'time',
            required: false,
            description: '',
            placeholder: '',
            options: {start: '08:00', step: '00:30', end: '20:00'}
          },
          {
            value: '',
            label: "下拉选",
            type: 'select',
            required: false,
            description: '',
            placeholder: '',
            multiple: false,
            multipleLimit: 0,
            options: [{
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
          {
            value: false,
            label: "开关",
            type: 'switch',
            required: false,
            description: '',
            placeholder: '',
            activeText: '是',
            inactiveText: '否'
          },
          {
            value: [],
            label: "滑块",
            type: 'slider',
            required: false,
            description: '',
            placeholder: '',
            min: 0,
            max: 100,
            step: 5,
            showStops: false,
            range: false,
            vertical: false,
            height: '50px'
          },
          {value: 0, label: "评分", type: 'rate', required: false, description: '', placeholder: ''},
          {
            value: '',
            label: "文件上传",
            type: 'upload',
            required: false,
            description: '',
            placeholder: '',
            multiple: false,
            multipleLimit: 0,
            accept: ''
          },
          {value: '', label: "用户组件", type: 'users', required: false, description: '', placeholder: ''},
          {value: '', label: "拍照组件", type: 'camera', required: false, description: '', placeholder: ''},
          {value: '', label: "扫码组件", type: 'scan', required: false, description: '', placeholder: ''},
          {value: '', label: "定位组件", type: 'location', required: false, description: '', placeholder: ''}
        ],
        components: [],
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
          group: 'component',
          ghostClass: 'ghost'
        },
        form: {
          id: 0,
          name: '',
          description: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入表单名称', trigger: 'blur'},
            {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请填写表单描述', trigger: 'blur'},
            {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
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
      this.selectAndInitForm(this.$route.query)
    },  
  methods: {
      selectAndInitForm(id) {
        this.$http.get('/form/tpl/info', {id: id}, r => {
          this.components = r.data.components;
          this.form.name = r.data.form.name;
          this.form.id = r.data.form.id;
          this.form.description = r.data.form.description;
        });
      },
      showProp($event, element) {
        this.component = element;
        this.propPanelVisible = true;
        return false;
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const postData = this.form;
            postData.components = this.components;
            // this.form.component = JSON.stringify(this.components);
            this.$http.post('/form/tpl/edit', postData, (res) => {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            });
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            });
            return false;
          }
        });
      },
      onClone(obj) {
        // 利用json 实现深度克隆对象
        if (obj) { return JSON.parse(JSON.stringify(obj)); }
        return false;
      },
      removeEle(index) {
        this.components.splice(index, 1);
      }
    },
    computed: {
      listString() {
        return JSON.stringify(this.componentsKit, null, 2);
      },
      list2String() {
        return JSON.stringify(this.components, null, 2);
      }
    }
  }
</script>
<style lang="scss" scoped>

  .el-container {
    position: absolute !important;
    top: 32px;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: solid 1px #DCDFE6;
    border-bottom: solid 1px #DCDFE6;
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
