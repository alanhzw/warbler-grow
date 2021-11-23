<template>
  <div style="height:400px;overflow:auto;">
    <!--表单-->
    <div v-if="commodity.name != null">
      <el-form
        :inline="true"
        :model="commodity"
        >
        <!-----------基本信息------------->
        <el-row>
          <el-row>
            <el-form-item><span class="title">基本信息</span></el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品编码：">
                <span class="font-color"> {{commodity.code}}</span>
              </el-form-item>
              <el-form-item label="商品名称：">
                <span class="font-color">{{commodity.name}}</span>
              </el-form-item>
              <el-form-item label="助记码：">
                <span class="font-color">{{commodity.mnemonicCode}}</span>
              </el-form-item>
              <el-form-item label="条形码：">
                <span class="font-color">{{commodity.basicBarCode}}</span>
              </el-form-item>
              <el-form-item label="商品类型：">
                <span class="font-color">{{commodity.psiItemCategory.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品牌：">
                <span class="font-color">{{commodity.psiItemBrand.name}}</span>
              </el-form-item>
              <el-form-item label="规格：">
                <span class="font-color">{{commodity.specification}}</span>
              </el-form-item>
              <el-form-item label="排序号：">
                <span class="font-color">{{commodity.orderId}}</span>
              </el-form-item>
              <el-form-item label="商品标签：">
                <span class="font-color">{{commodity.tag}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <hr>
        <!-----------单位信息------------->
        <el-row>
          <el-row>
            <el-form-item><span class="title">单位信息</span></el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="基本单位：">
                <span class="font-color">{{commodity.baseUnitName}}</span>
              </el-form-item>
              <el-form-item label="换算比：">
                <span class="font-color">{{commodity.unitConvertRatio}}</span>
              </el-form-item>
              <el-form-item label="辅助单位：">
                <span class="font-color">{{commodity.auxiliaryUnitName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                是否启用辅助单位：<span class="font-color">{{commodity.enableAuxiliaryUnit | enableAuxiliaryUnit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <hr>
        <!-----------价格设置------------->

        <el-row>
          <el-row>
            <el-form-item><span class="title">价格设置</span></el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="常用单位批发价：">
                <span class="font-color">{{commodity.wholesalePrice | price}}</span>
                &nbsp;元/基本单位
              </el-form-item>
              <el-form-item label="基本单位批发价：">
               <span class="font-color">
                 {{commodity.wholesalePrice | price}}/{{commodity.baseUnitName}}
               </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建议零售价：">
                <span class="font-color">{{commodity.retailPrice | price}}</span>
                &nbsp;元
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <!-----------商品图片------------->
        <hr>
        <el-form-item><span class="title">商品图片</span></el-form-item>
        <div v-if="!commodity.pictures || commodity.pictures.length>0">
          <gallery-inline :data="commodity.pictures"/>
        </div>
        <div v-else>
         没有图片
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

  import GalleryInline from '../../../lib/gallery-inline'

  export default {
    components: {GalleryInline},
    props: ['id'],
    data() {
      return {
        commodity: {
          psiItemCategory: {},
          psiItemBrand: {}
        }// 商品
      }
    },
    created() {
    },
    mounted() {
      this.loadItemInfo();
    },
    methods: {
      // 加载商品详情
      loadItemInfo() {
        this.$http.get('psi/item/details', {id: this.id}, r => {

          this.commodity = r.data;
          if (!this.commodity.psiItemCategory) { this.commodity.psiItemCategory = {}; }
          if (!this.commodity.psiItemBrand) { this.commodity.psiItemBrand = {}; }

          // 设置商品默认图片
          if (this.commodity.pictures) {
            const pictures = JSON.parse(this.commodity.pictures);
            if (!pictures || pictures.length === 0) {
              this.commodity.pictures = [];
            }
          }

        })
      }
    },
    computed: {},
    watch: {
      id: function () {
        this.loadItemInfo();
      }
    },
    filters: {
      enableAuxiliaryUnit: function (val) {
        if (val === true) {
          return '是';
        }
        if (val === false) {
          return '否';
        }
      }

    }

  }
</script>

<style scoped>
  .title {
    font-size: 18px;
    font-weight: bold
  }

  .font-color {
    color: #38adff;
  }
</style>
