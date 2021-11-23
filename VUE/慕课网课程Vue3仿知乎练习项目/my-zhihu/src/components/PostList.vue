<!--
 * @Description:
 * @Date: 2021-04-02 13:54:50
 * @LastEditTime: 2021-04-02 14:00:19
 * @FilePath: \my-zhihu\src\components\PostList.vue
-->
<template>
  <div class="posit-list">
    <article v-for='post in list' :key="post.id">
      <div class="card-body">
        <h4>
          {{post.title}}
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-3">
            <img :src="post.image" :alt="post.title">
          </div>
          <p :class="{'col-9':post.image}">{{post.content}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { PostProps } from '../data/testData';

export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style>
</style>
