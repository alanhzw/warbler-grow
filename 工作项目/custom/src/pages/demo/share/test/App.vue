<template>
  <div>
    <sticky>
      <Row gutter="20">
        <Col span="12"
          ><Button type="primary" block @click="setHeaderShare"
            >设置头部分享</Button
          ></Col
        >
        <Col span="12"
          ><Button type="danger" block @click="callShare"
            >手动调用分享</Button
          ></Col
        >
      </Row>
    </sticky>
    <CheckboxGroup v-model="channel" direction="horizontal" class="channels" @change="onChannelChange">
      <Checkbox name="Wxfriends">微信好友</Checkbox>
      <Checkbox name="Wxmoments">微信朋友圈</Checkbox>
      <Checkbox name="Sinaweibo">新浪微博</Checkbox>
      <Checkbox name="QQfriends">QQ好友</Checkbox>
      <Checkbox name="QQzone">QQ空间</Checkbox>
    </CheckboxGroup>
    <CellGroup title="分享内容设置">
      <Field
        v-model="shareConfig.title"
        label="标题"
        rows="1"
        autosize
        type="textarea"
      />
      <Field
        v-model="shareConfig.content"
        label="内容"
        rows="1"
        autosize
        type="textarea"
      />
      <Field
        v-model="shareConfig.imageUrl"
        label="图片"
        rows="1"
        autosize
        type="textarea"
      />
      <Field
        v-model="shareConfig.shareUrl"
        label="地址"
        rows="1"
        autosize
        type="textarea"
      />
    </CellGroup>
    <Divider/>
    <RadioGroup v-model="shareConfig.type">
      <CellGroup title="设置分享方式">
        <Cell
          v-for="(type, index) in shareTypeDict"
          :key="type"
          :title="type"
          clickable
          @click="setShareType(index)"
        >
          <template #right-icon>
            <Radio :name="`${index}`" />
          </template>
        </Cell>
      </CellGroup>
    </RadioGroup>
    <Divider/>
    <CellGroup title="设置分享链接">
      <Cell
        title="普通模式1"
        label="末尾包含/"
        value="/m/demo/share/base/"
        is-link
        @click="setShareUrl('/m/demo/share/base/')"
      />
      <Cell
        title="普通模式2"
        value="/m/demo/share/base"
        is-link
        @click="setShareUrl('/m/demo/share/base')"
      />
      <Cell
        title="包含query模式1"
        label="末尾包含/"
        value="/m/demo/share/base/?debug=1"
        is-link
        @click="setShareUrl('/m/demo/share/base/?debug=1')"
      />
      <Cell
        title="包含query模式2"
        value="/m/demo/share/base?debug=1"
        is-link
        @click="setShareUrl('/m/demo/share/base?debug=1')"
      />
      <Cell
        title="hash模式"
        value="/m/demo/share/2106100007414601/#/test"
        is-link
        @click="setShareUrl('/m/demo/share/2106100007414601/#/test')"
      />
      <Cell
        title="hash且含有query模式"
        value="/m/demo/share/2106100007414601/#/test?debug=1"
        is-link
        @click="setShareUrl('/m/demo/share/2106100007414601/#/test?debug=1')"
      />
    </CellGroup>
    <Divider/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  CellGroup, Cell, RadioGroup, Radio, Toast, Field, Button, Row, Col, Divider, Sticky, Checkbox, CheckboxGroup,
} from 'vant';
import utils from '@/utils';
import { ShareConfig } from '@/types/ShareConfig';
import { getWXSDK } from '@/utils/platforms/wx';

window.document.title = '测试页面';

const shareTypeDict = ['京口令分享', 'H5分享', '小程序分享'];

const channel = ref<string[]>(['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone']);

const shareConfig = ref<ShareConfig>({
  type: '0',
  title: '测试分享标题',
  content: '测试分享内容',
  imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/210129/26/4714/187430/6163ec3bE539a9f29/69985ad74d67c5e6.jpg',
  shareUrl: window.location.pathname + window.location.hash + window.location.search,
  // Wxfriends // 微信好友
  // Wxmoments // 微信朋友圈
  // Sinaweibo // 新浪微博
  // QQfriends // QQ好友
  // QQzone // QQ空间
  channel: channel.value.join(','),
});

const setShareType = (type: number): void => {
  shareConfig.value.type = type.toString();
  Toast(`分享方式切换至：${shareTypeDict[type]}`);
};

const setShareUrl = (url: string): void => {
  shareConfig.value.shareUrl = url;
  Toast(`分享url切换至：${url}`);
};

const getConfig = (): ShareConfig => {
  let shareUrl = `${shareConfig.value.shareUrl}`;
  if (shareConfig.value.shareUrl?.indexOf('http') === -1) {
    shareUrl = `${window.location.origin}/${shareConfig.value.shareUrl}`;
  }

  const config = { ...shareConfig.value, shareUrl };
  console.log(config);
  return config;
};

const onChannelChange = (value:any) : void => {
  shareConfig.value.channel = channel.value.join(',');
  Toast(`设置分享渠道为:${value}`);
};

const setHeaderShare = () : void => {
  utils.setHeaderShare(getConfig());
  Toast('设置头部分享');
};

const callShare = async () : Promise<void> => {
  utils.callShare(getConfig());
  Toast('手动唤起分享');
};
</script>

<style lang="scss" scoped>
.channels{
  display: flex;
  padding: 20px;
  gap:20px;
}
</style>
