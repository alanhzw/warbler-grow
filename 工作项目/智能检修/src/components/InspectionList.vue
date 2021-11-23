<!--
 * @Description:
 *    自检页面组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-30
 * @FilePath: \intelligent-overhaul-app\src\components\InspectionList.vue
-->
<template>
  <div class="clarificaiton-list">
    <div class="clarificaiton-item" v-for='(item,index) in list' :key='index' :class='{"edit-item":index == editing,"readonly-width":readonly}'>
      <div class="clarificaiton-editer" v-if="qualityPointFlg">
        <div class="item-left" :class='{"edit-tem-left":index == editing}'>
          <div class="item-dangerRoot">
            <div class="icon">{{topIconTitle}}</div>
            <div v-show='index == editing' class="edit-input-box">
              <!-- <input type="text" class="edit" v-model='dangerRoot' style='border-bottom:1px solid #cccccc;padding-bottom:0.32rem'> -->
              <textarea style="border-bottom:1px solid #dddddd" class="edit" v-model="dangerRoot" onpropertychange="this.style.height = 'inherit';this.style.height=this.scrollHeight+'px'" oninput="this.style.height = 'inherit';this.style.height=this.scrollHeight+'px'"></textarea>
              <van-icon name="clear" @click='dangerRoot=""' color='#cccccc' />
            </div>
            <div class="text" v-if='index !== editing'>{{item.dangerRoot}}</div>
            <div class="item-edit" @click='editItem(index,item)' v-if='!readonly'>
              <img src="../assets/edit.png">
            </div>
          </div>
          <div class="item-countermeasureMeasure">
            <div class="icon">{{bottomIconTitle}}</div>
            <div v-show='index == editing' class="edit-input-box">
              <!-- <input type="text" class="edit" v-model='countermeasureMeasure'> -->
              <textarea class="edit" v-model="countermeasureMeasure" onpropertychange="this.style.height = 'inherit';this.style.height=this.scrollHeight+'px'" oninput="this.style.height = 'inherit';this.style.height=this.scrollHeight+'px'"></textarea>
              <van-icon name="clear" @click='countermeasureMeasure=""' color='#cccccc' />
            </div>
            <div class="text" v-if='index !== editing'>{{item.countermeasureMeasure}}</div>
            <div class="item-delete" @click='deleteItem(index)' v-if='!readonly'>
              <img src="../assets/delete.png">
            </div>
          </div>
        </div>
        <div class="item-right">
        </div>
      </div>
      <div class="clarificaiton-inputer" v-if='showzijianInputer && qualityPointFlg'>
        <van-field v-model="item.result" placeholder="填写自检结果" />
      </div>
      <div class="is-qualified" v-if='showIsQualified'>
        <div class="is-qualified-title">是否合格</div>
        <div class="is-qualified-switch">
          <van-switch v-model="item.checked" active-color="#4DD865" inactive-color="#dcdee0" />
        </div>
      </div>
      <div class="clarificaiton-inputer" v-if='showIsQualified && !item.checked && qualityPointFlg'>
        <van-field v-model="item.explanation" placeholder="不合格原因" />
      </div>
      <div class="clarificaiton-selecter" v-if='showSelecter'>
        <van-collapse v-model="activeNames" :border='false'>
          <van-collapse-item :name="cur.index" :border='false' v-for='(cur,curIndex) in item.heckLinkResp' :key='cur.index' :title="`${checkLink[cur.checkLink]}${cur.checkLink=='00'?'':cur.checkPointResps[cur.checkPointResps.length-1].result=='20'?'不合格':'合格'}`">
            <template v-if='cur.checkLink!=="00"'>
              <div v-for="(e,eindex) in cur.checkPointResps" :key='eindex'>
                <content-item label='验收人' :value='e.checkPersonnel'></content-item>
                <!-- <content-item label='职务' :value='e.position'></content-item> -->
                <content-item label='验收时间' :value='e.confirmTime'></content-item>
                <content-item label='补充说明' :value='e.explanation'></content-item>
                <hr v-if='cur.checkPointResps.length>1 && eindex!==cur.checkPointResps.length - 1'>
              </div>
            </template>
            <template v-else>
              <div v-for="(e,eindex) in cur.checkPointResps" :key='eindex'>
                <content-item label='自检人' :value='e.checkPersonnel'></content-item>
                <!-- <content-item label='职务' :value='e.position'></content-item> -->
                <content-item label='自检时间' :value='e.confirmTime'></content-item>
                <content-item label='自检说明' :value='e.explanation'></content-item>
                <hr v-if='cur.checkPointResps.length>1 && eindex!==cur.checkPointResps.length - 1'>
              </div>
            </template>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import ContentItem from './ContentItem.vue'

export default {
  components: {
    ContentItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    editing: {
      type: Number,
      default: -1
    },
    topIconTitle: {
      type: String,
      default: '交'
    },
    bottomIconTitle: {
      type: String,
      default: '措'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    qualityPointFlg: {
      type: Boolean,
      default: true
    },
    showzijianInputer: {
      type: Boolean,
      default: true
    },
    showSelecter: {
      type: Boolean,
      default: true
    },
    showIsQualified: {
      type: Boolean,
      default: false
    },

  },
  data () {
    return {
      dangerRoot: "",//交底的输入框
      countermeasureMeasure: "",//措施的输入框
      activeNames: [],
      checkLink: {
        '00': '班组长自检结果',
        '10': '作业区验收: ',
        '20': '检验队验收: ',
        '30': '分公司验收: ',
      },
      indexArr: []
    }
  },
  mounted () {
    const textareaList1 = document.querySelectorAll('.item-dangerRoot')
    const textareaList2 = document.querySelectorAll('.item-countermeasureMeasure')

    textareaList1.forEach((item) => {
      item.children[1].children[0].style.height = item.offsetHeight + 20 + 'px'
    })
    textareaList2.forEach((item) => {
      item.children[1].children[0].style.height = item.offsetHeight + 20 + 'px'
    })
  },
  computed : {
    list:function(){
      var z = 0;
      for(var i in this.list){
        for(var j in this.list[i].heckLinkResp){
          this.list[i].heckLinkResp[j].index = z++;
          this.list[i].checked = true;
        }
      }
      return this.list;
    }
  },
  methods: {
    //修改某一项
    editItem (index, item) {
      this.$emit('changeEditing', index)
      this.dangerRoot = item.dangerRoot
      this.countermeasureMeasure = item.countermeasureMeasure
    },
    //删除某一项
    deleteItem (index) {
      this.$emit('deleteItem', index)
    },

  }
}
</script>

<style lang='scss'>
.clarificaiton-list {
  padding: 0rem 0rem 0rem 0rem;
  font-family: Source Han Sans CN;
  .clarificaiton-item {
    width: 6.22rem;
    margin-bottom: 0.32rem;
    .clarificaiton-editer {
      display: flex;
      justify-content: space-between;
      margin-top: 0.16rem;
      margin-bottom: 0.16rem;
      .item-left {
        border: 1px solid #dddddd;
        border-radius: 8px;
        padding: 0.32rem 0rem 0.4rem 0.25rem;
        width: 100%;

        .item-dangerRoot {
          position: relative;
          display: flex;
          justify-content: flex-start;
          // align-items: center;
          .icon {
            width: 0.32rem;
            height: 0.32rem;
            background-color: #d35c56;
            border-radius: 50%;
            font-size: 0.22rem;
            color: #fff;
            font-weight: 500;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            flex-basis: 0.32rem;
          }
          .text {
            padding-bottom: 0.32rem;
            padding-right: 0.22rem;
            margin-left: 0.2rem;
            text-align: left;
            line-height: 0.42rem;
            font-size: 0.28rem;

            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            flex-basis: calc(100% - 0.32rem);
          }
          .item-edit {
            position: absolute;
            width: 0.28rem;
            height: 0.28rem;
            top: 0rem;
            right: -0.65rem;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .item-countermeasureMeasure {
          position: relative;
          display: flex;
          justify-content: flex-start;
          margin-top: 0.32rem;
          .icon {
            width: 0.32rem;
            height: 0.32rem;
            background-color: #4fa0f7;
            border-radius: 50%;
            font-size: 0.22rem;
            color: #fff;
            font-weight: 500;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            flex-basis: 0.32rem;
          }
          .text {
            font-size: 0.28rem;
            padding-right: 0.22rem;
            margin-left: 0.2rem;
            text-align: left;
            line-height: 0.42rem;
            flex-basis: calc(100% - 0.32rem);
          }
          .item-delete {
            position: absolute;
            width: 0.28rem;
            height: 0.28rem;
            top: 0rem;
            right: -0.65rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .edit-input-box {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .edit {
          border: none;
          flex-basis: 85%;
          position: relative;
          top: -0.01rem;
          resize: none;
          padding: 0;
          overflow: hidden; // 防止换行出现滚动条闪动
          height: 0.4rem;
          font-size: 0.28rem;
        }
      }
      .edit-tem-left {
        width: 100%;
        border: none;
      }
    }
    .clarificaiton-inputer {
      .van-cell {
        padding: 0;
      }
      .van-field__control {
        font-size: 0.28rem;
        color: rgba(0, 0, 0, 0.45);
        width: 100%;
        background-color: #f3f3f3;
        border-radius: 4px;
        padding: 0.24rem 0.32rem;
      }
    }
    .clarificaiton-selecter {
      margin-top: 0.16rem;
      margin-bottom: -0.16rem;
      .van-cell--clickable {
        text-align: left;
        background-color: #f7f9fd;
        border: 1px solid #dddddd;
        border-radius: 4px 4px 4px 4px;
      }
      .van-collapse-item__content {
        border: 1px solid #dddddd;
        border-radius: 0 0 0px 0px;
        border-top: none;
      }
      .label {
        font-size: 0.28rem;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
      }
      .value {
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
      }
      .van-collapse .van-collapse-item:nth-child(1) .van-cell--clickable {
        border-radius: 4px 4px 0 0;
      }
      .van-collapse .van-collapse-item:nth-child(2) .van-cell--clickable {
        border-radius: 0px 0px 0 0;
      }
      .van-collapse .van-collapse-item:nth-child(3) .van-cell--clickable {
        border-radius: 0px 0px 4px 4px;
      }
    }
  }

  .edit-item {
    width: 100%;
    border: 1px solid #045bb8;
    border-radius: 8px;
  }
  .readonly-width {
    width: 100%;
  }
}
</style>