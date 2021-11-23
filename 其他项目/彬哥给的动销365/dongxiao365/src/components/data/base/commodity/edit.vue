<template>
  <div>
    <breadcrumb/>
    <!--表单-->
    <div>
      <el-form
        :inline="true"
        :model="commodity"
        ref="form"
        :rules="rules">
        <el-form-item><span class="title">基本信息</span></el-form-item>
        <el-row>
          <el-form-item label="编码：" prop="code">
            <el-input v-model="commodity.code" placeholder="商品编码" suffix-icon="el-" clearable :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="名称：" prop="name">
            <el-input v-model="commodity.name" placeholder="商品名称" suffix-icon="el-" clearable :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="助记码：" prop="mnemonicCode">
            <el-input v-model="commodity.mnemonicCode" placeholder="助记码" clearable :maxlength="20"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="类型：" prop="type">
            <el-cascader
              :options="cascadeTypeSource"
              v-model="commodity.type"
              :show-all-levels="false"
              :change-on-select="true"
              :props="defaultPropsCascade"
              @change="handleCascadeChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="品牌：" prop="brandId">
            <el-select v-model="commodity.brandId" filterable placeholder="请选择(可快捷搜索)">
              <el-option
                v-for="item in brandSource"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序号：" prop="orderId">
            <el-number v-model.number="commodity.orderId" placeholder="排序号" clearable :maxlength="4"></el-number>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="规格：" prop="specification">
            <el-input v-model="commodity.specification" placeholder="规格" suffix-icon="el-" clearable :maxlength="15"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="商品标签：" prop="tag">
            <el-radio-group v-model="commodity.tag">
              <el-radio-button label="新品"></el-radio-button>
              <el-radio-button label="重点"></el-radio-button>
              <el-radio-button label="赠品"></el-radio-button>
              <el-radio-button label="促销"></el-radio-button>
              <el-radio-button label="热卖"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <hr>
        <el-row>
          <el-form-item><span class="title">单位信息</span></el-form-item>
          <el-form-item>
            <el-checkbox v-model="commodity.enableAuxiliaryUnit">启用辅助单位</el-checkbox>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="基本单位：" prop="basicUnitId">
            <el-select v-model="commodity.basicUnitId" placeholder="基本单位" @change="selectBaseUnit">
              <el-option
                v-for="item in units"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="盒条形码：" prop="basicBarCode">
            <el-number v-model.number="commodity.basicBarCode" placeholder="盒条形码" clearable :maxlength="16"></el-number>
          </el-form-item>
        </el-row>
        <el-row v-if="commodity.enableAuxiliaryUnit">
          <el-form-item label="辅助单位：">
            <unit v-model="commodity.auxiliaryUnitId"  @change="selectAssistUnit" showAll></unit>
          </el-form-item>
          <el-form-item label="换算比：" prop="unitConvertRatio">
            <el-row>
              <el-col :span="4"><span>1{{showBaseUnitOnPageName1}} =</span></el-col>
              <el-col :span="8">
                <el-number v-model.number="commodity.unitConvertRatio" placeholder="数量" clearable :maxlength="5"></el-number>
              </el-col>
              <el-col :span="8">&nbsp;{{showBaseUnitOnPageName}}</el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <hr>
        <el-row>
          <el-form-item><span class="title">价格设置</span></el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="常用单位批发价：" prop="wholesalePrice">
            <el-row>
              <el-col :span="12">
                <el-number v-model.number="commodity.wholesalePrice" placeholder="批发价格" align="right" clearable :maxlength="10"></el-number>
              </el-col>
              <el-col :span="12">&nbsp;元/基本单位</el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="建议零售价：" prop="retailPrice">
            <el-row>
              <el-col :span="12">
                <el-number v-model.number="commodity.retailPrice" placeholder="建议零售价" align="right" clearable :maxlength="10"></el-number>
              </el-col>
              <el-col :span="12">&nbsp;元</el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <hr>
        <el-row>
          <el-form-item><span class="title">商品图片</span></el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="logo" label-width="0px">
            <image-upload v-model="commodity.pictures" :max="10"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-button @click="returnBack">返回</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import ImageUpload from '../../../lib/image-upload/index'
  import Unit from '../../../lib/item-unit'

  export default {
    components: {
      ImageUpload, Unit
    },
    data() {
      return {
        commodity: {// 商品
          isAssistUnit: false, // 是否启用辅助单位
          pictures: []// 上传照片的地址集合
        },
        brandSource: [], // 商品品牌
        cascadeTypeSource: [], // 商品类型数据
        defaultPropsCascade: {
          value: "id",
          label: "name"
        },
        units: [], // 页面的单位
        showBaseUnitOnPageName: '', // 在页面展示用的数据
        // 表单验证
        rules: {
          // 编码
          code: [
            {required: true, max: 15, message: '请输入编码,长度在1-15个字符间', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择类型', trigger: 'blur'}
          ],
          brandId: [
            {required: true, message: '请选择品牌', trigger: 'blur'}
          ],
          // 商品名称
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {max: 20, message: '长度在1-20个字符间', trigger: 'blur'}
          ],
          // 商品规格
          specification: [
            {required: true, max: 15, message: '长度在1-15个字符间', trigger: 'blur'}
          ],
          // 基本单位
          basicUnitId: [
            {required: true, message: '请选择基本单位', trigger: 'blur'}
          ],
          // 常用批发价
          wholesalePrice: [
            {required: true, message: '请输入常用批发价', trigger: 'blur'},
            {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
          ],
          // 建议零售价
          retailPrice: [
            {required: true, message: '请输入建议零售价', trigger: 'blur'},
            {type: 'number', message: '请输入数字', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.loadCasderData();
      this.loadBrandData();
      this.loadItemInfo(this.$route.query.id);
      this.loadUnitData();
    },
    mounted() {
      this.loadUnitData();
    },
    methods: {
      // 加载商品详情
      loadItemInfo(val) {
        this.$http.get('psi/item/details', {id: val}, r => {
          this.commodity = r.data;
          // 价格转换
          this.commodity.wholesalePrice = r.data.wholesalePrice / 100;
          this.commodity.retailPrice = r.data.retailPrice / 100;
          const categoryList = r.data.categoryList.toLongArray();
          this.commodity.type = categoryList;
          this.commodity.categoryList = categoryList;
        })
      },
      // 加载商品单位数据
      loadUnitData() {
        // 这里获取的是所有品牌的列表,没有分页
        this.$http.get('psi/item/unit/all', null, r => {
          this.units = r.data;
          setTimeout(() => {
            this.initUnit(this.commodity.basicUnitId);
          }, 500)
        })
      },
      // 加载商品类型数据
      loadCasderData() {
        this.$http.get('psi/item/type/list', null, r => {
          this.cascadeTypeSource = r.data;
        })
      },
      // 加载商品品牌数据
      loadBrandData() {
        // 这里获取的是所有品牌的列表,没有分页
        this.$http.get('psi/item/brand/all', null, r => {
          this.brandSource = r.data;
        })
      },
      // 返回上一页
      returnBack() {
        this.$router.back();
      },
      // 提交事件
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('psi/item/edit', this.commodity, r => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.$router.back();
            })
          }
        })
      },
      // 商品类型级联事件
      handleCascadeChange(value) {
        if (value.length) {
          this.commodity.categoryId = value[value.length - 1];
          this.commodity.categoryList = value;
        }
      },
      // 基本单位下拉选事件
      selectBaseUnit(val) {      
        if (this.units) {
          this.units.forEach(value => {
            if (value.id === val) {
              this.showBaseUnitOnPageName = value.name;
            }
          })
        }
      },
       // 辅助单位下拉选事件
      selectAssistUnit(val) {
        this.showBaseUnitOnPageName1 =  val
      },
      // 处理页面展示辅助单位基本单位换算初始化
      initUnit(val) {
        if (this.units) {
          this.units.forEach(value => {
            if (value.id === val) {
              this.showBaseUnitOnPageName = value.name;
            }
          })
        }
      }
    },
    computed: {
      stringData: function () {
        return JSON.stringify(this.commodity, null, ' ');
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 18px;
    font-weight: bold
  }
</style>
