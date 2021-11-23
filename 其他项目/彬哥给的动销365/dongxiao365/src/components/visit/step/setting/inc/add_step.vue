<template>
  <div>
    <div style="height:400px;overflow:auto;">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <!--待选步骤表单列表-->
      <el-col :span="10">
        <el-card class="box-card transfer-panel">
          <div class="tp-info">({{leftDataTableSource.length}}/{{leftDataTableSource.length}})</div>
          <el-table
            ref="multipleTableLeft"
            :data="leftDataTableSource"
            @selection-change="handleSelectionChangeSource"
            tooltip-effect="dark"
            height="400"
            style="width: 100%">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column label="流程列表" prop="name">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!--穿梭框中间按钮及间距-->
      <el-col :span="4">
        <div class="text-center">
          <el-button icon="el-icon-arrow-right" class="el-transfer__button"
                     :disabled="this.leftChosenList.length == 0" @click="tranferToRight"></el-button>
        </div>
        <div class="text-center">
          <el-button icon="el-icon-arrow-left" class="el-transfer__button"
                     :disabled="this.rightChosenList.length == 0" @click="tranferToLeft"></el-button>
        </div>
      </el-col>
      <!--右侧已选择的步骤表单列表,有序-->
      <el-col :span="10">
        <el-card class="box-card transfer-panel">
          <div class="tp-info">({{rightDataTableSource.length}}/{{rightDataTableSource.length}})</div>
          <el-table
            ref="multipleTableRight"
            :data="rightDataTableSource"
            @selection-change="handleSelectionChangeTarget"
            tooltip-effect="dark"
            height="400"
            style="width: 100%">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column label="流程列表" prop="name"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <br/>
    </div>
    <!--按钮区-->
    <div class="text-right">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
    
  </div>
</template>

<script>
  export default {
    props: ["defaultValue"],
    data() {
      return {
        leftDataTableSource: [], // 待选表单列表数据源
        rightDataTableSource: [], // 待选表单列表数据源
        leftChosenList: [], // 左侧已选中的数据
        rightChosenList: [], // 右侧已选中的数据
        // 分页参数
        page: {
          pageNum: 1,
          pageSize: 999,
          sortName: '',
          sortOrder: '',
          total: 0
        }
      };
    },
    created() {
      this.loadStepListData();
    },
    mounted() {
    },
    methods: {
      // 加载左侧表格数据源
      loadStepListData(data) {
        this.$http.get("/crm/visit/form/list/publish", this.page, r => {
          this.leftDataTableSource = r.data;

        }, e => {
          console.error(e)
        });
        // 处理反向绑定事件
        setTimeout(() => {
          this.initSteps();
        }, 1000)
      },
      // 反向绑定数据事件
      initSteps() {
        if (this.defaultValue) {
          // 将右侧的已选中表格值更新为defaultValue
          this.rightDataTableSource = this.defaultValue;

          // 将defaultValue从左侧的待选表格中删除
          for (const stepDefault of this.leftDataTableSource) {

            let exist = false;

            for (const stepSource of this.defaultValue) {
              if (stepDefault.id === stepSource.id) {
                exist = true;
              }

            }
            // 如果存在,就在左侧元数据表中删除该对象
            if (exist) {
              setTimeout(() => {
                this.leftDataTableSource.splice(this.leftDataTableSource.indexOf(stepDefault), 1);
              }, 200)
            }

          }
        }
      },
      // 待选表单表的多选事件
      handleSelectionChangeSource(val) {
        this.leftChosenList = val;
      },
      // 右侧表单的多选事件
      handleSelectionChangeTarget(val) { // 源穿梭框的多选事件
        this.rightChosenList = val;
      },
      // 穿梭框事件,传递右边
      tranferToRight() {
        // 将左侧源表格数据删除已勾选的数据
        this.toggleAll(this.leftDataTableSource, this.leftChosenList, "del");
        // 将处理后的源表数据克隆到右侧目标表格
        this.rightDataTableSource = this.rightDataTableSource.concat(this.leftChosenList);
      },
      // 穿梭框事件,传递向左边
      tranferToLeft() {
        // 将右侧源表格数据删除已勾选的数据
        this.toggleAll(this.rightDataTableSource, this.rightChosenList, "del");
        // 将处理后的目标表数据克隆到左侧侧源表格
        this.leftDataTableSource = this.leftDataTableSource.concat(this.rightChosenList);
      },
      // 处理左右侧数据转移的方法
      // action=='del' 把list2的数据,从list1里面全部移除,action=='add',把list2的数据,全部增加到list1里面,排除重复项
      toggleAll(list1, list2, action) {
        list2.forEach(row => {
          const index = list1.indexOf(row);
          if (action === 'add') { // 新增
            if (index < 0) {
              list1.push(row);
            }
          } else if (action === 'del') {
            if (index >= 0) {
              list1.splice(index, 1);
            }
          }
        });
      },
      // 组件内取消按钮
      cancel() {
        this.$emit('cancel', 'close');
      },
      // 组件内确定按钮
      ok() {
        if (this.rightDataTableSource) {
          for (let i = 0; i < this.rightDataTableSource.length; i++) {
            this.rightDataTableSource[i].orderId = i + 1;
          }
        }
        this.$emit('ok', this.rightDataTableSource);
      }
    },
    watch: {},
    filters: {},
    computed: {}
  }
</script>

<style lang="scss" scoped>

  .transfer-panel {
    position: relative;
    .tp-info {
      position: absolute;
      right: 25px;
      top: 20px;
      line-height: 38px;
      height: 38px;
      z-index: 10;
      font-size: small;
      color: #909399;
    }

  }

  .height {
    height: 480px;
  }

</style>
