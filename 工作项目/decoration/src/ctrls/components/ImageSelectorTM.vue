<template>
  <div class="image-selector-tm"
       v-loading="vLoading">
    <!-- 左半部分 -->
    <div class="left-part">
      <!-- 新建分类按钮 -->
      <lz-button plain
                 @click='addSortDialog = true'
                 :disabled='isCanAddSort'
                 class="add-sort"
                 size="small">+ 新建分类</lz-button>
      <!-- 树形结构 -->
      <div class="tree-box">
        <lz-tree :data="treeData"
                 :props="defaultProps"
                 accordion
                 ref="tree"
                 lazy
                 :highlight-current='true'
                 :load='treeLoad'
                 node-key="cateId"
                 :default-expanded-keys='defaultOpen'
                 :expand-on-click-node='true'
                 @node-click="handleNodeClick"></lz-tree>
      </div>
    </div>
    <!-- 右半部分 -->
    <div class="right-part">

      <!-- 上半部分 -->
      <div class='firt-part'>
        <!-- 管理和刷新按钮 -->
        <div>
          <a style="margin-left:20px;cursor: pointer;"
             href="https://sucai.wangpu.taobao.com/">管理图片空间</a>
          &nbsp;&nbsp;
          <a @click='refresh'
             style="cursor: pointer;">刷新<i class="lz-icon-refresh"></i></a>
        </div>
        <!-- 上传按钮 -->
        <lz-upload style="float: right; margin-right: 10px;"
                   :action="uploadUrl"
                   name="cmfFile"
                   :multiple="false"
                   :show-file-list="false"
                   :headers="{
          'Authorization': token,
          'Prod': 'crm'
        }"
                   :data="uploadData"
                   :before-upload="beforeUpload"
                   :on-success="uploadSuccess">
          <lz-button size="small"
                     type="primary">上传图片</lz-button>
        </lz-upload>
      </div>

      <!-- 下半部分 -->
      <div class="image-list">
        <!-- 查询部分 -->
        <span>所在位置：{{nowPath}}</span>
        <div class="second-part">
          <div class="se-left-part">
            <lz-input v-model="searchContent"
                      class="search-contnt"
                      placeholder="请输入图片名称"></lz-input>
            <lz-button type="primary"
                       size="small"
                       @click='queryImgByTitle()'>查询</lz-button>
            <lz-button size="small"
                       @click='searchContent = "" '>重置</lz-button>

          </div>
          <div class="se-right-part">
            <lz-select v-model="searchType"
                       size='small'
                       @change='queryImgBytype'
                       placeholder="请选择">
              <lz-option v-for="item in searchTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </lz-option>
            </lz-select>
          </div>
        </div>

        <!-- 图片列表 -->
        <div id='img-Content'
             ref='imgContent'>
          <div v-if='images.length > 0'
               class="image-list-content">
            <div v-for="image in images"
                 :key="`jd-image-${image.picturePath}`">
              <div class="image-item"
                   :class="{'is-border':image.pictureId === currentPictureId}"
                   @click="selectImg(image)"
                   :style="{backgroundImage: `url(${image.picturePath})`}">
                <p class="image-size">{{image.pictureWidth}}✕{{image.pictureHeight}}</p>
              </div>
              <p class="image-name"
                 :title="image.pictureName">{{image.pictureName}}</p>
            </div>
          </div>
          <div v-else
               class="no-img">{{errorText}}</div>
        </div>

      </div>

      <!-- 底部按钮 -->
      <div class="button-bottom">

        <lz-button size="small"
                   style="width:80px"
                   @click='closeDialog'>取 消</lz-button>
        <lz-button type="primary"
                   style="width:80px"
                   size="small"
                   @click='submit'>提 交</lz-button>
      </div>

    </div>

    <!-- 新建分类弹窗 -->
    <lz-dialog title="新建分类"
               class="add-sort-dialog"
               :visible.sync="addSortDialog"
               :append-to-body="true"
               width="500px">
      <lz-form ref="form-add"
               :model="addSortForm"
               label-width="90px">
        <lz-form-item label="父级分类：">
          <span>{{faterName}}</span>
        </lz-form-item>
        <lz-form-item label="分类名称：">
          <lz-input v-model="addSortForm.name"></lz-input>
        </lz-form-item>
      </lz-form>
      <span slot="footer"
            class="dialog-footer">

        <lz-button @click="handleClose">关 闭</lz-button>
        <lz-button type="primary"
                   @click="confirmHandler">提 交</lz-button>
      </span>
    </lz-dialog>

  </div>
</template>

<script>
import Service from '@/business/service';
import { LzMsg } from '@/utils/UI';
import CONST from '@/utils/constant';


export default {
  name: 'ImageSelectorTM',
  data() {
    return {
      CONST, // 上传图片用的
      token: localStorage.getItem(CONST.LZ_SSO_TOKEN), // 上传图片用的
      uploadUrl: `${process.env.VUE_APP_DECO_BASEURL}/uploadImageNew`, // '/decoration/api/b/uploadImageNew', // 图片上传的服务器地址
      images: [], // 存放图片列表
      parentId: '0', // 父类id  用于查询树形结构
      addSortDialog: false, // 控制是否显示添加分类弹窗
      addSortForm: {// 添加分类的表单
        fater: '', // 父级目录
        name: '', // 分类名称
      },
      nowClickNode: '', // 当前点击的节点
      faterName: '图片空间', // 父级的名称
      nowPathArr: [], // 存放路径的数组
      nowPath: '', // 最终的路径
      searchContent: '', // 查询图片的内容
      treeData: [], // tree组件根数据
      searchTypeOptions: [{// 查询类型备选数组
        value: 'time:desc',
        label: '最新上传在前',
      }, {
        value: 'time:asc',
        label: '最新上传在后',
      }],
      searchType: 'time:desc', // 查询类型绑定值
      defaultProps: { // 给tree组件传入的配置
        children: 'children',
        label: 'cateName',
        isLeaf: 'isOwn',
      },
      rootNode: '', // 根节点
      ownNode: '', // 云鹿节点本身
      ownNodeData: '', // 云鹿节点数据
      ownNodeId: '', // 云鹿节点ID
      errorText: '暂无图片', // 文字提示
      defaultOpen: ['0'], // 默认打开的节点
      pictureCategoryId: '', // 上传图片的分类id
      uploadData: {// 上传图片的数据
        pictureCategoryId: '', // 当前分类id
      },
      currentPictureId: '', // 当前选中的图片id,用来显示红色边框
      pageInfo: {// 页面信息
        pageNo: 1,
        pageSize: 40,
      },
      isLoadImg: false, // 是否正在加载图片列表
      isLastPage: false, // 是否最后一页数据
      selectedImg: '', // 选中的图片
      vLoading: false, // 用于loading动画
    };
  },
  props: {
    // 图片提交之后的验证
    validator: {
      default: () => () => Promise.resolve(),
    },
  },
  mounted() {
    // 获取根节点
    this.getRootNode();
    // 监听图片列表的滚动事件
    this.listenScroll();
  },
  computed: {
    // 是否可以新建分类
    isCanAddSort() {
      // 如果是云鹿的文件夹并且超过第二级,不可以新建
      if (this.nowClickNode.level > 2 && this.nowClickNode.data.cateId === this.ownNodeId) {
        return true;
        // 其他文件夹超过三级,不可以新建
      } else if (this.nowClickNode.level > 2 && this.nowClickNode.parent.data.cateId === this.ownNodeId) {
        return true;
      } else if (this.nowClickNode.level > 3) {
        return true;
      }
      return false;
    },
  },
  methods: {
    // 监听图片列表的滚动事件
    listenScroll() {
      // 获取图片列表的dom
      const imgContent = this.$refs.imgContent;
      // 给dom添加滚动事件的监听器
      imgContent.addEventListener('scroll', () => {
        // 计算底部高度
        const bottom = imgContent.scrollHeight - imgContent.clientHeight - imgContent.scrollTop;
        // 如果到底了就调取借口加载下一页的图片
        if (bottom <= 200) {
          this.getImagesMore(this.nowClickNode.data.cateId, '', this.searchType);
        }
      });
    },
    // 获取根节点
    getRootNode() {
      this.rootNode = this.$refs.tree.getNode('0');
    },
    // 点击了取消按钮
    closeDialog() {
      // 关闭当前弹窗
      this.$parent.$parent.uploadBoxShowed = false;
    },
    // 刷新
    refresh() {
      // 通过节点id找到对应树节点对象
      const node = this.$refs.tree.getNode(this.ownNodeId);
      // 把loaded手动置为false,也就是告诉tree这个节点没有加载过
      node.loaded = false;
      // 主动调用展开节点方法，重新查询该节点下的所有子节点
      node.expand();
      // 模拟一次点击,展开该节点
      this.$nextTick().then(() => {
        // 选取dom
        const root = document.querySelector('.lz-tree-node__children');
        // 找到目标节点
        const firstNode = root.firstChild;

        // 页面滚动到顶部
        document.querySelector('.tree-box').scrollTop = 0;

        // console.log('🚀🚀~ ocument.q', document.querySelector('.tree-box'));
        // 模拟点击
        firstNode.click();
      });
    },
    // 加载树形结构
    treeLoad(node, resolve) {
      // 判断节点等级
      if (node.level == 0) {
        // 如果是根节点,添加一个固定的图片空间节点
        resolve([{
          cateName: '图片空间',
          cateId: '0',
          children: [],
        }]);
      }
      // 不是根节点,调取接口加载列表
      if (node.level >= 1) {
        this.getCategoryListNew(node, resolve);
        // 防止子节点为空时一直出现加载动画
        return resolve([]);
      }
    },
    // 点击节点的时候触发事件
    handleNodeClick(nodes, node, self) {
      console.log('🚀🚀~ node:', node);
      // 获取当前点击节点的cateId
      this.parentId = node.data.cateId;
      // 获取当前点击节点的节点对象
      this.nowClickNode = node;
      // 当前点击的路径数组重置为[]
      this.nowPathArr = [];
      // 如果是根节点
      if (!node.parent.parent) {
        // 当前路径置为'图片空间'
        this.nowPath = '图片空间';
      } else {
        // 如果不是根节点 调用查找路径的方法
        this.findParentName(node);
        // 拼接当前路径
        this.nowPath = `图片空间 / ${this.nowPathArr.join(' / ')}`;
      }
      // 上传图片的父级分类Id 赋值为当前点击的节点的id
      // 只有点击了某个节点,才可以上传图片,默认是云鹿默认的目录
      this.uploadData.pictureCategoryId = this.nowClickNode.data.cateId;
      // 父级目录的名称赋值为当前点击节点的名称
      this.faterName = node.data.cateName;
      // 点击的时候为首次加载图片列表
      this.getImages(node.data.cateId, '', '');
      // 重置当前选择的图片
      this.currentPictureId = '';
    },
    // 添加节点
    addSort() {
      this.vLoading = true;
      // 获取根节点
      const node = this.$refs.tree.getNode('0');
      // 如果没有点击过任何节点
      if (!this.nowClickNode) {
        // 就赋值为根节点
        this.nowClickNode = node;
      }
      // 调用添加节点接口
      Service.createPicCata({
        parentId: this.nowClickNode.data.cateId,
        currentDirName: this.addSortForm.name,
      })
        .then(({ data }) => {
          // 定义添加的节点数据 要在接口返回成功的时候添加,这样才会有id
          const sortdata = {
            cateName: this.addSortForm.name,
            cateId: data.pictureCategoryId,
            children: [],
          };
          // 添加节点
          this.$refs.tree.append(sortdata, this.nowClickNode.data.cateId);
          // this.refresh();

          // 关闭弹窗
          this.addSortDialog = false;
          // 重置添加节点的表单
          this.addSortForm = {// 添加分类的表单
            fater: '', // 父级目录
            name: '', // 分类名称
          };
          this.vLoading = false;
        })
        .catch((e) => {
          this.vLoading = false;
          console.log(e);
          LzMsg.error(e.message || '新建分类失败');
        });
    },
    // 查找父节点的分类名称
    findParentName(node) {
      // 证明是根节点
      if (!node.parent.parent) {
        //
      // 不是根节点
      } else {
        // 向数组中添加父类节点的名称
        this.nowPathArr.unshift(node.data.cateName);
        // 递归调用自身进行查找
        this.findParentName(node.parent);
      }
    },
    // 关闭添加分类的弹窗
    handleClose() {
      // 关闭弹窗
      this.addSortDialog = false;
      // 重置表单
      this.addSortForm = {// 添加分类的表单
        fater: '', // 父级目录
        name: '', // 分类名称
      };
    },
    // 添加分类提交
    confirmHandler() {
      // 点击提交的时候调用添加接口
      this.addSort();
    },

    // 上传图片前的验证
    beforeUpload(file) {
      if (file.size > 1000 * 1024) {
        LzMsg.error('图片大小超过1M');
        return false;
      } else if (['png', 'jpeg', 'jpg', 'gif', 'image/jpeg', 'image/png', 'image/jpg', 'image/gif'].indexOf(file.type) === -1) {
        LzMsg.error('请使用jpg、png或者gif格式的文件');
        return false;
      }
      return true;
    },
    // 上传成功的回调函数
    uploadSuccess(response) {
      // 重新获取列表
      this.getImages(this.nowClickNode.data.cateId, '');
      // 当前选中的id定义为新上传的id  用于显示红色边框
      this.currentPictureId = response.data.pictureId;
    },
    // 获取树形结构
    getCategoryListNew(node, resolve) {
      this.vLoading = true;

      Service.getCategoryListNew({ parentId: node.data.cateId }).then(({ data }) => {
        // 获取节点
        const node = this.$refs.tree.getNode(this.parentId);
        // 循环节点内容
        data.forEach((item, index) => {
          // 清除空格 数据是带有空格的 前端不用显示
          item.cateName = item.cateName.trim();
          // 判断是否是云鹿默认文件夹
          if (item.isOwn && item.isOwn === 1) {
            // 把这个文件夹放在最前面
            data.splice(index, 1);
            data.splice(0, 0, item);
            // 初始化数据
            this.ownNodeData = item;// 数据对象
            this.ownNodeId = item.cateId;// 节点id
            this.ownNode = this.$refs.tree.getNode(item.cateId);// 节点

            this.$nextTick().then(() => {
              // 获取dom
              const root = document.querySelector('.lz-tree-node__children');
              // 获取目标dom
              const firstNode = root.firstChild;
              // 模拟点击
              firstNode.click();
            });
          }
        });
        // 判断是否已经有子节点 如果已经有了就不进行操作
        if (node.childNodes.length > 0) {
          //
        } else {
          // 渲染数据
          resolve(data);
        }
        this.vLoading = false;
      }).catch((e) => {
        this.vLoading = false;

        console.log(e);
        LzMsg.error(e.message || '获取图片空间分类列表失败');
      });
    },
    // 通过名称查询图片
    queryImgByTitle() {
      // 如果为空 提示
      if (!this.searchContent) {
        LzMsg.error('请输入查询内容');
        return;
      }
      let cateId;
      // 如果当前点击了 就从这个目录查
      if (this.nowClickNode) {
        cateId = this.nowClickNode.data.cateId;
      } else {
        // 否则就从根目录查
        cateId = this.rootNode.data.cateId;
      }
      // 调取查询图片接口
      this.getImages(cateId, this.searchContent, '');
    },

    // 通过类型查询图片
    queryImgBytype(type) {
      let cateId;
      if (this.nowClickNode) {
        cateId = this.nowClickNode.data.cateId;
      } else {
        cateId = this.rootNode.data.cateId;
      }
      this.getImages(cateId, '', type);
    },
    // 初次获取图片列表
    getImages(cateId, title, orderBy = 'time:desc') {
      this.vLoading = true;

      Service.queryPictureNew({
        currentPage: 1,
        pageSize: 40,
        pictureCategoryId: cateId,
        title,
        orderBy,
      })
        .then(({ data, page }) => {
          // 如果没有数据 说明是最后一页了
          if (data.length == 0) {
            this.isLastPage = true;
          } else {
            this.isLastPage = false;
          }
          // 用于格式化图片尺寸
          data.forEach((img) => {
            const [pictureWidth, pictureHeight] = img.pixel.split('x');
            img.pictureWidth = parseInt(pictureWidth);
            img.pictureHeight = parseInt(pictureHeight);
            // 获取最后一个.的位置
            const index = img.title.lastIndexOf('.');
            // 获取后缀
            const ext = img.title.substr(index + 1);
            // 输出结果
            img.pictureType = ext;
          });
          // 赋值给图片列表数据
          this.images = data;
          // 页码内容
          this.pageInfo = page;
          this.vLoading = false;
        })
        .catch((e) => {
          this.vLoading = false;

          console.log(e);
          LzMsg.error(e.message || '获取图片失败');
        });
    },
    // 懒加载获取图片列表
    getImagesMore(cateId, title, orderBy = 'time:desc') {
      // this.vLoading = true;

      // 如果正在加载 返回
      if (this.isLoadImg) {
        return;
      }
      // 如果是最后一页 返回
      if (this.isLastPage) {
        return;
      }
      // 设置正在加载
      this.isLoadImg = true;
      // 页码数+1
      this.pageInfo.pageNo = this.pageInfo.pageNo + 1;

      Service.queryPictureNew({

        currentPage: this.pageInfo.pageNo,
        pageSize: 40,
        pictureCategoryId: cateId,
        title,
        orderBy,
      })
        .then(({ data }) => {
          this.vLoading = false;
          // 判断是不是最后一页
          if (data.length == 0) {
            this.isLastPage = true;
          } else {
            this.isLastPage = false;
          }
          // 格式化图片尺寸
          data.forEach((img) => {
            const [pictureWidth, pictureHeight] = img.pixel.split('x');
            img.pictureWidth = parseInt(pictureWidth);
            img.pictureHeight = parseInt(pictureHeight);
            // 获取最后一个.的位置
            const index = img.title.lastIndexOf('.');
            // 获取后缀
            const ext = img.title.substr(index + 1);
            // 输出结果
            img.pictureType = ext;
          });
          // 向列表中添加数据
          this.images = this.images.concat(data);
          // 当前没有加载
          this.isLoadImg = false;
          this.vLoading = false;
        })
        .catch((e) => {
          this.vLoading = false;
          console.log(e);
          LzMsg.error(e.message || '获取图片失败');
          this.isLoadImg = false;
        });
    },
    // 选择图片
    selectImg(image) {
      // 获取选中图片的id
      this.currentPictureId = image.pictureId;
      // 获取选择图片的信息
      this.selectedImg = image;
    },
    // 最后的提交按钮
    submit() {
      console.log('🚀🚀~ this.selectedImg:', this.selectedImg);
      // 进行验证
      this.validator(
        this.selectedImg.pictureWidth,
        this.selectedImg.pictureHeight,
        this.selectedImg.pictureSize,
        this.selectedImg.pictureType.toLowerCase(),
      )
        .then(() => {
          this.$emit('selected', this.selectedImg.picturePath);
        })
        .catch((e) => {
          console.log(e);
          LzMsg.error(e.message);
        });
    },
  },
};
</script>

<style lang="scss">
@import "~lz-crm/style/variables";

.image-selector-tm {
  display: flex;
  flex-direction: row;


  #img-Content{
    overflow: auto;
    width: 100%;
    height: 412px;

      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 7px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 5px;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            background-color: #657180;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            /* 阴影 */
            -webkit-box-shadow: inset 0 0 5px #9CA7B6;
            background: #D7DDE4;
        }
  }

  .lz-input__inner{
             width: 238px;
             height: 30px;
           }
  .left-part{
    width: 200px;
    height: 600px;
    // overflow-: auto;
    margin-right: 10px;
    // padding-right: 10px;
    .lz-tree {
      display: inline-block;
      min-width: 100%;
    }

    .tree-box{
      width: 200px;
      height: calc(100% - 30px);
      overflow:auto;

      &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 7px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
      }

      &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          background-color: #D7DDE4;
          border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          /* 阴影 */
          -webkit-box-shadow: inset 0 0 5px #fff;
          background: #fff;
      }

    }


    .add-sort{
      width: 200px;
      font-size: 12px;
      height: 30px;
      margin-bottom: 15px;
    }

  }
  .right-part{

    .firt-part{
      display: flex;
      align-items: center;
      justify-content: space-between;

      a{
        color:#3399FF;
      }
    }

    width: calc(100% - 200px);
    .image-list {
      margin-top: 15px;
      width: calc(100% - 30px) !important;
      height: 500px;
      background-color:#D7DDE4;
      padding: 10px 15px;

      .second-part{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        .se-left-part{
          display: flex;
          justify-content: flex-start;
          margin-top: 15px;
          align-content: center;
          .search-contnt{
            margin-right: 10px;
           }

        }
        .se-right-part{

        }
      }

      .image-list-content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: baseline;


      }
      .no-img{
        text-align: center;
        margin-top: 200px;
      }
    }

    .button-bottom{
      margin-top: 20px;
      float: right;
    }

    .image-item {
      box-sizing: border-box;
      position: relative;
      width: 110px;
      height: 110px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      margin: 5px;
      user-select: none;
    }

    .image-size {
      position: absolute;
      width: 100px;
      padding: 0 10px;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: $WHITE;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 0;
    }

    .image-name {
      margin-top: 5px;
      width: 100px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 12px;
      color: $FONT_COMMON_GRAY;
    }
  }

.is-border{
  border: 5px solid red;
}
.lz-dialog__footer {
    text-align: center;
  }
}

</style>
