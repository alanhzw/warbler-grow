<!--
 * @Descripttion: 企业端-公司主页设置
 * @Author: yang chenglin
 * @Date: 2021-10-12 18:57:14
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-30 20:51:25
-->
<template>
  <div class="company-home-setting-root">
    <div class="white-back-div page-title">编辑公司信息</div>
    <div class="white-back-div info-item-div">
      <div class="info-title">公司基本信息</div>
      <el-form :inline='true'
               label-position='top'
               :model='companyInfo'
               class='demo-form-inline'>
        <el-form-item label='公司logo'>
          <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false">
            <img style="width: 46px; height: 46px" v-if="companyInfo.logoUrl" :src="companyInfo.logoUrl"
              class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <div class=" upload-root">
            <Upload ref='upload'
                    :url="companyInfo.logoUrl"></Upload>
          </div>
        </el-form-item>
        <el-form-item label='公司简称'>
          <el-input maxlength='8'
                    show-word-limit
                    type='text'
                    placeholder='请输入公司简称（最多8个字）'
                    v-model='companyInfo.shortName'></el-input>
        </el-form-item>
        <el-form-item label='公司全称'>
          <el-input maxlength='20'
                    show-word-limit
                    type='text'
                    placeholder='请输入公司全称'
                    v-model='companyInfo.fullName'>
          </el-input>
        </el-form-item>
        <el-form-item label='所在行业'>
          <el-select class='the-element'
                     v-model='companyInfo.industryId'
                     placeholder='请选择所在行业'>
            <el-option v-for='subitem in companyIndustry'
                       :key='subitem.value'
                       :label='subitem.text'
                       :value='subitem.value'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='融资阶段'>
          <el-select v-model='companyInfo.financingStatus'
                     placeholder='请选择融资阶段'>
            <el-option v-for='item in financingList'
                       :key='item.value'
                       :label='item.label'
                       :value='item.value'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='人员规模'>
          <el-select v-model='companyInfo.staffSize'
                     placeholder='请选择人员规模'>
            <el-option v-for='item in staffList'
                       :key='item.value'
                       :label='item.label'
                       :value='item.value'>
            </el-option>
          </el-select>
        </el-form-item>
        <div class='content-btn'>
          <el-button type='danger'
                     @click="editCompanyInfoPicFun">确认</el-button>
          <el-button plain
                     @click="dialogVisible = true">取消</el-button>
        </div>
      </el-form>
    </div>
    <div class="white-back-div info-item-div advantage-div">
      <div class="info-title">公司介绍</div>
      <el-input maxlength='140'
                show-word-limit
                type='textarea'
                :rows='4'
                v-model='companyInfo.companyIntroduce'
                placeholder='请简单介绍一下公司的发展情况、服务领域、主要产品等信息'></el-input>
      <div class='content-btn'>
        <el-button type='danger'
                   @click="editCompanyInfoFun">确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </div>
    </div>
    <div class="white-back-div info-item-div">
      <div class="info-title">公司福利</div>
      <div class="welfare-list-div">
        <div v-for="item in companyWelfare"
             :key="item"
             :class='companyInfo.companyWelfareList.indexOf(item) > -1 ? "welfare-div active" : "welfare-div"'
             @click="setCorporateWelfare(item)">{{item}}</div>
      </div>
      <div class='content-btn'>
        <el-button type='danger'
                   @click="editCompanyWelfareFun">确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </div>
    </div>
    <div class="white-back-div info-item-div environment-div">
      <div class="info-title">公司环境</div>
      <div style="display: flex">
        <div class="environment-list">
          <div class="environment-item"
               v-for="(pic, index) in companyInfo.companyEnvPicList"
               :key="index">
            <img :src="pic"
                 alt="">
            <div class="delete-item"
                 @click="companyInfo.companyEnvPicList.splice(index, 1)">删除</div>
          </div>
        </div>
        <el-upload class="upload-module"
                   action="https://ired-resource.api.zhuhuakeji.com/irededu/iredtalents/pc/imageUpload"
                   list-type="picture-card"
                   :show-file-list="false"
                   name="image"
                   :limit="3"
                   :headers="{
                      'X-Access-Token': token,
                    }"
                   :before-upload="beforeAvatarUpload"
                   :on-preview=" handleUploadChange"
                   :on-remove="handleRemove"
                   :on-success="handleAvatarSuccess">
          <div class="upload-module-wd">
            <div class="top-wd">
              <img src="@/assets/add-item.png"
                   alt="">
              <div class="wd-operation">添加公司照片</div>
            </div>
            <div class="wd-desc">图片大小不超过4M</div>
          </div>
        </el-upload>
      </div>
      <div class='content-btn'>
        <el-button type='danger'
                   @click="addCompanyPicFun">确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </div>
    </div>
    <div class="white-back-div info-item-div advantage-div">
      <div class="info-title">公司地址</div>
      <!-- <el-cascader class='the-element' placeholder='请选择' :options="regionData" :props="{ label: 'label' }"
        v-model='companyInfo.expectAddress'>
        <template #default="{ data }">
          <span>{{ data.label }}</span>
        </template>
      </el-cascader> -->
      <el-input placeholder='请输入公司地址'
                id="input-amap"
                v-model="companyInfo.companyAddr" />
      <div>
        <div id='input-amap-info'></div>
      </div>
      <div class="amap-page-container">
        <div id="container-amap"></div>
      </div>
      <div class='content-btn'>
        <el-button type='danger'
                   @click="editCompanyInfoFun">确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </div>
    </div>
    <el-dialog v-model="dialogVisible"
               :before-close="() => dialogVisible = false">
      <div style="text-align: center; margin-bottom: 20px">是否确认清空当前所有未保存的编辑？</div>
      <div style="text-align: center">
        <el-button type='danger'
                   @click="() => {getCompanyInfo;dialogVisible = false}">是</el-button>
        <el-button plain
                   @click="dialogVisible = false">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
// import AMap from '@amap/amap-jsapi-loader';
import {
  reactive, ref, watch, onMounted, computed,
} from 'vue';
import { ElMessage } from 'element-plus';
import { getAmap } from '@/utils/map';
// import useRegionData from './hooks/useRegionData';
import useCompanyIndustry from './hooks/useCompanyIndustry';
import useCompanyWelfare from './hooks/useCompanyWelfare';
import useCompanyInfo from './hooks/useCompanyInfo';
import useCompanyPic from './hooks/useCompanyPic';
import Upload from '@/components/Upload/Upload.vue';

const upload = ref(null);
const { addCompanyPic } = useCompanyPic();
// 地区
// const { regionData, getRegionData } = useRegionData();
// getRegionData();
// 行业
const { companyIndustry, getCompanyIndustry } = useCompanyIndustry();
getCompanyIndustry();
// 公司福利标签
const { companyWelfare, getWelfareTag, editCompanyWelfare } = useCompanyWelfare();
getWelfareTag();

// 清空内容弹窗
const dialogVisible = ref(false);

// 公司首页信息
const { companyInfo, getCompanyInfo, editCompanyInfo } = useCompanyInfo();

// 编辑公司信息（logo模块）
const editCompanyInfoPicFun = async () => {
  companyInfo.value.logoUrl = upload.value.imageUrl || companyInfo.value.logoUrl;
  await editCompanyInfo(companyInfo.value);
  await getCompanyInfo();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};
// 编辑公司信息（普通模块）
const editCompanyInfoFun = async () => {
  await editCompanyInfo(companyInfo.value);
  await getCompanyInfo();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};
// 添加公司图片
const addCompanyPicFun = async () => {
  await addCompanyPic({ picUrlList: companyInfo.value.companyEnvPicList.map((i: any) => ({ picUrl: i })) });
  await getCompanyInfo();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};
// 编辑公司福利标签
const editCompanyWelfareFun = async () => {
  await editCompanyWelfare({
    tagNameList: companyInfo.value.companyWelfareList.map((item) => ({
      tagName: item,
      tagValue: item,
    })),
  });
  await getCompanyInfo();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};

// 融资阶段
const financingList = ref([
  {
    id: 1,
    label: '未融资',
    value: '1',
  },
  {
    id: 2,
    label: '天使轮',
    value: '2',
  },
  {
    id: 3,
    label: 'A轮',
    value: '3',
  },
  {
    id: 4,
    label: 'B轮',
    value: '4',
  },
  {
    id: 5,
    label: 'C轮',
    value: '5',
  },
  {
    id: 6,
    label: 'D轮及以上',
    value: '6',
  },
]);
// 人员规模
const staffList = ref([
  {
    id: 1,
    label: '0-20人',
    value: '1',
  }, {
    id: 2,
    label: '20-99人',
    value: '2',
  }, {
    id: 3,
    label: '100-499人',
    value: '3',
  },
  {
    id: 4,
    label: '500-999人',
    value: '4',
  }, {
    id: 5,
    label: '1000-9999人',
    value: '5',
  },
  {
    id: 6,
    label: '10000人以上',
    value: '6',
  },
]);

// 上传公司图片
const handleUploadChange = () => {
};
const handleRemove = (file, fileList) => {
  console.log(file, fileList);
};
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isLt4M = file.size / 1024 / 1024 < 4;

  if (!isJPG && !isPNG) {
    ElMessage({
      message: '图片格式不符！请上传jpg或png图片',
      type: 'success',
    });
    return false;
  }
  if (!isLt4M) {
    ElMessage({
      message: '图片大小不得超过4M！',
      type: 'warning',
    });
    return false;
  }
  if (companyInfo.value.companyEnvPicList.length > 2) {
    ElMessage({
      message: '上传图片最多不超过3张！',
      type: 'warning',
    });
    return false;
  }
  return true;
};
const imageUrl = ref('');
const token = computed(() => sessionStorage.getItem('IRED_TOKEN'));
const handleAvatarSuccess = (res: any, file: any) => {
  companyInfo.value.companyEnvPicList.push(res.result);
};
// 存储公司图片列表
// const uploadFileList = ref([

// ]);

// 设置公司福利
const setCorporateWelfare = (value:any) => {
  const index = companyInfo.value.companyWelfareList.indexOf(value);
  if (index > -1) {
    companyInfo.value.companyWelfareList.splice(index, 1);
  } else {
    companyInfo.value.companyWelfareList.push(value);
  }
};

/**
 * 地图定位相关
 */
// 绘制地图
let AMAP: any = null;
onMounted(async () => {
  // 获取公司信息
  await getCompanyInfo();
  // 绘制地图
  AMAP = await getAmap();
  const map = new AMAP.Map('container-amap', {
    resizeEnable: true,
    zoom: 11,
    // address: '大连市',
    lng: companyInfo.value.longitude,
    lat: companyInfo.value.latitude,
    lnglat: [companyInfo.longitude, companyInfo.latitude],
  });

  // 给当前搜索的地理位置标记
  const centerDefault = new AMAP.LngLat(companyInfo.value.longitude, companyInfo.value.latitude);
  const markerDefault = new AMAP.Marker({
    position: centerDefault, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
  });
  map?.setCenter(centerDefault);
  map?.add(markerDefault);

  // 搜索定位能力
  const autoOptions = {
    input: 'input-amap',
  };
  const auto = new AMAP.Autocomplete(autoOptions);

  const select = async (e) => {
    // 给当前搜索的地理位置标记
    const center = new AMAP.LngLat(e.poi.location.lng, e.poi.location.lat);
    const marker = new AMAP.Marker({
      position: center, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    });

    // 移除上一个marker
    map?.remove(markerDefault);

    map?.setCenter(center);
    map?.add(marker);
    companyInfo.value.companyAddr = e.poi.name;
    companyInfo.value.longitude = e.poi.location.lng;
    companyInfo.value.latitude = e.poi.location.lat;
  };
  AMAP.event.addListener(auto, 'select', select); // 注册监听，当选中某条记录时会触发
});

</script>

<style lang="scss">
$BLACK: #222222;
$WHITE: #FFFFFF;
$GRAY: #656565;
$RED: #ED263D;
$BACK: #f8f8f8;

.company-home-setting-root {
  color: #222;
  font-family: PingFang SC-Regular, PingFang SC;
  .white-back-div {
    padding: 30px;
    background: $WHITE;
  }
  .page-title {
    border: 1px solid #E8E8E8;
    font-size: 24px;
    font-weight: 400;
  }
  .info-item-div {
    margin-bottom: 30px;
    .info-title {
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: $RED;
    }

    .upload-root {
      .upload-hr-manager {
        .no-img {
          background: #f8f8f8;
        }
      }
    }

    // 公共的组件库样式复写
    .el-form--inline.el-form--label-top {
      .el-form-item {
        width: calc(50% - 10px);
        .el-form-item__label {
          padding-bottom: 0;
          color: $GRAY !important;
          font-size: 14px;
          font-weight: 600;
        }
        .avatar-uploader {
          width: 46px;
          height: 46px;
          background: #F8F8F8;
          .el-upload {
            width: 100%;
            height: 100%;
            // border: 1px dashed #d9d9d9;
            i {
              line-height: 46px;
            }
          }
        }
        .el-input {
          .el-input__inner {
            height: 46px;
            background: $BACK;

            border: none;
            &:focus {
              border-color: $RED;
            }
          }
          .el-input__count .el-input__count-inner {
            background: $BACK;
          }
        }
        .el-select {
          width: 100%;
          .el-input__inner {
            height: 46px;
            background: $WHITE;
            border: 1px solid #f8f8f8;
          }
        }
      }
    }

    .welfare-list-div {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
      .welfare-div {
        width: 100px;
        height: 38px;
        margin: 20px 30px 0 0;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
        background: $WHITE;
        box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.1);
        &.active {
          background: $RED;
          color: $WHITE;
        }
      }
    }

    .content-btn {
      width: calc(100% - 10px);
      text-align: right;
      .el-button {
        width: 120px;
        border-radius: 0;
        &.el-button--danger {
          background: $RED;
        }
      }
    }

    &.advantage-div {
      .el-textarea {
        width: calc(100% - 10px) !important;
        margin: 20px 0 30px 0;
        .el-textarea__inner {
          border: none;
          background: $BACK;
          &:focus {
            border-color: $RED;
          }
        }
        .el-textarea__count .el-textarea__count-inner {
          background: $BACK;
        }
        .el-input__count {
          background: $BACK;
        }
      }
      .el-input {
        width: 555px !important;
        margin: 20px 0 30px 0;
        .el-input__inner {
          background: $BACK;
          &:focus {
            border-color: $RED;
          }
        }
        .el-input__count .el-input__count-inner {
          background: $BACK;
        }
      }
    }

    &.environment-div {
      .info-title {
        margin-bottom: 20px;
      }
      .environment-list {
        display: flex;
        .environment-item {
          width: 140px;
          height: 90px;
          margin-right: 20px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .delete-item {
            width: 140px;
            height: 26px;
            position: absolute;
            left: 0;
            bottom: 0;
            text-align: center;
            line-height: 26px;
            background: #000000;
            opacity: 0.5;
            font-size: 14px;
            font-family: PingFang SC-Bold, PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
            cursor: pointer;
            display: none;
          }
          &:hover {
            .delete-item {
              display: block;
            }
          }
        }
      }
      .upload-module {
        box-sizing: border-box;
        .el-upload--picture-card {
          width: 160px;
          height: 90px;
          padding: 25px 20px;
          font-size: 12px;
          line-height: 18px;
          &:hover, &:focus {
            color: $BLACK;
            border-color: $BLACK;
          }
        }
        .upload-module-wd {
          .top-wd {
            display: flex;
            align-items: center;
            justify-content: center;
            .wd-operation {
              &:hover, &:focus {
                text-decoration: underline;
              }
            }
          }
          .wd-desc {
            color: $GRAY;
            &:hover, &:focus {
              color: $GRAY;
            }
          }
        }
        .el-upload-list__item-thumbnail, .el-upload-list__item {
          height: 90px;
        }
      }
    }
    #input-amap {
      border: none;
    }
  }

  #container-amap {
    width: calc(100% - 10px);
    height: 120px;
    margin-bottom: 30px;
  }
}
</style>
