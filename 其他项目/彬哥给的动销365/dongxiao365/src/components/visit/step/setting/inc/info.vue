<template>
  <div style="height:450px;overflow:auto;">
    <el-form ref="form" :model="form" :label-position="formPosition" label-width="120px">
      <el-form-item label="步骤名称：">
        {{form.name}}
      </el-form-item>
      <el-form-item label="客户范围：">
        <span v-if="form.notLimitCustomer == true">不限制</span>
        <div v-else="form.notLimitCustomer == false">
          <!--标签展示部分-->
          <div class="tag-list">
            <el-tag :key="tag.id" v-for="(tag,index) in form.customerScopeTags" :class="'tag tag-'+tag.labelColor">
              {{tag.labelName}}
            </el-tag>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="使用人员：">
        <span v-if="form.useUsersRadio === 0">不限制</span>
        <!--使用人员-->
        <div v-else-if="form.useUsersRadio === 1">
          <el-tag v-for="(pp,index) in  form.useUsers"
                  type="info"
                  :key="pp.id">
            {{pp.name}}
          </el-tag>
        </div>
        <!--使用部门-->
        <div v-else-if="form.useUsersRadio === 2">
          <el-tag v-for="(pp,index) in  form.useDepartments"
                  type="info"
                  :key="pp.id">
            {{pp.name}}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item label="添加拜访步骤：">
          <span v-if="form.steps.length===0">无</span>
          <el-table v-if="form.steps.length"
            ref="tableDateSteps"
            :data="form.steps"
            tooltip-effect="dark"
            border
            style="width: 100%;">
            <el-table-column label="步骤列表" prop="name"></el-table-column>
            <el-table-column label="属性" prop="isRequired">
              <template slot-scope="scope">
                <span disabled v-show="scope.row.isRequired">必填</span>
              </template>
            </el-table-column>
            <el-table-column label="属性" prop="isCopyPrev">
              <template slot-scope="scope">
                <span v-show="scope.row.isCopyPrev">复制上一次记录</span>
              </template>
            </el-table-column>
            <el-table-column label="属性" prop="isOnlyOnce">
              <template slot-scope="scope">
                <span v-show="scope.row.isOnlyOnce">仅执行一次</span>
              </template>
            </el-table-column>
          </el-table>
      </el-form-item>
      <el-form-item label="拜访拍照设置：">
        <span v-show="form.takePictureRadio === 0">不限制</span>
        <!-- <span v-show="form.takePictureRadio === 1">抵达和离开不强制拍照</span> -->
        <span v-show="form.takePictureRadio === 2">抵达和离开位置异常时强制拍照</span>
        <span v-show="form.takePictureRadio === 3">抵达和离开强制拍照</span>
      </el-form-item>
      <el-form-item label="流程有效期：">
        <template slot-scope="scope">
            <span v-if="form.validityEnd">
            {{form.validityEnd|date}}
            </span>
            <span v-else>
              无限制
            </span>
        </template>
      </el-form-item>
      <el-form-item label="备注：">
        {{form.remark}}
      </el-form-item>
      <el-form-item label="隐形定位：">
        <template>
          <span v-if="form.autoPosition===true"> 关闭</span>
          <span v-if="form.autoPosition===false">打开</span> 
          <div style="color:#ccc;">注：勾选隐形定位后，进行抵达/离开登记定位失败或与客户距离超出限定范围时将不再弹出提示信息。</div>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: ["id"],
    data() {
      return {
        form: {
          name: '',
          customerScopeRadio: 0, // 客户范围单选值
          customerScopeTags: [], // 客户标签
          useUsersRadio: 0, // 使用范围单选值
          useUsers: [], // 使用人员
          useDepartments: [], // 使用部门
          steps: [], // 步骤列表
          manageScope: [], // 管理范围
          takePictureRadio: 0, // 拍照设置但选址
          validityEnd: '', // 有效期
          remark: '', // 备注
          isMustInput: false, // 必须输入
          autoPosition: false// 隐形定位
        },
        // 部门数据
        departmentCascaderSource: [],
        // 部门级联选择参数格式
        departCaseProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        // 表单定位
        formPosition: 'right'
      };
    },
    created() {
      this.loadInfo();
      this.loadDepartmentSource();
    },
    mounted() {
    },
    methods: {
      // 获取后台info
      loadInfo() {
        this.$http.get('/crm/visit/flow/info', {id: this.id}, r => {
          console.log(r.data)
          // 基础数据
          this.form.name = r.data.name;// 步骤名称
          this.form.notLimitCustomer = r.data.notLimitCustomer;
          this.form.useUsersRadio = r.data.useScope;
          this.form.takePictureRadio = r.data.pictureType;
          this.form.validityEnd = r.data.validityEnd;
          this.form.remark = r.data.remark;
          this.form.isMustInput = r.data.mustInput;
          this.form.autoPosition = r.data.invisiblePositioning;
          this.form.useUsers = r.data.simpleUserVOList;
          this.form.useDepartments = r.data.simpleDeptVOList;
          this.form.steps = r.data.crmVisitStepList;
          this.form.customerScopeTags = r.data.labelList;
        }, e => {
          console.error(e)
        });
        // 异步加载
        // this.asynchronousLoad(this.id);
      },
      // 异步加载后台相关数据
      asynchronousLoad(id) {
        // 请求客户标签
        this.$http.get('', {id: this.id}, r => {
          this.form.customerScopeTags = r.data;
        }, e => {
          console.error(e)
        });
        // 请求使用人员
        this.$http.get('', {id: this.id}, r => {
          this.form.useUsers = r.data;
        }, e => {
          console.error(e)
        });
        // 请求指定部门
        this.$http.get('', {id: this.id}, r => {

          this.form.useDepartments = r.data;
        }, e => {
          console.error(e)
        });
        // 请求拜访步骤列表
        this.$http.get('', {id: this.id}, r => {

          this.form.steps = r.data;
        }, e => {
          console.error(e)
        });

      },
      // 加载部门
      // 加载指定管理范围,单选部门,数据源
      loadDepartmentSource() {
        this.$http.get('/sys/department/tree', null, r => {
          this.departmentCascaderSource = r.data;
        });
      }
    },
    watch: {
      id() {
        this.loadInfo();
      }
    },
    filters: {},
    computed: {}
  }
</script>

<style lang="scss">
  @import "../../../../../assets/css/tag";

  .tag-group {
    margin: 0 -12px;
    border: none;
    box-shadow: none;
  }

  .contact-list + .contact-list {
    margin-top: 5px;
  }
</style>

