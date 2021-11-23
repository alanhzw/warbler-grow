<!--
 * @Description:
 *    批量组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\SecurityList.vue
-->
<template>
  <div class="security-list">
    <div class="security-item" v-for='(item,index) in list' :key='index'>
      <div class="security-item-left-edit" v-if="index == editing">
        <div class="number">{{index > 8 ? index+1 : "0" + (index+1)}}</div>
        <!-- <input type="text" > -->
        <textarea class="edit" v-model="title" onpropertychange="this.style.height = 'inherit';this.style.height=this.scrollHeight+'px'" oninput="this.style.height = 'inherit';this.style.height=this.scrollHeight+'px'"></textarea>

        <van-icon name="clear" @click='title=""' color='#cccccc' style='margin-right:0.32rem' />
      </div>
      <div class="security-item-left" v-else :class="{'is-checked':item.checked,'readonly-width':readonly}">
        <div class="number">{{index > 8 ? index+1 : "0" + (index+1)}}</div>
        <div class="text">
          <van-checkbox v-model="item.checked" @click="clickBox(index,item)" v-if="!readonly">{{item.confirmContent}}</van-checkbox>
          <div v-else class="readonly-text">{{item.confirmContent}}</div>
        </div>
      </div>
      <div class="security-item-right" @click='editItem(index,item)' v-if="index !== editing && !readonly">
        <img src="../assets/edit.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    editing: {
      type: Number,
      default: -1
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: "",//输入框绑定值
    }
  },

  methods: {
    //修改某一项
    editItem (index, item) {
      this.$emit('changeEditing', index)
      this.title = item.confirmContent
    },
    clickBox (index,item){
      this.$emit('clickBox')
    }
  }
}
</script>

<style lang='scss'>
.security-list {
  margin-top: 0.32rem;
  font-size: 0.28rem;
  color: rgba(0, 0, 0, 1);

  .security-item {
    margin-bottom: 0.16rem;
    display: flex;
    justify-content: space-between;
    .security-item-left {
      width: 6.22rem;
      padding: 0.32rem 0;

      border: 1px solid #cccccc;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .number {
        flex-basis: 5%;
        margin-left: 0.24rem;
      }
      .text {
        flex-basis: 95%;
        margin-right: 0.24rem;
        position: relative;
        .van-checkbox {
          flex-direction: row-reverse;
          justify-content: space-between;
          .van-checkbox__label {
            flex-basis: 83%;
            text-align: left;
          }
        }
      }
    }
    .security-item-left-edit {
      width: 100%;
      padding: 0.32rem 0;
      border: 1px solid #045bb8;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-around;
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
      .number {
        flex-basis: 5%;
        margin-left: 0.24rem;
      }
    }
    .security-item-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: calc(100% - 6.22rem);
      height: inherit;

      img {
        width: 0.28rem;
        height: 0.28rem;
      }
    }
    .is-checked {
      background-color: #f7f9fd;
    }
  }

  .edit-item {
    width: 100%;
    border: 1px solid #045bb8;
  }
  .readonly-width {
    flex: 1;
  }
  .readonly-text {
    text-align: left;
    padding-left: 0.32rem;
  }
}
</style>