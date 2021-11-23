<template>
  <div class="page-content">
    <breadcrumb/>
    <el-container id="dragContainer">
      <el-aside width="120px" class="panel left">
        <div class="panel-header">工具栏</div>
        <div class="panel-body">
          <div class="drag-items">
            <div class="drag-items">
              <div class="drag-item" :class="{'selected':linkStack.state===0}" @click="cancelReadyToConnect">
                <i aria-hidden="true" class="fa fa-hand-pointer-o"></i>
                <div>选择</div>
              </div>
              <div class="drag-item" :class="{'selected':linkStack.state!==0}" @click="setReadyToConnect">
                <i aria-hidden="true" class="fa fa-link"></i>
                <div>连接</div>
              </div>
              <div class="drag-split"></div>
              <div draggable="true" class="drag-item"
                   @dragstart="dragStart('input',$event)"
                   @dragend="dragEnd"
                   @selectstart="selectStart"><i aria-hidden="true" class="fa fa-keyboard-o"></i>
                <div>录入</div>
              </div>
              <div draggable="true" class="drag-item"
                   @dragstart="dragStart('sign',$event)"
                   @dragend="dragEnd"
                   @selectstart="selectStart"><i aria-hidden="true" class="fa fa-gavel"></i>
                <div>审批</div>
              </div>
              <div draggable="true" class="drag-item"
                   @dragstart="dragStart('cond',$event)"
                   @dragend="dragEnd"
                   @selectstart="selectStart"><i aria-hidden="true" class="fa fa-random"></i>
                <div>条件</div>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main class="panel">
        <div class="panel-header">流程设计</div>
        <div class="panel-body">
          <div id="box" class="jonit-container"
               @dragenter="dragEnter"
               @dragover="dragOver"
               @drop="drop">
          </div>
        </div>
      </el-main>
      <el-aside width="400px" class="panel right animated slideInRight" :class="{'lock':propPanelLock}"
                v-show="propPanelVisible">
        <div class="panel-header">
          <el-row>
            <el-col :span="12">
              <div class="header-text">
                节点属性
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
          <el-form ref="flow" :model="flow" label-position="top">
            <el-form-item label="流程名称：">
              <el-input v-model="flow.name"></el-input>
            </el-form-item>
            <template v-if="currentModel!=null">
              <el-form-item label="节点名称：">
                <el-input v-model="currentText"></el-input>
              </el-form-item>
              <template v-if="currentModel.isLink()&&currentNode.isCond">
                <el-form-item label="执行条件：">
                  <el-radio-group v-model="currentNode.logic">
                    <el-radio :label="1">满足以下所有条件</el-radio>
                    <el-radio :label="2">满足以下任意条件</el-radio>
                  </el-radio-group>
                  <br>
                  <el-button type="text" @click="addCond">添加条件</el-button>
                </el-form-item>
                <el-form-item :label="'条件'+(index+1)" :key="index" v-for="(vo,index) in currentNode.condition">
                  <el-col :span="8">
                    <el-select v-model="vo.id" placeholder="请选择">
                      <el-option
                        v-for="item in form.components"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select v-model="vo.operator" placeholder="请选择" style="margin: 0 5px;">
                      <el-option
                        v-for="item in operator"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="vo.value"></el-input>
                  </el-col>
                  <el-col :span="1">
                    <el-button type="text" icon="el-icon-close" @click="removeCond(index)"></el-button>
                  </el-col>
                </el-form-item>
              </template>
            </template>
            <el-form-item label="">
              <hr>
            </el-form-item>
            <el-form-item>
              <span v-if="this.flow.form != null || this.flow.formId!=null">
              <el-button  type="primary" @click="onSubmit">立即创建</el-button>
              </span>
              <span v-if="this.flow.form == null && this.flow.formId==null">
              <el-button  type="danger">没有选择表单或自定义表单</el-button>
              </span>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          <pre>{{listString}}</pre>
          <!--<hr>-->
          <!--<pre>{{listString2}}</pre>-->
          <!--<hr>-->
          <!--<pre>{{listString3}}</pre>-->
        </div>
      </el-aside>
    </el-container>

  </div>
</template>
<script>
  import joint from 'jointjs'

  export default {
    data() {
      return {
        dialogTableVisible: false,
        propPanelVisible: false,
        propPanelLock: false,
        flowItems: [], // 节点
        flowLine: [], // 连线
        linkStack: {
          state: 0,
          source: null,
          target: null
        },
        graph: null,
        paper: null,
        // 图节点样式属性
        attributes: {
          start: {
            default: {
              text: {fill: 'white'},
              '.inner': {},
              '.outer': {}
            },
            hover: {
              text: {},
              '.inner': {},
              '.outer': {}
            },
            selected: {
              text: {},
              '.inner': {},
              '.outer': {}
            }
          },
          input: {
            default: {
              text: {fill: 'white'},
              '.inner': {},
              '.outer': {}
            },
            hover: {
              text: {},
              '.inner': {},
              '.outer': {}
            },
            selected: {
              text: {},
              '.inner': {},
              '.outer': {}
            }
          },
          cond: {
            default: {
              text: {fill: 'white'},
              '.inner': {},
              '.outer': {}
            },
            hover: {
              text: {},
              '.inner': {},
              '.outer': {}
            },
            selected: {
              text: {},
              '.inner': {},
              '.outer': {}
            }
          },
          sign: {
            default: {
              text: {fill: 'white'},
              '.inner': {},
              '.outer': {}
            },
            hover: {
              text: {},
              '.inner': {},
              '.outer': {}
            },
            selected: {
              text: {},
              '.inner': {},
              '.outer': {}
            }
          },
          end: {
            default: {
              text: {fill: 'white'},
              '.inner': {},
              '.outer': {}
            },
            hover: {
              text: {},
              '.inner': {},
              '.outer': {}
            },
            selected: {
              text: {},
              '.inner': {},
              '.outer': {}
            }
          },
          link: {
            default: {
              '.connection': {stroke: '#1ABC9C', 'stroke-width': 3},
              '.marker-target': {fill: '#1ABC9C', stroke: '#1ABC9C', d: 'M 26 0 L 0 13 L 26 26 z'}
            },
            hover: {
              '.connection': {stroke: '#1ABC9C', 'stroke-width': 3},
              '.marker-target': {fill: '#1ABC9C', stroke: '#1ABC9C', d: 'M 26 0 L 0 13 L 26 26 z'}
            },
            selected: {
              '.connection': {stroke: '#1ABC9C', 'stroke-width': 3},
              '.marker-target': {fill: '#1ABC9C', stroke: '#1ABC9C', d: 'M 26 0 L 0 13 L 26 26 z'}
            }
          }
        },
        currentText: '',
        currentView: null,
        currentModel: null,
        currentNode: null,
        form: {
          components: [
            {
              id: 1,
              "label": "单行文本"
            },
            {
              id: 2,
              "label": "计数器"
            },
            {
              id: 3,
              "label": "多行文本"
            },
            {
              id: 4,
              "label": "时间选择"
            }
          ]
        },
        flow: {
          name: '',
          isPublic: true,
          users: '',
          departments: '',
          positions: '',
          roles: '',
          manageScope: '',
          remark: '',
          nodes: '',
          nodePath: '',
          form: null,
          formId: null
        },
        postData: {},
        operator: [
          {
            label: '等于',
            value: '='
          },
          {
            label: '不等于',
            value: '!='
          },
          {
            label: '小于',
            value: '<'
          },
          {
            label: '大于',
            value: '>'
          },
          {
            label: '小于等于',
            value: '<='
          },
          {
            label: '大于等于',
            value: '>='
          }
        ]
      }
    },
    created() {
      // 初始化图形渲染器
      this.graph = new joint.dia.Graph;
      this.flow.formId = sessionStorage.getItem("formId");
      this.flow.form = sessionStorage.getItem("form");
      this.warn();
    },
    mounted() {
      const that = this;
      // 初始化画布，这个初始化不可以放到created事件中
      this.paper = new joint.dia.Paper({
        el: document.getElementById('box'),
        width: '100%',
        height: '100%',
        model: this.graph,
        gridSize: 1,
        interactive: function (cellView) {
          if (cellView.model instanceof joint.dia.Link) {
            // Disable the default vertex add functionality on pointerdown.
            // 禁止点在线上的时候，出现曲线工具
            return {vertexAdd: false};
          }
          return true;
        }
      });
      // 画布点击事件
      this.paper.on('blank:pointerclick', function () {
        that.resetSelected();
        return false;
      });
      // 节点，连线点击事件
      this.paper.on('cell:pointerclick', function (evt) {
        that.onNodeClick(evt);
        return false;
      });
      // 节点或者连线的双击事件，这里可以删除节点
      this.paper.on('cell:pointerdblclick', function (evt) {
        if (evt.model.isLink()) { return false; }
        evt.model.remove();
        return false;
      });
      // 鼠标经过节点
      this.paper.on('cell:mouseover', function (cellView) {
        if (cellView.model.isLink()) { return false; }
        const node = that.modelToNode(cellView.model);
        const attr = that.attributes[node.type];
        cellView.model.attr(attr.hover);
      });
      // 鼠标移除节点
      this.paper.on('cell:mouseout', function (cellView) {
        if (cellView.model.isLink()) { return false; }
        const node = that.modelToNode(cellView.model);
        const attr = that.attributes[node.type];
        cellView.model.attr(attr.default);
      });
      that.test();
    },
    methods: {
      warn() {

        if (this.flow.formId === null && this.flow.form === null) {
          this.$alert('没有创建或选择表单', '警告', {
            confirmButtonText: '关闭',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${action}`
              });
            }
          });
        }
      },
      // 初始化,默认增加开始和结束节点
      init() {
        const startNode = {text: '开始', type: 'start', x: 100, y: 100};
        const endNode = {text: '结束', type: 'end', x: 100, y: 600};
        this.addNode(startNode);
        this.addNode(endNode);
      },
      // 测试流程图,调试用
      test() {
        const testData = [
          {
            "text": "开始",
            "type": "start",
            "x": 476,
            "y": 96,
            "id": "2171809a-31c0-48d0-bf1e-cda558a1a4d0"
          },
          {
            "type": "input",
            "text": "录入",
            "x": 453,
            "y": 289,
            "id": "7dd00755-94e5-42ed-a892-1c7f0582e5ea"
          },
          {
            "type": "cond",
            "text": "条件",
            "x": 486,
            "y": 460,
            "id": "6c226554-0e91-461d-a280-bac9fdac348d"
          },
          {
            "type": "sign",
            "text": "审批",
            "x": 300,
            "y": 637,
            "id": "292381f2-d23f-4ee6-bf9e-f3a157bcd3f8"
          },
          {
            "type": "sign",
            "text": "审批",
            "x": 634,
            "y": 637,
            "id": "e60d6806-cdda-4d84-86f9-d0f89b36827b"
          },
          {
            "text": "结束",
            "type": "end",
            "x": 479,
            "y": 865,
            "id": "3107d690-59b1-461f-a211-33c9b830f48e"
          }
        ];
        for (const obj of testData) {
          this.addNode(obj);
        }
        this.addLink(this.flowItems[0], this.flowItems[1]);
        this.addLink(this.flowItems[1], this.flowItems[2]);
        this.addLink(this.flowItems[2], this.flowItems[3]);
        this.addLink(this.flowItems[2], this.flowItems[4]);
        this.addLink(this.flowItems[3], this.flowItems[5]);
        this.addLink(this.flowItems[4], this.flowItems[5]);
      },
      // 开始选择工具栏元素的时候
      selectStart() {
        return false;
      },
      // 开始拖动
      dragStart(type, ev) {
        ev.dataTransfer.effectAllowed = "move";
        ev.dataTransfer.setData("type", type);
        return false;
      },
      // 拖动结束
      dragEnd() {
        return false
      },
      // 拖动进入
      dragEnter(ev) {
        return false;
      },
      // 拖动经过
      dragOver(ev) {
        ev.preventDefault();
        return false;
      },
      // 拖动放置的时候
      drop(ev) {
        const type = ev.dataTransfer.getData("type");
        ev.dataTransfer.clearData();
        // 计算鼠标和拖动块的相对位置，做偏移量的计算,先用72
        let x = ev.layerX - 36;
        let y = ev.layerY - 36;
        if (x < 0) { x = 0; }
        if (y < 0) { y = 0; }
        let text = '新元素节点';
        switch (type) {
          case  'input':
            text = '录入';
            break;
          case  'sign':
            text = '审批';
            break;
          case  'cond':
            text = '条件';
            break;
          default:
            // do nothing
        }
        this.addNode({type: type, text: text, x: x, y: y});
        return false;
      },
      // 开始连接状态
      setReadyToConnect() {
        this.linkStack.state = 1;
      },
      // 取消连接状态
      cancelReadyToConnect() {
        this.linkStack.state = 0;
        this.linkStack.source = null;
        this.linkStack.target = null;
      },
      // 增加节点
      addNode(node) {
        const that = this;
        const erd = joint.shapes.erd;
        let ele = null;
        switch (node.type) {
          case 'start':
            ele = new erd.Normal();
            break;
          case 'input':
            ele = new erd.Entity();
            break;
          case 'cond':
            ele = new erd.Relationship();
            break;
          case 'sign':
            ele = new erd.WeakEntity();
            break;
          case 'end':
            ele = new erd.Multivalued();
            break;
          default:
            // do nothoing
        }
        ele.attr(that.attributes[node.type].default);
        ele.position(node.x, node.y);
        ele.attr('text/text', node.text);
        ele.on('change:position', function (cellView, evt) {
          that.resetPosition(cellView);
        });
        ele.on('remove', function (cellView, evt) {
          that.removeNode(cellView);
        });
        node.id = ele.id;
        this.flowItems.push(node);
        this.graph.addCell(ele);
      },
      // 增加连线
      addLink(startNode, endNode) {
        const obj = {
          from: startNode.id,
          to: endNode.id
        };
        const that = this;
        const isExist = this.isHasLink(obj);
        if (!isExist) {
          const text = startNode.text + ' - ' + endNode.text;
          const link = new joint.dia.Link({
            source: {id: startNode.id},
            target: {id: endNode.id},
            attrs: this.attributes.link.default,
            // manhattan: true,
            // smooth: true,
            labels: [{position: 0.5, attrs: {text: {text: text}}}]
          });
          link.on('remove', function (e) {
            let index = 0;
            for (const obj of that.flowLine) {
              if (obj.id === e.id) {
                break;
              }
              index++;
            }
            that.flowLine.splice(index, 1);
          });
          obj.id = link.id;
          obj.text = text;
          // 判断是否是以条件作为开始的线
          obj.isCond = startNode.type === 'cond';
          if (obj.isCond) {
            obj.condition = [];
            obj.conditionStr = '';
            obj.logic = '';
          }
          this.flowLine.push(obj);
          this.graph.addCell(link);
        }
      },
      // 移除节点
      removeNode(model) {
        let index = 0;
        for (const obj of this.flowItems) {
          if (obj.id === model.id) {
            break;
          }
          index++;
        }
        this.flowItems.splice(index, 1);
      },
      // 判断是否已经存在连线
      isHasLink(link) {
        for (const i in this.flowLine) {
          if (this.flowLine[i].from === link.from && this.flowLine[i].to === link.to) { return true; }
        }
        return false;
      },
      // 计算是否需要连线
      calcLine(evt) {
        // 选择了一个节点，等待设置目标节点
        if (this.linkStack.state === 1) {
          this.linkStack.state = 2;
          this.linkStack.source = evt;
        } else if (this.linkStack.state === 2) { // 设置了目标节点
          if (this.linkStack.source === evt) { return false; }
          // 把当前节点设置为开始连接的起始节点，并把连接状态设置为待选择目标节点的状态
          const source = this.modelToNode(this.linkStack.source.model);
          const target = this.modelToNode(evt.model);
          this.addLink(source, target);
          this.linkStack.source = null;
          this.linkStack.target = null;
          this.linkStack.state = 0;
        }
      },
      // 重绘节点位置
      resetPosition(node) {
        const o = this.modelToNode(node);
        o.x = node.attributes.position.x;
        o.y = node.attributes.position.y;
        this.resetSelected();
      },
      // 重置选中状态
      resetSelected() {
        this.currentText = '';
        this.currentModel = null;
        this.currentNode = null;
        if (this.currentView) { this.currentView.unhighlight(); }
        this.currentView = null;
        if (!this.propPanelLock) {
          this.propPanelVisible = false;
        }
      },
      // 设置选中状态
      setSelected(evt) {
        if (this.currentView) { this.currentView.unhighlight(); }
        this.currentView = evt;
        this.currentModel = evt.model;
        this.currentView.highlight();
        if (evt.model.isLink()) {
          this.currentNode = this.modelToLink(evt.model);
          this.currentModel.attr(this.attributes.link.selected);
        } else {
          this.currentNode = this.modelToNode(evt.model);
          this.currentModel.attr(this.attributes[this.currentNode.type].selected);
        }
        this.currentText = this.currentNode.text;
      },
      // 当节点点击时触发
      onNodeClick(evt) {
        this.propPanelVisible = true;
        if (!evt.model.isLink()) {
          this.calcLine(evt);
        }
        this.setSelected(evt);
      },
      // 图形节点转换成数据节点
      modelToNode(model) {
        for (const obj of this.flowItems) {
          if (obj.id === model.id) { return obj; }
        }
      },
      // 图形连接转换成数据连接
      modelToLink(model) {
        for (const obj of this.flowLine) {
          if (obj.id === model.id) { return obj; }
        }
      },
      // 添加条件
      addCond() {
        if (this.currentNode && this.currentModel && this.currentModel.isLink() && this.currentNode.isCond) {
          this.currentNode.condition.push({
            id: '',
            operator: '',
            value: ''
          });
        }
      },
      // 移除条件
      removeCond(index) {
        if (this.currentNode && this.currentModel && this.currentModel.isLink() && this.currentNode.isCond) {
          this.currentNode.condition.splice(index, 1);
        }
      },
      // 保存
      onSubmit() {

        this.postData = this.flow;
        // this.postData.formId = '944038766375473152';
        this.postData.nodes = this.flowItems;
        this.postData.nodePath = this.flowLine;
        const that = this;
        this.$http.post('/flow/add', this.postData, function (res) {
          // alert('保存成功!');
          that.$router.push('/super/process/manage');
        }, e => {
          // alert("创建失败," + e.msg);
        });
      }
    },
    computed: {
      listString() {
        return JSON.stringify(this.flowItems, null, 2);
      },
      listString2() {
        return JSON.stringify(this.flowLine, null, 2);
      },
      listString3() {
        return JSON.stringify(this.postData, null, 2);
      }
    },
    watch: {
      currentText(val) {
        if (this.currentNode) { this.currentNode.text = this.currentText; }
        if (this.currentModel) { this.currentModel.attr('text/text', val); }
      }
    }
  }
</script>

<style lang="scss">
  .jonit-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: auto;
    transition: none;
    background: white url("../../../../assets/img/bb.png") repeat;
    .joint-element {
      cursor: pointer;
    }
    &.active {
      box-shadow: inset 0 0 10px #dce6f0;
    }
    .html-element {
      position: absolute;
      user-select: none;
      margin: 0;
      transition: none;
      background-color: white;
      border: solid 1px #6f98a7;
      box-shadow: 1px 1px 5px rgba(99, 108, 117, 0.65);
      text-align: center;
      border-radius: 5px;
      z-index: 0;
      .close {
        position: absolute;
        top: -6px;
        right: -6px;
        width: 18px;
        height: 18px;
        line-height: 16px;
        margin: 0;
        border-radius: 100%;
        font-size: 16px;
        padding: 0;
        color: white;
        background-color: #C64242;
        border: solid 1px #bf4040;
        z-index: 100;
        cursor: pointer;
        opacity: 0;
      }
      &.closing {
        .close {
          background-color: #409eff;
          border: solid 1px #57c3ff;
        }
      }
      i {
        font-weight: 300;
        text-shadow: 0 0 1px white;
        font-size: 2rem;
        display: block;
        padding: 5px;
        margin-top: 10px;
      }
      &:hover, &.hover {
        background-color: #e4eff9;
        /*z-index: 100;*/
        .close {
          opacity: 1;
        }
      }
    }
    .start {
      i {
        color: #67C23A;
        &:before {
          content: '\f111';
        }
      }
      .close {
        display: none;
      }
    }
    .end {
      i {
        color: #F56C6C;
        &:before {
          content: '\f192';
        }
      }
      .close {
        display: none;
      }
    }
    .input {
      i {
        color: #E6A23C;
        &:before {
          content: '\f11c';
        }
      }
    }
    .sign {
      i {
        color: #409EFF;
        &:before {
          content: '\f0e3';
        }
      }
    }
    .cond {
      i {
        color: #329086;
        &:before {
          content: '\f074';
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .el-container {
    position: absolute !important;
    top: 32px;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: solid 1px #DCDFE6;
    border-bottom: solid 1px #DCDFE6;
    .left {
      border-right: solid 1px #DCDFE6;
      background-color: white;
    }
    .right {
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

  .panel {
    .panel-header {
    }
    .panel-body {
      position: relative;
      height: calc(100% - 62px);
      padding: 10px;
      overflow: auto;
    }
  }

  .drag-item {
    border: 1px solid transparent;
    border-radius: 8px;
    margin: 25px auto;
    background-color: #e6e6e6;
    text-align: center;
    color: #3f454b;
    -webkit-transition: all ease-in-out .1s;
    -moz-transition: all ease-in-out .1s;
    -ms-transition: all ease-in-out .1s;
    -o-transition: all ease-in-out .1s;
    transition: all ease-in-out .1s;
    padding-top: 15px;
    width: 84px;
    height: 72px;
    &:hover, &.selected {
      border-color: #39a79c;
      box-shadow: 0 0 10px #409EFF;
    }
    &[draggable='true'] {
      cursor: move;
    }
    i {
      color: #656b73;
      display: block;
      font-size: 2rem;
      padding-bottom: 8px;
    }
  }

  .drag-items {
    .drag-split {
      display: block;
      border-bottom: dashed 1px #e6e6e6;
      height: 5px;
      margin-bottom: 5px;
    }
  }

</style>
